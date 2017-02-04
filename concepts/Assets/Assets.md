# Assets

### Vue d'ensemble

Les assets se rapportent aux [fichiers statiques](https://fr.wikipedia.org/wiki/Page_web_statique) (js, css, images, etc) sur votre serveur que vous souhaitez rendre accessible au monde. Dans Sails, ces fichiers sont placés dans le dossier [`assets/`](http://sailsjs.com/documentation/anatomy/assets). Lorsque vous démarrez votre application, ajoutez des fichiers dans votre dossier `assets/` ou modifiez des assets existants, le pipeline d'assets intégré de Sails traite et synchronise ces fichiers dans un dossier caché (`.tmp/public/`).

> Cette étape intermédiaire (déplacement des fichiers de `assets/` vers `.tmp/public/`) permet à Sails de prétraiter des assets pour les utiliser côté client - deschoses comme LESS, CoffeeScript, SASS, spritesheets, templates Jade, etc.

Le contenu de ce dossier `.tmp/public` est ce que Sails renvoie réellement au moment de l'exécution. C'est à peu près équivalent au dossier «public» dans [express] (https://github.com/expressjs) ou au dossier `www/` que vous connaissez peut-être d'autres serveurs Web comme Apache.

### Middleware statique

Dans les coulisses, Sails utilise le [middleware statique](http://www.senchalabs.org/connect/static.html) d'Express pour livrer vos assets. Vous pouvez configurer ce middleware (par exemple, les paramètres de cache) dans [`/config/http.js`](http://sailsjs.com/documentation/reference/sails.config/sails.config.http.html).

##### `index.html`
Comme la plupart des serveurs Web, Sails respecte la convention `index.html`. Par exemple, si vous créez `assets/foo.html` dans un nouveau projet Sails, il sera accessible à l'adresse `http://localhost:1337/foo.html`. Mais si vous créez `assets/foo /index.html`, il sera disponible à la fois à `http://localhost:1337/foo/index.html` et `http://localhost:1337/foo`.

##### Ordre d'exécution
Il est important de noter que le  [middleware](http://stephensugden.com/middleware_guide/) statique s'éxecute **après** le routeur Sails. Donc, si vous définissez une [nouvelle route](http://sailsjs.com/documentation/concepts/Routes?q=custom-routes), et un fichier dans votre répertoire d'assets avec le même un chemin, la route interceptera la requête avant qu'elle n'atteigne le middleware statique. Par exemple, si vous créez `assets/index.html`, et qu'aucune route n'est définie dans votre [`config/routes.js`](http://sailsjs.com/documentation/reference/sails.config/sails.config.routes.html), alors il va renvoyer la page d'accueil. Mais si vous définissez une route, `'/': 'FooController.bar'`, cette route aura la priorité.



<docmeta name="displayName" value="Assets">
