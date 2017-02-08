# .create()

Create a record in the database.

```javascript
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
| 1 | _err_               | ((Error?))          | The error that occurred, or `undefined` if there were no errors.  See below for an example of how to negotiate a uniqueness error (i.e. from attempting to create a record with a duplicate that would violate a uniqueness constraint).
| 2 | _createdRecord_     | ((dictionary?))     | For improved performance, the created record is not provided to this callback by default.  But if you enable `.meta({fetch: true})`, then the newly-created record will be sent back. (Be aware that this requires an extra database query in some adapters.)

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
.meta({fetch: true})
.exec(function (err, createdUser){
  if (err) {
    return res.serverError(err);
  }

  sails.log('Finn\'s id is:', createdUser.id);
  return res.ok();
});
```


### Negotiating errors

It's important to always handle errors from model methods.  But sometimes, you need to look at errors in a more granular way.

> The exact strategy you use to do this in your Sails app depends on whether you're using [callbacks or promises](https://github.com/balderdashy/sails/issues/3459#issuecomment-171039631).  Remember: use whatever you're most comfortable with.  If you aren't sure, start with callbacks.

##### Negotiating errors with callbacks

```javascript
User.create({
  email: req.param('email')
})
.exec(function(err){
  if (err){
    // Uniqueness constraint violation
    if (err.code === 'E_UNIQUE') {
      return res.status(401).json(err);
    }
    // Some other kind of usage / validation error
    else if (err.name === 'UsageError') {
      return res.badRequest(err);
    }
    // If something completely unexpected happened.
    else {
      return res.serverError(err);
    }
  }
  
  return res.ok();
})
```

##### Negotiating errors with promises

```javascript
User.create({
  email: req.param('email')
})
// Uniqueness constraint violation
.catch({ code: 'E_UNIQUE' }, function (err) {
  return res.status(401).json(err);
})
// Some other kind of usage / validation error
.catch({ name: 'UsageError' }, function (err) {
  return res.badRequest(err);
})
// If something completely unexpected happened.
.catch(function (err) {
  return res.serverError(err);
});
```


> For a more complex example, see https://gist.github.com/mikermcneil/801e827948d5de7e26b2420ff39d3c68.

<docmeta name="displayName" value=".create()">
<docmeta name="pageType" value="method">
