# Model Settings

The following properties can be specified at the top level of your model definition to override the defaults for that particular model.  To override the configuration of all models, edit [`config/models.js`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md).

##### migrate
When your sails app lifts, waterline validates your all of the data in your database.  This flag tells waterline what to do with data when the data is corrupt.  You can set this flag to `safe` which will ignore the corrupt data and continue to lift.  You can also set it to ` 


----------------------------
| Flag Value | Description |
|`safe` | Ignores bad data and continues to lift |
|`alter` |Attempts to repair the corrupted data |
|`drop` | Drops the collection and continues to lift |


```javascript
var Foo = Waterline.Collection.extend({

  identity: 'foo',
  connection: 'my-local-postgresql',

  migrate: 'safe'

});
```

> Note, by using `Drop`, you risk losing your data.  Be careful.

> Adapter support for all migration strategies isn't guarenteed.  Check the repo for your adapter if unsure. 

##### schema
A flag to toggle schemaless or schema mode in databases that support schemaless data structures. If
turned off this will allow you to store arbitrary data in a record. If turned on, only attributes
defined in the model's attributes object will be allowed to be stored.

For adapters that don't require a schema such as Mongo or Redis the default setting is to be
schemaless.

```javascript
var Foo = Waterline.Collection.extend({

  identity: 'foo',
  connection: 'my-local-postgresql',

  schema: true

});
```

##### connection
The configured database [connection](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.connections.html) where this model will fetch and save its data.  Defaults to `localDiskDb`, the default connection that uses the `sails-disk` adapter.

##### identity
The lowercase unique key for this model, e.g. `user`.  By default, a model's `identity` is inferred automatically by lowercasing its filename.

##### globalId
This flag changes the global name by which you can access your model.

```javascript
var Foo = Waterline.Collection.extend({

  identity: 'foo',
  connection: 'my-local-postgresql',

  globalId: 'Baz'

});

// You can then call Baz.find() to access your 'foo' model.

```




##### autoPK
A flag to toggle the automatic primary key generation. If turned off no primary key will be created
by default and one will need to be defined.

```javascript
var Foo = Waterline.Collection.extend({

  identity: 'foo',
  connection: 'my-local-postgresql',

  autoPK: false

});
```

##### autoCreatedAt

A flag to toggle the automatic timestamp for createdAt.

```javascript
var Foo = Waterline.Collection.extend({

  identity: 'foo',
  connection: 'my-local-postgresql',

  autoCreatedAt: false

});
```

##### autoUpdatedAt

A flag to toggle the automatic timestamp for updatedAt.

```javascript
var Foo = Waterline.Collection.extend({

  identity: 'foo',
  connection: 'my-local-postgresql',

  autoUpdatedAt: false

});
```

##### tableName

You can define a custom table name on your adapter by adding a `tableName` attribute. By default, the adapter will use the model's `identity` as its `tableName`.

```javascript
// api/models/Automobile.js
module.exports = {
  attributes: {
    make: { type: 'string' },
    model: { type: 'string' },
    year: { type: 'string' }
  },
  tableName: 'some_legacy_table'
});
```







<docmeta name="uniqueID" value="Modelconfiguration960213">
<docmeta name="displayName" value="Model Settings">

