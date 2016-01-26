# .find()

Find records in your database that match the given criteria.

```javascript
Something.find(criteria).exec(function (err, records) {
  
});
```

### Usage

|   |     Argument        | Type                                         | Details                            |
|---|---------------------|----------------------------------------------|:-----------------------------------|
| 1 |    criteria         | ((dictionary))                               | The [Waterline criteria](https://github.com/balderdashy/waterline-docs/blob/master/queries/query-language.md) to use for matching records in the database.

##### Callback

|   |     Argument        | Type                | Details |
|---|---------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    err              | ((Error?))          | The error that occurred, or `undefined` if there were no errors.
| 2 |    records          | ((array))           | The array of records from your database which match the given criteria.


### Example

To find any users named Finn in the database:
```javascript
User.find({name:'Finn'}).exec(function (err, usersNamedFinn){
  if (err) {
    return res.negotiate(err);
  }
  sails.log('Wow, there are %d users named Finn.  Check it out:', usersNamedFinn.length, usersNamedFinn);
  return res.json(usersNamedFinn);
});
```


<docmeta name="importance" value="10">
<docmeta name="displayName" value=".find()">

