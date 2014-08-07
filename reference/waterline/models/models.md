# Models

<!-- ![screenshot of the api/models/ folder in a text editor](http://i.imgur.com/xdTZpKT.png) -->
![screenshot of a Waterline/Sails model in Sublime Text 2](http://i.imgur.com/8uRlFi8.png)

This section of the documentation focuses on the model methods provided by Waterline out of the box.  In addition to these, additional methods can come from hooks (i.e. the [resourceful pubsub methods]()), be exposed by the underlying adapters to provide custom functionality, or be hand-written in your app to wrap reusable custom code.  Most built-in model methods accept a callback as an optional final argument.  If the callback is not supplied, a chainable Query object is returned, which has methods like `.where()` and `.exec()`.

> For an in-depth introduction to models in Sails/Waterline, see <a href="http://sailsjs.org/#/documentation/concepts/ORM/Models.html">http://sailsjs.org/#/documentation/concepts/ORM/Models.html</a>.


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

<docmeta name="uniqueID" value="Models537291">
<docmeta name="displayName" value="Models">

