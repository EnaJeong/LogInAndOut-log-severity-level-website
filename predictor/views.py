from django.shortcuts import render
from django.http import JsonResponse
import re
import pickle
import numpy as np
from rest_framework.views import APIView
from django.apps import apps


# Create your views here.


class Utils:
    with open(apps.get_app_config('predictor').model_path, 'rb') as f:
        classifiers = pickle.load(f)

    vectorizer = classifiers['Vectorizer']
    classifiers = classifiers['Classifiers']

    THRESHOLDS = [0.83, 0.75, 0.9, 0.75, 0.9, 0.75, 0.8]

    PATTERNS = [('\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z?', '<TS>'),
                # YEAR, MON, DAY, TIME
                ('\d{4}(?= (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))', '<YEAR>'),
                ('(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}\s+\d{2}:\d{2}:\d{2}', '<DATE> <TIME>'),
                ('[A-Za-z]{3}\s+<DATE> <TIME>\s+\d{4}', '<DAY> <DATE> <TIME> <YEAR>'),
                # IP
                ('127.0.0.1', 'localhost'),
                ('\d+\.\d+\.\d+\.\d+(?:\.\d+)?', '<IP>'),
                # HEX, NUM
                ('(?<![0-9a-fA-F])0x[0-9a-fA-F]+(?=\W|$)', '<HEX>'),
                ('(?<=\W)(?=[a-fA-F0-9\-]*[0-9])(?=[a-fA-F0-9\-]*[a-fA-F])[a-fA-F0-9]{3,}(?:-[a-fA-F0-9]{3,})+(?=\W|$)',
                 '<SN>'),
                ('(?<==)[a-fA-F0-9]+(?=\W|$)', '<NUM>'),
                ('(?<=:)[a-fA-F0-9]+(?=\s|$)', '<NUM>'),
                ('(?<=\')[a-fA-F0-9]+(?=\')', '<NUM>'),
                ('(?<= )(?=[a-fA-F0-9]*[0-9])[a-fA-F0-9]{4,}(?=\W|$)', '<NUM>'),
                ('(?<=[^a-zA-Z0-9])(\d+)(?=[^a-zA-Z0-9]|$)', '<NUM>'),
                # 특수문자
                ('\]\[', '] ['),
                (',', ' , '),
                ('\s+', ' ')]

    @staticmethod
    def apply_masking(log):
        for pat, repl in Utils.PATTERNS:
            log = re.sub(pat, repl, log)
        return log

    @staticmethod
    def predict_probas(X_features):
        return [clf.predict_proba(X_features) for clf in Utils.classifiers]

    @staticmethod
    def vote(probas):
        preds = []
        for proba in probas:
            pred = np.argmax(proba, axis=-1)
            for i, threshold in enumerate(Utils.THRESHOLDS):
                pred[np.where((pred == i) & (np.max(proba, axis=1) < threshold))] = 7
            preds.append(pred)

        return np.array(preds)

    @staticmethod
    def predict(preds):
        pred = np.zeros(preds.shape[-1])
        for i in range(preds.shape[-1]):
            votes = preds[:, i]

            # 각 위험도별 개수
            results = [0] * 8
            for vote in votes:
                results[vote] += 1

            # 위험도 7로 분류한 모델이 2개 이상이면 7
            pred[i] = 7 if results[7] > 1 else np.argmax(results)

        return pred


class Predict(APIView):

    def get(self, request):
        if request.method == 'GET':
            log = request.GET.get('log')
            masked = Utils.apply_masking(log)
            vector = Utils.vectorizer.transform([masked])
            probas = Utils.predict_probas(vector)
            votes = Utils.vote(probas)
            prediction = Utils.predict(votes)

            response = {
                'proba': np.array(probas).tolist(),
                'votes': votes.tolist(),
                'prediction': prediction.tolist(),
            }

            return JsonResponse(response)

