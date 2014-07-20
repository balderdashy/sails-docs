# Record

A uniquely identifiable object which corresponds 1-to-1 with a database record; e.g. a row in Oracle/MSSQL/PostgreSQL/MySQL, a document in MongoDB, or a hash in Redis.

```js
Order.findOne().exec(function (err, order){
  var record = order;
});

For the most part, records are just plain old JavaScript objects (aka POJOs).  However they do have a few prototypal, non-enumerable (i.e. protected) methods for formatting their wrapped data, as well as a special method (`.save()`) for persisting programmatic changes to the database (i.e. for implementing the [active record pattern](), if you're into that.)


<docmeta name="uniqueID" value="records890682">
<docmeta name="displayName" value="Records">

