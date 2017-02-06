# Routage vers les contrôleurs

Par défaut, Sails créera une route d'action [Blueprint] (http://sailsjs.com/documentation/reference/blueprint-api) pour chaque action d'un contrôleur, de sorte qu'une requête `GET` à `/:MonControlleur/:monAction` déclenchera l'action. Si l'exemple de contrôleur de la section précédente était enregistré comme `api/controllers/MessageController.js`, les routes `/message/salut` et `/message/aurevoir` seraient mises à disposition par défaut chaque fois que l'application était démarrée. Si le contrôleur a été enregistré sous le sous-dossier `/mon`, alors les itinéraires seraient `/mon/message/salut` et `/mon/message/aurevoir`. Pour plus d'informations sur Sails & les routes Blueprint, reportez-vous à [la documentation de l'API Blueprint](http://sailsjs.com/documentation/reference/blueprint-api).

Apart le routage par défaut, Sails vous permet de lier manuellement les routes aux actions du contrôleur à l'aide du fichier [`config/routes.js`](http://sailsjs.com/documentation/concepts/Routes). Voici quelques exemples d'utilisation de routes explicites:

+ Lorsque vous souhaitez utiliser des actions distinctes pour gérer le même chemin de route, basé sur la méthode [HTTP](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) (aka verbe). Les **actions Blueprint** mentionnés ci-dessus lient *toutes* les méthodes HTTP d'un chemin d'accès à une action donnée, y compris `GET`,` POST`, `PUT`,` DELETE`, etc.
+ Lorsque vous voulez qu'une action soit disponible sur une URL personnalisée (par exemple, `PUT /login`, `POST /inscription` ou une 'URL de vanité' comme `GET /:identifiant`).
+ Lorsque vous souhaitez configurer des options supplémentaires pour la manière dont la route doit être gérée (par exemple, une configuration CORS spéciale).

Pour lier manuellement une route à une action du contrôleur dans le fichier `config/routes.js`, vous pouvez utiliser le verbe HTTP et le chemin d'accès (c-à-d. **L'adresse de route**) comme clé et le nom du contrôleur + `.` + le nom d'action en tant que valeur (c'est-à-dire la **cible de la route**).

Par exemple, la route manuelle suivant entraînera votre application à déclencher l'action `faire()` dans `api/controllers/SandwichController.js` chaque fois qu'elle reçoit une requête POST à `/faire/un/sandwich`:

```js
  'POST /faire/un/sandwich': 'SandwichController.faire'
```


> ** Note: **
>
> Pour les contrôleurs enregistrés dans des sous-dossiers, le sous-dossier fait partie de l'identité du contrôleur:
>
> ```js
> '/faire/mes/devoirs': 'ecole/math/ExericeController.faire'
> ```
>
> Cela provoquera l'action `faire()` dans `api/controllers/ecole/math/ExericeController.js` pour être déclenchée chaque fois que `/faire/mes/devoirs` est demandé.

Une discussion complète sur le routage manuel est hors de la portée de ce document-- veuillez consulter la [documentation sur le routage](http://sailsjs.com/documentation/concepts/Routes) pour un aperçu complet sur les options disponibles.


<docmeta name="displayName" value="Routage vers les contrôleurs">
