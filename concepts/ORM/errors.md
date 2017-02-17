# Errors

When using code that interacts with Waterline (usually through model methods), there are a few different sorts of error you may encounter.

### Usage error
A usage error indicates that there was a validation error, and will contain information about the parameters that didn't pass validation.

### Adapter error

Adapter errors usually indicate a problem in the underlying adapter, and not in the request itself. This can happen when a database goes offline, when there is a permission issue, because of some database-specific edge case, or (more rarely) a bug in the adapter.

The one time an adapter error _is_ the result of a problem with the request is in the case of a uniqueness violation.

##### Uniqueness

A uniqueness error is an adapter error that occurs when a value that _should_ be unique matches that of another record. This type of error will have `code: 'E_UNIQUE'`.

This sort of error can only occur with `.create()`, `.update()`, `.addToCollection()`, and `.replaceCollection()`.

### Negotiating errors

The exact strategy you use to do this in your Sails app depends on whether you're using [callbacks or promises](https://github.com/balderdashy/sails/issues/3459#issuecomment-171039631).  Remember: use whatever you're most comfortable with.  If you aren't sure, start with callbacks.

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
.then(function (){
  return res.ok();
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


<docmeta name="displayName" value="Errors">
