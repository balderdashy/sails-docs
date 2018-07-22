# .destroy()

Destroy records in your database that match the given criteria.

```usage
await Something.destroy(criteria);
```

_Or:_

+ `var destroyedRecords = await Something.destroy(criteria).fetch();`


### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |    criteria         | ((dictionary))                               | Records which match this [Waterline criteria](https://sailsjs.com/documentation/concepts/models-and-orm/query-language) will be destroyed.  Be warned, if you specify an empty dictionary (`{}`) as your criteria, _all records will be destroyed!_ `destroy` queries do not support pagination using `skip` and `limit` or projections using `select`. |


##### Result

| Type                | Description      |
|---------------------|:-----------------|
| ((array?)) of ((dictionary))  | For improved performance, the destroyed records are not provided as a result by default.  But if you chain `.fetch()`, then the destroyed records will be sent back. (Be aware that this requires an extra database query in some adapters.)


##### Errors

|     Name        | Type                | When? |
|-----------------|---------------------|:---------------------------------------------------------------------------------|
| UsageError      | ((Error))           | Thrown if something invalid was passed in.
| AdapterError    | ((Error))           | Thrown if something went wrong in the database adapter.
| Error           | ((Error))           | Thrown if anything else unexpected happens.

See [Concepts > Models and ORM > Errors](https://sailsjs.com/documentation/concepts/models-and-orm/errors) for examples of negotiating errors in Sails and Waterline.

##### Meta keys

| Key                 | Type              | Details                                                        |
|:--------------------|-------------------|:---------------------------------------------------------------|
| fetch               | ((boolean))       | If set to `true`, then the array of destroyed records will be sent back.<br/><br/>Defaults to `false`.

> For more information on meta keys, see [.meta()](https://sailsjs.com/documentation/reference/waterline-orm/queries/meta).



### Example

To delete any users named Finn from the database:

```javascript
await User.destroy({name:'Finn'});

sails.log('Any users named Finn have now been deleted, if there were any.');
```


To delete two particular users who have been causing trouble:

```javascript
await User.destroy({
  id: { in: [ 3, 97 ] }
});

sails.log('The records for troublesome users (3 and 97) have been deleted, if they still existed.');
```


##### Fetching destroyed records

To delete a particular book, and also fetch the destroyed record, use [.destroyOne()](https://sailsjs.com/documentation/reference/waterline/destroy-one).

Or to delete multiple books and also fetch all destroyed records:

```javascript
var burnedBooks = await Book.destroy({
  controversiality: { '>': 0.9 }
}).fetch();
sails.log('Deleted books:', burnedBooks);
```




### Notes
> + This method can be used with [`await`](https://github.com/mikermcneil/parley/tree/49c06ee9ed32d9c55c24e8a0e767666a6b60b7e8#usage), promise chaining, or [traditional Node callbacks](https://sailsjs.com/documentation/reference/waterline-orm/queries/exec).
> + If you want to confirm that one or more records exist before destroying them, you should first perform a `find()`.  However, keep in mind it is generally a good idea to _try to do things_ rather than _checking first_, lest you end up with a [race condition](http://people.cs.umass.edu/~emery/classes/cmpsci377/f07/scribe/scribe8-1.pdf).


<docmeta name="displayName" value=".destroy()">
<docmeta name="pageType" value="method">
