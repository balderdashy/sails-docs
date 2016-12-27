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
| 2 |    records          | ((array))          | The newly-created records.



### Example

To create users named Finn and Jake in the database:
```javascript
User.create([{name:'Finn'}, {name: 'Jake'}])
.exec(function (err, records){
  if (err) { return res.serverError(err); }

  return res.ok();
});
```


<docmeta name="displayName" value=".createEach()">
<docmeta name="pageType" value="method">
