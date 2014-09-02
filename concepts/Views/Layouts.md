# 레이아웃

어플리케이션을 제작할때 많은 다른 페이지들이 존재한다, 여러 HTML에 들어갈 것이라고 예상되는 마크업들은 레이아웃으로 만들면 도움이된다. 이렇게 하게되면, 프로젝트 [코드의 총량을 줄일](http://en.wikipedia.org/wiki/Don't_repeat_yourself) 수 있으며, 같은 내용이담긴 여러개 파일을 만드는것을 막을 수 있게된다,

Sails와 Express에서는, 레이아웃은 뷰엔진 그 자체에서 구현이 된다. 예를들면, `jade`는 그들만의 문법으로, 자신만의 레이아웃 시스템을 가지고 있다.

편의성을 위해, ** EJS라는 기본 뷰 엔진**을 사용할 경우 레이아웃을 지원 하게 된다. 만약 다른 뷰 엔진으로 레이아웃을 사용하고 싶다면, [뷰 엔진 문서](./#!documentation/reference/Views/ViewEngines.html)에서 적합한 문법을 찾아봐라.

### 레이아웃 제작

Sails 레이아웃은 다른 뷰와 조합 할 수 있게 `views/`폴더안에 `.ejs`라는 특별한 파일로 존재한다. 레이아웃은 주로 전문과 (e.g. `!DOCTYPE html<html><head>....</head><body>`) 후문 (`</body></html`)을 포함한다. 그리고 원래의 뷰 파일은 `<%- body %>`를 통해 삽입이 된다. 레이아웃은 뷰 없이는 절대 사용되지 않으며, 이것은 마치 센드위치 빵과 비슷한 방식으로 제공된다.

레이아웃은 [`config/views.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/views.js.html)에서 설정하거나 혹은 비활성화 할 수 있으며, [local](./#!documentation/reference/Views/Locals.html)을 통해 특별한 route나 액션을 재정의 할 수 있다. 기본적으로, Sails는 `views/layout.ejs`에 위치한 레이아웃을 통해 모든 뷰를 컴파일 한다.

### 주의

> #### 왜 EJS에서만 레이아웃이 동작하나?
> Express 3에서, layout과 partials의 기본지원이 중단되었다. 대신, 개발자에게 이러한 기능을 뷰엔진에 의존하도록 하였다. (더 자세한 내용은 https://github.com/balderdashy/sails/issues/494 참고.)
> 
> Sails에 Express 3을 적용함에따라, 기존의 Express 2.x와 Sails 0.8.x 어플리케이션과의 호환성을 위해 `레이아웃` 기능을 제공하기로 결정했고, 다른 MVC 프레임워크 커뮤니티에서 온 사람들의 친숙함을 고려하였다. 그 결과 기본 뷰엔진인 ejs에 테스트된게 현재의 레이아웃이다.
>
> 만약 레이아웃 기능이 마음에 들지 않거나, (현재) ejs보다는 다른 서버사이드 뷰 엔진을 사용하고 싶으면 [`sails.config.views`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.views.html)에서 `layout:false`를 설정하면된다. 그리고는 자신의 뷰엔진에 맞는 커스텀 레이아웃/partial을 사용해라.




<docmeta name="uniqueID" value="Layouts870655">
<docmeta name="displayName" value="Layouts">

