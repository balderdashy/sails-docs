# Les routes Blueprint

Lorsque vous lancez `sails lift` avec des Blueprints activés, le framework inspecte vos contrôleurs, modèles et configuration afin de [lier automatiquement certaines routes](http://sailsjs.com/documentation/concepts/Routes). Ces routes implicites (parfois appelés «routes d'ombre» ou même «ombres») permettent à votre application de répondre à certaines requêtes sans que vous ayez à les déclarer manuellement dans votre fichier `config/routes.js`. Par défaut, les routes Blueprint indiquent leur action *correspondante* (voir "Actions Blueprint" ci-dessous), qui peut être remplacée par un code personnalisé.

Il existe trois types de routes Blueprint dans Sails:

+ **Les routes RESTful**, où le chemin est toujours `/:nomDuModele` ou` /:nomDuModele/:id`. Ces routes utilisent le "verbe" HTTP pour déterminer l'action à prendre; Par exemple une requête `POST` à`/utilisateur` créera un nouvel utilisateur, et une requête `DELETE` à `/utilisateur/123` supprimera l'utilisateur dont la clé primaire est 123. Dans un environnement de production, les routes RESTful devraient généralement être protégé par [une politique](http://sailsjs.com/documentation/concepts/Policies) afin d'éviter tout accès non autorisé.
+ **Les routes de racourci**, où l'action à prendre est encodée dans le chemin de l'URL. Par exemple, le raccourci `/utilisateur/create?name=Bruno` crée un nouvel utilisateur, alors que `/utilisateur/update/1?name=Bruno` met à jour l'utilisateur dont l'identifiant est #1. Ces routes répondent uniquement aux requêtes `GET`. Les routes de raccourci sont très pratiques pour le développement, mais devraient généralement être désactivés dans un environnement de production.
+ **Les routes d'action**, qui créent automatiquement des routes pour vos actions de votre contrôleur. Par exemple, si vous avez un fichier `FooController.js` avec une méthode `bar`, alors une route `/foo/bar` sera automatiquement créée pour vous aussi longtemps que les routes d'action Blueprint sont activées. Contrairement aux routes RESTful et aux raccourcis, les routes d'action *n'exigent pas* que le contrôleur dispose d'un modèle correspondant.

Reportez-vous à [la sous-section Blueprint de la référence de configuration](http://sailsjs.com/documentation/reference/sails.config/sails.config.blueprints.html) pour connaître les options de configuration Blueprint, y compris comment activer/désactiver les différents types de routes.

<docmeta name="displayName" value="Blueprint Routes">
