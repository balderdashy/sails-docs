# .avg()

Get the aggregate mean of the specified attribute across all matching records.

```javascript
Something.avg(numericAttrName, criteria)
.exec(function (err, average){
  // ...
});
```

### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |  numericAttrName    | ((string))                                   | The name of the numeric attribute whose mean will be calculated.
| 2 |  _criteria_         | ((dictionary?))                                | The [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching records in the database. If no criteria is specified, the average will be computed across _all_ of this model's records.


##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | The error that occurred, or `undefined` if there were no errors.
| 2 |    average          | ((number))          | The aggregate mean of the specified attribute across all matching records.


### Example

Get the average balance of bank accounts owned by people between the ages of 35 and 45.

```javascript
BankAccount.avg('balance')
.where({
  ownerAge: { '>=': 35, '<=': 45 }
})
.exec(function (err, averageBalance){
  if (err) { return res.serverError(err); }

  return averageBalance;
});
```


<docmeta name="displayName" value=".avg()">
<docmeta name="pageType" value="method">
