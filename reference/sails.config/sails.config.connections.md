# sails.config.connections

### What is this?
Adapters are the middle man between your Sails app and some kind of storage (typically a database)

Adapters are configured in the `connections.js` file located in your project's `config` directory.  Here you can create different global “saved settings” that you can mix and match in your models.

Sails adapters have been written for a variety of popular databases such as MySQL, Postgres and Mongo.  You can find a list of supported adapters [here](https://github.com/balderdashy/sails-wiki/blob/0.9/Database-Support.md).


### Example

To use the `sails-memory` adapter (for DEVELOPMENT ONLY), first install the module with `npm install sails-memory`, then define it in `connections.js`:

Here is an example adapter configuration file

`myApp/config/connections.js`

```javascript

module.exports.connections = {
  // sails-disk is installed by default.
  localDiskDb: {
    adapter: 'sails-disk'
  },
  memory: {
    adapter: 'sails-memory'
  }
};

```

If you wanted to set `memory` as the default adapter for your models, you would do this.
`myApp/config/models.js`

```javascript
module.exports.models = {

  connection: 'memory'
};

```


> Keep in mind that options you define directly in your model definitions will override these settings.
> Prior to v0.10, adapters were defined in `myApp/config/Adapters.js`.  See v0.9 docs for more info.


### Multiple connections for an adapter

You can set up more than one connection using the same adapter.  For example, if you
had two mysql databases, you could configure them as:

```javascript

module.exports.connections = {
  localMysql: {
    adapter: 'sails-mysql',
    user: 'root',
    host: 'localhost',
    database: 'someDbase'
  },
  remoteMysql: {
    adapter: 'sails-mysql',
    user: 'remoteUser',
    password: 'remotePassword',
    host: 'http://remote-mysql-host.com',
    database: 'remoteDbase'
  }
};

```

> **Note** If *any* connection to an adapter is used by a model, then *all* connections to that adapter will be loaded on `sails.lift`, whether or not models are actually using them.  In the example above, if a model was configured to use the `localMysql` connection, then both `localMysql` and `remoteMysql` would attempt to connect at run time.  It is therefore good practice to comment out any connection configurations that you aren't using!


<docmeta name="uniqueID" value="Connections100765">
<docmeta name="displayName" value="sails.config.connections">

