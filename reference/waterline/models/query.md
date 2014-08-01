# .query()

`.query()` is only available on Sails/Waterline models using a SQL database (PostgreSQL and mySQL) adapter.  Its purpose is to perform raw SQL queries.


### Example

```js
Pet.query('SELECT pet.name FROM pet', function(err, results) {
  if (err) return res.serverError(err);
  return res.ok(results);
});
```



### Notes
> This method only works with PostgreSQL and mySQL! use .native() for Mongo.





<docmeta name="uniqueID" value="query546204">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".query()">

