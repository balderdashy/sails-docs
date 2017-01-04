# .update()

Update all records matching criteria.

```javascript
Something.update(criteria, valuesToSet)
.exec(function(err) {
  //...
});
```


### Usage

|   |     Argument        | Type              | Details                            |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 | criteria            | ((dictionary))    | The [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching records in the database.
| 2 | valuesToSet         | ((dictionary))    | A dictionary (plain JavaScript object) of values to that all matching records should be updated to have.


##### Callback

|   | Argument            | Type                | Details
|---|:--------------------|---------------------|:----------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | The error that occurred, or `undefined` if there were no errors.
| 2 |    _updatedRecords_ | ((array?))          | By default, for better performance, the updated records are not provided to this callback.  But if you enable `.meta({fetch: true})`, then the array of updated record(s) will be sent back. (Be aware that this requires extra database queries in some adapters.)

##### Meta keys

| Key                 | Type              | Details                                                        |
|:--------------------|-------------------|:---------------------------------------------------------------|
| fetch               | ((boolean))       | If set to `true`, then the array of updated records will be provided as the second argument of the callback.


### Example

```javascript
User.update({name:'Pen'})
.set({name:'Finn'})
.exec(function (err){
  if (err) { return res.serverError(err); }

  sails.log('Updated all users named Pen so that their new name is "Finn".  I hope they like it.');
  return res.ok();
});
```

##### Fetching updated records

```javascript
User.update({name:'Finn'})
.set({name:'Jake'})
.meta({fetch: true})
.exec(function (err, updatedUsers){
  if (err) { return res.serverError(err); }

  sails.log('Updated all '+updatedUsers.length+' user(s) named "Finn" so that their new name is "Jake".  Here they are now:');
  sails.log(updatedUsers);
  
  return res.ok();
});
```

<docmeta name="displayName" value=".update()">
<docmeta name="pageType" value="method">
