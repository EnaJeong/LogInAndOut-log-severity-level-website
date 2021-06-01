from django.shortcuts import render
from django.apps import apps
from plotly.offline import plot
import plotly.graph_objects as go
import plotly.express as px
from .forms import *
from .models import Ranking
import pickle
import re
import numpy as np
import pandas as pd


class Utils:
    COLOR = px.colors.qualitative.Pastel
    HEIGHT = 800
    FONT_SIZE = 16

    pivot_train = pd.read_csv('home/data/pivot_train.csv', index_col=0)
    log_patterns = pd.read_csv('home/data/log_patterns.csv', index_col=0)
    log_patterns.drop('category_2', axis=1, inplace=True)

    with open(apps.get_app_config('home').model_path, 'rb') as f:
        classifier = pickle.load(f)

    vectorizer = classifier['Vectorizer']
    classifier = classifier['Classifier']

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


# Create your views here.
def main(request):
    return render(request, "index.html")


def eda_overview(request):

    def sunburst(pivot):
        fig = px.sunburst(pivot, path=['first word', 'level'], values='count',
                          color_discrete_sequence=Utils.COLOR)
        fig.update_layout(
            height=Utils.HEIGHT,
            font_size=Utils.FONT_SIZE,
        )
        plot_div = plot(fig, output_type='div', include_plotlyjs=False)
        return plot_div

    def sunburst_pattern(df):
        fig = px.sunburst(df, path=['first_word', 'category_1', 'level'],
                          values='count', color='category_1',
                          color_discrete_sequence=Utils.COLOR)
        fig.update_layout(
            height=Utils.HEIGHT,
            font_size=Utils.FONT_SIZE,
        )
        plot_div = plot(fig, output_type='div', include_plotlyjs=False)
        return plot_div

    context = {
        'sunburst': sunburst(Utils.pivot_train),
        'sunburst_masked': sunburst_pattern(Utils.log_patterns),
    }

    return render(request, "eda.html", context)


def eda_wordcloud(request):

    return render(request, "eda_wordcloud.html")


def modeling_ranking(request):
    return render(request, "modeling_ranking.html")


def modeling(request):
    rankings = Ranking.objects
    return render(request, "modeling.html", {'rankings': rankings})


def prediction(request):
    if request.method == 'POST':
        form = LogForm(request.POST)

        if form.is_valid():
            log = form.cleaned_data['log']
            masked = Utils.apply_masking(log)
            vector = Utils.vectorizer.transform([masked])
            proba = Utils.classifier.predict_proba(vector)[0]
            max_proba = np.max(proba) * 100
            result = 7 if max_proba < 90 else np.argmax(proba)

            if result < 1:
                category = '정상'
            elif result < 3:
                category = '주의'
            elif result < 5:
                category = '경계'
            elif result < 7:
                category = '심각'
            else:
                category = '새로운 유형'

            context = {
                'form': LogForm(),
                'log': log,
                'masked': masked,
                'proba': proba.tolist(),
                'max_proba': max_proba,
                'prediction': result,
                'category': category,
            }
    else:
        context = {
            'form': LogForm()
        }

    return render(request, "prediction.html", context)
