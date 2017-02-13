# Validations

Sails intégre la validation automatique des attributs de vos modèles. Chaque fois qu'un enregistrement est mis à jour ou qu'un nouvel enregistrement est créé, les données de chaque attribut seront vérifiées par rapport à toutes vos règles de validation prédéfinies. Il s'agit d'un moyen de sécurité pratique pour garantir que les entrées non valides ne pénètrent pas dans la ou les bases de données de votre application.

Toutes les validations ci-dessous sont implémentés en JavaScript et exécutés dans le même processus de serveur Node.js que Sails, sauf `unique` qui est implémenté comme une contrainte au niveau de la base de données; [voir "Unique"](http://sailsjs.com/documentation/concepts/models-and-orm/validations#?unique). N'oubliez pas non plus que, peu importe les validations utilisées, un attribut doit toujours spécifier l'un des types de données intégrés ('string', 'number', 'json', etc.).

Except for `unique` (which is implemented as a database-level constraint; [see "Unique"](http://sailsjs.com/documentation/concepts/models-and-orm/validations#?unique)), all validations below are implemented in JavaScript and run in the same Node.js server process as Sails.  Also keep in mind that, no matter what validations are used, an attribute must _always_ specify one of the built in data types ('string', 'number', json', etc).

```javascript
// Utilisateur
module.exports = {
  attributes: {
    email: {
      type: 'string',
      unique: true,
      required: true
    }
  }
};
```

### Types de données intégrés

Chaque définition d'attribut doit avoir un type de données intégré (_typeclass_) spécifié. Ceci est utilisé pour la validation logique et la coercition des résultats et des critères.


| Type de données  | Usage                         | Description                                                  |
|:----------------:|:----------------------------- |:------------------------------------------------------------ |
| ((string))       | `type: 'string'`              | N'importe quelle chaîne de caractères (tolére `null`).
| ((number))       | `type: 'number'`              | N'importe quel nombre (tolére `null`)
| ((boolean))      | `type: 'boolean'`             | `true` ou `false` (tolére aussi le `null`)
| ((json))         | `type: 'json'`                | Toute valeur JSON-sérialisable, y compris les nombres, les booléens, les chaînes, les tableaux, les dictionnaires et `null`.
| ((array))        | `type: 'array'`               | Tout tableau constitué uniquement de contenu JSON-sérialisable.  |

Les bases de données différent légèrement dans la façon avec laquelle elles traitent les limites et des valeurs spéciales telles que `Infinity`, `null`, des chaînes de différentes longueurs, etc. L'ORM (Waterline) de Sails et ses adaptateurs effectuent une validation lâche pour s'assurer que les valeurs fournies dans les dictionnaires de critères et des valeurs de `.create()` ou `.update()` correspondent au typeclass attendu.

> Notez que l'auto-migration s'appuie également sur le `type` d'attribut déclaré. Ceci est principalement pertinent pour les bases de données schématiques (comme MySQL ou PostgreSQL), car l'adaptateur concerné doit utiliser ces informations pour modifier/définir les tables lors de l'auto-migration. N'oubliez pas qu'en production, `migrate: 'safe'` sera activé et la migration automatique sera ignorée.


### Les règles de validation

Les règles de validation suivantes sont gérées par [Anchor](https://github.com/sailsjs/anchor), une bibliothèque de validation robuste pour Node.js.

Dans le tableau ci-dessous, la colonne "Types d'attributs compatibles" indique le type de données (c'est-à-dire la propriété `type` de la définition d'attribut) appropriées pour chaque règle de validation. Dans de nombreux cas, une règle de validation peut être utilisée avec plus d'un type. Notez que par coïncidence, le tableau ci-dessous prend un raccourci: Si compatible avec ((string)), ((number)), ((boolean)) ou ((array)), la règle de validation est également compatible avec ((json)).


| Nom de la régle   | Ce qu'elle vérifie                                                                                                  | Notes sur l'usage               | Types d'attributs compatibles |
|:------------------|:--------------------------------------------------------------------------------------------------------------------|:-----------------------------|:----------------------------:|
|after              | Une valeur qui, lorsqu'elle est analysée en tant que date, fait référence à un moment _supérieur_ l'instance `Date` fournie.
             | `after: new Date('Sat Nov 05 1605 00:00:00 GMT-0000')` | ((string)) |
|alpha              | Une valeur qui ne contient que des majuscules et/ou minuscules.                                                    | `alpha: true`                | ((string)) |
|alphadashed        | Une valeur qui ne contient que des lettres et des tirets.                                                          | | ((string)) |
|alphanumeric       | Une valeur qui ne contient que des lettres et des chiffres.                                                        | | ((string)) |
|alphanumericdashed | Valeur qui est une chaîne composée uniquement de lettres, de chiffres et/ou de tirets.                              | | ((string)) |
|before             | Une valeur qui, lorsqu'elle est analysée en tant que date, fait référence à un moment _avant_ l'instance `Date` fournie.         
             | `before: new Date('Sat Nov 05 1605 00:00:00 GMT-0000')` | ((string)) |
|contains           | Une valeur qui contient la sous-chaîne spécifiée.                                                                  | `contains: 'needle'`   | ((string)) |
|creditcard         | Une valeur qui est un numéro de carte de crédit.                                                                    | **Ne stockez pas de numéros de carte de crédit dans votre base de données, sauf si votre application est compatible PCI!**. Si vous souhaitez permettre aux utilisateurs de stocker des informations de carte de crédit, une alternative sûre consiste à utiliser une API de paiement comme [Stripe](https://stripe.com). | ((string)) |
|datetime           | Une valeur qui peut être analysée comme un timestamp; C'est-à-dire construire une date JavaScript avec `new Date()`
             |    | ((string)) |
|_decimal_          | _Alias pour `float`._ | |  |
|email              | Une valeur qui représente une adresse e-mail. | | ((string)) |
|finite             | Valeur qui est ou peut être contrainte à un nombre fini. | Ce n'est pas le même que `isFinite` (natif) qui renvoi `true` pour les booléens et les chaînes vides | ((number)) ou ((string)) |
|float              | Valeur qui est ou peut être contrainte à un nombre de virgule flottante (aka décimal). | | ((number)) or ((string)) |
|hexadecimal        | Une valeur hexadécimale. | | ((number)) ou ((string)) |
|hexColor           | Une valeur d'une couleur en hexadécimale | | ((string)) |
|in                 | Une valeur qui se trouve dans le tableau fourni des chaînes autorisées. | | ((string)) |
|_int_              | _Alias pour `integer`._       |  |  |
|integer            | Une valeur qui est un entier ou une chaîne qui ressemble à un entier. | | ((number)) ou ((string)) |
|ip                 | Une valeur qui est une adresse IP valide (v4 ou v6) | | ((string)) |
|ipv4               | Une valeur qui est une adresse IP v4 valide. | | ((string)) |
|ipv6               | Une valeur qui est une adresse IP v6 valide. | | ((string)) |
|_is_               | _Alias pour `regex`._                               | |  |
|lowercase          | Une valeur constituée de lettres minuscules. | | ((string)) |
|max                | Une valeur inférieure au nombre configuré.   | | ((number)) |
|maxLength          | Une valeur qui a une longueure inférieure au nombre de caractères configuré. |  | ((string)) |
|min                | Une valeur supérieure au nombre configuré. | | ((number)) |
|minLength          | Une valeur qui possède au moins le nombre de caractères configuré. | | ((string)) |
|notRegex           | Une valeur qui **ne correspond pas** à l'expression régulière configurée. | | ((string)) |
|notContains        | Une valeur qui ne contient pas la sous-chaîne configurée. | e.g. `'-haystack-needle-haystack-'` échouerait à la validation `notContains: 'needle'` | ((string)) |
|notIn              | Une valeur qui **n'est pas** dans le tableau configuré. | | ((string)) |
|notNull            | Une valeur qui **n'est pas** égale à `null` | | ((json)) |
|numeric            | Une valeur qui est une chaîne analysée en tant que nombre. | [Tandis que `NaN` est considéré comme un nombre en JavaScript](https://www.destroyallsoftware.com/talks/wat), Ce qui n'est pas vrai pour cette validation. | ((string)) |
|required           | Une valeur qui est définie; C'est-à-dire **n'est pas `undefined`**. | | ((json)) |
|regex              | Une valeur qui correspond à l'expression régulière configurée. | | ((string)) |
|truthy             | Une valeur qui serait considérée vraie si elle est utilisée dans une instruction JavaScript `if`. | | ((json)) |
|uppercase          | Une valeur en majuscules. | | ((string)) |
|url                | Une valeur qui est une URL. | | ((string)) |
|urlish             | Une valeur qui ressemble vaguement à une URL (c'est à dire, `/^\s([^\/]+\.)+.+\s*$/g`). | `urlish: true` | ((string)) |
|uuid               | Une valeur qui est un UUID (v3, v4 ou v5) | | ((string)) |
|uuidv3             | Une valeur qui est un UUID (v3) | | ((string)) |
|uuidv4             | Une valeur qui est un UUID (v4) | | ((string)) |



### Unique

La régle `Unique` est différente de toutes les règles de validation énumérées ci-dessus. En fait, ce n'est pas vraiment une validation du tout: c'est une **contrainte au niveau de la base de données**.

Si un attribut se déclare `unique: true`, Sails s'assure qu'aucun enregistrement ne sera permis avec la même valeur. L'exemple canonique est un attribut `email` sur un modèle `Utilisateur`:

```javascript
// api/models/Utilisateur.js
module.exports = {

  attributes: {
    email: {
      type: 'string',
      unique: true,
      required: true
    }
  }

};
```

##### Pourquoi `unique` est-elle différente des autres régles de validation ?

Imaginez que vous disposiez de 1 000 000 d'enregistrements utilisateur dans votre base de données. Si `unique` a été implémenté comme d'autres validations, chaque fois qu'un nouvel utilisateur s'inscrirait à votre application, Sails aurait besoin de rechercher dans _un million_ des enregistrements existants pour s'assurer qu'aucun autre n'utilisait déjà l'adresse e-mail fournie par le nouvel utilisateur. Non seulement ce serait lent, mais au moment où nous avons terminé la recherche à travers tous ces enregistrement, quelqu'un d'autre aurait pu s'inscrire!

Heureusement, ce type de vérification d'unicité est peut-être la caractéristique la plus universelle de toute base de données. Pour tirer parti de cela, Sails s'appuie sur l'[adaptateur de base de données](http://sailsjs.com/documentation/concepts/models-and-orm#?adapters) pour implémenter le support de la validation `unique` - En ajoutant une **contrainte d'unicité** au champ/colonne/attribut pertinent dans la base de données pendant l'[auto-migration](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?migrate). En d'autres termes, alors que votre application est configurée sur `migrate: 'alter'`, Sails génèrera automatiquement des tables/collections dans la base de données sous-jacente avec des contraintes d'unicité intégrées. Une fois que vous aurez migré vers `migrate: 'safe'`, les contraintes dépenderont de vous.

##### Qu'en est-il des index?

Lorsque vous commencez à utiliser votre base de données de production, il est toujours judicieux de configurer des index pour améliorer les performances de votre base de données. Le processus exact et les meilleures pratiques pour la configuration des index varient d'une base de données à l'autre et sont hors de la portée de la documentation ici. Cela dit, si vous n'avez jamais fait cela avant, ne vous inquiétez pas - c'est [plus facile que vous ne le pensez](http://stackoverflow.com/a/1130/486547).

Tout comme tous les autres éléments liés à votre schéma de production, une fois que vous avez défini votre application à `migrate: 'safe'`, il serait à vous de gérer les index de votre base de données.

> Notez que cela signifie que vous devez être sûr de mettre à jour vos index en même temps que vos contraintes d'unicité en effectuant [une migration manuelle](https://github.com/BlueHotDog/sails-migrations).

### Quand utiliser les validations

Les validations peuvent être un énorme gain de temps, vous empêchant d'écrire plusieurs centaines de lignes de code répétitif. Mais gardez à l'esprit que les validations de modèle sont exécutées pour _chaque create ou update_ dans votre application. Avant d'utiliser une règle de validation dans l'une de vos définitions d'attribut, assurez-vous d'être bien appliquée _à chaque fois_ que votre application appelle `.create()` ou `.update()` pour spécifier une nouvelle valeur pour cet attribut. Si ce n'est pas le cas, mettez le code qui valide les valeurs entrantes inline dans votre contrôleur; Ou faites appel à une fonction personnalisée dans l'un de vos [services](http://sailsjs.com/documentation/concepts/services) ou une [méthode dans le modèle](http://sailsjs.com/documentation/concepts/models-and-orm/models#?model-methods-aka-static-or-class-methods).

Par exemple, disons que votre application Sails permet aux utilisateurs de s'inscrire à un compte soit: (A) en entrant une adresse e-mail et un mot de passe, puis en confirmant cette adresse e-mail ou (B) en utilisant LinkedIn. Maintenant, disons que votre modèle `Utilisateur` a un attribut appelé` linkedInEmail` et un autre attribut appelé `email`. Même si l'un de ces attributs d'adresse de courrier électronique est requis, l'un d'entre eux dépend de la manière dont un utilisateur s'est inscrit. Dans ce cas, votre modèle `Utilisateur` ne peut pas utiliser la validation `required: true` - vous devrez plutôt valider que l'un des deux est fourni et est valide en vérifiant ces valeurs manuellement avant le `.create()` et `.update()` dans votre code, par exemple:

```javascript
if ( !_.isString( req.param('email') ) ) {
  return res.badRequest();
}
```

Pour aller plus loin, disons maintenant que votre application accepte les paiements. Pendant le processus d'inscription, si un utilisateur s'inscrit à un abonnement payant, il doit également fournir un email de facturation («facturationEmail»). Si un utilisateur s'inscrit à un abonnement gratuit, il ou elle peut sauter cette étape. Dans la page des paramètres du compte, les utilisateurs de l'abonnement payant voient le champ de formulaire "Email de facturation" où ils peuvent personnaliser leur email de facturation. Ceci est différent des utilisateurs ayant un abonnement gratuit, qui voient un bouton d'appel à l'action "Migrer vers l'abonnement payant".

Même avec ces exigences, qui semblent tout à fait spécifiques, il y'a des questions qui restent sans réponse:

- Est-ce que nous mettons à jour le courrier électronique de facturation automatiquement lorsque l'autre adresse de courriel est modifiée ?
- Et si le courriel de facturation avait été modifié au moins une fois ?
- Que se passe-t-il avec l'email de facturation après qu'un utilisateur ait retrogradé vers l'abonnement gratuit ? Si un utilisateur effectue à nouveau une mise à niveau vers l'abonnement payant, est-ce qu'on va demander de nouveau son adresse e-mail de facturation ou allons nous utiliser l'ancienne ?
- Qu'arrive-t-il l'email de facturation lorsqu'un utilisateur existant se connecte avec son compte LinkedIn et qu'un nouveau `linkedInEmail` est enregistré ?
- Que se passe-t-il avec l'email de facturation si un courrier électronique mensuel contennt la facture ne peut pas être livré ?
- Que se passe-t-il avec l'email de facturation si un membre de votre équipe de support se connecte à l'interface d'administration et le modifie manuellement ?
- Que se passe-t-il avec l'email de facturation si une requête POST est reçue sur l'URL de rappel que nous avons fournie à l'API LinkedIn pour informer notre application que l'utilisateur a changé son adresse email sur http://linkedin.com et ainsi un nouveau lien `linkedInEmail` est enregistré ?
- Que se passe-t-il avec l'email de facturation lorsqu'un utilisateur existant déconnecte son compte LinkedIn ?
- Deux comptes d'utilisateurs dans la base de données sont-ils autorisés à avoir le même courrier électronique de facturation ? Et l'email de LinkedIn ? Ou celui qu'ils ont entré manuellement ?


Selon les réponses à ces questions, nous pourrions finir par conserver la validation `required` sur `facturationEmail`, en ajoutant de nouveaux attributs (comme `emailFacturationModifieManuellement`) ou même en modifiant ou non une contrainte `unique`.

### Les meilleures pratiques

Enfin, voici quelques conseils:
- Votre décision initiale d'utiliser ou non les validations d'un attribut particulier dépend des exigences de votre application et de la façon dont vous appelez `.update()` et `.create()`. N'ayez pas peur de renoncer à la validation intégrée et de vérifier les valeurs à la main dans vos contrôleurs ou dans une fonction d'assistance. Souvent, c'est l'approche la plus propre et la plus maintenable.
- Il n'y a rien de mal à ajouter ou supprimer des validations de vos modèles au fur et à mesure que votre application évolue. Mais une fois que vous allez en production, il y'a une **exception très importante** : `unique`. Pendant le développement, lorsque votre application est configurée pour utiliser [`migrate: 'alter'`](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?migrate), vous pouvez ajouter ou supprimer les validations `unique` à volonté. Cependant, si vous utilisez `migrate: safe` (par exemple avec votre base de données de production), vous allez devoir mettre à jour les contraintes/indices dans votre base de données, ainsi que [migrer vos données à la main](https://github.com/BlueHotDog/sails-migrations).
- C'est une très bonne idée de passer le temps à bien comprendre l'interface utilisateur de votre application _d'abord_ avant de configurer des validations complexes sur les attributs de votre modèle.

> Dans la mesure du possible, il est judicieux de faire des wireframes avant que vous ne dépensiez une quantité importante de temps à implémenter un code backend quelconque. Bien sûr, ce n'est pas toujours possible - et c'est l'utilité de l'[API Blueprint](http://sailsjs.com/documentation/concepts/blueprints). Les applications construites avec une philosophie centrée sur l'interface utilisateur ou «front-end first» sont plus faciles à entretenir, ont tendance à avoir moins de bugs, puisqu'elles sont construites avec une connaissance approfondie de l'interface utilisateur depuis le get-go, Apis.


### Règles de validation personnalisées

> **Avertissement :** Le support des règles de validation personnalisées comme documenté ici se terminera très probablement dans version 1.0 de Waterline. À l'avenir, utilisez une fonction de l'un de vos [services](http://sailsjs.com/documentation/concepts/services) ou d'une [méthode classe de modèle](http://sailsjs.com/documentation/concepts/models-and-orm/models#?model-methods-aka-static-or-class-methods) pour une validation personnalisée.

Vous pouvez définir vos propres règles de validation personnalisées en spécifiant un dictionnaire `types` en tant que propriété de niveau supérieur de votre modèle, puis utilisez-les dans vos définitions d'attribut comme vous le feriez pour toute autre règle de validation ci-dessus:

```javascript
// api/models/Utilisateur.js
module.exports = {

  // Les valeurs transmises pour la création ou les mises à jour du modèle utilisateur 
  // doivent respecter les règles suivantes:
  attributes: {

    prenom: {
      // Notez qu'un type de base (dans ce cas "chaîne") doit encore être défini,
      // même si les règles de validation sont en cours d'utilisation.
      type: 'string',
      required: true,
      minLength: 5,
      maxLength: 15
    },

    emplacement: {
      type: 'json',
      isPoint: true // << Défini ci-bas
    },

    motDePasse: {
      type: 'string',
      password: true // << Défini ci-bas
    }

  },

  // Types personnalisés / Règles de validation
  // (Disponible pour l'utilisation dans les définitions d'attributs de ce modèle ci-dessus)
  types: {
    isPoint: function(value){
      // Pour toutes les créations/mises à jour d'enregistrements `Utilisateur`
      // qui spécifient une valeur pour l'attribut qui se déclare `isPoint: true`, cette valeur doit:
      // • être un dictionnaire avec des propriétés numériques `x` et `y`
      // • les deux `x` et `y` ne doivent pas être ni `Infinity` ni `-Infinity`
      return _.isObject(value) &&
      _.isNumber(value.x) && _.isNumber(value.y) &&
      value.x !== Infinity && value.x !== -Infinity &&
      value.y !== Infinity && value.y !== -Infinity;
    },
    password: function(value) {
      // Pour toutes les créations/mises à jour d'enregistrements `Utilisateur`, 
      // qui spécifient une valeur pour l'attribut qui se déclare `type: 'password'`, cette valeur doit:
      // • être une chaîne
      // • avoir au moins 6 caractères
      // • contient au moins un numéro
      // • contenir au moins une lettre
      return _.isString(value) && value.length >= 6 && value.match(/[a-z]/i) && value.match(/[0-9]/);
    }
  }
}
```

Les fonctions de validation personnalisées reçoivent la valeur entrante validée comme leur premier argument, et on s'attend à ce qu'elles renvoient `true` s'il est valide, `false` sinon. Une fois configurées, ces règles de validation personnalisées peuvent être utilisées dans un ou plusieurs attributs du modèle où elles sont définies en définissant une propriété supplémentaire portant le même nom dans des définitions d'attributs pertinentes; par exemple, `UneRegleOuTypeDeValidation: true`.

Notez que les règles de validation personnalisées ne sont pas définies par des validations et des types intégrés - elles sont toutes fusionnées ensemble. Veillez donc à ne pas définir une validation personnalisée qui entre en onflit avec l'un des types de base ou des validations de Waterline (par exemple, ne nommez pas votre chaîne de validation personnalisée `string` ou` minLength`).



##### Messages de validation personnalisés

Par défaut, Sails.js ne prend pas en charge les messages de validation personnalisés. Au lieu de cela, votre code devrait examiner les erreurs de validation dans le callback depuis vos appels `create()` ou `update()` et prendre les mesures appropriées; Qu'il s'agisse d'envoyer un code d'erreur particulier dans votre réponse JSON ou de rendre le message approprié dans une page d'erreur HTML.

> Si vous utilisez Sails v0.11.0+, vous pouvez utiliser [`sails-hook-validation`](https://github.com/lykmapipo/sails-hook-validation), un [hook personnalisé](http://sailsjs.com/documentation/concepts/extending-sails/hooks) par [@lykmapipo](http://github.com/lykmapipo). Les détails concernant son installation et son utilisation se trouvent dans le dépôt [`sails-hook-validation` sur GitHub](https://github.com/lykmapipo/sails-hook-validation).



<docmeta name="displayName" value="Validations">
