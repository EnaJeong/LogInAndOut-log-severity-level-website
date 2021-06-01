from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name='main'),
    path('eda/overview', views.eda_overview, name='eda'),
    path('eda/wordcloud', views.eda_wordcloud, name='eda_wordcloud'),
    path('modeling/details', views.modeling, name='modeling'),
    path('modeling/ranking', views.modeling_ranking, name='modeling_ranking'),
    path('prediction', views.prediction, name='prediction'),
]
