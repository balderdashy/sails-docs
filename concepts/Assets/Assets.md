# Assets

### 개관

Assets은 페이지에서 열람 할 수 있는 서버의 [정적 파일들](http://en.wikipedia.org/wiki/Static_web_page) (js, css, images, etc)을 가리킨다. Sails에서는, [`assets/`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/assets)디렉토리에 이러한 파일들을 두고, 디렉토리에서는 앱을 시작할때 일련의 처리 및 각 파일들을 숨겨진 임시디렉토리(.tmp/public/)로 동기화 한다. 실제로 .tmp/public 폴더가 Sails가 제공하는 컨텐츠들이다. - 대략 [express](https://github.com/expressjs)의 "public" 디렉토리와 유사하다고 말할 수 있으며, 아파치와 같은 서버에서 "www" 폴더와 비슷하다고 볼 수 있다. 이러한 중간 과정들은 Sails가 LESS, CoffeeScript, SASS, spritesheets, Jade templates와 같은 prepare/pre-compile assets을 이용 할 수 있게끔 한다.

### 정적 미들웨어

보이지 않는곳에서, Sails는 assets을 제공하기위해 익스프레스의 [정적 미들웨어](http://www.senchalabs.org/connect/static.html)를 사용한다. 이 미들웨어는 [`/config/http.js`](/#/documentation/reference/sails.config/sails.config.http.html)에서 설정 할 수 있다. (예. 캐쉬 설정)

##### `index.html`
대부분의 웹서버와 같이, Sails는 `index.html` 규약을 사용하고 있다. 예를들면, Sails의 새로운 프로젝트에서 `assets/foo.html`를 만들면, `http://localhost:1337/foo.html`에서 접근 할 수 있다. 하지만 `assets/foo/index.html`를 만들면, `http://localhost:1337/foo/index.html` 와 `http://localhost:1337/foo` 에서 모두 접근 할 수 있다.

##### 우선순위
정적 [미들웨어](http://stephensugden.com/middleware_guide/)는 Sails 라우터 **이후에** 적용된다는 점을 명심하라. 그렇게 때문에 assets 디렉토리에 [custom route](/#/documentation/concepts/Routes?q=custom-routes)와 경로 출돌이 있을경우, 정적 미들웨어에 요청이 도달하기 전에 custom route가 요청을 가로채게 된다.예를들면, [`config/routes.js`](/#/documentation/reference/sails.config/sails.config.routes.html)에 라우트 정의 없이 `assets/index.html`을 만들면, 홈페이지에서 보이게 된다. 하지만, `'/': 'FooController.bar'`의 커스텀 라우트를 정의하면, 라우트가 우선순위를 갖게 된다.


<docmeta name="uniqueID" value="Assets220313">
<docmeta name="displayName" value="Assets">