# .transaction()

Fetches a preconfigured deferred object hooked up to the sails-mysql adapter (and consequently the appropriate driver)

```
someDatastore.transaction(during).meta(optionalMD).exec(afterCommittingOrRollingBack);
```

### Usage
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | during              | ((function))        | See parameters in the "`during` usage" table below. |

##### `during` usage
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | db                  | ((ref))             | The leased (transactional) database connection. |
| 2 | proceed             | ((function))        | Called when `during` is finished, or if a fatal error occurs.|


### Example
```javascript
sails.datastore('larrysDbCluster')
.meta({})
.transaction(function during (T, done) {
  Location.findOne({id: locationId})
    .usingConnection(T.connection)
    .exec(function (err, location) {
      if (err) {return done(err);}
      if (!location) {return done.notFound();}

      // Get all products at the location
      ProductOffering.find({location: locationId})
      .populate('productType')
      .usingConnection(T.connection)
      .exec(function(err, productOfferings) {
        if (err) {return done(err);}
        var mush = _.indexBy(productOfferings, 'id');
        return done(undefined, mush);
      });
    });
}).exec(/* … */);
```

<docmeta name="displayName" value=".transaction()">
<docmeta name="pageType" value="method">
