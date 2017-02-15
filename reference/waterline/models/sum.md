# .sum()

Get the aggregate sum of the specified attribute across all matching records.

```usage
Something.sum(numericAttrName, criteria)
.exec(function (err, total){
  // ...
});
```

### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |  numericAttrName    | ((string))                                   | The name of the numeric attribute that will be totaled up.
| 2 |  _criteria_         | ((dictionary?))                                | The [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching records in the database. If no criteria is specified, the sum will be computed across _all_ of this model's records. `sum` queries do not support pagination using `skip` and `limit` or projections using `select`.


##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|:--------------------|:---------------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | The error that occurred, or `undefined` if there were no errors.
| 2 |    total            | ((number))          | The aggregate sum of the specified attribute across all matching records.


### Example

Get the cumulative account balance of all bank accounts that have less than $32,000, or that are flagged as "suspended".


```javascript
BankAccount.sum('balance')
.where({
  or: [
    { balance: { '<': 32000 } },
    { suspended: true }
  ]
})
.exec(function (err, total){
  if (err) { return res.serverError(err); }

  return total;
});
```


<docmeta name="displayName" value=".sum()">
<docmeta name="pageType" value="method">
