# sails.config.datastores

### What is this?

Datastore configurations (or simply datastores) are like "saved settings" for your adapters.

In Sails, [database adapters](http://sailsjs.com/documentation/concepts/extending-sails/adapters) are the middle man between your app and some kind of structured data storage (typically a database).  But in order for an adapter to communicate between your Sails app and a particular database, it needs some additional information.  That's where datastores come in.  Datastores are dictionaries (plain JavaScript objects) that specify an `adapter`, as well as other necessary configuration information-- stuff like `url`, or `host`, `port`, `username`, and `password`.

While this [can be overridden](http://sailsjs.com/documentation/concepts/orm/model-settings) on a per-model basis, out of the box, every model in your app uses a datastore named "default".


### The default development database
As a convenience during development, Sails provides a built-in database adapter called `sails-disk`.  This adapter simulates a real database by reading and writing database records to a JSON file on your computer's hard drive.  And while `sails-disk` makes it easy to run your Sails/Node.js app in almost any environment, with minimal setup-- it is not designed for production use.  Before deploying your app and exposing it to real users, you'll want to choose a proper database such as PostgreSQL, MySQL, MongoDB, etc.  To do that, you'll need to customize your app's default datastore.

### Setting the default datastore
Unsurprisingly, the default datastore shared by all of your app's models is named "default".  So to hook up a different database, that's the datastore you'll want to change.

For example, imagine you edited the default datastore configuration in `config/datastores.js` so that it contains `adapter: require('sails-postgresql')`, and `database: 'foo'`.  This tells Sails and Waterline that you must have [sails-postgresql](http://npmjs.com/package/sails-postgresql) installed, and that you're running a local PostgreSQL server with a database named "foo".  The next time you lift your app, all of your models will try to communicate with that PostgreSQL database any time built-in model methods like `.create()` or `.find()` are executed.

### Best practices
Besides the `config/datastores.js` file, you can configure datastores in [the same way you configure anything else in Sails](http://sailsjs.com/documentation/concepts/configuration).

Some general rules of thumb:

+ To change the database you're using in development, edit the `default` key in `config/datastores.js` (or use `config/local.js` if you'd rather not check in your credentials)
+ In production, configure your database using `config/production.js` (or set environment variables if you'd rather not check in your credentials)
+ To override the database for a particular model, [set its `datastore`](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?datastore).



### Example

To use the `sails-memory` adapter in development, first install the module with `npm install sails-memory --save`.  Then change `config/datastores.js`:

```javascript
// config/datastores.js
module.exports.datastores = {
  default: {
    adapter: require('sails-memory')
  }
};
```


### Multiple datastores pointed at the same adapter

You can set up multiple datastores that use the same adapter.

For example, you might be using MySQL as your primary database, but also need to integrate with a _second_ MySQL database that contains data from an existing Java or PHP app.

You could set up `config/datastores.js` as follows:

```javascript

module.exports.datastores = {
  default: {
    adapter: require('sails-mysql'),
    user: 'root',
    host: 'localhost',
    database: 'some_cool_db'
  },
  existingEcommerceDb: {
    adapter: require('sails-mysql'),
    user: 'djbluegrass',
    password: '0ldy3ll3ry3ll3ry3ll3r3h3h3h',
    host: 'legacy.example.com',
    database: 'some_slightly_less_cool_db'
  }
};

```

> **Note:** If a datastore is using a particular adapter, then _all_ datastores that share that adapter will be loaded on `sails.lift`, whether or not models are actually using them.  In the example above, if a model was configured to use the `existingEcommerceDb` datastore, then at runtime, Waterline will create two MySQL connection pools: one for `existingEcommerceDb` and one for `default`.  Because of this behavior, we recommend commenting out or removing any "aspirational" datastore configurations that you're not actually using.



<docmeta name="displayName" value="sails.config.datastores">
<docmeta name="pageType" value="property">
