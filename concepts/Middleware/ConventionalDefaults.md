# Valeurs par défaut conventionnelles

Sails est livré avec une suite de middleware HTTP classique, prêt à l'emploi. Vous pouvez, bien sûr, désactiver, remplacer, réorganiser ou ajouter, mais la pile préinstallée est parfaitement acceptable pour la plupart des applications en développement ou en production. Vous trouverez ci-dessous une liste des fonctions middleware HTTP standard qui sont livrées dans Sails, dans l'ordre où elles sont exécutées chaque fois que le serveur reçoit une requête HTTP entrante:

 Clé du Middleware HTTP    | Objectif
 :------------------------ |:------------
 **startRequestTimer**     | Alloue une variable dans la mémoire pour conserver l'horodatage lorsque la requête a commencé. Vous pouvez y accéder et l'utiliser pour fournir des informations de diagnostic sur les requêtes lentes.
 _cookieParser_ *          | Parse l'en-tête du cookie en un objet propre pour l'utiliser dans le middleware suivant et le code de votre application.
 _session_ *               | Crée ou charge un objet session unique (`req.session`) pour l'agent HTTP en fonction de ses cookies et de votre [configuration de session](http://sailsjs.com/documentation/reference/sails.config/sails.config. Session.html).
 **bodyParser**            | Parse les paramètres et les flux binaires ascendants (pour le streaming d'upload des fichiers) à partir du corps de la requête HTTP à l'aide de [Skipper](https://github.com/balderdashy/skipper).
 **compress**              | Compresse les données de la réponse en utilisant gzip/deflate. Voir [`compression`](https://github.com/expressjs/compression) pour plus de détails.
 **methodOverride**        | Fournit un faux support de méthode HTTP, vous permettant d'utiliser des verbes HTTP tels que PUT ou DELETE dans des endroits où le client ne le supporte pas (par exemple, les anciennes versions d'Internet Explorer.) Si une requête a un paramètre `_method` défini sur `"PUT"`, La requête sera routée comme s'il s'agissait d'une requête PUT appropriée. Pour plus d'informations, reportez-vous à la section [methodOverride de Connect] (http://www.senchalabs.org/connect/methodOverride.html) si vous en avez besoin.
 **poweredBy**             | Attache un en-tête `X-Powered-By` aux réponses sortantes.
 **$custom**               | Fournit une retro-compatibilité pour une option de configuration de Sails v0.9.x. Depuis la version v0.10, Sails offre beaucoup plus de flexibilité de configuration pour le middleware HTTP, aussi longtemps que vous n'utilisez pas `sails.config.express.customMiddleware`, vous pouvez supprimer cet élément de la liste en toute confiance.
 _router_ *                | C'est là que la majeure partie de la logique de l'application est appliquée à n'importe quelle requête. En plus d'exécuter des gestionnaires `"before"` (comme par exemple l'exécution de tokens csrf) et un peu de logique interne de Sails, les routes des requêtes sont traitées en utilisant les routes explicites de l'application (dans [`sails.config.routes`](http://sailsjs.com/documentation/reference/sails.config/sails.config.routes.html))) et/ou des routes Blueprint.
 _www_ *                   | Sert des fichiers statiques - généralement des images, des feuilles de style, des scripts - dans le dossier "public" de votre application (configuré dans [`sails.config.paths`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md), conventionnellement [`.tmp/public/`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)) en utilisant le middleware statique de Connect (http://www.senchalabs.org/connect/static.html).
 **favicon**               | Renvoi le [favicon de navigateur](https://fr.wikipedia.org/wiki/Favicon) pour votre application s'il est fourni comme `/assets/favicon.ico`.
 _404_ *                   | Gestion des requêtes qui ne correspondent à aucune route - déclenche `res.notFound ()` <!-- techniquement, cela émet l'événement `router:request:404`) -->
 _500_ *                   | Gère les requêtes qui déclenchent une erreur interne (c'est-à-dire appelle `next(err)` de Express) - déclenche `res.serverError()` <!-- techniquement, cela émet l'événement `router:request:500`) -->

###### Légende:

+ `*` - Le middleware avec un astérisque (*) ne devrait pratiquement jamais être modifié ou supprimé. S'il vous plaît, ne le faites que si vous comprenez vraiment ce que vous faites.


<docmeta name="displayName" value="Valeurs par défaut conventionnelles">
