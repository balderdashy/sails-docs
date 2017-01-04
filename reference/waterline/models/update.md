# .update()

Update all records matching criteria.

```javascript
Something.update(criteria, values)
.exec(function(err, updatedRecords) {
  //...
});
```


##### Usage

|   |     Argument        | Type              | Details                            |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 |    criteria         | ((dictionary))    | The [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching records in the database.
| 2 |    values           | ((dictionary))    | The attributes that the record should be updated to have.

##### Callback

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |    _err_            | ((Error?))          | The error that occurred, or `undefined` if there were no errors.
| 2 |    _updatedRecords_ | ((array?))          | By default, the updated records are not provided to this callback.  But if you enable `.meta({fetch: true})`, then the array of updated record(s) will be sent back.

### Example

```javascript
User.update({name:'Pen'})
.set({name:'Finn'})
.meta({fetch: true})
.exec(function (err, updatedUsers){
  if (err) { return res.serverError(err); }

  sails.log('Updated users to have name ' + updatedUsers[0].name);
  return res.ok();
});
```

<docmeta name="displayName" value=".update()">
<docmeta name="pageType" value="method">
