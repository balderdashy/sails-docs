# View Engines

A view engine padrão no Sails é [EJS](https://github.com/visionmedia/ejs).

##### Trocando a view engine

Para usar uma view engine diferente, você deve usar npm para instalar a mesma no seu projeto, então você deve setar `sails.config.views.engine` (no [`config/views.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/views.js.html)).

Por exemplo, para trocar por jade, rode `npm install jade --save-dev`, depois sete `engine: 'jade'` no [`config/views.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/views.js.html).


##### View Engines Suportadas

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



##### Adicionando novas view engines personalizadas

Para instrução para adicionar suporte a uma view engine não listada acima, leia mais sobre o projeto [consolidate](https://github.com/visionmedia/consolidate.js/blob/master/Readme.md#api).

<docmeta name="uniqueID" value="ViewEngines339501">
<docmeta name="displayName" value="View Engines">

