# Records

A record is a uniquely identifiable object that corresponds 1-to-1 with a database entry; e.g. a row in Oracle/MSSQL/PostgreSQL/MySQL, a document in MongoDB, or a hash in Redis.

```js
Order.findOne().exec(function (err, order){
  var record = order;
});
```

For the most part, records are just plain old JavaScript objects (aka POJOs).  However they do have a few protected (non-enumerable) methods for formatting their wrapped data, as well as a special method ([`.save()`](/#/documentation/reference/waterline/records/save.html)) for persisting [programmatic changes](http://en.wikipedia.org/wiki/Active_record_pattern) to the database.


<docmeta name="uniqueID" value="record890682">
<docmeta name="displayName" value="Records">

