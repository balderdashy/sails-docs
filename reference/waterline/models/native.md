# .native()

`.native()` is only available when using Sails/Waterline with MongoDB.

Returns a raw Mongo collection instance representing the specified model, allowing you to perform raw Mongo queries.

For full documentation and usage examples, check out the [native Node Mongo driver](https://github.com/mongodb/node-mongodb-native#introduction).


Note that `sails-mongo` maintains a single Mongo connection for each of your configured connections/datastores.  Consequently, when using `.native()`, you don't need to close or open `db` manually.  For lower-level usage, you can `require('mongodb')` directly.

### Example

```js
Pet.native(function(err, collection) {
  if (err) return res.serverError(err);
 
  collection.find({}, {
    name: true
  }).toArray(function (err, results) {
    if (err) return res.serverError(err);
    return res.ok(results);
  });
});
```

Source: https://gist.github.com/mikermcneil/483987369d54512b6104

### Notes

> + This method only works with Mongo! For raw functionality in SQL databases, use [`.query()`](/#/documentation/reference/waterline/models/query.html).


<docmeta name="uniqueID" value="native900002">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".native()">

