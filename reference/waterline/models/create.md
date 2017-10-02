# .create()

Create a record in the database.

```usage
await Something.create(initialValues);
```

### Usage

|   | Argument            | Type                         | Details                               |
|---|:--------------------|------------------------------|:--------------------------------------|
| 1 | initialValues       | ((dictionary))               | The initial values for the new record.  _(Note that, if this model is in ["schemaful" mode](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?schema), then any extraneous keys will be silently omitted.)_

##### Result
  		  
| Type                | Description      |
|---------------------|:-----------------|
| ((dictionary?))	| For improved performance, the created record is not provided as a result by default.  But if you enable `.meta({fetch: true})`, then the newly-created record will be sent back. (Be aware that this requires an extra database query in some adapters.)

##### Errors

|     Name        | Type                | When? |
|--------------------|---------------------|:---------------------------------------------------------------------------------|
| UsageError			| ((error))           | Thrown if something in the provided criteria was invalid.
| Adapter Error		| ((error))           | Thrown if something went wrong in the database adapter. See [Concepts > Models and ORM > Errors](http://sailsjs.com/documentation/concepts/models-and-orm/errors) for an example of how to negotiate a uniqueness error (i.e. from attempting to create a record with a duplicate that would violate a uniqueness constraint).
| Error				| ((error))           | Thrown if anything else unexpected happens.


##### Meta keys

| Key                 | Type              | Details                                                        |
|:--------------------|-------------------|:---------------------------------------------------------------|
| fetch               | ((boolean))       | If set to `true`, then the created record will be sent back.<br/><br/>Defaults to `false`.

> For more information on meta keys, see [.meta()](http://sailsjs.com/documentation/reference/waterline-orm/queries/meta).



### Example

To create a user named Finn in the database:

```javascript
try {
	await User.create({name:'Finn'});
	return res.ok();
} catch (err) {
	return res.serverError(err);
}
```

##### Fetching the newly-created record
```javascript
try {
	let createdUser = await User
					.create({name:'Finn'})
					.meta({fetch: true});

	sails.log('Finn\'s id is:', createdUser.id);
	return res.ok();
} catch (err) {
	return res.serverError(err);
}
```

### Negotiating errors

It's important to always handle errors from model methods.  But sometimes, you need to look at errors in a more granular way. To learn more about the kinds of errors Waterline returns, and for examples of how to handle them, see [Concepts > Models and ORM > Errors](http://sailsjs.com/documentation/concepts/models-and-orm/errors).


<docmeta name="displayName" value=".create()">
<docmeta name="pageType" value="method">
