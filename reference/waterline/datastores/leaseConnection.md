# .leaseConnection()

Lease a new connection from the datastore for use in running multiple queries on the same connection (i.e. so that the logic provided in `during` can reuse the db connection).


```
someDatastore.leaseConnection(during).exec(function(err, resultMaybe) {

});
```


### Usage
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | during              | ((function))        | A [procedural parameter](https://en.wikipedia.org/wiki/Procedural_parameter) which Sails will call automatically when a connection has been obtained and made ready for you.  It will receive the arguments specified in the "During" usage table below. |

##### During
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | db                  | ((ref))             | Your newly-leased database connection.  (See [`.usingConnection()`](http://sailsjs.com/documentation/reference/waterline-orm/models/using-connection) for more information on what to do with this.) |
| 2 | proceed             | ((function))        | Call this function when your `during` code is finished, or if a fatal error occurs.<br/><br/>_Usage:_<br/>&bull; `return proceed();`<br/>&bull; `proceed(new Error('Oops))`<br/>&bull; `proceed(undefined, { some: 'arbitrary result'} )`<br/>_Like any Node callback, if you call `proceed(new Error('Oops'))` (i.e. with a truthy first argument; conventionally an Error instance), then Sails understands that to mean a fatal error occurred.  Otherwise, it is assumed that everything went according to plan.  In any case, when your code calls `proceed()`, the connection is automatically released back to the pool before calling the final callback._



##### Callback

The _final_ callback that you pass in to `.exec()` receives the following arguments:

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | The error that occurred, or a falsy value if there were no errors.
| 2 |    _resultMaybe_    | ((Ref?))            | The optional result data sent back from `during`.  In other words, if, in your `during` function, you called `proceed(undefined, 'foo')`, then this will be `'foo'`. |

### Example

Lease a database connection from the default datastore, then use it to send two queries before releasing it back to the pool.

```javascript
sails.getDatastore()
.leaseConnection(function (db, proceed) {

  Location.findOne({ id: locationId })
  .usingConnection(db)
  .exec(function (err, location) {
    if (err) { return proceed(err); }
    if (!location) { return proceed.notFound(); }

    // Get all products at the location
    ProductOffering.find({ location: locationId })
    .populate('productType')
    .usingConnection(db)
    .exec(function(err, productOfferings) {
      if (err) { return proceed(err); }
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
