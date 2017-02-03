# config/bootstrap.js
### Objectif
Il s'agit d'un fichier javascript côté serveur qui est exécuté par Sails juste avant le démarrage de votre application.

Cela vous donne la possibilité de configurer votre modèle de données, d'exécuter des tâches ou d'effectuer une logique spéciale.


<docmeta name="displayName" value="bootstrap.js">

```
/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.com/documentation/reference/configuration/sails-config-bootstrap
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};

```
