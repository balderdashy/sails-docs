# Model configuration

The following properties can be specified at the top level of your model definition to override the defaults for that particular model.  To override the configuration of all models, edit [`config/models.js`]().

##### migrate
> TODO

##### schema
> TODO

##### connection
The configured database [connection]() where this model will fetch and save its data.  Defaults to `localDiskDb`, the default connection that uses the `sails-disk` adapter.

##### identity
The lowercase unique key for this model, e.g. `user`.  By default, a model's `identity` is inferred automatically by lowercasing its filename.

##### globalId
> TODO

##### autoPK
>TODO 

##### autoCreatedAt
> TODO

##### autoUpdatedAt
> TODO

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
<docmeta name="displayName" value="Model configuration">

