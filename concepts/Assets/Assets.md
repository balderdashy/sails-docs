# Assets

### Visão geral

Assets é uma referência a [arquivos estáticos](http://en.wikipedia.org/wiki/Static_web_page) (js, css, images, etc) no seu servidor que você deseja deixar acessível externamente. No Sails, esses arquivos ficam no diretório [`assets/`](http://sailsjs.org/documentation/anatomy/myApp/assets), onde eles são processados e sincronizados para um diretório escondido e temporário (`.tmp/public/`) quando a aplicação é iniciada. O conteúdo dessa pasta `.tmp/public` que o Sails realmente provê - é equiparado a pasta "public" no [express](https://github.com/expressjs), ou a pasta "www" a qual você já deve conhecer de outros web servers como Apache por exemplo. Esse "meio de campo" permite ao Sails preparar/pré-compilar os assets para uso no client - como por exemplo LESS, CoffeeScript, SASS, spritesheets, Jade templates, etc...

### Static middleware

Por baixo dos panos, Sails usa um [static middleware](http://www.senchalabs.org/connect/static.html) do Express para prover seus assets. Você pode configurar este middleware (ex: configurações de cache) no arquivo [`/config/http.js`](http://sailsjs.org/documentation/reference/sails.config/sails.config.http.html).

##### `index.html`
Como a maioria dos web servers, Sails honra a conveção da `index.html`. Por exemplo, se você criar `assets/foo.html` em um novo projeto Sails, este será acessível via `http://localhost:1337/foo.html`. Mas se você criar `assets/foo/index.html`, este estará disponível em ambos `http://localhost:1337/foo/index.html` e `http://localhost:1337/foo`.

##### Procedência
É importante notar que o static [middleware](http://stephensugden.com/middleware_guide/) é instalado **depois** do roteador do Sails.  Então se você definir uma [rota customizada](http://sailsjs.org/documentation/concepts/Routes?q=custom-routes), e também tiver um arquivo no seu diretório "assets" conflitanto o caminho (mesmo path), a rota customizada vai interceptar a requisição antes de alcançar o static middleware. Por exemplo, se você criar `assets/index.html`, sem rotas definidas no seu arquivo [`config/routes.js`](http://sailsjs.org/documentation/reference/sails.config/sails.config.routes.html), ela servirá como sua home page. Mas se você definir uma rota customizada, `'/': 'FooController.bar'`, esta rota que prevalecerá.

<docmeta name="displayName" value="Assets">
