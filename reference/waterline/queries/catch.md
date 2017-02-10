# .catch()

Execute a Waterline [query instance](http://sailsjs.com/documentation/reference/waterline-orm/queries) using promises.

```usage
query.catch(callback);
```

> This is an alternative to `.exec()`.  When combined with `.then()`, it provides the same functionality.

### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |   callback      | ((function?))                                    | A function that runs if the query fails.<br/><br/> Takes the error as its argument.


##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |   err               | ((Ref?))            | The error that occured.


### Example

To look up the user with the specified email address:

```javascript
User.findOne({
  email: req.param('email')
})
.then(function (){
  return res.ok();
})
// If there was some kind of usage / validation error
.catch({ name: 'UsageError' }, function (err) {
  return res.badRequest(err);
})
// If something completely unexpected happened.
.catch(function (err) {
  return res.serverError(err);
});
```
```


### Notes
> + The `.catch()` function also returns a promise, to allow for chaining.
> + For more information, see the [bluebird `.catch()` api docs](http://bluebirdjs.com/docs/api/catch).



<docmeta name="displayName" value=".catch()">
<docmeta name="pageType" value="method">
