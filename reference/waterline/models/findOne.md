# .findOne()

Attempt to find a particular record in your database that matches the given criteria.

```javascript
Something.findOne(criteria).exec(function (err, record) {

});
```

#### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|------------------------------------|
| 1 |    criteria         | ((dictionary))                               | The first record which matches this [Waterline criteria](https://github.com/balderdashy/waterline-docs/blob/master/queries/query-language.md) will be returned.

##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|----------------------------------------------------------------------------------|
| 1 |    err              | ((Error?))          | The error that occurred, or `undefined` if there were no errors.
| 2 |    record           | ((dictionary?))     | The record that was found, or `undefined` if no such record could be located.




### Example

To locate the user whose username is "finn" in your database:
```javascript

User.findOne({
  username:'finn'
}).exec(function (err, finn){
  if (err) {
    return res.serverError(err);
  }
  if (!finn) {
    return res.notFound('Could not find Finn, sorry.');
  }

  sails.log('Found "%s"', finn.fullName);
  return res.json(finn);
});
```



### Notes
> - Being unable to find a record with the given criteria does **not** constitute an error for `findOne()`.  If no matching record is found, the value of the 2nd argument to the callback (e.g. `finn`) will be `undefined`.



<docmeta name="importance" value="10">
<docmeta name="displayName" value=".findOne()">
<docmeta name="pageType" value="method">

