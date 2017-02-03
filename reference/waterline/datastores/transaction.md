# .transaction()

Fetch a preconfigured deferred object hooked up to the sails-mysql adapter (and consequently the appropriate driver)

```
someDatastore.transaction(during).exec(afterCommittingOrRollingBack);
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
sails.getDatastore()
.transaction(function (db, proceed) {

  Location.findOne({id: locationId})
  .usingConnection(db)
  .exec(function (err, location) {
    if (err) {return proceed(err);}
    if (!location) {return proceed.notFound();}

    // Get all products at the location
    ProductOffering.find({location: locationId})
    .populate('productType')
    .usingConnection(db)
    .exec(function(err, productOfferings) {
      if (err) {return proceed(err);}
      var inventory = _.indexBy(productOfferings, 'id');
      return proceed(undefined, inventory);
    });
  });
}).exec(function (err, inventory) {
  if (err) { return res.serverError(err); }
  return res.ok();
});
```

<docmeta name="displayName" value=".transaction()">
<docmeta name="pageType" value="method">
