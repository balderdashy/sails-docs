# Déploiement

### Avant de déployer

Avant de lancer une application Web, vous devez vous poser quelques questions:

+ Quel est le trafic prévu?
+ Êtes-vous tenu contractuellement de respecter les garanties de disponibilité? Un contrat de niveau de service (SLA)?
+ Quelles sortes d'applications frontales vont solliciter votre infrastructure?
   + Applications Android / iOS / Windows Phone
   + Navigateurs web de bureau
   + Navigateurs web mobiles (tablettes, téléphones, iPad mini)
   + Cordova / Electron apps
   + Téléviseurs, montres, grille-pain ..?
+ Et quels genres de choses vont-ils demander? (Par exemple HTML? JSON? XML?)
+ Est-ce que vous profitez des fonctionnalités pubsub en temps réel avec Socket.io?
   + Par ex. Chat, analyse en temps réel, notifications/messages intégrés à l'application
+ Comment surveillez-vous les accidents et les erreurs?
   + Utilisez-vous `sails.log()`? Ou utilisez-vous un logger personnalisé de NPM comme [Winston](https://github.com/winstonjs/winston)?



### Configuration de votre application pour la production

Vous pouvez fournir une configuration qui ne s'applique que dans la production de [quelques différentes manières](http://sailsjs.com/documentation/reference/configuration). La plupart des applications se trouvent en utilisant un mélange de variables d'environnement et `config/env/production.js`. Mais quelle que soit la façon dont vous procédez, cette section et la section [Scaling](http://sailsjs.com/documentation/concepts/deployment/scaling) de la documentation couvrent les paramètres de configuration que vous devez examiner et/ou modifier avant d'aller en production.


### Déploiement sur un seul serveur

Node.js est assez rapide. Pour de nombreuses applications, un serveur suffit à gérer le trafic prévu - au moins début.

> Cette section se concentre sur _le déploiement sur un seul serveur_. Ce type de déploiement est intrinsèquement limité en échelle. Voir [Mise à l'échelle](http://sailsjs.com/documentation/concepts/deployment/scaling) pour plus d'informations sur le déploiement de votre application Sails/Node derrière un load balancer.

De nombreuses équipes décident de déployer leur application de production derrière un load balancer ou un proxy (par exemple, dans un PaaS tel que Heroku ou Modulus ou derrière un serveur nginx). C'est souvent la bonne approche puisqu'elle permet d'assurer l'évolutivité de votre application au cas où votre évolutivité nécessiterait d'être modifiée et que vous devriez ajouter d'autres serveurs. Si vous utilisez un load balancer ou un proxy, il ya quelques éléments dans la liste ci-dessous que vous pouvez ignorer:

+ Ne vous inquiétez pas de configurer Sails pour utiliser un certificat SSL. SSL sera presque toujours résolu à votre load balancer/serveur proxy, ou par votre fournisseur PaaS.
+ Vous n'avez _probablement_ pas à vous soucier de la configuration de votre application pour s'exécuter sur le port 80 (si ce n'est pas derrière un proxy comme nginx). La plupart des fournisseurs PaaS détectent automatiquement le port pour vous. Si vous utilisez un serveur proxy, reportez-vous à sa documentation (que vous ayez besoin ou non de configurer le port pour votre application Sails, cela dépend de votre configuration et peut varier largement selon vos besoins).

> Si votre application utilise des sockets et que vous utilisez nginx, assurez-vous de la configurer pour relayer les messages websocket sur votre serveur. Vous pouvez trouver des conseils sur le proxy WebSockets dans [les documents de nginx sur ce sujet](http://nginx.org/en/docs/http/websocket.html).

##### Définissez la variable d'environnement `NODE_ENV` sur `'production'`

La configuration de la configuration de l'environnement de votre application sur `'production'` indique à Sails qu'on est sur scène; C'est-à-dire que votre application s'exécute dans un environnement de production. C'est l'étape la plus importante. Si vous avez seulement le temps de changer _un paramètre_ avant de déployer votre application Sails, _ça doit être ce paramètre_!

Lorsque votre application s'exécute dans un environnement de production:
   + Le middleware et autres dépendances dans Sails passent à l'utilisation de code plus efficace.
   + Tous vos [paramètres de migration des modèles](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings) sont forcés à `migrate: 'safe'`. Il s'agit d'un dispositif de protection contre les risques d'endommager vos données de production pendant le déploiement.
   + Votre pipeline d'assets fonctionne en mode production (le cas échéant). Cela signifie que votre application Sails compilera toutes les feuilles de style, les scripts côté-client et les templates JST précompilés dans les fichiers `.css` et `.js` minifiés pour réduire les temps de chargement de la page et réduire la consommation de bande passante.
   + Les messages d'erreur et les traces de la pile d'exécution de `res.serverError ()` seront toujours enregistrés, mais ne seront pas envoyés dans la réponse (ceci est pour empêcher un éventuel attaquant d'accéder à des informations sensibles telles que des mots de passe cryptés ou le chemin d'accès où votre application Sails se trouve sur le système de fichiers du serveur).

> ** Note: **
> Si vous configurez [`sails.config.environment`](http://sailsjs.com/documentation/reference/configuration/sails-config#?sailsconfigenvironment) à `'production'` autrement, c'est totalement cool. Il suffit de noter que Sails va définir automatiquement la variable d'environnement `NODE_ENV` à `'production'` pour vous. La raison pour laquelle cette variable d'environnement est si importante est qu'il s'agit d'une convention universelle dans Node.js, quel que soit le framework que vous utilisez. Le middleware et les dépendances intégrés dans Sails _s'attendent_ à ce que `NODE_ENV` soit définie en production - sinon ils utilisent leurs chemins de code moins efficaces qui ont été conçus pour une utilisation de développement.


##### Configurer votre application pour qu'elle s'exécute sur le port 80

Que ce soit en utilisant la variable d'environnement `sails_port`, en définissant l'option de ligne de commande` --port` ou en modifiant vos fichiers de configuration de production, ajoutez ce qui suit au niveau supérieur de votre configuration de Sails:

```javascript
port: 80
```

> Comme mentionné ci-dessus, ignorez cette étape si votre application fonctionnera derrière un load balancer ou un proxy.

##### Configurer la (les) base(s) de données production pour vos modèles

Pour configurer une ou plusieurs bases de données de production, configurez-les dans [`sails.config.connections`](http://sailsjs.com/documentation/reference/configuration/sails-config-connections), puis consultez-les à partir de [`Sails.config.models.connection`](http://sailsjs.com/documentation/reference/configuration/sails-config-models) et/ou à partir de modèles individuels. Pour la plupart des applications, vos modifications de configuration de production sont assez simples:
1. Ajoutez une connexion représentant votre base de données de production (par exemple, `productionPostgresql: {...}`)
2. remplacer la connexion par défaut (`sails.config.models.connection`) pour pointer vers votre base de données de production (par exemple` productionPostgresql`)

Si votre application utilise plus d'une base de données, votre processus sera similaire. Cependant, vous constaterez probablement qu'il est plus facile de remplacer les paramètres de connexion existants plutôt que d'ajouter de nouvelles connexions et de modifier des modèles individuels pour les pointer. Peu importe comment vous procédez à ce sujet, si vous utilisez plusieurs bases de données, vous devez être sûr que vos modèles sont pointés sur les bonnes connexions lorsque vous déployez en production.

Gardez à l'esprit que si vous utilisez le contrôle de version (par exemple, git), toutes les informations d'identification sensibles (comme les mots de passe de base de données) seront enregistrées dans le dossier si vous les incluez dans les fichiers de configuration de votre application. Une solution commune à ce problème consiste à fournir certains paramètres de configuration sensibles en tant que variables d'environnement. Voir la section [Configuration](http://sailsjs.com/documentation/concepts/configuration) pour plus d'informations.

Si vous utilisez une base de données relationnelle telle que MySQL, il existe une étape supplémentaire. Vous rappelez-vous comment Sails définit tous vos modèles sur `migrate: safe` lorsqu'ils sont exécutés en production ? Cela signifie qu'aucune migration automatique n'est exécutée lors du démarrage de l'application ... ce qui signifie que par défaut vos tables n'existeront pas. Une approche commune pour résoudre ce problème lors de la première configuration d'une base de données relationnelle pour votre application Sails est la suivante:
   + Créer la base de données sur le serveur de base de données de production (par exemple `frenchfryparty`)
   + Configurez votre application localement pour utiliser cette base de données de production, mais ne définissez pas l'environnement `'production'` et laissez le jeu de configuration de vos modèles à `migrate: 'alter'`. Maintenant, lancez `sails lift` **une fois** et quand le serveur local finit de démarrer, tuez-le.
   + ** Soyez prudent! ** Vous ne devriez le faire que s'il n'y a pas de données dans la base de données de production.

Si cela vous rend nerveux ou si vous ne pouvez pas vous connecter à la base de données de production à distance, vous pouvez sauter les étapes ci-dessus. Au lieu de cela, il suffit de vider votre schéma local et de l'importer dans la base de données de production.

##### Activer la protection CSRF

La protection contre CSRF est une mesure de sécurité importante pour les applications Sails. Si vous n'avez pas déjà développé avec une protection CSRF activée (voir [`sails.config.csrf`](http://sailsjs.com/documentation/reference/configuration/sails-config-csrf)), veillez à [l'activation de la protection CSRF](http://sailsjs.com/documentation/concepts/Security/CSRF.html?q=enabling-csrf-protection) avant de passer à la production.


##### Activer SSL

Si votre API ou site Web fait tout ce qui nécessite une authentification, vous devez utiliser SSL en production. Pour configurer votre application Sails pour utiliser un certificat SSL, utilisez [`sails.config.ssl`](http://sailsjs.com/documentation/reference/configuration/sails-config).

> Comme mentionné ci-dessus, ignorez cette étape si votre application fonctionnera derrière un load blancer ou un proxy.



##### Démarrez votre App

La dernière étape du déploiement est en fait le démarrage du serveur. Par exemple:

```bash
NODE_ENV=production node app.js
```

Ou si vous êtes plus à l'aise avec les options de ligne de commande, vous pouvez utiliser `--prod`:
```
node app.js --prod
# (Sails will set `NODE_ENV` automatically)
```

Comme vous pouvez le voir, au lieu d'utiliser `sails lift`, vous devez démarrer votre application Sails avec `node app.js` en production. De cette façon, votre application ne dépend pas de l'accès à la ligne de commande `sails`; Il suffit d'exécuter le fichier `app.js` fourni dans votre application Sails (qui fait exactement la même chose).

##### ... et gardez le voile levé

À moins que vous n'utilisiez pas PaaS comme Heroku ou Modulus, vous voudrez utiliser un outil comme [`pm2`](http://pm2.keymetrics.io/) ou [`forever`](https://github.com/foreverjs/forever) pour vous assurer que votre serveur d'applications redémarrera en cas de panne. Quel que soit le démon que vous choisissez, vous devez vous assurer qu'il démarre le serveur comme décrit ci-dessus.

Pour des raisons de commodité, voici des exemples de commandes de démarrage pour `pm2` et` forever`:

Utiliser `pm2`:

```bash
pm2 start app.js -x -- --prod
```

Utiliser `forever`:

```bash
forever start app.js --prod
```




<docmeta name="displayName" value="Déploiement">
