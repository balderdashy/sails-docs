# .destroy()

Destroy records in your database that match the given criteria.

```usage
await Something.destroy(criteria);
```

### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |    criteria         | ((dictionary))                               | Records which match this [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) will be destroyed.  Be warned, if you specify an empty dictionary (`{}`) as your criteria, _all records will be destroyed!_ `destroy` queries do not support pagination using `skip` and `limit` or projections using `select`. |

##### Result
  		  
| Type                | Description      |
|---------------------|:-----------------|
| ((array?)) of ((dictionary))	| For improved performance, the destroyed records are not provided to this callback by default.  But if you enable `.meta({fetch: true})`, then the destroyed records will be sent back. (Be aware that this requires an extra database query in some adapters.)


##### Errors

|     Name        | Type                | When? |
|--------------------|---------------------|:---------------------------------------------------------------------------------|
| UsageError			| ((error))           | Thrown if something in the provided criteria was invalid.
| Adapter Error		| ((error))           | Thrown if something went wrong in the database adapter.
| Error				| ((error))           | Thrown if anything else unexpected happens.


##### Meta keys

| Key                 | Type              | Details                                                        |
|:--------------------|-------------------|:---------------------------------------------------------------|
| fetch               | ((boolean))       | If set to `true`, then the array of destroyed records will be provided as the second argument of the callback.<br/><br/>Defaults to `false`.

> For more information on meta keys, see [.meta()](http://sailsjs.com/documentation/reference/waterline-orm/queries/meta).




<!--
| 2 |    deletedRecords   | ((array))           | An array containing any records which were deleted.
-->


### Example

To delete any users named Finn from the database:

```javascript
try {
	await User.destroy({name:'Finn'});
	
	sails.log('Any users named Finn have now been deleted, if there were any.');
	return res.ok();
} catch (err) {
	return res.serverError(err);
}
```


To delete two particular users who have been causing trouble:

```javascript
try {
	await User.destroy({
	  id: { in: [ 3, 97 ] }
	});
	
	sails.log('The records for troublesome users (3 and 97) have been deleted, if they still existed.');
	return res.ok();
} catch (err) {
	return res.serverError(err);
}
```


##### Fetching destroyed records

To delete a particular book, and also fetch the destroyed record:

```javascript
try {
	let burnedBooks = await Book
		.destroy({id: 4})
		.meta({ fetch: true });
	
	if (burnedBooks.length === 0) {
		sails.log('No book found with `id: 4`.');
	} else {
    	sails.log('Deleted book with `id: 4`:', burnedBooks[0]);
  	}
  	
  	return res.ok();
} catch (err) {
	return res.serverError(err);
}
```




### Notes
> - If you want to confirm that one or more records exist before destroying them, you should first perform a `find()`.  However, keep in mind it is generally a good idea to _try to do things_ rather than _checking first_, lest you end up with a [race condition](http://people.cs.umass.edu/~emery/classes/cmpsci377/f07/scribe/scribe8-1.pdf).


<docmeta name="displayName" value=".destroy()">
<docmeta name="pageType" value="method">
