# .findOne()

Attempt to find a particular record in your database that matches the given criteria.

```usage
var record = await Something.findOne(criteria);
```

### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |    criteria         | ((dictionary))                               | The [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching this record in the database.  (This criteria must never match more than one record.) `findOne` queries do not support pagination using `skip` or `limit`.

##### Result
  		  
| Type                | Description      |
|---------------------|:-----------------|
| ((dictionary?))	| The record that was found, or `undefined` if no such record could be located.

##### Errors

|     Name        | Type                | When? |
|--------------------|---------------------|:---------------------------------------------------------------------------------|
| UsageError			| ((error))           | Thrown if something in the provided criteria was invalid.
| Adapter Error		| ((error))           | Thrown if something went wrong in the database adapter.
| Error				| ((error))           | Thrown if anything else unexpected happens.


### Example

To locate the user whose username is "finn" in your database:

```javascript
try {
	var finn = await Users.findOne({
		username: 'finn'
	});
	
	if (!finn) {
		return res.notFound('Could not find Finn, sorry.');
 	}
 	
 	sails.log('Found "%s"', finn.fullName);
  	return res.json(finn);
} catch (err) {
	return res.serverError(err);
}
```



### Notes
> - Being unable to find a record with the given criteria does **not** constitute an error for `findOne()`.  If no matching record is found, the result will be `undefined`.



<docmeta name="importance" value="10">
<docmeta name="displayName" value=".findOne()">
<docmeta name="pageType" value="method">

