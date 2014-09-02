# Views
### 개요

In Sails, views are markup templates that are compiled _on the server_ into HTML pages.  In most cases, views are used as the response to an incoming HTTP request, e.g. to serve your home page.
Sails에서 뷰는 _서버에서_ HTML 페이지로 컴파일되는 마크업 템플릿이다. 대부분의 경우 뷰는, 들어오는 요청에따라 응답을 만드는데 사용된다. 예를들면 당신의 홈페이지를 제공하는것 처럼 말이다.

위의 활용방법 외에도, 백앤드 코드에서 뷰를 바로 HTML 문자열로 컴파일 할 수도 있다. ([`sails.renderView()`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)참고.) 예를들면, 이러한 접근을 HTML 이메일을 보내는데 사용하거나, 레가시 API와 함께 사용하기 위한 큰 XML 문자열을 만드는 데에도 사용 할 수 있다. 

##### 뷰 만들기

기본적으로, Sails은 EJS ([Embedded Javascript](http://embeddedjs.com/))라는 뷰 엔진을 사용하게 설정 되어 있다. EJS의 문법은 매우 편리하다- php, asp, erb, gsp, jsp, 기타등등을 사용해본 적이 있다면 바로 익숙해질 수 있을것이다.

만약 다른 뷰엔진을 사용하고 싶다면, 여러가지 선택이 있을 수 있다. Sails는 [Consolidate](https://github.com/visionmedia/consolidate.js/)를 통해 [Express](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)와 호환되는 모든 종류의 뷰 엔진을 지원한다.

뷰는 기본으로 어플리케이션의 [`views/`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/views)폴더에 정의 된다. 하지만 Sails의 모든 기본 경로와 마찬가지로, [설정가능](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)하다. 모바일 어플리케이션 API를 만드는것과 같이 페이지에 동적인 HTML을 제공하지 않는다면, 어플리케이션에서 저 디렉토리를 제거해도 상관없다.

##### 뷰 컴파일

`res` 객체를 접근할수 있는곳(컨트롤러 액션, 커스텀 응답, 혹은 정책과 같은)에서, [`res.view`](http://beta.sailsjs.org/#/documentation/reference/res/res.view.html)를 뷰 컴파일 하는데 사용 할 수 있다. 그결과 사용자에게 HTML결과 값이 전송될것이다.

`routes.js`파일에서 직접적으로 뷰를 건드릴 수 있다. `views/` 디렉토리로부터 상대적인 경로를 지정해주면 된다. 예를들면:

```javascript
{
  'get /': {
    view: 'homepage'
  },
  'get /signup': {
    view: 'signupFlow/basicInfo'
  },
  'get /signup/password': {
    view: 'signupFlow/chooseAPassword'
  },
  // and so on.
}
```

##### 단일 페이지 어플리케이션에 대해

브라우저를 위한 웹 어플리케이션을 제장하고 있다면, 어플리케이션 네비게이션의 부분 (혹은 전체)은 클라이언트에서 일어나게 된다; 예를들면, 사용자가 네비게이션을 눌렀을때마다 브라우저가 새로운 결과값을 갱신해주는 대신, 클라이언트쪽 코드는 서버에 다시 요청할 필요 없이 브라우저에 렌더링 할 수 있는 마크업 템플릿을 미리 불러오게 된다.

아래의 경우, 단일 페이지 어플리케이션을 제작하기 위한 여러가지 선택이 있을 수 있다:

+ 하나의 뷰를 사용할것, 예 `views/publicSite.ejs`. 장점:
  + Sails에서 클라이언트로 렌더링될 HTML안에 서버의 데이터를 직접적으로 내보낸다. 클라이언트로부터 AJAX나 웹소켓 요청을 보낼 필요없이 클라이언트 사이드의 자바스크립트에게 사용자 데이터를 넘겨주는 쉬운 방법이다.
+ assets 폴더안에서 단일 HTML 페이지를 사용하는 방법 , 예. `assets/index.html`. 장점:
  + 비록 서버에 있는 데이터를 클라이언트로 보내지는 못하지만, 이러한 접근은 어플리케이션의 클라이언트와 서버 영역의 좀 더 완벽한 분리를 가능케한다.
  + assets 폴더에 있는 모든 파일은 정적 CDN (Cloudfront나 CloudFlare와 같은)으로 옮길 수 있으며, 이렇게 함으로써, 지리적으로 사용자와 컨텐츠를 받을 데이터 센터가 분산이 되는 장점을 가지고 있다.


<docmeta name="uniqueID" value="Views426660">
<docmeta name="displayName" value="Views">

