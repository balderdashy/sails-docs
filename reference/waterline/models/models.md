# Working with Models

This section of the documentation focuses on the model methods provided by Waterline out of the box.  In addition to these, additional methods can come from hooks (i.e. the [resourceful pubsub methods]()), be exposed by the underlying adapters to provide custom functionality, or be hand-written in your app to wrap reusable custom code.

> For an in-depth introduction to models in Sails/Waterline, see <a href="http://sailsjs.org/#/documentation/concepts/ORM/Models.html">http://sailsjs.org/#/documentation/concepts/ORM/Models.html</a>.

![screenshot of a Waterline/Sails model in Sublime Text 2](http://i.imgur.com/8uRlFi8.png)


### Built-In Model Methods

In general, model methods are _asynchronous_, meaning you cannot just call them and use the return value.  Instead, you must use callbacks, or promises.
Most built-in model methods accept a callback as an optional final argument. If the callback is not supplied, a chainable Query object is returned, which has methods like `.where()` and `.exec()`. See [Working with Queries]() for more on that.


 Method                | Summary
 --------------------- | ------------------------------------------------------------------------
 `.find()`             | Lookup an array of records which match the specified criteria
 `.findOne()`          | Lookup a single record which matches the specified criteria, or send back `null` if it doesn't.
 `.update()`           | Update records matching the specified criteria, setting the specified object of `attrName:value` pairs.
 `.destroy()`          | Destroy records matching the specified criteria.
 `.findOrCreate()`     | Lookup a single record which matches the specified criteria, or create it if it doesn't.
 `.count()`            | Get the total count of records which match the specified criteria.
 `.native()`/`query()` | Make a direct call to the underlying database driver.
 `.stream()`           | Return a readable (object-mode) stream of records which match the specified criteria



<!-- ![screenshot of the api/models/ folder in a text editor](http://i.imgur.com/xdTZpKT.png) -->





### `sails.models`

If you need to disable global variables in Sails, you can still use `sails.models.<model_identity>` to access your models.

A model's `identity` is different than its `globalId`.  The `globalId` is determined automatically from the name of the model, whereas the `identity` is the all-lowercased version.  For instance, you the model defined in `api/models/Kitten.js` has a globalId of `Kitten`, but its identity is `kitten`. For example:

```javascript
// Kitten === sails.models.kitten
sails.models.kitten.find().exec(function (err, allTheKittens) {
  // We also could have just used `Kitten.find().exec(...)`
  // if we'd left the global variable exposed.
})
```


<docmeta name="uniqueID" value="Models537291">
<docmeta name="displayName" value="Models">

