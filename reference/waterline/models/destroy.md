# .destroy()

Destroy records in your database that match the given criteria.

```javascript
Something.destroy(criteria).exec(function (err, deletedRecords) {
  
});
```

#### Usage

|   |     Argument        | Type                                         | Details                            |
|---|---------------------|----------------------------------------------|------------------------------------|
| 1 |    criteria         | ((dictionary))                               | Optional.  If specified, only records which match this [Waterline criteria](https://github.com/balderdashy/waterline-docs/blob/master/queries/query-language.md) will be destroyed.  Otherwise if omitted, _all records will be destroyed!_ |
| 2 |    callback         | ((function))          | Optionally, a callback may be provided as a second argument instead of using `.exec()` or a promise.        |

##### Callback

|   |     Argument        | Type                | Details |
|---|---------------------|---------------------|------------------------------------------------------------------------------|
| 1 |    err              | ((Error))           | The error that occurred, if relevant (otherwise `err` is falsey)             |



<!-- 
| 2 |    deletedRecords   | ((array))           | An array containing any records which were deleted.
-->


### Example

To delete any users named Finn from the database:
```javascript

User.destroy({name:'Finn'}).exec(function (err){
  if (err) {
    return res.negotiate(err);
  }
  sails.log('Any users named Finn have now been deleted, if there were any.');
  return res.ok();
});
```


To delete a particular book which is no longer available:
```javascript
Book.destroy({
  id: 4
}).exec(function (err){
  if (err) {
    return res.negotiate(err);
  }
  sails.log('Deleted book with `id: 4`, if it existed.');
  return res.ok();
});
```


To delete two particular users who have been causing trouble:

```javascript
User.destroy({
  id: [ 3, 97 ]
}).exec(function (err){
  if (err) {
    return res.negotiate(err);
  }
  sails.log('The records for troublesome users (3 and 97) have been deleted, if they still existed.');
  return res.ok();
});
```


### Notes
> - If you want to confirm that one or more records exist before destroying them, you should first perform a `find()`.  However, keep in mind it is generally a good idea to _try to do things_ rather than _checking first_, lest you end up in a [race condition](http://people.cs.umass.edu/~emery/classes/cmpsci377/f07/scribe/scribe8-1.pdf).


<docmeta name="methodType" value="instance">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".destroy()">

