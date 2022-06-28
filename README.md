# LogInAndOut-log-severity-level-website

> 아시아경제 교육센터 파이썬 기반 응용AI 개발자 양성과정 프로젝트

## 프로젝트 소개

로그 데이터 분석 결과를 시각화하고 입력 로그의 위험도를 예측 기능을 제공하는 웹 사이트 입니다.

- 로그 데이터 분석 내용 시각화
- 로그 위험도 등급 예측 모델 검증 결과 시각화
- 최종 모델을 이용해 입력 로그의 위험도 예측

### 참조 

- 로그 데이터 분석 프로젝트: [LogInAndOut-log-severity-level-analysis](https://github.com/EnaJeong/LogInAndOut-log-severity-level-analysis)


## 설치 및 실행

```bash
git clone git@github.com:EnaJeong/LogInAndOut-log_severity_level_website
```

### 환경설정

1. Python 환경

    *Python 3.8* 환경에서 `pip`를 사용해 필요한 라이브러리들을 인스톨합니다.

    ```bash
    pip3 install -r requirements.txt
    ```

2. Django secret key 설정

    `Django`에서 사용되는 secret key를 비공개로 관리하기 위해 별도의 파일인 `secrets.json`을 생성했고 이는 업로드되어 있지 않습니다.
    따라서 `secrets.json`파일을 생성해 주어야 하며, 파일의 내용은 다음과 같습니다.
    ```json
    {
        "SECRET_KEY": "key-value"
    }
    ```
    키 값은 터미널에서 다음 명령어를 통해 생성할 수 있습니다.
    ```bash
    python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
    ```
    생성한 키 값을 `secrets.json` 파일의 `"key-value"`에 입력하시면 됩니다.


### 추가 리소스

- `predictor/models/extra_trees_cv.pickle`
- `predictor/models/extra_trees.pickle`

[Google Drive](https://drive.google.com/drive/folders/1frjgOJd6jOFH50M-uct_UgiYIWkwKtaE?usp=sharing)에서 다운받으실 수 있습니다.

### 실행

```bash
python manage.py runserver
```

다음과 같은 메시지와 함께 실행됩니다.

```
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
February 08, 2022 - 16:10:47
Django version 3.2.3, using settings 'LogInAndOut.settings'
Starting ASGI/Channels version 3.0.3 development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

이때 웹 브라우저를 통해 `http://127.0.0.1:8000/`로 접속하면 웹 페이지를 볼 수 있습니다.
