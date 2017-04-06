# .destroy()

Destroy records in your database that match the given criteria.

```usage
Something.destroy(criteria).exec(function (err) {

});
```

### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |    criteria         | ((dictionary))                               | Records which match this [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) will be destroyed.  Be warned, if you specify an empty dictionary (`{}`) as your criteria, _all records will be destroyed!_ `destroy` queries do not support pagination using `skip` and `limit` or projections using `select`. |

##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:-----------------------------------------------------------------------------|
| 1 |    err              | ((Error?))          | The error that occurred, or `undefined` if there were no errors.


##### Meta keys

| Key                 | Type              | Details                                                        |
|:--------------------|-------------------|:---------------------------------------------------------------|
| fetch               | ((boolean))       | If set to `true`, then the array of updated records will be provided as the second argument of the callback.<br/><br/>Defaults to `false`.

> For more information on meta keys, see [.meta()](http://sailsjs.com/documentation/reference/waterline-orm/queries/meta).




<!--
| 2 |    deletedRecords   | ((array))           | An array containing any records which were deleted.
-->


### Example

To delete any users named Finn from the database:
```javascript
User.destroy({name:'Finn'}).exec(function (err){
  if (err) {
    return res.serverError(err);
  }
  sails.log('Any users named Finn have now been deleted, if there were any.');
  return res.ok();
});
```


To delete two particular users who have been causing trouble:

```javascript
User.destroy({
  id: { in: [ 3, 97 ] }
}).exec(function (err){
  if (err) {
    return res.serverError(err);
  }
  sails.log('The records for troublesome users (3 and 97) have been deleted, if they still existed.');
  return res.ok();
});
```


##### Fetching destroyed records

To delete a particular book, and also fetch the destroyed record:

```javascript
Book.destroy({
  id: 4
})
.meta({ fetch: true })
.exec(function (err, burnedBooks){
  if (err) {
    return res.serverError(err);
  }

  if (burnedBooks.length === 0) {
    sails.log('No book found with `id: 4`.');
  }
  else {
    sails.log('Deleted book with `id: 4`:', burnedBooks[0]);
  }

  return res.ok();
});
```




### Notes
> - If you want to confirm that one or more records exist before destroying them, you should first perform a `find()`.  However, keep in mind it is generally a good idea to _try to do things_ rather than _checking first_, lest you end up with a [race condition](http://people.cs.umass.edu/~emery/classes/cmpsci377/f07/scribe/scribe8-1.pdf).


<docmeta name="displayName" value=".destroy()">
<docmeta name="pageType" value="method">
