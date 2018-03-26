# Working with Models

This section of the documentation focuses on the model methods provided by Waterline out of the box.  In addition to these, additional methods can come from hooks (like the [resourceful pubsub methods](https://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub)) or be hand-written in your app to wrap reusable custom code.

> + For an in-depth introduction to models in Sails/Waterline, see [Concepts > Models and ORM > Models](https://sailsjs.com/documentation/concepts/models-and-orm/models).
> + You can find an example of how to define a model [here](https://gist.github.com/rachaelshaw/f5bf442b2171154aa6021846d1a250f8).




### Built-In Model Methods

In general, model methods are _asynchronous_, meaning you cannot just call them and use the return value.  Instead, you must use callbacks, promises or async/await. 
Most built-in model methods accept a callback as an optional final argument. If the callback is not supplied, a chainable Query object is returned, which has methods like `.where()` and `.exec()`. See [Working with Queries](https://sailsjs.com/documentation/reference/waterline-orm/queries) for more on that.


 Method                | Summary
 --------------------- | ------------------------------------------------------------------------
 `.create()`           | Create record consisting of object passed in
 `.find()`             | Lookup an array of records which match the specified criteria
 `.findOne()`          | Lookup a single record which matches the specified criteria, or send back `null` if it doesn't.
 `.update()`           | Update records matching the specified criteria, setting the specified object of `attrName:value` pairs.
 `.destroy()`          | Destroy records matching the specified criteria.
 `.findOrCreate()`     | Lookup a single record which matches the specified criteria, or create it if it doesn't.
 `.count()`            | Get the total count of records which match the specified criteria.
 `.native()`/`query()` | Make a direct call to the underlying database driver.
 `.stream()`           | Return a readable (object-mode) stream of records which match the specified criteria.
 `.archive()`          | Archive ("soft-delete") records that match the specified criteria.



<!-- ![screenshot of the api/models/ folder in a text editor](http://i.imgur.com/xdTZpKT.png) -->





### `sails.models`

If you need to disable global variables in Sails, you can still use `sails.models.<model_identity>` to access your models.
> Not sure of your model's `identity`? Check out [Concepts > Models and ORM > Model settings](https://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?identity).

<docmeta name="displayName" value="Models">
