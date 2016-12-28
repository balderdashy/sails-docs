# .count()

Get the number of records matching a criteria.

#### Usage

| # | Argument      | Type                  | Details    |
|---|---------------|:----------------------|:-----------|
| 1 | _criteria_    | ((dictionary?))       | The [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching records in the database.

#### Callback

| # | Description       | Type                | Details      |
|---|-------------------|:--------------------|:-------------|
| 1 | _err_             | ((error?))          | The error that occurred, or `undefined` if there were no errors.
| 2 | numRecords        | ((number))          | The number of records from your database which match the given criteria.

### Example

```javascript
User.count({name:'Flynn'})
.exec(function (err, numRecords) {
  if (err) { return res.serverError(err); }

  sails.log('There are ' + numRecords + ' users called "Flynn"');
  return numRecords;
});
```



<docmeta name="displayName" value=".count()">
<docmeta name="pageType" value="method">
