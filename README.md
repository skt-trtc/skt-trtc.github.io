# Biz RCS 생성 지원툴 라이브러리 적용 가이드
본 설명에는 biz RCS 생성 지원툴 라이브러리 포팅 및 사용에 대한 가이드 내용을 설명한다.

## 개요

- 해당 라이브러리는 flutter framework (https://flutter.dev/) 를 사용하여 작성된 라이브러리로써 Web Embedding  방식으로 사용할 수 있다.
- 특정 HTML Tag 에 해당 flutter rendering 할수 있도록 설정을 하고, JS interop을 통해 해당 라이브러리와 통신하여 데이터를 처리한다.
- 해당 라이브러리는 static local web page 가  아닌 web app 에서 동작한다.

### revisions
| date     | version | comment 
|----------|---------|--------|
| 24.04.01 | 0.9.0| 최초 배포  |

## 적용하기

### 라이브러리 구성
```
assets/
canvaskit/
flutter.js
flutter_service_worker.js
main.dart.js
service_worker_version.json
```


### base 경로 및 script 추가
라이브러리를 사용할 web page 에 하위 내용들을 추가한다.

라이브러리 base 경로를 설정해준다. 최상위 root 에 라이브러리를 두었다면 "/" 설정한다.
```
<base href="/">
```
이미지 편집을 위한 third party library 인 croppie js, css 를 추가한다.
```  
<!-- croppie import --> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.5/croppie.css" /> <script defer src="https://cdnjs.cloudflare.com/ajax/libs/exif-js/2.3.0/exif.js"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.5/croppie.min.js"></script>  
```  

flutter web sdk인 flutter.js 파일을 추가해준다
```
<script src="flutter.js" defer></script>  
```

### HTML 에 특정 Tag 추가하기
web page 에 아래처럼 특정 element 를 추가해준다. 해당 element의 식별방식은 아무거나 무방하며 해당 element 만 찾아서 설정할 수 있으면 상관없다.
```
<div class="app" id="flutter_app"></div>  
```

해당 element 의 reference 크기는 다음과 같다.
> width 962px 이상 권장, 그 이하는 가로 스크롤이 발생함
> height 는 750px 이상 권장  (작으면 세로 스크롤 발생)


### web page script 내에서 flutter 를 연결하기
web page script 내에서 flutter 를 연결한다.

아래처럼 flutter engine에 해당 element를 연결시키고, serviceWorkerVersion 을 설정한다.
> serviceWorkerVersion  값은 라이브러리내에 `serviceWorkerVersion` 파일에 기입되어있다.
```
window.addEventListener('load', function(ev) {  
 // 라이브러리를 렌더링할 element를 식별  
 let appArea = document.querySelector("#flutter_app");   _flutter.loader.loadEntrypoint({    
    serviceWorker: {    
      serviceWorkerVersion: "XXXXXXXXXX",    
    },    
    onEntrypointLoaded: function(engineInitializer) {    
      engineInitializer.initializeEngine({    
        hostElement: appArea,  
 }).then(function(appRunner) {        appRunner.runApp();    
      });    
    }    
}); });  
```

### 라이브러리 통신하기

js 에서 라이브러리로부터 callback 을 받는 리스트들은 다음과 같다. 해당 callback api 들을 구현 해야 한다.
(해당 callback api 들은 아래 API 설명에 작성되어 있다.)
```
window.onRequestUpload = async (json) => {
 ... return Promise.resolve(retJson);}
}

window.onExportToWeb = (val) => {
}

window.onCloseApp = (rewrite) => {
}
```

또한 라이브러리로 Biz Rcs 생성지원툴 구성을 위한 json 데이터를 전달할땐 `setupDataOnWeb` 함수를 호출한다. 
(해당 함수에 대한 설명도 아래 API 설명에 작성되어 있다.)
```
window.setupDataOnWeb(json);  
```

## API 설명

#### 1. 데이터 전달하기
```
window.setupDataOnWeb(json);
```
Biz Rcs 생성지원툴 라이브러리로 데이터를 전달한다. 해당 json data 포맷은 다음과 같다.

| name | value |
|--|--|
|logos  | logo json|
|message| message json|

logo json 은 `{ "file_key_name", byteArray }` 이다.
> 해당 로고 파일이 메시지 작성에 사용되어 `onExportToWeb`로 응답받을 경우 해당 `export json` 에는 여기서 전달해준 `{"param_name" : "file key name"}`이 사용된다.

message json 은 RBC 를 통해서 받은 message base api 의 `messagebaseInfo` 전문이다.


####  2. listen 함수 : 이미지 편집 요청
```
window.onRequestUpload = async (json) => {
 ... return Promise.resolve(retJson);}
```
Biz Rcs 생성지원툴 라이브러리에서 이미지를 편집하고나서 업로드를 요청하는경우에 호출되는 callback 으로써 input json 포맷은 `{"param name" : byteArray}` 이다.

해당 json 정보를 토대로 이미지를 업로드하고 생성되는 url을 `{"param_name" : "uploaded_url"}` json 포맷으로 맞게 future return 하면 된다.

> 해당 이미지 파일이 메시지 작성에 사용되어 `onExportToWeb`로 응답받을 경우 해당 `export json` 에는 여기서 전달해준 `{"param_name" : "uploaded_url"}`이 사용된다.


#### 3. listen 함수 : 메시지 작성 완료
```
window.onExportToWeb = (json) => {
} 
```
Biz Rcs 생성지원툴 라이브러리에서 메시지 작성을 다끝내고 [작성완료] 버튼을 눌러서 정상적으로 메시지가 export 되는 경우에 호출되는 callback 함수이다.

result json 은 메시지 발송에 포함되는 body와 buttons를 리턴해준다.


#### 4. listen 함수 : 메시지 취소 및 종료
```
window.onCloseApp = (rewrite) => {
}
```
Biz Rcs 생성지원툴 라이브러리에서 메시지 작성 취소를 하는 경우 호출되는 callback 함수이다.

>현재는 UX동선이 제거되어 rewrite argument는 무시해도 됩니다. 추후 해당 기능이 구현될때 추가 가이드를 작성할 예정입니다.

## Troubleshooting

> TBD

## F&Q

> TBD

