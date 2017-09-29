# .count()

Get the number of records matching a criteria.

```usage
var numRecords = await Model.count(criteria);
```

### Usage

| # | Argument      | Type                  | Details    |
|---|---------------|:----------------------|:-----------|
| 1 | _criteria_    | ((dictionary?))       | The [Waterline criteria](https://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching records in the database.  Note that `count` queries do not support pagination using `skip` and `limit` or projections using `select`.


##### Result

| Type                | Description      |
|---------------------|:-----------------|
| ((number))          | The number of records from your database which match the given criteria.


##### Errors

| Name                | Type                | When?                                                        |
|:--------------------|---------------------|:-------------------------------------------------------------|
| UsageError          | ((error))           | Thrown if something in the provided criteria was invalid.
| AdapterError        | ((error))           | Thrown if something went wrong in the database adapter.
| Error               | ((error))           | Thrown if anything else unexpected happens.


### Example

```javascript
var total = await User.count({name:'Flynn'});
sails.log('There are ' + total + ' users named "Flynn"');
return res.json(total);
```



<docmeta name="displayName" value=".count()">
<docmeta name="pageType" value="method">
