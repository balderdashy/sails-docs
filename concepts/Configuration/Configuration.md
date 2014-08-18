# 설정

### 개요

Sails는 의무적으로 [convention-over-configuration](http://en.wikipedia.org/wiki/Convention_over_configuration) 철학을 지향하고 있기때문에, 종종 어떻게 이러한 손쉬운 기본 설정들을 커스터마이즈 하는지 이해하는것은 매우 중요하다. Sails의 대부분의 관례상, 의도에 맞게끔 설정 옵션들을 변경하고 상속하게 해야합니다. 문서의 이 장에서는  Sails에서 사용할 수 있는 설정 옵션들을 전부 살펴볼 것이다.

Sails는 [환경 변수](http://en.wikipedia.org/wiki/Environment_variable)혹은 커맨드라인 인자를 기술하거나 지역 혹은 전역 [`.sailsrc` 파일들](http://beta.sailsjs.org/#/documentation/anatomy/myApp/sailsrc.html)을 변경하고, 혹은 (가장 흔하게) 보일러플레이트 설정 파일을 새로운 프로젝트의 [`config/`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config)폴더에서 설정함으로써 [프로그래밍적으로 설정](https://github.com/mikermcneil/sails-generate-new-but-like-express/blob/master/templates/app.js#L15)을 수행하고 있다. 실행중에 `sails.config`라는 `sails` 전역 설정을 사용 할 수 있다.


### 기본 설정 파일들 (`config/*`)

새로운 Sails 어플리케이션에 기본적으로 포함된 설정파일들이다. 이러한 보일러플레이트 파일들은 몇몇의 인라인 커멘트들이 포함되어 있고, 이것은 문서와 텍스트 에디터 사이를 왔다 갔다 하지 않고 바로 그자리에서 제공될수 있게 설계되어 있다.

In most cases, the top-level keys on the `sails.config` object (e.g. `sails.config.views`) correspond to a particular configuration file (e.g. `config/views.js`) in your app; however configuration settings may be arranged however you like across the files in your `config/` directory.  The important part is the name (i.e. key) of the setting- not the file it came from.
대부분의 경우 `sails.config` 객체 (예. `sails.config.views`)에 있는 최상위 키들은, 특별한 설정 파일에 대응이 된다; 설정 파일과 키가 정렬이 되어 있다 하더라도, 항상 그런것은 아니다 중요한것은 셋팅의 이름 (예. key)는 파일이름에서 오는것이 아니다. 

예를들면, `config/foo.js`파일을 추가했다고 가정해보자.

```js
// config/foo.js
// 아래의 객체는 `sails.config.blueprints`로 통합될 것이다.
module.exports.blueprints = {
  shortcuts: false
};
```

설정 옵션들 및 기본적으로 제공되는 파일의 철저한 검증을 위해, 이 페이지를 읽어보거나, [The Anatomy of a Sails App](./#!documentation/anatomy)에 있는  ["`config/`"](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config)를 참고하라.


### 어플레키에션의 `sails.config`에 접근하기

`config`객체는 Sails 어플리케이션의 인스턴스(`sails`)에서 이용 가능하다. 기본적으로, 실행되면 이것은 [전역 공간](http://beta.sailsjs.org/#/documentation/concepts/Globals)에 노출되고, 페이지의 어떤곳에서든지 이용이 가능하다.

##### 예
```javascript
// This example checks that, if we are in production mode, csrf is enabled.
// It throws an error and crashes the app otherwise.
if (sails.config.environment === 'production' && !sails.config.csrf) {
  throw new Error('STOP IMMEDIATELY ! CSRF should always be enabled in a production deployment!');
}
```



### 커스텀 설정
Sails recognizes many different settings, namespaced under different top level keys (e.g. `sails.config.sockets` and `sails.config.blueprints`).  However you can also use `sails.config` for your own custom configuration (e.g. `sails.config.someProprietaryAPI.secret`).
Sails는 매우 다른 셋팅값과, 다른 최상위 키값들을 인식한다. (예, `sails.config.sockets` and `sails.config.blueprints`) 그러나 `sails.config`를 자신만의 커스텀 설정으로 이용 할 수도 있다. (예. `sails.config.someProprietaryAPI.secret`)

##### 예

```javascript
// config/linkedin.js
module.exports.linkedin = {
  apiKey: '...',
  apiSecret: '...'
};
```

```javascript
// In your controller/service/model/hook/whatever:
// ...
var apiKey = sails.config.linkedin.apiKey;
var apiSecret = sails.config.linkedin.apiSecret;
// ...
```




### `sails` 커맨드 라인 인터페이스 설정하기

설정에 있어서, 대부분의 시간을 특정한 어플리케이션을 위한 포트나, 데이터베이스 커넥션 등등과 같은 런타임 셋팅을 어떻게 가져가는지에 대해서 집중할것이다. 그러나 이러한 워크플로워를 단순화 시키거나 반복적인 작업들을 줄이거나, 커스텀 빌드 자동화 등등을 수행하기 위해 Sails CLI 자체를 커스터마이징 하는것도 좋은 선택이다. 고맙게도, Sails v0.10에서는 강력한 새로운 도구를 지원한다.

[`.sailsrc` 파일](http://beta.sailsjs.org/#/documentation/anatomy/myApp/sailsrc.html)은 Sails에서 독특한 설정 방식을 갖는다. 이것은 Sails CLI를 설정하는데이도 사용되며, 디렉토리의 그루핑 혹은 오직 어떠한 특정한 디렉토리로 변경을 했을때 사용이된다. 이렇게 하는 주된 이유는 `sails generate`와 `sails new`가 수행될때 사용되는 [generators](http://beta.sailsjs.org/#/documentation/concepts/extending-sails/Generators)를 커스터마이즈 하기 위해서이다. 뿐만 아니라  자신의 커스텀 generator를 설치하는데도 유용하며, hard-coded된 설정을 적용하는데에도 사용 가능하다.

Sails는 현재의 디렉토리의 부모중 "가장 가까운" `.sailsrc`를 찾기때문에, 이 파일을 클라우드 호스트된 코드 저장소에 둘수 없는 민감한 설정값 (_**데이터베이스 비밀번호**와 같은)을 두는데에도 안전하게 사용 할 수 있다. "$HOME" 디렉토리에 `.sailsrc`를 추가하라. 더 자세한 정보는 [the docs on `.sailsrc`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/sailsrc.html)를 참조 하라.




### 주의
> 몇몇의 경우 `sails.config`안에 설정된 기본 의미는  "lift" 프로세스 에서만 활용된다. 다른말로 하면, 어떠한 옵션들을 런타임에서 바꾸는것은 아무런 효과가 없다. 예를들어 어플리케이션이 돌아가는데 포트를 바꾸기 위해서는 `sails.config.port`를 바꿔봤자 아무런 의미가 없다. 대신 설정 파일에서 값을 다시 쓰거나, 커멘드라인 인자를 바꾼후에 서버를 다시 시작해야한다.



<docmeta name="uniqueID" value="Configuration615655">
<docmeta name="displayName" value="Configuration">

