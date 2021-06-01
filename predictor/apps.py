from django.apps import AppConfig
import pickle


class PredictorConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'predictor'
    MODEL_PATH = 'predictor/models/extra_trees.pickle'

    with open(MODEL_PATH, 'rb') as f:
        classifier = pickle.load(f)

    vectorizer = classifier['Vectorizer']
    classifier = classifier['Classifier']

