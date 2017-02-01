# Records

A record is a uniquely identifiable object that corresponds 1-to-1 with a database entry; e.g. a row in Oracle/MSSQL/PostgreSQL/MySQL, a document in MongoDB, or a hash in Redis.

```js
Order.findOne().exec(function (err, order){
  var record = order;
});
```

For the most part, records are just plain old JavaScript objects (aka POJOs) and should be treated that way.  You may customize the way that a record is _stringified_ by adding a [`customToJSON` method](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?customtojson) to the settings for the record&rsquo;s model (for example, to have it always omit the `password` attribute when sending a record via [`res.json()`](http://sailsjs.com/documentation/reference/response-res/res-json).



<docmeta name="displayName" value="Records">
