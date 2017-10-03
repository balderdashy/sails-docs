# .update()

Update all records matching criteria.

```usage
await Something.update(criteria, valuesToSet);
```


### Usage

|   |     Argument        | Type              | Details                            |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 | criteria            | ((dictionary))    | The [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching records in the database. `update` queries do not support pagination using `skip` and `limit` or projections using `select`.
| 2 | valuesToSet         | ((dictionary))    | A dictionary (plain JavaScript object) of values to that all matching records should be updated to have.  _(Note that, if this model is in ["schemaful" mode](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?schema), then any extraneous keys will be silently omitted.)_

##### Result
  		  
| Type                | Description      |
|---------------------|:-----------------|
| ((array?)) | By default, for better performance, the updated records are not provided as a result.  But if you enable `.meta({fetch: true})`, then the array of updated record(s) will be sent back. (Be aware that this requires extra database queries in some adapters.)

##### Errors

|     Name        | Type                | When? |
|--------------------|---------------------|:---------------------------------------------------------------------------------|
| UsageError			| ((error))           | Thrown if something in the provided criteria was invalid.
| Adapter Error		| ((error))           | Thrown if something went wrong in the database adapter. See [Concepts > Models and ORM > Errors](http://sailsjs.com/documentation/concepts/models-and-orm/errors) for an example of how to negotiate a uniqueness error (i.e. from attempting to create a record with a duplicate that would violate a uniqueness constraint).
| Error				| ((error))           | Thrown if anything else unexpected happens.


##### Meta keys

| Key                 | Type              | Details                                                        |
|:--------------------|-------------------|:---------------------------------------------------------------|
| fetch               | ((boolean))       | If set to `true`, then the array of updated records will be sent back.<br/><br/>Defaults to `false`.

> For more information on meta keys, see [.meta()](http://sailsjs.com/documentation/reference/waterline-orm/queries/meta).


### Example

```javascript
try {
	await User
		.update({name:'Pen'})
		.set({name:'Finn'});
	
	sails.log('Updated all users named Pen so that their new name is "Finn".  I hope they like it.');
	return res.ok();
} catch (err) {
	return res.serverError(err);
}
```

##### Fetching updated records

To fetch updated records, use enable the `fetch` meta key:

```javascript
try {
	var updatedUsers = await User
		.update({name:'Finn'})
		.set({name:'Jake'})
		.meta({fetch: true});

	sails.log('Updated all ' + updatedUsers.length + ' user(s) named "Finn" so that their new name is "Jake".  Here they are now:');
  	sails.log(updatedUsers);

  	return res.ok();
} catch (err) {
	res.serverError(err);
}
```

<docmeta name="displayName" value=".update()">
<docmeta name="pageType" value="method">
