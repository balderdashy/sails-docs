# 미들웨어

Sails는 Express / Connect 미들웨어와 완벽하게 호환 가능하다. - 사실, 전부 그렇다! Sails에서 작성할 많은 코드들은 대부분 미들웨어이다; 가장 눈에띄는 대표적인 예가 [컨트롤러 액션](http://beta.sailsjs.org/#/documentation/concepts/Controllers?q=actions)과 [정책](http://beta.sailsjs.org/#/documentation/concepts/Policies)이다.

### HTTP 미들웨어

Sails는 HTTP 요청을 처리하기 위해 [설정가능한 미들웨어 스택](http://beta.sailsjs.org/#/documentation/concepts/Middleware?q=adding-or-overriding-http-middleware)을 활용한다. 어플리케이션이 HTTP 요청을 받을때마다, 설정된 HTTP 미들웨어 스택은 순서대로 처리 해 줄것이다.

> HTTP 미들웨어 스택은 "실제 HTTP 요청에만 사용된다는 점을 유의하자-- **가상 요청**에는 무시된다. (예. live Socket.io 연결에 의한 요청)



#### 기본설치 미들웨어

Sails는 전통적인 HTTP 미들웨어가 내장되어 있다. 물론 이것들을 비활성화, 재정의, 재정렬, 혹은 추가도 가능하다. 그러나 이미 설치된 스택 자체만으로도 대부분의 어플리케이션에 최적화 되어 있다. 아래의 목록은 HTTP 요청을 받을때, 항상 실행하는 Sails의 기본 HTTP 미들웨어 기능 리스트이다. 

 HTTP 미들웨어 키             | 목적
 ------------------------- | ------------
 **startRequestTimer**     | 요청이 시작되었을때 타임스탬프를 메모리에 저장할 변수를 할당한다. 이것은 어플리케이션이 느린 요청에 대한 진단정보를 제공하는데 사용 될 수 있다.
 _cookieParser_ *          | 이후에 쓰여질 미들웨어와 어플리케이션 코드를 위해, 쿠키 헤더를 파싱하여 하나의 객체로 만들어준다.
 _session_ *               | [세션 설정](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.session.html)을 참고하여 유일한 세션 객체를 만들어준다.
 **bodyParser**            | [Skipper](https://github.com/balderdashy/skipper)를 사용하여 HTTP 요청 본문으로 부터 파라메터와 바이너리 업스트림(파일 업로드를 위한 스트리밍)을 파싱해준다.
 **compress**              | gzip/defalte를 이용하여 응답 데이터를 압축한다.
 **methodOverride**        | 가짜 HTTP 메서드 지원을 제공하여, PUT이나 DELETE와같은 HTTP 동사를 지원하지 않는 클라이언트 (예. Internet Explorer의 레거시 버전.)에서 HTTP 동사를 사용 할 수 있게끔 해준다. 요청에 `_method` 파라메터가 `"PUT"`으로 설정되어 있으면, 요청은 적합한 PUT 요청이 온것처럼 인도될 것이다. 자세한 정보가 필요하다면 [Connect's methodOverride docs](http://www.senchalabs.org/connect/methodOverride.html)를 참조하라.
 **poweredBy**             | `X-Powered-By` 헤더를 나가는 응답에 첨부한다.
 **$custom**               | 이전 Sails v0.9.x 옵션 설정 호환성을 제공한다. Sails v0.10에서 부터는 HTTP 미들웨어를 위한 더 유여한 설정법을 제공한다. `sails.config.express.customMiddleware`를 사용하지 않는다면, 리스트에서 제거해도 상관없다.
 _router_ *                | 대부분의 어플리케이션 로직이 주어진 요청에 적용되는 곳이다. 훅을 통한 `"이전"` 실행 핸들러(예. 사이트간 요청 토큰 강제)와 몇몇 Sails 내장 로직 이외에, 어플리케이션의 명시적인 라우트를 사용하여 요청을 중계해준다. 
 _www_ *                   | Connect의 [정적 미들웨어](http://www.senchalabs.org/connect/static.html)를 통해 주로 어플리케이션의 "public" 폴더([`sails.config.paths`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)을 통해 설정가능하고 관례상 [`.tmp/public/`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)로 되어 있다.)안에 있는 이미지, 스타일시트, 스트크립트와 같은 정적인 파일을 제공한다. 
 **favicon**               | 어플리케이션을 위한 [browser favicon](http://en.wikipedia.org/wiki/Favicon)을 `/assets/favicon.ico`을 통해 제공한다.
 _404_ *                   | 어떠한 라우트와 매칭도 되지 않은 요청을 다룬다 - `res.notFound()`를 발생시킨다. <!-- 기술적으로는, 이것은 `router:request:404` 이벤트를 발생 시킨다. -->
 _500_ *                   | 내부 에러를 발생 시킨 요청을 다룬다. (예. Express의 `next(err)` 호출) - `res.serverError()`을 발생 시킨다. <-- 기술적으로는, router:request:500` 이벤트를 발생시킨다. -->
 
###### 범례:

+ `*` - 별표와 함께 있는 미들웨어는 _거의 절대적으로_ 수정하거나 제거 할 필요가 없다. 자세한 지식 없이 그렇게 하지 않길 바란다.


#### 미들웨어의 추가 혹은 재정의 

커스텀 HTTP 미들웨어 기능을 설정하려면, `sails.config.http.middleware.FOO`와 같은 새로운 HTTP key를 정의하고, 거기에 미들웨어 기능을 설정한다, 그리고 `sails.config.http.middleware.order` 배열에 ("FOO")와 같은 문자열 이름을 원하는 미들웨어 체인("cookieParser" 전에 넣는것은 좋은 선택이다.) 안에 넣는다.

예. in `config/http.js`:

```js
  // ...
  middleware: {
    
    // Define a custom HTTP middleware fn with the key `foobar`:
    foobar: function (req,res,next) { /*...*/ next(); },

    // Define another couple of custom HTTP middleware fns with keys `passportInit` and `passportSession`
    // (notice that this time we're using an existing middleware library from npm)
    passportInit    : require('passport').initialize(),
    passportSession : require('passport').session(),

    // Override the conventional cookie parser:
    cookieParser: function (req, res, next) { /*...*/ next(); },


    // Now configure the order/arrangement of our HTTP middleware
    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'passportInit',            // <==== passport HTTP middleware should run after "session"
      'passportSession',         // <==== (see https://github.com/jaredhanson/passport#middleware)
      'bodyParser',
      'compress',
      'foobar',                  // <==== we can put this stuff wherever we want
      'methodOverride',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ]
  },
  
  customMiddleware: function(app){
     //Intended for other middleware that doesn't follow 'app.use(middleware)' convention
     require('other-middleware').initialize(app);
  }
  // ...
```


### Sails에서의 Express 미들웨어

Sails 어플리케이션의 멋진 특성중 하나가, 이미 존재하는 Express/Connect 미들웨어들의 장점을 누릴 수 있다는 점이다. 이것을 실제로 시도할때 가장 많이 떠오르는 질문은 이것이다:

> _"어디에서 `app.use()`를 호출해야하나?"_.

대부분의 경우, 정답은 Express 미들웨어를 [`sails.config.http.middleware`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html)안의 커스텀 HTTP middleweare로 설치 하는 것이다. 이렇게 하면, Sails 어플리케이션의 모든 HTTP 요청이 미들웨어 관련 이벤트를 발생 시키고, 스택에서 다른 HTTP 미들웨어와의 관계를 설정 할 수도 있다.

### Sails에서의 Express 라우팅 미들웨어 

Express 미들웨어를 policy 대용으로 쓸수도 있다- [`config/policies.js`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html)에서 설정 하면 된다. 실질적으로 policy 안에 감싸진 형태로 미들웨어를 설정하거나 (보통은 이게 좋은 방법이다.) policies.js에 바로 적용할 수 있다. 아래의 예제는 용감하게 후자의 방법을 사용한것이다:

```js
{
  '*': true,
  
  ProductController: {
  
    // Prevent end users from doing CRUD operations on products reserved for admins
    // (uses HTTP basic auth)
    '*': require('http-auth')({
      realm: 'admin area'
    }, function customAuthMethod (username, password, onwards) {
      return onwards(username === "Tina" && password === "Bullock");
    }),
    
    // Everyone can view product pages
    show: true
  }
}
```



<!--

  TODO:

### Advanced Express Middleware In Sails

You can actually do this in a few different ways, depending on your needs.



Generally, the following best-practices apply:

If you want a middleware function 
 
+ If you want a piece of middleware to run only when your app's explicit or blueprint routes are matched, you should include it as a policy.
+ this will run passport for all incoming http requests, including images, css, etc.

If you want a middleware function to run for all you should include it at the top of your `config/routes.js` as a wildcard route.  for your controller (both HTTP and virtual) requests
-->





<docmeta name="uniqueID" value="middleware198259">
<docmeta name="displayName" value="Middleware">
