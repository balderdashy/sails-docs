# config/connections.js
### Objectif
Ce fichier contient les paramètres de tous vos adaptateurs.

Dans Sails, les adaptateurs servent d'intermédiaire entre l'application et la base de données. En d'autres termes, ils agissent comme plugins pour [Waterline] (https://github.com/balderdashy/waterline), l'[ORM] (https://fr.wikipedia.org/wiki/Mapping_objet-relationnel) que Sails utilise pour communiquer avec les bases de données.

Ce fichier vous permet de créer différents paramètres globaux "d'enregistrement" que vous pouvez mixer et faire correspondre à vos modèles. L'option [`sails.models.connection`] (http://sailsjs.com/documentation/anatomy/config/models.js.html) indique quelle connexion doit être utilisée si un modèle n'a pas un [spécifié explicitement](http://sailsjs.com/documentation/concepts/ORM/model-settings.html?q=connection).

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
 * http://sailsjs.com/documentation/reference/configuration/sails-config-connections
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
