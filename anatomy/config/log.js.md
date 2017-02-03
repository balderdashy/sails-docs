# config/log.js
### Objectif

Ce fichier contient la configuration du logger (gestionnaire des fichiers journaux) pour votre application Sails.

Configurez le niveau du log pour votre application, ainsi que le transport.

En arriére plan, Sails utilise Winston pour la journalisation, ce qui permet de quelques jolis transports/adaptateurs personnalisés pour les messages log.



<docmeta name="displayName" value="log.js">

```
/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.com/documentation/reference/configuration/sails-config-log
 */

module.exports = {

  // Valid `level` configs:
  // i.e. the minimum log level to capture with sails.log.*()
  //
  // 'error'  : Display calls to `.error()`
  // 'warn'  : Display calls from `.error()` to `.warn()`
  // 'debug'  : Display calls from `.error()`, `.warn()` to `.debug()`
  // 'info'  : Display calls from `.error()`, `.warn()`, `.debug()` to `.info()`
  // 'verbose': Display calls from `.error()`, `.warn()`, `.debug()`, `.info()` to `.verbose()`
  //
  log: {
    level: 'info'
  }

};

```
