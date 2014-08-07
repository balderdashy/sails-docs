# Models

For an introduction to models in Sails/Waterline, see <a href="http://sailsjs.org/#/documentation/concepts/ORM/Models.html">http://sailsjs.org/#/documentation/concepts/ORM/Models.html</a>.



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


### Notes

> Most of the built-in "CRUD" model methods return a chainable Waterline Query object when the final callback parameter is not supplied.


<docmeta name="uniqueID" value="Models537291">
<docmeta name="displayName" value="Models">

