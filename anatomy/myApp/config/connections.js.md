# myApp/config/connections.js
### Purpose
This file contains the settings for all of your adapters.

In Sails, adapters act as the intermediary between the app and the database.  To put it another way, they act as plugins for [Waterline](https://github.com/balderdashy/waterline), the  [ORM](http://en.wikipedia.org/wiki/Object-relational_mapping) that Sails uses to talk to databases.   

This file lets you create different global "saved settings" that you can mix and match in your models. The [`sails.models.connection`](http://sailsjs.org/documentation/anatomy/myApp/config/models.js.html) option indicates which connection should be used if a model doesn't have one [explicitly specified](http://sailsjs.org/documentation/concepts/ORM/model-settings.html?q=connection).

<docmeta name="uniqueID" value="connectionsjs160878">
<docmeta name="displayName" value="connections.js">

```
/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can be (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you from inadvertently pushing sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://links.sailsjs.org/docs/config/connections
 */

module.exports.connections = {

  // Local disk storage for DEVELOPMENT ONLY
  //
  // Installed by default.
  //
  localDiskDb: {
    adapter: 'sails-disk'
  },

  // MySQL is the world's most popular relational database.
  // http://en.wikipedia.org/wiki/MySQL
  //
  // Run:
  // npm install sails-mysql
  //
  someMysqlServer: {
    adapter: 'sails-mysql',
    host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
    user: 'YOUR_MYSQL_USER',
    password: 'YOUR_MYSQL_PASSWORD',
    database: 'YOUR_MYSQL_DB'
  },

  // MongoDB is the leading NoSQL database.
  // http://en.wikipedia.org/wiki/MongoDB
  //
  // Run:
  // npm install sails-mongo
  //
  someMongodbServer: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    // user: 'username',
    // password: 'password',
    // database: 'your_mongo_db_name_here'
  },

  // PostgreSQL is another officially supported relational database.
  // http://en.wikipedia.org/wiki/PostgreSQL
  //
  // Run:
  // npm install sails-postgresql
  //
  somePostgresqlServer: {
    adapter: 'sails-postgresql',
    host: 'YOUR_POSTGRES_SERVER_HOSTNAME_OR_IP_ADDRESS',
    user: 'YOUR_POSTGRES_USER',
    password: 'YOUR_POSTGRES_PASSWORD',
    database: 'YOUR_POSTGRES_DB'
  }


  // More adapters:
  // https://github.com/balderdashy/sails

};

```
