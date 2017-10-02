# .createEach()

Create a set of records in the database.

```usage
await Something.createEach(initialValues);
```

### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |  initialValues      | ((array?))                                   | An array of dictionaries with attributes for the new records.

##### Result
  		  
| Type                | Description      |
|---------------------|:-----------------|
| ((array?)) of ((dictionary))	| For improved performance, the created records are not provided to this callback by default.  But if you enable `.meta({fetch: true})`, then the newly-created records will be sent back. (Be aware that this requires an extra database query in some adapters.)

##### Errors

|     Name        | Type                | When? |
|--------------------|---------------------|:---------------------------------------------------------------------------------|
| UsageError			| ((error))           | Thrown if something in the provided criteria was invalid.
| Adapter Error		| ((error))           | Thrown if something went wrong in the database adapter. See [Concepts > Models and ORM > Errors](http://sailsjs.com/documentation/concepts/models-and-orm/errors) for an example of how to negotiate a uniqueness error (i.e. from attempting to create a record with a duplicate that would violate a uniqueness constraint).
| Error				| ((error))           | Thrown if anything else unexpected happens.


##### Meta keys

| Key                 | Type              | Details                                                        |
|:--------------------|-------------------|:---------------------------------------------------------------|
| fetch               | ((boolean))       | If set to `true`, then the created records will be provided as the second argument of the callback.<br/><br/>Defaults to `false`.

> For more information on meta keys, see [.meta()](http://sailsjs.com/documentation/reference/waterline-orm/queries/meta).



### Example

To create users named Finn and Jake in the database:

```javascript
try {
	await User.createEach([{name:'Finn'}, {name: 'Jake'}]);
	
	return res.ok();
} catch (err) {
	return res.serverError(err);
}
```

##### Fetching newly-created records
```javascript
try {
	var createdUsers = User
		.createEach([{name:'Finn'}, {name: 'Jake'}])
		.meta({fetch: true});

	sails.log('Created ' + createdUsers.length + 'users.');
	return res.ok();
} catch (err) {
	return res.serverError(err);
}
```

### Notes
> * The number of records you can add with `.createEach` is limited by the maximum query size of the particular database you&rsquo;re using.  MySQL has a 4MB limit by default, but this can be changed via the [`max_allowed_packet` setting](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_max_allowed_packet).  MongoDB imposes a 16MB limit on single documents, but essentially has no limit on the number of documents that can be created at once.  PostgreSQL has a very large (around 1GB) maximum size.  Consult your database&rsquo;s documentation for more information about query limitations.
> * Another thing to watch out for when doing very large bulk inserts is the maximum number of bound variables. This varies per databases but refers to the number of values being substituted in a query. See [maxmimum allowable parameters](http://stackoverflow.com/questions/6581573/what-are-the-max-number-of-allowable-parameters-per-database-provider-type) for more details.


<docmeta name="displayName" value=".createEach()">
<docmeta name="pageType" value="method">
