# .createEach()

Create a set of records in the database.

```javascript
Something.createEach(newRecords)
.exec(function (err, records) {
  //...
});
```

### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |  _newRecords_    | ((array?))                                   | An array of dictionaries with attributes for the new records.

##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | The error that occurred, or `undefined` if there were no errors.

##### Meta keys

| Key                 | Type              | Details                                                        |
|:--------------------|-------------------|:---------------------------------------------------------------|
| fetch               | ((boolean))       | If set to `true`, then the created records will be provided as the second argument of the callback.



### Example

To create users named Finn and Jake in the database:
```javascript
User.createEach([{name:'Finn'}, {name: 'Jake'}])
.exec(function (err){
  if (err) {
    return res.serverError(err);
  }

  return res.ok();
});
```

##### Fetching newly-created records
```javascript
User.createEach([{name:'Finn'}, {name: 'Jake'}])
.meta({fetch: true})
.exec(function (err, createdUsers){
  if (err) {
    return res.serverError(err);
  }

  sails.log('Created ' + createdUsers.length + 'users.');
  return res.ok();
});
```



<docmeta name="displayName" value=".createEach()">
<docmeta name="pageType" value="method">
