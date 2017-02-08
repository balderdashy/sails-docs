# Middleware

Sails est totalement compatible avec le middleware Express/Connect - Une grande partie du code que vous écrirez dans Sails est effectivement un middleware; Notamment [les actions du contrôleur](http://sailsjs.com/documentation/concepts/Controllers?q=actions) et [les politiques](http://sailsjs.com/documentation/concepts/Policies).


### Middleware HTTP

Sails utilise également une autre [pile de middleware configurable](http://sailsjs.com/documentation/concepts/Middleware#adding-or-overriding-http-middleware) uniquement pour la gestion des requêtes HTTP. Chaque fois que votre application reçoit une requête HTTP, une pile de middleware HTTP configurée s'exécute dans l'ordre.

Lisez à propos de la pile de middleware par défaut [ici](http://sailsjs.com/documentation/concepts/middleware/conventional-defaults).

> Notez que cette pile middleware HTTP n'est utilisée que pour les "vrais" requêtes HTTP - elle est ignorée pour **les requêtes virtuelles** (par exemple, les requêtes provenant d'une connexion Socket.io en direct).



#### Ajout ou surcharge du middleware HTTP

Pour configurer une fonction middleware HTTP personnalisée, définissez une nouvelle clé HTTP `sails.config.http.middleware.foobar` ayant pour valeur la fonction middleware configurée, puis ajoutez le nom de la chaîne ("foobar") à votre `sails.config.http.middleware.order` où vous voulez qu'elle soit exécutée dans la chaîne middleware (un bon endroit pour le mettre peut-être juste avant "cookieParser"):

Exemple dans `config/http.js`:

```js
  // ...
  middleware: {

    // Définir une fonction middleware HTTP personnalisé ayant pour clé `foobar`:
    foobar: function (req,res,next) { /*...*/ next(); },

    // Définir un autre couple de fonctions middleware HTTP personnalisées 
    // avec les clés `passportInit` et` passportSession`
    // (Notez que cette fois nous utilisons une bibliothèque middleware existante à partir de npm)
    passportInit    : require('passport').initialize(),
    passportSession : require('passport').session(),

    // Remplacez l'analyseur de cookie classique:
    cookieParser: function (req, res, next) { /*...*/ next(); },


    // Configurez maintenant l'ordre/l'agencement de notre middleware HTTP
    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'passportInit',            // <==== Le middleware HTTP Passeport doit s'exécuter après "session"
      'passportSession',         // <==== (voir https://github.com/jaredhanson/passport#middleware)
      'bodyParser',
      'compress',
      'foobar',                  // <==== On peut mettre ça où nous voulons
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
     // Destiné à un autre middleware qui ne suit pas la convention 'app.use (middleware)'
     require('other-middleware').initialize(app);
  }
  // ...
```

### Le middleware Express dans Sails

L'une des choses vraiment sympa dans les applications Sails est qu'on profite de la richesse des middlewares Express/Connect déjà existants. Mais une question courante qui se pose lorsque les gens tentent réellement de faire ceci est:

> _"Où dois-je mettre `app.use()` ?"_.

Dans la plupart des cas, la solution consiste à installer le middleware Express sous la forme d'un middleware HTTP personnalisé dans [`sails.config.http.middleware`](http://sailsjs.com/documentation/reference/sails.config/sails.config.http.html). Cela le déclenchera pour TOUTES les requêtes HTTP à votre application Sails et vous permettra de configurer l'ordre dans lequel il s'exécute par rapport à d'autres middlewares HTTP.

> Vous ne devez jamais surcharger ou supprimer le middleware HTTP du routeur. Il est intégré à Sails, et sans cela, les routes explicites de votre application et les routes Blueprint ne fonctionneront plus.

### Le middleware de routing d'Express dans Sails

Vous pouvez également inclure le middleware Express sous forme de politique, il suffit de le configurer dans [`config/policies.js`](http://sailsjs.com/documentation/reference/sails.config/sails.config.policies.html). Vous pouvez soit inclure le middleware dans une politique (c'est généralement une bonne idée) ou simplement l'inclure directement dans votre fichier policies.js. L'exemple suivant utilise la deuxiéme approche pour sa brièveté:

```js
var auth = require('http-auth');
var basic = auth.basic({
  realm: 'zone admin'
}, function (identifiant, pass, onwards) {
  return onwards(identifiant === 'Tina' && pass === 'Bullock');
});

//...
module.exports.policies = {
  '*': true,

  ProduitController: {

    // Empêcher les utilisateurs finaux de faire des opérations CRUD sur des produits réservés aux administrateurs
    // (utilise une authentification HTTP basique)
    '*': auth.connect(basic),

    // Tout le monde peut afficher les pages de produits
    show: true
  }
}
```



<!--

  A FAIRE:

### Middleware Express avancée dans les Sails

Vous pouvez réellement faire ceci dans quelques manières différentes, selon vos besoins.

En général, les meilleures pratiques suivantes s'appliquent:

Si vous voulez une fonction de middleware

+ Si vous voulez qu'une partie du middleware s'exécute uniquement lorsque les routes explicites ou Blueprint de votre application correspondent, vous devez l'inclure comme politique.
+ Ceci exécutera passeport pour toutes les requêtes HTTP entrantes, y compris les images, css, etc.

Si vous voulez qu'une fonction middleware soit exécutée pour tous, vous devez l'inclure en haut de votre `config/routes.js` comme une route générique. Pour vos requêtes de contrôleur (HTTP et virtuel)
-->






<docmeta name="displayName" value="Middleware">
