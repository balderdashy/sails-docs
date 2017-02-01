# app.js

### Objectif

Ce fichier est le point d'entrée classique pour une application Sails/Node.js.

Lors du développement sur votre machine local, et que vous exécutez `sails lift`, le code de` app.js` n'est pas exécuté. Au lieu de cela, ce fichier existe pour fournir un moyen simple et rapide de lancer votre application _sans_ taper `sails lift`. C'est très probablement la façon dont vous démarrez votre application en production (c'est-à-dire `node app` ou` npm start`).

Par exemple, lorsque vous déployez chez la plupart des fournisseurs PaaS comme [Heroku] (http://heroku.com), ils détecteront automatiquement que vous exécutez une application Sails/Node.js avec la variable d'environnement `NODE_ENV` mis à `production`.

> Peu importe le stade du cycle de développement dans lequel vous êtes, vous pouvez ignorer le fichier `app.js`. Il est bon de sortir de l'ordinaire pour la plupart des applications. Mais le code de `app.js` sert également d'exemple facile sur la façon d'utiliser Sails. Ainsi, vous pouvez jeter un coup d'oeil sur ce fichier si vous prévoyez d'écrire des tests automatisés, des tâches planifiés, des migrations manuelles de base de données ou des scripts d'administration.

<docmeta name="displayName" value="app.js">
