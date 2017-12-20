# .leaseConnection()

Lease a new connection from the datastore for use in running multiple queries on the same connection (i.e. so that the logic provided in `during` can reuse the db connection).


```usage
await datastore.leaseConnection(during);
```

_Or_

+ `var result = await datastore.leaseConnection(during);`


### Usage
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | during              | ((function))        | A [procedural parameter](https://en.wikipedia.org/wiki/Procedural_parameter) which Sails will call automatically when a connection has been obtained and made ready for you.  It will receive the arguments specified in the "During" usage table below. |

##### During
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | db                  | ((ref))             | Your newly-leased database connection.  (See [`.usingConnection()`](https://sailsjs.com/documentation/reference/waterline-orm/models/using-connection) for more information on what to do with this.) |
| 2 | proceed             | ((function))        | Call this function when your `during` code is finished, or if a fatal error occurs.<br/><br/>_Usage:_<br/>&bull; `return proceed();`<br/>&bull; `proceed(new Error('Oops))`<br/>&bull; `proceed(undefined, { some: 'arbitrary result'} )`<br/><br/>_Like any Node callback, if you call `proceed(new Error('Oops'))` (i.e. with a truthy first argument; conventionally an Error instance), then Sails understands that to mean a fatal error occurred.  Otherwise, it is assumed that everything went according to plan.  In any case, when your code calls `proceed()`, the connection is automatically released back to the pool before calling the final callback._



##### Result

| Type                | Details |
|---------------------|:---------------------------------------------------------------------------------|
| ((Ref?))            | The optional result data sent back from `during`.  In other words, if, in your `during` function, you called `proceed(undefined, 'foo')`, then this will be `'foo'`. |

##### Errors

|     Name        | Type                | When? |
|:----------------|---------------------|:---------------------------------------------------------------------------------|
| UsageError      | ((Error))           | Thrown if something invalid was passed in.
| AdapterError    | ((Error))           | Thrown if something went wrong in the database adapter.
| Error           | ((Error))           | Thrown if anything else unexpected happens.

See [Concepts > Models and ORM > Errors](https://sailsjs.com/documentation/concepts/models-and-orm/errors) for examples of negotiating errors in Sails and Waterline.

### Example

Lease a database connection from the default datastore, then use it to send two queries before releasing it back to the pool.

```javascript
var inventory = await sails.getDatastore()
.leaseConnection(async (db, proceed)=> {

  var location = await Location.findOne({ id: req.param('locationId') })
  .usingConnection(db);

  if (!location) {
    err = new Error('Cannot find location with that id (`'+req.param('locationId')+'`)');
    err.code = 'E_NO_SUCH_LOCATION';
    return proceed(err);
  }

  // Get all products at the location
  var productOfferings = await ProductOffering.find({ location: req.param('locationId') })
  .populate('productType')
  .usingConnection(db);

  var inventory = _.indexBy(productOfferings, 'id');
  return proceed(undefined, inventory);
})
.intercept('E_NO_SUCH_LOCATION', ()=> {
  return res.notFound();
});

// All done!  Whatever we were doing with that connection worked.
// Now we can proceed with our business.
return res.json(inventory);
```


<docmeta name="displayName" value=".leaseConnection()">
<docmeta name="pageType" value="method">
