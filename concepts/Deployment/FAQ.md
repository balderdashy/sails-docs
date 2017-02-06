# FAQ

### Puis-je utiliser des variables d'environnement?

Oui! Comme toute application Node, vos variables d'environnement sont disponibles sous `process.env`.

Sails a également une prise en charge intégrée pour créer vos propres paramètres de configuration personnalisés qui seront exposés directement dans `sails.config`. Et que ce soit personnalisé ou intégré, n'importe quelle propriété de configuration de `sails.config` peut être surchargée en utilisant des variables d'environnement. Pour plus de détails, consultez la documentation conceptuelle sur [la configuration](http://sailsjs.com/documentation/concepts/configuration).


### Où puis-je placer mes références de base de données de production? Et les autres réglages?

La manière la plus simple d'ajouter la configuration à votre application Sails est de modifier les fichiers dans `config/` ou d'en ajouter de nouveaux fichiers. Sails prend en charge le chargement de la configuration spécifique à l'environnement, de sorte que vous pouvez utiliser `config/env/production.js`. Reportez-vous à la documentation conceptuelle sur [la configuration] (http://sailsjs.com/documentation/concepts/configuration) pour plus de détails.

Mais parfois, vous ne souhaitez pas vérifier certaines informations de configuration dans votre dépôt. **Le meilleur endroit pour mettre ce type de configuration est dans les variables d'environnement.**

Cela dit, pour le développement (par exemple sur votre ordinateur portable), l'utilisation de variables d'environnement peut parfois être assez gênant. Donc, pour vos autres paramètres spécifiques au déploiement/machine, à savoir tout type d'informations d'identification que vous souhaitez garder privé, vous pouvez également utiliser votre fichier `config/local.js`. Ce fichier est inclus dans votre fichier `.gitignore` par défaut, ce qui vous empêche de commiter par erreur vos informations d'identification dans votre dépôt de code.

**config/local.js**
```javascript
// Configuration locale
// 
// Inclus par défaut dans le fichier .gitignore,
// c'est là que vous incluez les surcharges de configuration pour votre système local
// ou pour un déploiement en production.
//
// Par exemple, pour utiliser le port 80 sur la machine locale, remplacer la configuration `port`
module.exports = {
    port: 80,
    environment: 'production',
    adapters: {
        mysql: {
            user: 'root',
            password: '12345'
        }
    }
}
```



### Comment puis-je mettre mon application Sails sur le serveur?

Si vous utilisez un Paas comme Heroku ou Modulus, c'est facile: il suffit de suivre leurs instructions.

Sinon, obtenez l'adresse IP de votre serveur et `ssh`. Ensuite `npm install -g sails` et `npm install -g forever` pour installer Sails et `forever` globalement de NPM pour la première fois sur le serveur. Enfin, faire un `git clone` votre projet (ou` scp` il sur le serveur si ce n'est pas dans un repo git) dans un nouveau dossier sur le serveur, exécutez un `cd` dans ce dossier, puis exécutez` forever start app.js`.

### Que dois-je attendre en ce qui concerne la performance?

La performance de base dans Sails est comparable à ce que vous attendez d'une application Node.js/Express standard. En d'autres termes, c'est rapide ! Nous avons fait quelques optimisations nous-mêmes dans Sails core, mais principalement notre objectif n'est pas de gâcher ce que nous recevons gratuitement de nos dépendances. Pour un benchmark rapide et sale, consultez [http://serdardogruyol.com/sails-vs-rails-a-quick-and-dirty-benchmark](http://serdardogruyol.com/sails-vs-rails-a- Quick-and-dirty-benchmark).

Le point d'étranglement de performance le plus commun dans les applications de production Sails est la base de données. Au cours de la durée d'une application avec une base d'utilisateurs croissante, il devient de plus en plus important de mettre en place de bons index sur vos tables/collections et d'utiliser des requêtes qui renvoient des résultats paginés. Au fur et à mesure que votre base de données de production croît pour contenir des dizaines de millions d'enregistrements, vous allez commencer à localiser et à optimiser les requêtes lentes manuellement (soit en appelant [`.query ()`](http://sailsjs.com/documentation/reference/) Waterline-orm / models / query) ou [`.native ()`](http://sailsjs.com/documentation/reference/waterline-orm/models/native) ou en utilisant le pilote de base de données de NPM).

### Quel est cet avertissement concernant le stockage en mémoire de la session de connexion?

Si vous utilisez des sessions dans votre application Sails, vous ne devez pas utiliser le magasin de mémoire intégré en production. Le stockage de session en mémoire est un outil de développement uniquement, il ne s'étend pas sur plusieurs serveurs; Et même si vous n'avez qu'un seul serveur, ce n'est pas particulièrement performant (voir [#3099](https://github.com/balderdashy/sails/issues/3099) et [#2779](https://github.com/Balderdashy/sails/issues/2779)).

Pour plus d'informations sur la configuration du stockage de sessions en production, consultez [sails.config.session](http://sailsjs.com/documentation/reference/configuration/sails-config-session). Si vous voulez désactiver complètement le support de session, désactivez le hook `session` dans le fichier` .sailsrc` de votre application:
```javascript
"hooks": {
  "session": false
}
```


<docmeta name="displayName" value="FAQ">

