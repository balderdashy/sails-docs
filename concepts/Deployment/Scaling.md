# Scalabilité

Si vous avez l'attente immédiate de beaucoup de trafic vers votre application (ou mieux encore, vous avez déjà le trafic),
Vous allez installer une architecture évolutive qui vous permettra d'ajouter des serveurs à mesure que de plus en plus de requêtes atteindront votre application.

### Performance

En production, Sails fonctionne comme n'importe quelle application Connect, Express ou Socket.io ([exemple](http://serdardogruyol.com/?p=111)). Si vous avez votre propre point de repère que vous aimeriez partager, écrivez un article ou un article de blog et tweet [@sailsjs](http://twitter.com/sailsjs). Cependant, mis à part les points de référence, gardez à l'esprit que la plupart des mesures de performance et d'évolutivité sont spécifiques à l'application. Les performances réelles de votre application auront beaucoup plus à voir avec la façon dont vous implémentez votre logique métier et vos appels de modèle que sur le framework sous-jacent que vous utilisez.

### Exemple d'architecture

```
                             ....                 
                    /  Sails.js server  \      /  Database (e.g. Mongo, Postgres, etc)
Load Balancer  <-->    Sails.js server    <-->    Socket.io message queue (Redis)
                    \  Sails.js server  /      \  Session store (Redis, Mongo, etc.)
                             ....                 
```


### Préparation de votre application pour un déploiement en cluster

La chose la plus importante à retenir sur la scalabilité d'une application côté serveur est qu'elle doit être **stateless**. Cela signifie que vous devriez être capable de déployer le même code sur _n_ serveurs différents, en attendant une demande entrante donnée traitée par un serveur donné, et tout devrait encore fonctionner. Heureusement, les applications Sails sont prêtes pour ce genre de déploiement. Mais avant de déployer votre application sur plusieurs serveurs, il ya quelques choses que vous devez faire:

+ Assurez-vous qu'aucune des autres dépendances, que vous utilisez peut-être dans votre application, se basent sur une mémoire partagée.
+ Assurez-vous que les bases de données de vos modèles (par exemple, MySQL, Postgres, Mongo) sont évolutives (par exemple sharding/cluster)
+ **Si votre application utilise des sessions :**
+ Configurez votre application pour qu'elle utilise un magasin de session partagée tel que Redis (décommentez simplement l'option `adapter` dans `config/session.js`) et installez l'adaptateur connect-redis comme une dépendance de votre application (par exemple `npm install connect-redis@~3.0.2 --save --save-exact`).
+ **Si votre application utilise des sockets:**
+ Configurez votre application pour utiliser Redis comme file d'attente de messages partagée pour la distribution des messages socket.io (décommenter l'option `adapter` dans `config/sockets.js`).
+ Installez l'adaptateur socket.io-redis en tant que dépendance de votre application (par exemple, `npm install socket.io-redis@~1.0.0 --save --save-exact`).
+ **Si votre cluster se trouve sur un seul serveur (par exemple, en utilisant [le mode de cluster pm2] (http://pm2.keymetrics.io/docs/usage/cluster-mode/))**
+ Pour éviter les conflits de fichiers en raison des tâches Grunt, lancez toujours vos applications dans l'environnement `production`, et/ou envisagez [de désactiver complètement Grunt](http://sailsjs.com/documentation/concepts/assets/disabling-grunt) . Voir [ici](https://github.com/balderdashy/sails/issues/3577#issuecomment-184786535) pour plus de détails sur les problèmes Grunt dans les clusters à serveur unique.
+ Faites attention avec le code [`config/bootstrap.js`](http://sailsjs.com/documentation/reference/configuration/sails-config-bootstrap) qui persiste dans une base de données, pour éviter les conflits lorsque le bootstrap s'exécute plusieurs fois (une fois par noeud dans le cluster).
  

### Déploiement d'une application Node/Sails vers un PaaS

Le déploiement de votre application sur un PaaS comme Heroku ou Modulus est très simple. Selon votre situation, il peut toujours y avoir quelques diables dans les détails, mais le support de Node avec les fournisseurs d'hébergement a obtenu _un très bon feedback_ au cours des deux dernières années. Jetez un oeil à [Hébergement](http://sailsjs.com/documentation/concepts/deployment/Hosting) pour plus d'informations spécifiques à la plate-forme.

### Déploiement de votre propre cluster

+ Déployez plusieurs instances (aka serveurs exécutant une copie de votre application) derrière un [load balancer] (https://fr.wikipedia.org/wiki/R%C3%A9partition_de_charge) (par exemple nginx)
+ Configurer votre load balancer pour terminer les requêtes SSL
+ Mais n'oubliez pas que vous n'aurez pas besoin d'utiliser la configuration SSL dans Sails - le trafic sera déjà déchiffré au moment où il atteindra Sails.
+ Soulevez votre application sur chaque instance à l'aide d'un démon comme `forever` ou` pm2` (pour en savoir plus voir http://sailsjs.com/documentation/concepts/deployment)

### Optimisation

L'optimisation d'un endpoint dans votre application Node/Sails est exactement comme l'optimisation d'un endpoint dans n'importe quelle autre application côté serveur; par exemple. Identifier et optimiser manuellement les requêtes lentes, réduire le nombre de requêtes, etc. Spécifiquement pour les applications node, si vous trouvez que vous avez un endpoint fortement sollicité qui consomme du CPU, recherchez des méthodes, des services ou des méthodes synchrones d'un modèle (bloquantes) ou des machines qui se sont peut être plongé dans une boucle ou une récursivité infinie.

Mais rappelles-toi:

> L'optimisation prématurée est la racine de tout mal. - [Donald Knuth](http://c2.com/cgi/wiki?PrematureOptimization)

Peu importe l'outil que vous utilisez, il est important de passer votre temps et votre attention sur l'écriture de haute qualité, bien documenté, le code lisible. De cette façon, si/quand vous êtes forcé d'optimiser un chemin de code dans votre application, vous trouverez qu'il est facile de le faire.


### Remarques

> + Vous n'avez pas à utiliser Redis pour vos sessions - vous pouvez réellement utiliser n'importe quel magasin de session Connect ou compatible avec Express. Voir [sails.config.session](sailsjs.com/documentation/reference/configuration/sails-config-session) pour plus d'informations.
> + La configuration Socket.io par défaut tente initialement de se connecter au serveur en utilisant [long-polling](https://fr.wikipedia.org/wiki/Server_push). Pour que cela fonctionne, votre environnement de serveur [doit supporter](http://socket.io/blog/introducing-socket-io-1-0/#scalability) le "sticky load-balancing" (aka les sticky sessions collantes), sinon le handshake échouera jusqu'à ce que la connexion soit mise à niveau pour utiliser Websockets (et uniquement si les Websockets sont disponibles).
> + Avec **Heroku**, vous devez disposer de la fonction sticky load balancing [explicitement activée](https://devcenter.heroku.com/articles/session-affinity).
> + Dans un environnement sans sticky load balancing, vous devez définir le paramètre `transports` dans [config/sockets.js] (https://github.com/balderdashy/sails-docs/blob/v0.11/reference/sails.config/sails.config.sockets.md) à `['websocket']`, ce qui l'oblige à n'utiliser que des websockets et à éviter le long-polling. Vous aurez également besoin de définir les transports dans votre socket client - si vous utilisez `sails.io.js`, c'est aussi simple que d'ajouter un script `<script>io.sails.transports=['websocket']</script>` immédiatement après l'inclusion du script` sails.io.js`. Pour une lecture assez dramatique sur la question, consultez [ce thread](https://github.com/Automattic/engine.io/issues/261).


<docmeta name="displayName" value="Scalabilité">
