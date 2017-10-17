# .create()

Create a record in the database.

```usage
Something.create(initialValues)
.exec(function (err) {

});
```

### Usage

|   | Argument            | Type                         | Details                               |
|---|:--------------------|------------------------------|:--------------------------------------|
| 1 | initialValues       | ((dictionary))               | The initial values for the new record.  _(Note that, if this model is in ["schemaful" mode](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?schema), then any extraneous keys will be silently omitted.)_

##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 | _err_               | ((Error?))          | The error that occurred, or `undefined` if there were no errors.  See [Concepts > Models and ORM > Errors](http://sailsjs.com/documentation/concepts/models-and-orm/errors) for an example of how to negotiate a uniqueness error (i.e. from attempting to create a record with a duplicate that would violate a uniqueness constraint).
| 2 | _createdRecord_     | ((dictionary?))     | For improved performance, the created record is not provided to this callback by default.  But if you chain `.fetch()`, then the newly-created record will be sent back. (Be aware that this requires an extra database query in some adapters.)

##### Meta keys

| Key                 | Type              | Details                                                        |
|:--------------------|-------------------|:---------------------------------------------------------------|
| fetch               | ((boolean))       | If set to `true`, then the created record will be provided as the second argument of the callback.<br/><br/>Defaults to `false`.

> For more information on meta keys, see [.meta()](http://sailsjs.com/documentation/reference/waterline-orm/queries/meta).


### Example

To create a user named Finn in the database:
```javascript
User.create({name:'Finn'})
.exec(function (err){
  if (err) {
    return res.serverError(err);
  }

  return res.ok();
});
```

##### Fetching the newly-created record
```javascript
User.create({name:'Finn'})
.fetch()
.exec(function (err, createdUser){
  if (err) {
    return res.serverError(err);
  }

  sails.log('Finn\'s id is:', createdUser.id);
  return res.ok();
});
```

### Negotiating errors

It's important to always handle errors from model methods.  But sometimes, you need to look at errors in a more granular way. To learn more about the kinds of errors Waterline returns, and for examples of how to handle them, see [Concepts > Models and ORM > Errors](http://sailsjs.com/documentation/concepts/models-and-orm/errors).


<docmeta name="displayName" value=".create()">
<docmeta name="pageType" value="method">
