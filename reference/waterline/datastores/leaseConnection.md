# .leaseConnection()

Lease a new connection from the datastore for use in running multiple queries on the same connection (i.e. so that the logic provided in `during` can reuse the db connection).


```
someDatastore.leaseConnection(during).exec(function(err, resultMaybe) {

});
```


### Usage
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | during              | ((function))        | See parameters in the "`during` usage" table below. |

##### `during` usage
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 |  db                 | ((ref))             | The leased database connection |
| 2 | proceed             | ((function))        | Called when `during` is finished, or if a fatal error occurs, at which time `.leaseConnection()` will take care of releasing the db connection back to the manager (i.e. pool).|

##### Callback
|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | The error that occurred, or a falsy value if there were no errors.
| 2 |    _resultMaybe_    | ((Ref?))            |  |

### Example
```javascript
sails.getDatastore()
.leaseConnection(function (db, proceed) {

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


<docmeta name="displayName" value=".leaseConnection()">
<docmeta name="pageType" value="method">
