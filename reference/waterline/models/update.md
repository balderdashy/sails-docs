# .update()

Update all records matching criteria.

```javascript
Something.update(criteria, values)
.exec(function(err, updatedRecord) {
  //...
});
```


#### Usage

|   |     Argument        | Type              | Details                            |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 |    criteria         | ((dictionary))    | The [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching records in the database.
| 2 |    values           | ((dictionary))    | The attributes that the record should be updated to have.

#### Callback

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |    _err_            | ((Error?))          | The error that occurred, or `undefined` if there were no errors.
| 2 |    updatedRecord     | ((array))     | The updated record(s).

### Example

```javascript
User.update({name:'Pen'}, {name:'Finn'})
.exec(function (err, updatedRecord){

  if (err) { return res.serverError(err); }

  sails.log('Updated user to have name ' + updated[0].name);
  return res.ok();
});

```

<docmeta name="displayName" value=".update()">
<docmeta name="pageType" value="method">
