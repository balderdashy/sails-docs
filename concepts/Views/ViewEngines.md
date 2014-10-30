# View Engines

Sails의 기본 뷰 엔진은 [EJS](https://github.com/visionmedia/ejs)이다.

##### 뷰 엔진 교체하기

다른 뷰 엔진을 사용하기 위해서는, 프로젝트에서 npm을 통해 설치를 해야하며, `sails.config.views.engine`값을([`config/views.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/views.js.html)참고.) 변경해줘야한다.

예를들어, jade를 사용하기 위해서는 `npm install jade --save-dev`을 실행후, `engine: 'jade'`를 [`config/views.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/views.js.html)파일에서 설정해주면 된다.


##### 지원하는 뷰 엔진들 

  - [atpl](https://github.com/soywiz/atpl.js)
  - [dust](https://github.com/akdubya/dustjs) [(website)](http://akdubya.github.com/dustjs/) (.dust)
  - [eco](https://github.com/sstephenson/eco)
  - [ect](https://github.com/baryshev/ect) [(website)](http://ectjs.com/)
  - [ejs](https://github.com/visionmedia/ejs) (.ejs)
  - [haml](https://github.com/visionmedia/haml.js) [(website)](http://haml-lang.com/)
  - [haml-coffee](https://github.com/9elements/haml-coffee) [(website)](http://haml-lang.com/)
  - [handlebars](https://github.com/wycats/handlebars.js/) [(website)](http://handlebarsjs.com/) (.hbs)
  - [hogan](https://github.com/twitter/hogan.js) [(website)](http://twitter.github.com/hogan.js/)
  - [jade](https://github.com/visionmedia/jade) [(website)](http://jade-lang.com/) (.jade)
  - [jazz](https://github.com/shinetech/jazz)
  - [jqtpl](https://github.com/kof/node-jqtpl) [(website)](http://api.jquery.com/category/plugins/templates/)
  - [JUST](https://github.com/baryshev/just)
  - [liquor](https://github.com/chjj/liquor)
  - [lodash](https://github.com/bestiejs/lodash) [(website)](http://lodash.com/)
  - [mustache](https://github.com/janl/mustache.js)
  - [QEJS](https://github.com/jepso/QEJS)
  - [ractive](https://github.com/Rich-Harris/Ractive)
  - [swig](https://github.com/paularmstrong/swig) [(website)](http://paularmstrong.github.com/swig/)
  - [templayed](http://archan937.github.com/templayed.js/)
  - [toffee](https://github.com/malgorithms/toffee)
  - [underscore](https://github.com/documentcloud/underscore) [(website)](http://documentcloud.github.com/underscore/)
  - [walrus](https://github.com/jeremyruppel/walrus) [(website)](http://documentup.com/jeremyruppel/walrus/)
  - [whiskers](https://github.com/gsf/whiskers.js)



##### 새로운 커스텀 뷰 엔진 추가하기 

위에 언급되지 않은 뷰엔진 지원을 추가하기 위한 설명서는, [consolidate project](https://github.com/visionmedia/consolidate.js/blob/master/Readme.md#api)저장소를 체크아웃하길 바란다.

<docmeta name="uniqueID" value="ViewEngines339501">
<docmeta name="displayName" value="View Engines">

