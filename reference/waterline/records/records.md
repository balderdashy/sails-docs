# Records

A _record_ is what you get back from `.find()` or `.findOne()`.  Each record is a uniquely identifiable object that corresponds 1-to-1 with a physical database entry; e.g. a row in Oracle/MSSQL/PostgreSQL/MySQL, a document in MongoDB, or a hash in Redis.

```js
Order.find().exec(function (err, records){
  if (err) {
    return exits.error(err);
  }
  
  console.log('Found %d records', records.length);
  if (records.length > 0) {
    console.log('Found at least one record, and its `id` is:',records[0].id);
  }
  
  return exits.success();
  
});
```

In Sails, records are just dictionaries (plain JavaScript objects).




<docmeta name="displayName" value="Records">
