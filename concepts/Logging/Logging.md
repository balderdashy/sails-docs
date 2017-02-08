# Logging

Sails est livré avec un logger simple, intégré, appelé [`captains-log`](https://github.com/balderdashy/captains-log). Son utilisation est très similaire à [`console.log`](https://nodejs.org/api/console.html#console_console_log_data), mais avec une plusieurs fonctionnalités supplémentaires; À savoir la prise en charge de plusieurs niveaux de log avec un affichage colorée et préfixée de la console. Il sert a deux choses:
+ Il émet des avertissements, des erreurs et d'autres sorties de la console à l'intérieur du framework Sails.
+ Il peut être utilisé pour émettre des [événements personnalisés/messages](http://sailsjs.com/documentation/concepts/logging/custom-log-messages) à partir du code de votre application.


### Configuration
La configuration du log de Sails est définie dans [`sails.config.log`](http://sailsjs.com/documentation/reference/configuration/sails-config-log), qui est classiquement définie par un fichier de configuration généré ([`config/log.js`](http://sailsjs.com/documentation/anatomy/my-app/config/log-js)) dans tout nouveau projet Sails.

### Utilisation

```
sails.log.error(new Error("Oh lala ! j'ai reçu une erreur :/"));
sails.log.debug("Je suis un message de débogage");
```

### Niveaux de log

En utilisant le logger intégré, Sails écrira la sortie (vers stdout/stderr) pour les appels de fonction log qui sont _à_ ou _en-dessous_ de la priorité du niveau de log configuré actuellement. Ce niveau de log normalisé est également appliqué à la sortie générée par Grunt, Socket.io, Waterline, Express et autres dépendances. La hiérarchie des niveaux de notation et leurs priorités relatives est résumée dans le tableau ci-dessous:

| Priorité | Niveau    | Les fonctions Log                     |
|----------|-----------|:--------------------------------------|
| 0        | silent    | _N/A_
| 1        | error     | `.error()`            |
| 2        | warn      | `.warn()`, `.error()` |
| 3        | debug     | `.debug()`, `.warn()`, `.error()` |
| 4        | info      | `.info()`, `.debug()`, `.warn()`, `.error()` |
| 5        | verbose   | `.verbose()`, `.info()`, `.debug()`, `.warn()`, `.error()` |
| 6        | silly     | `.silly()`, `.verbose()`, `.info()`, `.debug()`, `.warn()`, `.error()` |


#### Remarques
+ Le [niveau de log par défaut](http://sailsjs.com/documentation/reference/configuration/sails-config-log) est **info**. Lorsque le niveau de log de votre application est défini sur "info", Sails enregistre des informations limitées sur l'état du serveur/de l'application.
+ Lors de l'exécution de tests automatisés pour votre application, il est souvent utile de définir le niveau de log à **erreur**.
+ Lorsque le niveau du journal est réglé sur **verbose**, Sails enregistre la sortie Grunt, ainsi que des informations beaucoup plus détaillées sur les routes, modèles, hooks, etc. qui ont été chargés.
+ Lorsque le niveau du log est défini sur **silly**, Sails génère tout de **verbose** ainsi que des informations internes sur les routes qui sont liées et d'autres informations détaillées du cycle de vie du framework, des diagnostics et des détails d'implémentation.



<docmeta name="displayName" value="Logging">
