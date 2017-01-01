# .find()

Find records in your database that match the given criteria.

```javascript
Something.find(criteria).exec(function (err, records) {

});
```

### Usage

|   |     Argument        | Type              | Details                            |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 |    criteria         | ((dictionary))    | The [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching records in the database.

##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    err              | ((Error?))          | The error that occurred, or `undefined` if there were no errors.
| 2 |    records          | ((array))           | The array of records from your database which match the given criteria.


### Example

##### A basic find query

To find any users named Finn in the database:
```javascript
User.find({name:'Finn'}).exec(function (err, usersNamedFinn){
  if (err) {
    return res.serverError(err);
  }
  sails.log('Wow, there are %d users named Finn.  Check it out:', usersNamedFinn.length, usersNamedFinn);
  return res.json(usersNamedFinn);
});
```


##### Using projection

Projection selectively omits the fields returned on found records. This can be done, for example, for faster performance, or for greater security when passing found records to the client. The select clause in a [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) takes an array of strings that correspond with attribute names. The record ID is always returned.
```javascript
User.find({where:{name:'Finn'}, select: ['name', 'email']}).exec(function (err, usersNamedFinn){
  if (err) {
    return res.serverError(err);
  }

  return res.json(usersNamedFinn);
});
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
