from django.db import models


# Create your models here.
class Ranking(models.Model):
    MODELS = [
        ('random-forest', 'Random Forest'),
        ('extra-trees', 'Extra Trees'),
    ]
    MASKING = [
        ('num-masking', 'v1'),
        ('various-masking', 'v2'),
    ]
    OUTLIER = [
        ('outlier-included', 'included'),
        ('outlier-excluded', 'excluded')
    ]
    VETORIZERS = [
        ('count-vectorizer', 'Count Vectorizer'),
        ('tfidf-vectorizer', 'Tfidf Vectorizer'),
    ]

    title = models.CharField(max_length=10)
    version = models.FloatField()
    date = models.CharField(max_length=10)
    masking = models.CharField(max_length=30, choices=MASKING, default='various-masking')
    outlier = models.CharField(max_length=30, choices=OUTLIER, default='num-masking')
    vectorizer = models.CharField(max_length=30, choices=VETORIZERS, default='count-vectorizer')
    model = models.CharField(max_length=30, choices=MODELS, default='random-forest')
    results = models.TextField()
    score = models.CharField(max_length=10)
    rank = models.CharField(max_length=10)