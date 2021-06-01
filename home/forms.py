from django import forms


class LogForm(forms.Form):
    log = forms.CharField(label='전체 로그',
                          widget=forms.TextInput(
                              attrs={'class': 'form-control',
                                     'placeholder': '위험도를 예측할 로그를 입력해 주세요.'}
                          ),
                          )
