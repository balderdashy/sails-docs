# Contrôleurs

### Vue d'ensemble

Les contrôleurs (le **C** dans **MVC**) sont les principaux objets de votre application Sails chargés de répondre aux *requêtes* d'un navigateur Web, d'une application mobile ou de tout autre système capable de communiquer avec un serveur. Ils agissent souvent comme intermédiaires entre vos [modèles](http://sailsjs.com/documentation/concepts/ORM/Models.html) et [vues](http://sailsjs.com/documentation/concepts/Views). Pour de nombreuses applications, les contrôleurs contiendront la majeure partie de la logique métier de votre projet.

### Actions
Les contrôleurs sont composés d'un ensemble de méthodes appelées **actions** (ou parfois "actions du contrôleur"). Les actions sont liées à des [routes](http://sailsjs.com/documentation/concepts/Routes) dans votre application, de sorte que lorsqu'un client demande la route, l'action est exécutée pour traiter une logique métier et envoyer une réponse. Par exemple, la route `GET /bonjour` dans votre application peut être liée à une action comme:

```javascript
function (req, res) {
  return res.send('Bonjour !');
}
```

Chaque fois qu'un navigateur Web pointe vers l'URL `/bonjour` sur le serveur de votre application, la page affiche le message: Bonjour !

### Où sont définis les contrôleurs?
Les contrôleurs sont définis dans le dossier `api/controllers/`. Vous pouvez placer autant de fichiers que vous voulez dans ce dossier, mais pour qu'ils soient chargés par Sails comme contrôleurs, le nom du fichier doit *finir* par `Controller.js`. Par convention, les contrôleurs Sails sont généralement en [*CamelCase*](https://fr.wikipedia.org/wiki/CamelCase), de sorte que chaque mot du nom de fichier (y compris le premier mot) est en majuscule: par exemple, `UtilisateurController.js`, `MonController.js` et `MonGrosChatController.js` sont tous des noms *CamelCase* valides.

> Vous pouvez organiser vos contrôleurs en groupes en les enregistrant dans des sous-dossiers de `api/controllers`, mais notez que le nom du sous-dossier *deviendra une partie de l'identité du contrôleur* lorsqu'il est utilisé pour le routage (voir la section "Routage" ci-dessous).

### À quoi ressemble un contrôleur?
Un fichier de contrôleur définit un dictionnaire Javascript (aka «objet simple») dont les clés sont des noms d'action et dont les valeurs sont les méthodes d'action correspondantes. Voici un simple exemple d'un fichier de contrôleur complet:

```javascript
module.exports = {
  salut: function (req, res) {
    return res.send('Salut :) !');
  },
  auRevoir: function (req, res) {
    return res.redirect('http://www.aurevoir.com');
  }
};
```

Ce contrôleur définit deux actions: `salut` et `auRevoir`. L'action `salut` répond à une demande avec un message, tandis que l'action `auRevoir` réagit en redirigeant vers un autre site Web. Les objets `req` et` res` seront familiers à quiconque a utilisé [Express.js](https://github.com/expressjs) pour développer une application web. C'est par conception, car Sails utilise Express sous le capot pour gérer le routage. Notez toutefois le manque d'argument `next` pour les actions. Contrairement aux méthodes middleware Express, les actions du contrôleur Sails doivent toujours être le dernier arrêt de la chaîne de requêtes, c'est-à-dire qu'elles doivent toujours générer une réponse ou une erreur. Bien qu'il soit techniquement possible d'utiliser `next` dans une méthode d'action, vous êtes fortement encouragé à utiliser [les politiques](http://sailsjs.com/documentation/concepts/Policies).

### Contrôleurs "minces"

La plupart des frameworks MVC recommandent l'écriture de contrôleurs "minces", et tandis que Sails ne fait pas exception (c'est une bonne idée de garder vos contrôleurs Sails aussi simple que possible), il est également utile de comprendre pourquoi?

Le code du contrôleur est intrinsèquement dépendant d'une sorte de déclencheur ou d'événement. Dans un environnement de backend comme Sails, cet événement est toujours une requête entrante. Donc, si vous écrivez un tas de code dans l'une de vos actions de contrôleur, il n'est pas rare que la portée de ce code dépende du contexte de la requête (les objets `req` et` res`). Ce qui est très bien ... jusqu'à ce que vous souhaitez utiliser ce code à partir d'une action légèrement différente, ou à partir de la ligne de commande.

Ainsi, le but de la philosophie du «contrôleur mince» est d'encourager le découplage du code réutilisable de tout enchevêtrement connexe. Dans Sails, vous pouvez obtenir ceci dans un certain nombre de manières différentes, mais les stratégies les plus communes pour extrapoler le code des contrôleurs sont:

+ Écrire une fonction d'assistance ou une machine et l'exposer comme un [service](http://sailsjs.com/documentation/concepts/services). Il s'agit d'une bonne stratégie pour encapsuler le code qui exécute une tâche particulière spécifique à l'application.
+ Écrire une méthode de modèle personnalisée pour encapsuler un code qui exécute une tâche particulière liée à un modèle particulier.
+ Si vous trouvez un code qui est utile à travers plusieurs applications différentes (et vous avez le temps de le faire), vous devez l'extraire dans un module node. Ensuite, vous pouvez le partager à travers votre organisation, l'utiliser dans des projets futurs, ou mieux encore, [publiez-le sur npm] (https://docs.npmjs.com/getting-started/publishing-npm-packages) sous une license open-source pour que les autres développeurs l'utilisent et vous aide à le maintenir.



<docmeta name="displayName" value="Controllers">
