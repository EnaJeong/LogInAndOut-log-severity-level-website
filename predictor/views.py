from django.shortcuts import render
from django.http import JsonResponse
import re
from rest_framework.views import APIView
from .apps import PredictorConfig


# Create your views here.
class Predict(APIView):

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
        for pat, repl in Predict.PATTERNS:
            log = re.sub(pat, repl, log)
        return log

    def get(self, request):
        if request.method == 'GET':
            log = request.GET.get('log')
            masked = Predict.apply_masking(log)
            vector = PredictorConfig.vectorizer.transform([masked])
            prediction = PredictorConfig.classifier.predict_proba(vector)[0]

            response = {
                'log': log,
                'masked': masked,
                'prediction': prediction.tolist()
            }

            return JsonResponse(response)

