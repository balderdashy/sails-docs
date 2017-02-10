# Modèles

Un modèle représente une collection de données structurées, généralement correspondant à une seule table ou collection dans une base de données. Les modèles sont généralement définis en créant un fichier dans le dossier `api/models/` d'une application.

```javascript
// Perroquet.js
// L'ensemble des perroquets inscrits dans notre application.
module.exports = {
  attributes: {
    // e.g., "Polly"
    nom: {
      type: 'string'
    },

    // e.g., 3.26
    porteeAile: {
      type: 'float',
      required: true
    },

    // e.g., "cm"
    porteeAileUnite: {
      type: 'string',
      enum: ['cm', 'in', 'm', 'mm'],
      defaultsTo: 'cm'
    },

    // e.g., [{...}, {...}, ...]
    DialectesConnus: {
      collection: 'Dialect'
    }
  }
}
```

<!--

// api/models/Produit.js
module.exports = {
  attributes: {
    nom: { type: 'string' },
    prix: { type: 'string' },
    pourcentageDeViande: { type: 'float' },
    nombreDeCalories: { type: 'integer' }
  }
}
-->


### Utilisation des modèles


Les modèles peuvent être consultés à partir de nos contrôleurs, politiques, services, réponses, tests et dans les méthodes de modèle personnalisé. Il existe de nombreuses méthodes intégrées disponibles sur les modèles, dont les plus importantes sont les méthodes de requête: [find](http://sailsjs.com/documentation/reference/waterline/models/find.html), [create]( Http://sailsjs.com/documentation/reference/waterline/models/create.html), [update](http://sailsjs.com/documentation/reference/waterline/models/update.html), et [destroy](Http://sailsjs.com/documentation/reference/waterline/models/destroy.html). Ces méthodes sont [asynchrones](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) - En arriére plan, Waterline doit envoyer une requête à la base de données et attend une réponse.


Par conséquent, les méthodes de requête renvoient un objet de requête différé. Pour exécuter effectivement une requête, `.exec(cb)` doit être appelée sur cet objet différé, où `cb` est une fonction callback à exécuter après que la requête soit terminée.

Waterline comprend également un soutien facultatif aux promesses (promises). Au lieu d'appeler `.exec()` sur un objet de requête, nous pouvons appeler `.then()`, `.spread()` ou `.catch()`, qui renverra une [promesse Bluebird](https://github.com/petkaantonov/bluebird).




### Méthodes de modèle (alias méthodes "statiques" ou "classes")

Les méthodes de classe de modèle sont des fonctions intégrées dans le modèle lui-même qui effectuent une tâche particulière sur ses instances (enregistrements). C'est là que vous trouverez les méthodes familières de CRUD pour effectuer des opérations de base de données comme `.create()`, `.update()`, `.destroy()`, `.find()`, etc.


###### Méthodes personnalisées de modèle

Waterline vous permet de définir des méthodes personnalisées sur vos modèles. Cette fonctionnalité profite du fait que les modèles Waterline ignorent les clés non reconnues, vous devez donc être prudent en cas de surcharge involontaire des méthodes intégrées et des moteurs de recherche dynamiques (ne définissez pas de méthodes nommées `create`, etc.). Les méthodes personnalisées de modèle sont utiles pour extrapoler un code de contrôleur qui se rapporte à un modèle particulier; C'est-à-dire que vous pouvez extraire le code de vos contrôleurs vers des fonctions réutilisables qui peuvent être appelées de n'importe où (c'est-à-dire ne dépendent pas de `req` ou` res`.)

Les méthodes des modèles sont généralement des fonctions asynchrones. Par convention, les méthodes de modèle asynchrone devraient être des fonctions à deux arguments, qui acceptent un objet d'entrées comme leur premier argument (généralement appelé `opts` ou` options`) et un callback Node comme deuxième argument. Sinon, vous pouvez choisir de retourner une promesse (les deux stratégies fonctionnent très bien, c'est une question de préférence. Si vous n'avez pas de préférence, limitez-vous aux callbacks de Node).

Une bonne pratique consiste à écrire votre méthode de modèle statique de sorte qu'il peut accepter soit un enregistrement soit sa valeur de clé primaire. Pour les méthodes de modèle qui fonctionnent sur/depuis _plusieurs_ enregistrements à la fois, vous devez autoriser un tableau d'enregistrements ou un tableau de valeurs de clé primaire à passer. Cela prend plus de temps pour écrire, mais rend votre méthode beaucoup plus puissante. Et puisque vous faites cela pour extrapoler la logique couramment utilisée, ça vaut généralement l'effort supplémentaire.

Par exemple:

```js
// in api/models/Singe.js...

// Trouver les singes portant le même nom qu'une personne
chercherMemeNomPersonne: function (opts, cb) {

  var personne = opts.personne;

  // Avant de faire quoi que ce soit d'autre, vérifiez si une valeur de clé primaire
  // a été passé au lieu d'un enregistrement, et si oui, recherche qui
  // personne dont nous parlons :
  (function _chercherPersonneSiNecessaire(apresRechercher){
    if (typeof personne === 'object')) return apresRechercher(null, personne);
    Personne.findOne(personne).exec(apresRechercher);
  })(function (err, personne){
    if (err) return cb(err);
    if (!personne) {
      err = new Error();
      err.message = require('util').format('Impossible de trouver des singes portant le même nom que la personne w/ id=%s parce que cette personne n\'existe pas.', personne);
      err.status = 404;
      return cb(err);
    }

    Singe.findByName(personne.name)
    .exec(function (err, singes){
      if (err) return cb(err);
      cb(null, singes);
    })
  });

}
```

Ensuite, vous pouvez faire:

```js
Singe.chercherMemeNomPersonne(daniel, function (err, singes) { ... });
// -or-
Singe.chercherMemeNomPersonne(37, function (err, singes) { ... });
```

> Pour en savoir plus, lisez l'incident concernant [Timothy le singe] ().

Un autre exemple:

```javascript
// api/models/Utilisateur.js
module.exports = {

  attributes: {

    nom: {
      type: 'string'
    },
    inscritDans: {
      collection: 'Cours', via: 'etudiants'
    }
  },

  /**
   * Inscrit un utilisteur dans un ou plusieurs cours
   * @param  {Object}   options
   *            => cours {Array} Liste d'identifiant des cours
   *            => id {Integer} identifiant de l'utilisateur
   * @param  {Function} cb
   */
  inscrire: function (options, cb) {

    Utilisateur.findOne(options.id).exec(function (err, utilisateur) {
      if (err) return cb(err);
      if (!utilisateur) return cb(new Error('Utilisateur inexistant.'));
      utilisateur.inscritDans.add(options.cours);
      utilisateur.save(cb);
    });
  }
};
```


#### Recherche dynamique

Il s'agit de méthodes statiques spéciales générées dynamiquement par Sails lorsque vous lancez votre application. Par exemple, si votre modèle Personne a un "prenom", vous pouvez exécuter:

```js
Personne.findByFirstName('emma').exec(function(err, personnes){ ... });
```


#### Méthodes Pubsub des ressouces

Un type spécial de méthodes de modèle qui sont attachés par le hook pubsub. Plus sur cela dans la [section de la documentation sur le pubsub](http://sailsjs.com/documentation/reference/websockets/resourceful-pubsub).


<!--
Un autre type spécial de méthode de classe. Il signifie "Publier, S'abonner" et c'est juste ce qu'ils font. Ces méthodes jouent un rôle important dans la façon dont Sails intègre et utilise Socket.IO. Ils servent à souscrire des clients et à publier des messages sur la création, la mise à jour et la destruction de modèles. Si vous voulez construire des fonctionnalités en temps réel dans Sails, ce sera pratique.
-->

#### Méthodes d'attribut (méthodes d'enregistrement/instance)

Les méthodes d'attributs sont des fonctions disponibles sur les enregistrements (c'est-à-dire les instances de modèle) renvoyées par les requêtes Waterline. Par exemple, si vous cherchez les dix étudiants avec l'IQ le plus élevé du modèle `Etudiant`, chacun de ces enregistrements d'étudiant aura accès à toutes les méthodes d'attributs intégrées, ainsi qu'à toutes les méthodes d'attributs personnalisés définies sur le modèle `Etudiant`.

###### Méthodes d'attribut intégrées
Chaque modèle Waterline inclut automatiquement certaines méthodes d'attribut, notamment:

+ [`.toJSON()`](http://sailsjs.com/documentation/reference/waterline/records/toJSON.html)
+ [`.save()`](http://sailsjs.com/documentation/reference/waterline/records/save.html)
+ [`.destroy()`](http://sailsjs.com/documentation/reference/waterline/models/destroy.html)
+ [`.validate()`](http://sailsjs.com/documentation/reference/waterline/records/validate.html)


<!-- Note - nous devons regrouper une méthode d'attribut getPrimaryKeyValue() sur chaque modèle dans le noyau de Waterline (ou peut-être juste getId() puisque "id" est plus simple à comprendre) ~ mike - aug2,2014 -->


###### Méthodes d'attribut personnalisées

Les modèles Waterline vous permettent également de définir vos propres méthodes d'attributs personnalisés. Définissez-les comme n'importe quel autre attribut, mais au lieu d'un objet de définition d'attribut, écrivez une fonction :

```js
// From api/models/Personne.js...

module.exports = {
  attributes: {
    // Attributs primitives
    prenom: {
      type: 'string',
      defaultsTo: ''
    },
    nom: {
      type: 'string',
      defaultsTo: ''
    },
    age: {
      type: 'int'
    },

    // Associations (aka attributs relationel)
    epouse: { model: 'Personne' },
    animaux: { collection: 'Animal' },

    // Méthodes d'attribut
    getNomComplet: function (){
      return this.prneom + ' ' + this.nom;
    },
    isMarie: function () {
      return !!this.epouse;
    },
    isElligiblePourLaSecuriteSociale: function (){
      return this.age >= 65;
    },
  }
};
```
> À noter que, à l'exception notable des méthodes d'attribut `.save()` et `.destroy()`, les méthodes d'attribut sont presque toujours synchrones par convention.
>
> Notez également que les méthodes d'attributs personnalisés ne sont pas sérialisées par défaut en JSON. Pour les sérialiser, vous pouvez remplacer [toJSON](http://sailsjs.com/documentation/reference/waterline-orm/records/to-json).

###### Quand écrire une méthode d'attribut personnalisé

Les méthodes d'attribut personnalisées sont particulièrement utiles pour extraire certaines informations d'un enregistrement. Vous voulez peut-être réduire certaines informations à partir d'un ou plusieurs attributs (par exemple, "cette personne est-elle mariée ?")

```js
if ( rick.isMarie() ) {
  // ...
}
```



###### Quand NE PAS écrire une méthode d'attribut personnalisé

Vous devez **éviter d'écrire vos propres méthodes d'attribut _asynchrones_**. Alors que les méthodes d'attribut asynchrones intégrées comme `.save()` et `.destroy()` peuvent être commodes à partir du code de votre application, l'écriture de vos _propres_ méthodes d'attribut asynchrones peut parfois avoir des conséquences imprévues et n'est pas le moyen le plus efficace de construire votre application.

Par exemple, envisager une application qui gère les dossiers de mariage. Vous pourriez penser à écrire une méthode d'attribut sur le modèle Personne qui met à jour l'attribut `conjoint` sur les deux individus dans la base de données. Cela vous permettra d'écrire une code de contrôleur comme:

```js
personneA.seMarie(personneB, function (err) {
  if (err) return res.negotiate(err);
  return res.ok();
})
```

Qui semble bien ... jusqu'à ce que vous avez besoin d'écrire une action différente où vous n'avez pas un enregistrement réel pour "personneA".

Une meilleure stratégie consiste à écrire à sa place une méthode de modèle personnalisée (statique). Cela rend votre fonction plus réutilisable/polyvalente, car elle sera accessible que vous ayez ou non une instance d'enregistrement réelle à portée de main. Vous pouvez refactoriser le code de l'exemple précédent à:

```js
Person.seMarie([joe,raquel], function (err) {
  if (err) return res.negotiate(err);
  return res.ok();
})
```


###### Nommer vos méthodes d'attribut
Assurez-vous d'utiliser une convention de dénomination pour éviter de confondre **les méthodes d'attribut**  _des valeurs d'attributs_ lorsque vous travaillez avec des enregistrements dans votre application. Une bonne pratique est d'utiliser le préfixe "get*" ou "is*" (par exemple `getNomComplet()` ou `isMarie()`) et d'éviter d'écrire des méthodes d'attribut qui modifient les enregistrements en place.

<!--

Imaginez que vous avez un petit singe nommé Timothy qui monte sur vos épaules et les styles de vos cheveux quand vous êtes invité à parler dans une conférence. Dans ce scénario, vous êtes un enregistrement du modèle `Personne` et Timothy est un enregistrement du modèle `Singe`. Le modèle `Personne` a des attributs primitifs comme "nom", "email" et "telephone", et des attributs relationnels comme "animalDomestique" (pointe vers le modèle `Singe`) et "maman" (pointe vers une `Personne`). Pendant ce temps, le modèle `Singe` a des attributs primitifs "nom", "age" et "comportement", ainsi qu'un attribut relationnel: "appartientA" (qui pointe vers une personne).


Tout le monde sait qu'une personne peut coiffer de ses propres cheveux, mais il est plus efficace si son singe de compagnie le fait. Nous pouvons le représenter en définissant `coifferCheuveux: function (cb) {return cb (); }` comme méthode d'attribut sur `Personne` et 'coifferPropreCheuveux: function (cb) {return cb ();}` comme méthode d'attribut sur `Singe`.


Si votre application implique une coiffure multigénérationnelle, vous pourriez penser qu'il serait logique d'écrire une méthode d'attribut sur le modèle `Singe` appelé "getGrandMereDuProprio()" qui appellerait un callback avec la maman de la maman du propriétaire du singe.
-->

<!--
###### un de côté sur les promesses

Les promesses sont plus efficaces lorsqu'elles sont utilisées pour gérer des opérations asynchrones, mais référentiellement transparentes ("nullipotent"); À savoir la logique sans effets secondaires.
-->





<docmeta name="displayName" value="Modèles">
