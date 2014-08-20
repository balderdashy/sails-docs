# 확장하기

갑작스레 많은량의 트레픽이 생겼다고 가정(사실 실제 상황이면 더 좋다.)해보자.
그러면 당신은 사람들이 사용하는 만큼 더 확장하는 확장 아키텍쳐를 설정하길 원할것이다.

### 벤치마크

대부분의 경우, Sails의 벤치마크는 Connect나 Express 혹은 Socket.io 어플리케이션과 정확히 일치한다. 몇몇의 특별한 경우를 제외하고는 그렇다고 확인 되었다. 가장 최근의 경우는 [여기](http://serdardogruyol.com/?p=111)이다. 만약 본인이 시도한 벤치마크 결과를 
공유하고 싶다면, Github에 pull request를 보내주었으면 한다.

### 아키텍쳐 예

```
                       Sails.js server
                             ....                 
                    /  Sails.js server  \      /  Database (e.g. Mongo, Postgres, etc)
Load Balancer  <-->    Sails.js server    <-->    Socket store (Redis)
                    \  Sails.js server  /      \  Session store (Redis)
                             ....                 
                       Sails.js server
```


### 클러스터링 기능을 갖춘 배포 어플리케이션을 설정하는법


+ Make sure the database(s) for your models (e.g. MySQL, Postgres, Mongo) is scalable (e.g. sharding/cluster) 
+ 사용하고 있는 데이터 베이스(예. MySql, Postgres, Mono)가 확장 가능한지 확인할것. (예. sharding/cluster)
+ 어플리케이션이 공유된 세션 저장소를 사용하게끔 설정할것.
+ Redis는 이미 지원한다. (`config/session.js`의 `adapter` 옵션을 참고)
+ 소켓을 사용한다면:
  + 어플리케이션이 공유 소켓 저장소를 사용하게끔 설정할것.
    + Redis는 이미 지원한다. (`config/sockets.js`의 `adapter` 옵션을 참고)
    + 주의: 만약 소켓 저장소를 설정하는것이 꺼려진다면, 사용할만한 다른 방법은 로드 벨런서에 sticky 세션을 활성화하는것이다.
+ 사용하는 다른 의존성들이 공유된 메모리를 사용하는것이 없는지 확인할것.

### 다중 서버의 Sails 클러스터 배포하기

+ Deploy multiple instances (aka servers running a copy of your app) behind a load balancer
+ 로드 벨런서 뒷편에 다중 인스턴스 (일명 앱의 복사본이 돌아가는 서버)를 배포할것
  + 각각의 인스턴스에 `forever`를 이용하여 Sails를 실행할것
  + 로드 벨런서에 대한 더 자세한 내용: http://en.wikipedia.org/wiki/Load_balancing_(computing)
+ SSL 요청을 로드벨런서에게 맡길것
  + 이것 덕분에 Sails에서 SSL 설정을 사용할 필요가 없다--로드벨런서를 지나면서 패킷은 이미 복호화가 되어있다.

<docmeta name="uniqueID" value="Scaling291270">
<docmeta name="displayName" value="Scaling">
