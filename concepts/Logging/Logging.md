# 로그 남기기

### 개요
Sails에는 [`captains-log`](https://github.com/balderdashy/captains-log)라고 불리우는 내장된 간단한 로거가 존재한다. 사용법은 Node의 [`console.log`](http://nodejs.org/api/stdio.html)와 흡사한데, 별도의 몇몇의 유용한 특징들이 존재한다; 여러 로그레벨마다 다양한 색깔과 콘솔에 접두어를 붙여서 출력해준다.

### 설정
Sails의 로거 설정은 [`sails.config.log`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.log.html), 관례상 설정 파일은 ([`config/log.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/log.js.html))에 있음, 에 모아져 있다.

When configured at a given log level, Sails will output log messages that are output at a level at or above the currently configured level. This log level is normalized and also applied to the generated output from socket.io, Waterline, and other dependencies. The hierarchy of log levels and their relative priorities is summarized by the chart below:
로그 레벨을 설정하면, Sails는 현재 설정한 로그 레벨 및 그 윗단계를 포함해서 출력한다. 이 로그 레벨은 정규화 되어 있으며, 또한 socket.io, Waterline, 그리고 다른 의존성들에 의해서 만들어진 것들이 적용이 된다. 로그 레벨의 계층 구조의 상대적인 우선순위는 아래의 표에 요약되어 있다.

| 우선순위   | 레벨     | 보이는 로그의 종류   |
|----------|-----------|-------------------|
| 0        | silent    | N/A
| 1        | error     | `.error()`            |
| 2        | warn      | `.warn()`, `.error()` |
| 3        | debug     | `.debug()`, `.warn()`, `.error()` |
| 4        | info      | `.info()`, `.debug()`, `.warn()`, `.error()` |
| 5        | verbose   | `.verbose()`, `.info()`, `.debug()`, `.warn()`, `.error()` |
| 6        | silly     | `.silly()`, `.verbose()`, `.info()`, `.debug()`, `.warn()`, `.error()` |


#### 주의
+ 기본으로 설정된 로그 레벨은 "info"이다. 어플리케이션의 로그 레벨을 "info"로 설정하게 되면, Sails는 server 및 어플리케이션의 상태에 대한 정보를 제한적으로 기록에 남긴다.
+ 로그 레벨을 "silly"로 설정하게 되면, Sails는 라우트가 바운드 되는 정보에서부터, 다른 자세한 프레임워크의 일생주기및 진단, 그리고 구현사항까지 출력한다.
+ 로그 레벨을 "verbose"로 설정하면, Sails는 라우트, 모델, hook 등등의 자세한 정보 뿐만 아니라, Grunt의 결과까지 로그로 남기게 된다.


<docmeta name="uniqueID" value="Logging277763">
<docmeta name="displayName" value="Logging">

