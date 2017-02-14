# Paramètres du modèle

Dans Sails, les propriétés de haut-niveau des définitions de modèle sont appelées **paramètres du modèle**. Cela inclut tout de la [définition d'attribut](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?attributes), aux [paramètres de base de données](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?connectionn) que le modèle utilisera, ainsi qu'un certain nombre d'autres options.

Cette page est consacrée en majorité à vous offrir une visite complète des paramètres de modèle pris en charge par Sails. Mais avant de commencer, voyons comment appliquer ces paramètres dans une application Sails.


### Présentation

Les paramètres du modèle vous permettent de personnaliser le comportement des modèles dans votre application Sails. Ils peuvent être spécifiés par modèle en définissant des propriétés de haut-niveau dans la [définition de modèle](http://sailsjs.com/documentation/concepts/models-and-orm/models), ou en tant que valeurs par défaut pour l'ensemble de l'application dans [`sails.config.models`](http://sailsjs.com/documentation/reference/configuration/sails-config-models).

##### Modification des paramètres par défaut du modèle

Pour modifier les [paramètres par défaut](http://sailsjs.com/documentation/reference/configuration/sails-config-models) partagés par tous les modèles de votre application, éditez [`config/models.js`](http://sailsjs.com/documentation/anatomy/my-app/config/models-js).

Par exemple, si vous modifiez `config/models.js` pour qu'il contienne `connection: 'unePostgresqlDb'`, alors, en supposant que vous avez défini une connexion nommée `unePostgresqlDb`, vous configurerez PostgreSQL comme base de données par défaut. En d'autres termes, à moins de les remplacer, tous les modèles de votre application utiliseront cette base de données PostgreSQL à chaque fois que des méthodes de modèle intégrées comme `.create()` ou `.find()` sont exécutées.


##### Surcharge des paramètres d'un modèle particulier

Pour personnaliser davantage ces paramètres pour un modèle particulier, vous pouvez les spécifier comme des propriétés de haut-niveau dans le fichier de définition de ce modèle (par exemple `api/models/Utilisateur.js`). Cela remplacera les paramètres par défaut du modèle portant le même nom.

Par exemple, si vous ajoutez `autoUpdatedAt: false` à l'une de vos définitions de modèle (`api/models/UploadFichier.js`), ce modèle n'aura plus l'attribut implicite `updatedAt`. Mais le reste de vos modèles ne seront pas affectés; Ils utiliseront toujours le paramètre par défaut (qui est `autoUpdatedAt: true`, sauf si vous l'aurez modifié).

##### Quelle approche dois-je utiliser?

Par convention, les définitions d'attribut sont spécifiées dans des fichiers de modèles individuels. La plupart des autres paramètres du modèle, comme `schema` et `connection`, doivent être spécifiés pour l'ensemble des modèles de l'application, sauf si vous devez les remplacer pour un modèle particulier; Par exemple, si votre base de données par défaut est PostgreSQL, mais que vous avez un modèle `Rapport` sur Redis.

Maintenant que vous savez quels sont les paramètres du modèle en général, et comment les configurer, passons au travers de chacun d'eux.

--------------------


### `migrate`

```javascript
migrate: 'safe'
```

Le paramètre `migrate` contrôle la **stratégie d'auto-migration** que Sails exécutera chaque fois que votre application démarre. En bref, cela indique à Sails si vous souhaitez ou non essayer de reconstruire automatiquement les tables/collections/etc. dans votre base de données.

##### Migration des bases de données

Au cours du développement d'une application, vous aurez presque toujours besoin de faire au moins un ou deux **changements majeurs** à la structure de votre base de données. Ce qui constitue un "changement majeur" ou non, dépend de la base de données que vous utilisez: Par exemple, imaginez que vous ajoutez un nouvel attribut à une de vos définitions de modèle. Si ce modèle est configuré pour utiliser MongoDB, ce n'est pas une grosse affaire; Vous pouvez continuer à développer comme s'il n'y avait rien. Mais si ce modèle est configuré pour utiliser MySQL, il y a une étape supplémentaire: une colonne doit être ajoutée à la table correspondante (sinon les méthodes de modèle comme `.create()` cesseront de fonctionner.) Donc pour un modèle utilisant MySQL, ajouter un attribut est une modification maujeure du schéma de base de données.

> Même si tous vos modèles utilisent MongoDB, il y a toujours des changements de schéma majeurs à surveiller. Par exemple, si vous ajoutez `unique: true` à l'un de vos attributs, un [index unique](https://docs.mongodb.com/manual/core/index-unique/) doit être créé dans MongoDB.


Dans Sails, il existe deux modes de fonctionnement différents en ce qui concerne [la migration de base de données](https://en.wikipedia.org/wiki/Schema_migration):

1. **Migrations manuelles** - L'art de mettre à jour vos tables de bases de données/collections/etc. manuellement. Par exemple, écrire une requête SQL pour [ajouter une nouvelle colonne](http://dev.mysql.com/doc/refman/5.7/fr/alter-table.html), ou envoyer une commande [Mongo pour créer un  index unique](https://docs.mongodb.com/manual/core/index-unique/). Si la base de données contient des données dont vous vous souciez (en production par exemple), vous devez examiner attentivement si ces données doivent être modifiées pour s'adapter au nouveau schéma et, si nécessaire, écrire des scripts pour les migrer. Une [bonne partie](https://www.npmjs.com/package/sails-migrations) de grands [outils open-source](http://knexjs.org/#Migrations-CLI) existent pour la gestion des scripts de migration manuelle, ainsi que des produits hébergés comme le [service de migration de base de données sur AWS](https://aws.amazon.com/blogs/aws/aws-database-migration-service/).
2. **Auto-migrations** - Une fonctionnalité pratique intégrée dans Sails qui vous permet de faire des changements itératifs à vos définitions de modèle au cours du développement, sans vous soucier des répercussions. Les migrations automatiques ne doivent jamais être activées lors de la connexion à une base de données ayant des données cruciales. Utilisez plutôt des migrations automatiques avec des données de test que vous pouvez facilement recréer.


Chaque fois que vous devez appliquer des modifications majeures à la _base de données de production_, vous devez utiliser les migrations manuelles de base de données. Sinon, lorsque vous développez sur votre ordinateur portable, ou en exécutant vos tests automatisés, l'auto-migration peut vous faire économiser beaucoup de temps.

##### Fonctionnement des migrations automatiques

Lorsque vous démarrez votre application Sails dans un environnement de développement (par exemple, en exécutant `sails lift` dans une nouvelle application Sails), la stratégie d'auto-migration configurée s'exécutera. Si vous utilisez `migrate: 'safe'`, rien de plus ne se produira. Mais si vous utilisez `drop` ou` alter`, Sails va charger tous les enregistrements de votre base de développement dans la mémoire, puis supprimer et recréer la représentation de la couche physique des données (ie tables/collections/sets/etc). Ceci vous permet d'appliquer automatiquement tout changement majeur apporté à vos définitions de modèle (comme le fait de supprimer une contrainte d'unicité) à votre base de données de développement. Enfin, si vous utilisez `alter`, Sails tentera alors de redemander les table/collections/ensembles fraîchement générés avec les enregistrements précédemment enregistrés.


| Stratégie d'auto-migration | Description |
|:-------------------------|:---------------------------------------------|
|`safe`                    | Ne migrer jamais automatiquement ma base de données. Je le ferai moi-même, à la main.
|`alter`                   | Migrer automatiquement les colonnes/champs, mais essayer de conserver les données existantes (expérimentale)
|`drop`                    | Effacer TOUTES mes données et reconstruire les modèles à chaque fois que je démarre Sails


##### Puis-je utiliser l'auto-migration en production?

Dans Sails, les stratégies de migration automatique `drop` et `alter` existent comme une fonctionnalité pour votre commodité lors du développement et lors de l'exécution de tests automatisés. **Ils ne sont pas conçus pour être utilisés avec des données sensibles/importantes.** Veuillez ne jamais utiliser `drop` ou` alter` avec des données de production. En fait, en tant que protection, chaque fois que vous démarrez votre application [dans un environnement de production](http://sailsjs.com/documentation/reference/configuration/sails-config#?sailsconfigenvironment), Sails utilise _toujours_ `migrate: 'safe'`, peu importe ce que vous avez configuré.

Dans de nombreux cas, les fournisseurs d'hébergement définissent automatiquement la variable d'environnement `NODE_ENV` en "production" lorsqu'ils détectent une application Node.js. Ne vous fiez pas uniquement à cette sécurité, et prenez les précautions habituelles pour garder les données de vos utilisateurs en sécurité. Chaque fois que vous connectez Sails (ou tout autre outil ou framework) à une base de données avec des données de production préexistantes, **effectuez une exécution à sec**, surtout les toutes premières fois. Les données de production sont sensibles, précieuses et souvent irremplaçables. Vos clients et leurs avocats ne seront pas cool en cas de perte de données.

En tant que bonne pratique, veillez à ne jamais démarrer ou [déployer](http://sailsjs.com/documentation/concepts/deployment) votre application avec les informations d'identification de la base de données de production, sauf si vous êtes sûr à 100% que vous êtes en cours d'exécution dans un environnement de production. Une approche populaire pour résoudre ce problème à l'échelle d'une organisation est tout simplement de ne pas pousser les informations d'identification de la base de données de production vers votre dépôt de code source, et plutôt de s'appuyer sur [variables d'environnement](http://sailsjs.com/documentation/reference/configuration) pour toutes les informations d'identification sensibles. (C'est une bonne idée si votre application est soumise aux exigences réglementaires ou si un grand nombre de personnes ont accès à votre code source.)

##### L'auto-migration est-elle lente ?

Si vous travaillez avec une quantité relativement importante de données de développement/test, la stratégie de migration automatique `alter` peut prendre beaucoup de temps à s'exécuter au démarrage. Si vous constatez qu'une commande comme `npm test`, `sails console` ou `sails lift` semble suspendue, envisagez de diminuer la taille de votre jeu de données de développement. (Rappelez-vous: les migrations automatiques de Sails ne doivent être utilisées que sur votre ordinateur portable/ordinateur de bureau local et uniquement avec de petits ensembles de données de développement.)




### `schema`

```javascript
schema: true
```

Un indicateur pour basculer le mode sans-schéma ou avec-schéma dans les bases de données qui prennent en charge des structures de données schématiques. Si elle est désactivée, cela vous permettra de stocker des données arbitraires dans un enregistrement. Si cette option est activée, seuls les attributs définis dans l'objet `attributes` du modèle seront stockés.

Pour les adaptateurs qui ne nécessitent pas de schéma, comme Mongo ou Redis, le paramètre par défaut est `schema: false`.



### `connection`

```javascript
connection: 'ma-postgresql-local'
```

La [connexion](http://sailsjs.com/documentation/reference/sails.config/sails.config.connections.html) configurée de base de données où le modèle récupérera et sauvegardera ses données. Par défaut, il y a `localDiskDb`, la connexion par défaut qui utilise l'adaptateur` sails-disk`.


### `identity`

```javascript
identity: 'commande'
```

La clé unique en minuscules pour ce modèle, ex. `Utilisateur`. Par défaut, l'identité d'un modèle est déduite automatiquement en minuscules son nom de fichier. Vous ne devez jamais modifier cette propriété sur vos modèles.

### `globalId`

```javascript
globalId: 'Purchase'
```

Ce drapeau modifie le nom global par lequel vous pouvez accéder à votre modèle (si la globalisation des modèles est activée). Vous ne devez jamais modifier cette propriété sur vos modèles. Pour désactiver la globalisation des modèles, voir [`sails.config.globals`](http://sailsjs.com/documentation/concepts/Globals?q=disabling-globals).



### autoPK

```javascript
autoPK: true
```

Un drapeau pour activer/désactiver la définition automatique d'une clé primaire dans votre modèle. Les détails de ce PK par défaut varient entre les adaptateurs (par exemple, MySQL utilise une clé primaire d'entier auto-incrémenté, alors que MongoDB utilise un UUID de chaîne aléatoire). Dans tous les cas, les clés primaires générées par autoPK seront uniques. Si elle est désactivée, aucune clé primaire ne sera créée par défaut et vous devriez le définir manuellement, par exemple:

```js
attributes: {
  sku: {
    type: 'string',
    primaryKey: true,
    unique: true
  }
}
```

### `autoCreatedAt`

```javascript
autoCreatedAt: true
```

S'il est défini à `false`, cela désactive la définition automatique d'un attribut `createdAt` dans votre modèle. Par défaut, `createdAt` est un attribut qui sera automatiquement défini lors de la création d'un enregistrement avec l'horodatage actuel (agnostique au timezone). S'il est défini comme chaîne de caractères, cette chaîne sera utilisée comme nom de colonne/champ personnalisé pour l'attribut `createdAt`.


### `autoUpdatedAt`

```javascript
autoUpdatedAt: true
```
S'il est défini à `false`, cela désactive la définition automatique d'un attribut `updatedAt` dans votre modèle. Par défaut, `updatedAt` est un attribut qui sera automatiquement défini avec l'horodatage actuel (agnostique au timezone) chaque fois qu'un enregistrement est mis à jour. S'il est défini comme chaîne de caractères, cette chaîne sera utilisée comme nom de colonne/champ personnalisé pour l'attribut `updatedAt`.

### tableName

```javascript
tableName: 'une_table_existante'
```

Vous pouvez définir un nom personnalisé pour la collection physique dans votre adaptateur en ajoutant un attribut `tableName`. __Ce n'est pas seulement pour tables__. Dans MySQL, PostgreSQL, Oracle, etc., ce paramètre fait référence au nom de la table, mais dans MongoDB ou Redis, il fait référence à la collection et ainsi de suite. Si aucun nom de table n'est spécifié, Waterline utilisera `identity` du modèle comme `tableName`.

Ceci est particulièrement utile pour travailler avec des bases de données existantes.

<!-- Dans WL2, c'est le `cid` (mais il est rétro-compatible) -->



### `attributes`

```js
attributes: {
  nom: { type: 'string' },
  email: { type: 'email' },
  age: { type: 'integer' }
}
```

Voir [Attributs](http://sailsjs.com/documentation/concepts/ORM/Attributes.html).




<docmeta name="displayName" value="Paramètres du modèle">
