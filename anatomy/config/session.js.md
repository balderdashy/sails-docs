# config/session.js
### Objectif
Ce fichier contient des informations qui indiquent à Sails où stocker vos sessions.

L'intégration de session Sails s'appuie fortement sur le travail déjà effectué par Express, mais unifie également socket.io avec le magasin de sessions Connect. Il utilise l'analyseur de cookie de Connect pour normaliser les différences de configuration entre Express, socket.io et les hooks dans l'interpréteur middleware Sails pour vous permettre d'accéder et d'auto-enregistrer dans `req.session` avec Socket.io (de la même manière que vous le feriez avec Express).

C'est là que vous allez configurer un magasin de session différent comme Redis ou Mongo. Dans ce fichier, vous trouverez des exemples commentés de ce que devrait ressembler cette configuration là.

Ce fichier contient également votre 'Session Secret' généré par Sails lors de la création de votre application. Ne changez pas ou ne supprimez pas ceci à moins que vous ne sachiez vraiment ce que vous faites.

<docmeta name="displayName" value="session.js">

```
/**
 * Session Configuration
 * (sails.config.session)
 *
 * Sails session integration leans heavily on the great work already done by
 * Express, but also unifies Socket.io with the Connect session store. It uses
 * Connect's cookie parser to normalize configuration differences between Express
 * and Socket.io and hooks into Sails' middleware interpreter to allow you to access
 * and auto-save to `req.session` with Socket.io the same way you would with Express.
 *
 * For more information on configuring the session, check out:
 * http://sailsjs.com/documentation/reference/configuration/sails-config-session
 */

module.exports.session = {

  // Session secret is automatically generated when your new app is created
  // Replace at your own risk in production-- you will invalidate the cookies of your users,
  // forcing them to log in again.
  secret: 'cdf93c72c05f104f6183613e2f8262c2',


  // Set the session cookie expire time
  // The maxAge is set by milliseconds, the example below is for 24 hours
  //
  // cookie: {
  //   maxAge: 24 * 60 * 60 * 1000
  // }


  // In production, uncomment the following lines to set up a shared redis session store
  // that can be shared across multiple Sails.js servers
  // adapter: 'redis',
  //
  // The following values are optional, if no options are set a redis instance running
  // on localhost is expected.
  // Read more about options at: https://github.com/visionmedia/connect-redis
  //
  // host: 'localhost',
  // port: 6379,
  // ttl: <redis session TTL in seconds>,
  // db: 0,
  // pass: <redis auth password>
  // prefix: 'sess:'


  // Uncomment the following lines to use your Mongo adapter as a session store
  // adapter: 'mongo',
  //
  // host: 'localhost',
  // port: 27017,
  // db: 'sails',
  // collection: 'sessions',
  //
  // Optional Values:
  //
  // # Note: url will override other connection settings
  // url: 'mongodb://user:pass@host:port/database/collection',
  //
  // username: '',
  // password: '',
  // auto_reconnect: false,
  // ssl: false,
  // stringify: true

};

```
