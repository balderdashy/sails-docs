# 전역
### 개요

편의상, Sails는 유용한 전역변수들이 노출되어 있다. 기본적으로, 어플리케이션의 [models](http://beta.sailsjs.org/#/documentation/reference/Models), [services](http://beta.sailsjs.org/#/documentation/reference/Services), 그리고 전역 `sails` 객체는 모두 전체 영역에서 사용 가능하다; 이것의 의미는 백엔드 코드 어디에서나 이것들의 이름을 통해 참조가능하는 것이다. (Sails가 [실행되고 있는](https://github.com/balderdashy/sails/tree/master/lib/app)경우).

Nothing in Sails core relies on these global variables - each and every global exposed in Sails may be disabled in `sails.config.globals` (conventionally configured in `config/globals.js`.)
Sails 코어에 있는 어떤것도 이러한 전역변수에 의존하지 않는다 - Sails의 각각 혹은 전체의 노출된 전역 변수는 `sails.config.globals`에서 비활성화 할 수 있다.(관례상 `config/globals.js`)


### 어플리케이션 객체 (`sails`)
대부분의 경우, `sails` 객체를 전역적으로 접근 가능하게 하길 원할것이다- 이것은 어플리케이션 코드를 훨씬 깔끔하게 해준다. 그러나 `sails`를 포함한 _모든_ 전역변수를 비활성화 _했다면_, `sails` 객체를 요청 객체(`req`)에서 접근 가능하다.

### 모델과 서비스
어플리 케이션의 [모델](http://beta.sailsjs.org/#/documentation/reference/Models) and [서비스](http://beta.sailsjs.org/#/documentation/reference/Services)는 그것들의 `globalId`를 사용하면서 전역변수로 노출되어 있다. 예를들어, 모델이 `api/models/Foo.js` 파일 안에 정의 되어 있다면, 그것은 `Foo`라는 전역 변수로 접근 가능하고, 서비스가 `api/services/Baz.js`에 정의 되어 있다면, 이것은 `Baz`라는 전역 변수로 접근 가능하다.

### Async (`async`) and Lodash (`_`)

Sails는 또한 [lodash](http://lodash.com)의 인스턴스를 `_`로, 그리고 [async](https://github.com/caolan/async)의 인스턴스를 `async`로 노출 하고 있다. 이러한 자주 사용되는 유틸리티들은 기본적으로 제공되기 때문에, 굳이 매 프로젝트 마다 `npm install`를 하지 않아도 된다. 물론 Sails의 다른 전역 변수처럼, 그것들 역시 비활성화 할 수 있다.

### 전역변수 비활성화

Sails는 어떠한 전역 변수를 노출 할것인지를 [`sails.config.globals`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.globals.html)를 살펴보고 결정한다. 관례상 [`config/globals.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/globals.js.html)에서 설정 가능하다.

모든 전역변수를 비활성화 하고 싶다면, 아래와 같이 `false`로 셋팅하면된다:

```js
// config/globals.js
module.exports.globals = false;
```

_특정한_ 전역 변수만 비활성화 하고 싶다면, 객체 이름을 적어 넣으면 된다, 예를들면:

```js
// config/globals.js
module.exports.globals = {
  _: false,
  async: false,
  models: false,
  services: false
};
```

### 주의

> + `sails`를 포함한 어떠한 전역 변수도, sails가 loaded(실행 완료)가 된 _이후_에만 접근 가능하다. 다른말로 하면, `sails.models.user` 혹은 `User`를 `sails`가 로딩이 끝날때까지, 함수밖에서는 사용하지 못한다.

<!-- not true anymore:
Most of this section of the docs focuses on the methods and properties of `sails`, the singleton object representing your app.  
-->

<docmeta name="uniqueID" value="Globals668238">
<docmeta name="displayName" value="Globals">

