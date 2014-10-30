# 배포

### 개요

#### 배포 전에

웹 어플리케이션을 배포하기전에, 스스로 몇가지 질문에 대해서 답해야한다:

+ 기대되는 트래픽은 어느정도인가?
+ 계약 내용에 가동시간을 충족 시킬수 있는가? 예. a Service Level Agreement (SLA)
* 서버와 직접적으로 "맞닿아있는" 인프라가 어떤것이 될것인가?
  + 안드로이드 어플리케이션
  + iOS 어플리케이션
  + 데스크탑 브라우저
  + 모바일 웹 브라우저 (타블랫, 폰, 아이패드 미니?)
  + 텔레비젼, 시계, 토스터 등등..?
+ 서버에 어떤식으로 요청하는가?
  + JSON?
  + HTML?
  + XML?
+ 실시간 통신에 Socket.io기능을 사용할것인가?
  + 예. 채팅, 실시간 분석, 어플리케이션 알림/메시지
+ 어떻게 크래쉬와 에러를 추적할것인가?
  + Sails log 장을 살펴볼것



#### 한 서버에 배포하기

Node.js는 꽤나 빠르다. 많은 어플리케이션에서, 하나의 서버는 기대되는 트래픽을 감당하기에 충분하다-- 적어도 처음에는말이다.

##### 설정

+ 모든 환경 설정은 `config/env/production.js`에 존재한다.
+ 어플리케이션을 80포트에서(ngix와 같은 프록시가 존재하지 않는다면) 돌아가도록 설정한다. nginx를 사용한다면, websocket들이 어플리케이션에 잘 전달이 되게끔 설정되어있는지 확인하라. nginx docs의 [WebSocket proxying](http://nginx.org/en/docs/http/websocket.html)에서 관련 정보를 얻을 수 있다.
+ '배포' 환경으로 설정해서, 모든 css/js파일들이 정리되게 하고, 내부 서버가 적합한 환경으로 변환될 수 있도록 할것 ([linker](https://github.com/balderdashy/sails-wiki/blob/0.9/assets.md)가 필요하다.)
+ 데이터베이스가 배포 서버에 설정이 되어있는지 확인할것. 이것은 특히 MySQL과 같은 관계형 데이터베이스를 사용할때 중요한데, 이유는 sails는 배포 환경으로 실행할때 모든 모델을 `migrate:safe`로 설정하기 때문이다. 이것의 으미는 더이상 자동적인 마이그래이션이 서버를 시작할때 되지 않는다는 의미이다. 데이터 베이스를 다음과 같은 방법으로 설정할 수 있다:
  + 서버에 데이터베이스를 만들고 로컬에서 sails 어플리케이션을 `migrate:alter`로 실행시키되, db서버를 배포서버 설정해라. 자동적으로 db가 설정될것이다.
  + 원격으로 서버를 접속할 수 없는경우, 로컬의 스키마를 덤프하고, 데이터 베이스서버로 임포트시키면된다.  
+ POST, PUT, 그리고 DELETE 요청을 보호하기 위한 CSRF를 활성화해라.
+ SSL 활성화
+ 만약 소켓을 사용한다면:
  + `config/socket.js`를 socket.io의 배포 설정 [추천값](https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO#recommended-production-settings)들로 설정해라.
    + 예. `flashsocket` 전송 활성화

##### 배포

실제 배포시에는, `sails lift`대신에, 심지어 크래쉬가 나더라도 어플리케이션이 계속 동작하는것 필요로 할 것이다.

+ 영구 설치법: `sudo npm install -g forever`
  + 영구 설치법에 대한 자세한 정보: https://github.com/nodejitsu/forever
+ 혹은 PM2 설치법: `sudp npm install pm2 -g --unsafe-perm`
  + 더 자세한 정보: https://github.com/Unitech/pm2 
+ 어플리케이션 디렉토리에서, 둘중 하나의 명령어와 함께 시작한다: `forever start app.js --prod` 혹은 `pm2 start app.js -x -- --prod`
  + 이것은 `sails lift --prod`와 똑같은 역할을 하지만, 서버 크래시가 발생했을때, 자동적으로 재시작하게 해준다.
  


<docmeta name="uniqueID" value="Deployment402941">
<docmeta name="displayName" value="Deployment">

