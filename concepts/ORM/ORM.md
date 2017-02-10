# Waterline: SQL/noSQL Data Mapper (ORM/ODM)


Sails est installé avec un puissant [ORM/ODM](http://stackoverflow.com/questions/12261866/what-is-the-difference-between-an-orm-and-an-odod) appelé [Waterline](https://github.com/balderdashy/waterline), un outil agnostique par rapport aux bases de données, qui simplifie considérablement l'interaction avec une ou plusieurs [bases de données](http://www.cs.umb.edu/cs630/hd1.pdf). Il fournit une couche d'abstraction sur la base de données sous-jacente, vous permettant de consulter et de manipuler facilement vos données _sans_ écrire le code d'intégration spécifique au fournisseur.

### Agnosticisme de la base de données

Dans des bases de données schématiques comme [Postgres](http://www.postgresql.org/), [Oracle](https://www.oracle.com/database) et [MySQL](http://www.mysql.com), les modèles sont représentés par des tableaux. Dans [MongoDB](http://www.mongodb.org), ils sont représentés par des "collections" de Mongo. Dans [Redis](http://redis.io), ils sont représentés à l'aide de paires clé/valeur. Chaque base de données a son propre dialecte de requête distincte, et dans certains cas même nécessite l'installation et la compilation d'un module natif spécifique pour se connecter au serveur.

La syntaxe de la requête Waterline flotte au-dessus de tout ça, en se concentrant sur la logique métier comme la création de nouveaux enregistrements, la recherche des enregistrements existants, la mise à jour ou la destruction des enregistrements. Peu importe la base de données que vous avez choisi, l'utilisation est _exactement la même_. De plus, Waterline vous permet de créer des associations [`.populate()`](http://sailsjs.com/documentation/reference/waterline/queries/populate.html) entre les modèles, même si les données de chaque modèle sont différentes base de données. Cela signifie que vous pouvez passer des modèles de votre application de Mongo, Postgres, MySQL, Redis, et de retour - sans changer de code. Pour les moments où vous avez besoin de fonctionnalités bas niveau, spécifiques à la base de données, Waterline fournit une interface de requête qui vous permet de communiquer directement au pilote de base de données de votre modèle (voir [`.query()`](http://sailsjs.com/documentation/reference/waterline/models/query.html) et [`.native()`] (http://sailsjs.com/documentation/reference/waterline/models/native.html).)



### Scénario

Imaginons que vous construisez un site Web e-commerce avec une application mobile associée. Les utilisateurs parcourent les produits par catégorie ou recherchent des produits par mot-clé, puis ils les achètent. C'est tout! Certaines parties de votre application sont assez ordinaires; Vous disposez d'un flux piloté par l'API pour vous connecter, vous inscrire, traiter les commandes/paiements, réinitialiser les mots de passe, etc. Cependant, vous savez qu'il y a quelques traits mondains qui se cachent dans votre feuille de route. Assez sur:

##### La flexibilité

_Vous demandez à l'entreprise quelle base de données ils aimeraient utiliser :_

> "Datab ... quoi? Ne soyons pas hâtifs, ne voudrions pas faire le mauvais choix, je vais obtenir l'avis ops/IT sur cette question. Allez-y commencez le travail !"

La méthode traditionnelle de choisir une base de données unique pour une application Web/API est en fait prohibitive pour de nombreux cas d'utilisation de la production. Souvent, l'application doit maintenir la compatibilité avec un ou plusieurs ensembles de données existants, ou il est nécessaire d'utiliser quelques types différents de bases de données pour des raisons de performances.

Comme Sails utilise `sails-disk` par défaut, vous pouvez commencer à construire votre application sans configuration, en utilisant un fichier temporaire local comme stockage. Lorsque vous êtes prêt d'aller en production, il suffit de changer votre application [configuration de connexion](http://sailsjs.com/documentation/reference/configuration/sails-config-connections ).



##### Compatibilité

_Le propriétaire/intervenant du produit vous accompagne et vous dit :_

> "Dis en passant, les produits existent déjà dans notre système de point de vente. Je crois que c'est un ERP, quelque chose comme "DB2"? Quoi qu'il en soit, je suis sûr que vous allez le comprendre - ça semble non ?"

De nombreuses applications d'entreprise doivent s'intégrer à une base de données existante. Si vous avez de la chance, une migration de données ponctuelle peut être tout ce qui est nécessaire, mais plus souvent, l'ensemble de données existant est toujours modifié par d'autres applications. Pour construire votre application, vous pourriez avoir besoin d'épouser des données provenant de plusieurs systèmes existants ou d'un ensemble de données distinct stocké ailleurs. Ces ensembles de données pourraient vivre sur 5 serveurs différents dispersés à travers le monde ! Un serveur de base de données co-implanté peut héberger une base de données SQL avec des données relationnelles, tandis qu'un autre serveur Cloud peut contenir une poignée de collections Mongo ou Redis.

Sails/Waterline vous permet de raccorder différents modèles à différents magasins de données (datastores); Localement ou n'importe où sur Internet. Vous pouvez créer un modèle `Utilisateur` qui mappe à une table MySQL personnalisée dans une base de données héritée (avec des noms de colonnes bizarres). Même chose pour un modèle de produit qui correspond à une table dans DB2 ou un modèle de commande qui correspond à une collection MongoDB. Le meilleur de tous, vous pouvez `.populate()` à travers ces différents datastores et adaptateurs, donc si vous configurez un modèle pour vivre dans une base de données différente, votre contrôleur/code de modèle n'a pas besoin de changer (notez que vous allez migrer manuellement toutes les données de production importantes)

##### Performance

_Vous êtes assis en face de votre ordinateur portable tard dans la nuit, et vous vous rendez compte :_
> "Comment puis-je faire une recherche par mot-clé?" Les données du produit n'ont pas de mots-clés et l'entreprise veut que les résultats de la recherche soient classés en fonction des séquences de mots n-gram. J'entends le mot `big data` une fois de plus ce soir, je quitte et retourne travailler au café."

Qu'en est-il des `big data` ? Normalement, lorsque vous entendez les blogueurs et les analystes utiliser ce mot à la mode, vous pensez au data mining and business intelligence. Vous pouvez imaginer un processus qui extrait des données à partir de sources multiples, les traite/indexe/analyse, puis écrit que les informations extraites ailleurs et conserve les données d'origine ou les jette.

Cependant, il existe des défis beaucoup plus communs qui se prêtent aux mêmes besoins d'indexation/analyse; Des fonctionnalités telles que la recherche "driving-direction-closeness" ou un moteur de recommandation pour les produits connexes. Heureusement, un certain nombre de bases de données simplifient des cas spécifiques d'utilisation de données importantes (MongoDB fournit par exemple l'indexation géospatiale et ElasticSearch fournit un excellent support pour l'indexation des données pour la recherche en texte intégral).

L'utilisation des bases de données de la manière dont elles sont conçues offre d'énormes avantages en matière de performances, en particulier lorsqu'il s'agit de requêtes complexes de rapports, de recherche (qui est vraiment un tri personnalisé) et d'apprentissage NLP/machine. Certaines bases de données sont très efficaces pour répondre à des requêtes d'entreprise relationnelles traditionnelles, alors que d'autres sont mieux adaptées au traitement de données cartographiques/réduites, avec des optimisations et des compromis pour des écritures et des écritures flamboyantes. Cette considération est particulièrement importante en tant qu'échelle de base de votre application.

### Adaptateurs

Comme la plupart des frameworks MVC, Sails prend en charge [plusieurs bases de données](http://sailsjs.com/features). Cela signifie que la syntaxe pour interroger et manipuler nos données est toujours la même, que nous utilisions MongoDB, MySQL ou toute autre base de données prise en charge.

Waterline s'appuie sur cette flexibilité avec son concept d'adaptateurs. Un adaptateur est un peu de code qui mappe des méthodes comme `find()` et `create()` à une syntaxe de niveau inférieur comme `SELECT * FROM` et `INSERT INTO`. L'équipe de Sails maintient des adaptateurs open-source pour les [bases de données les plus populaires](http://sailsjs.com/features), et des [adaptateurs communautaires](https://github.com/balderdashy/sails-docs/blob/0.9/Database-Support.md) sont également disponibles.

Les adaptateurs personalisés Waterline sont réellement [assez simples à construire](https://github.com/balderdashy/sails-generate-adapter), et peuvent faire pour des intégrations plus maintenables; d'un système de compte d'entreprise propriétaire, vers un cache, vers une base de données traditionnelle.


### Les connexions

Une **connexion** représente une configuration de base de données particulière. Cet objet de configuration inclut un adaptateur à utiliser, ainsi que des informations telles que l'hôte, le port, le nom d'utilisateur, le mot de passe, etc. Si votre base de données ne nécessite pas de mot de passe, supprimez simplement la propriété mot de passe. Les connexions sont définies dans [`config/connections.js`](http://sailsjs.com/documentation/reference/sails.config/sails.config.connections.html).

```javascript
// dans config/connections.js
// ...
{
  adapter: 'sails-mysql',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'g3tInCr4zee&stUfF'
}
// ...
```

Selon l'adaptateur utilisé, il est également possible d'utiliser des sockets unix, sans port ni hôte ni URL. Voici un exemple utilisant un serveur MAMP mysql existant et un adaptateur sails-mysql:

```javascript
// dans config/local.js
// ...
connections:{
  local_mysql:{ // un nom arbitraire
    module: 'sails-mysql',
    user: 'root',
    password: 'root',
    database: 'sailstest1',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
  }
}
// ...
```

Et un autre exemple de configuration de l'adaptateur à l'aide d'une url:

```javascript
// dans config/local.js
// ...
connections:{
  local_mysql:{ // un nom arbitraire
    module: 'sails-mysql',
    url: 'mysql://root:root@localhost:3306/sailstest1'
  }
}
// ...
```

Pour une application Sails, la connexion de base de données par défaut se trouve dans la configuration du modèle de base (`config/models.js`), mais elle peut également être remplacée par modèle en spécifiant une [`connection`](http://sailsjs.com/documentation/reference/sails.config/sails.config.connections.html). Souvent, il est également utile de remplacer l'objet connexions dans [`config/local.js`](http://sailsjs.com/documentation/concepts/configuration/the-local-js-file)


### Analogie

Imaginez un classeur rempli de formulaires remplis de stylo et d'encre. Tous les formulaires ont les mêmes champs (par exemple, "nom", "date de naissance", "état marital"), mais pour chaque formulaire, les valeurs exprimées dans les champs varient. Par exemple, un formulaire peut contenir "Lara", "2000-03-16T21:16:15.127Z", "simple", tandis qu'un autre formulaire contient "Larry", "1974-01-16T21:16:15.127Z», "marié".

Imaginez maintenant que vous dirigez une entreprise de hot-dogs. Si vous étiez très organisé, vous pouvez configurer vos classeurs comme suit:

+ **Employee** (contient les enregistrements de vos employés)
  + `nomComplet`
  + `salaire`
  + `telephone`
+ **pointDeVente** (Contient un enregistrement de l'adresse de chaque point de vente)
  + `adresse`
  + `ville`
  + `province`
  + `codePostal`
  + `ventes`
    + Une liste de tous les achats effectués à cet endroit
  + `responsable`
    + L'employé qui gère cet endroit
+ **Vente** (Contient un enregistrement pour chaque achat effectué par l'un de vos clients)
  + `pointDeVente`
  + `produits`
  + `createdAt`
    + Date et heure de création de l'enregistrement (auto-rempli)
+ **Produit** (Contient un enregistrement pour chacune de vos produits)
  + `nom`
  + `prix`
  + `nombreDeCalories`
  + `pourcentageDeViande`
  + `disponibleA`
    + Une liste des points de vente où cette offre de produit est disponible.


Dans votre application Sails, un **modèle** est comme l'un des classeurs. Il contient des **enregistrements**, qui sont comme les formulaires. Les «attributes» sont comme les champs de chaque formulaire.

### Remarques
+ Cette documentation sur les modèles n'est pas applicable si vous remplacez l'ORM intégré, [Waterline](https://github.com/balderdashy/waterline). Dans ce cas, vos modèles suivront la convention que vous avez établie, en plus de la bibliothèque ORM que vous utilisez (par exemple, Mongoose).




<docmeta name="displayName" value="Modèle et ORM">
