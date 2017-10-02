# .find()

Find records in your database that match the given criteria.

```usage
var records = await Something.find(criteria);
```

### Usage

|   |     Argument        | Type              | Details                            |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 |    criteria         | ((dictionary))    | The [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching records in the database.

##### Result
  		  
| Type                | Description      |
|---------------------|:-----------------|
| ((array)) of ((dictionary))	| The array of records from your database which match the given criteria.


##### Errors

|     Name        | Type                | When? |
|--------------------|---------------------|:---------------------------------------------------------------------------------|
| UsageError			| ((error))           | Thrown if something in the provided criteria was invalid.
| Adapter Error		| ((error))           | Thrown if something went wrong in the database adapter.
| Error				| ((error))           | Thrown if anything else unexpected happens.


### Example

##### A basic find query

To find any users named Finn in the database:

```javascript
try {
	var usersNamedFinn = await User.find({name:'Finn'});
	
	sails.log('Wow, there are %d users named Finn.  Check it out:', usersNamedFinn.length, usersNamedFinn);
	
	return res.json(usersNamedFinn);
} catch (err) {
	return res.serverError(err);
}
```


##### Using projection

Projection selectively omits the fields returned on found records. This can be done, for example, for faster performance, or for greater security when passing found records to the client. The select clause in a [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) takes an array of strings that correspond with attribute names. The record ID is always returned.

```javascript
try {
	var usersNamedFinn = User.find({
		where: {name:'Finn'},
		select: ['name', 'email']
	});
	
	return res.json(usersNamedFinn);
} catch (err) {
	return res.serverError(err);
}
```


Might yield:

```javascript
[
  {
    id: 7392,
    name: 'Finn',
    email: 'finn_2017@gmail.com'
  },
  {
    id: 4427,
    name: 'Finn',
    email: 'walkingfinn@outlook.com'
  }
  // ...more users named Finn and their email addresses
]
```


<docmeta name="importance" value="10">
<docmeta name="displayName" value=".find()">
<docmeta name="pageType" value="method">
