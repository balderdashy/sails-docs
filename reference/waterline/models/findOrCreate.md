# findOrCreate

Find the record matching the specified criteria. If no record exists or more than one record matches the criteria, an error will be returned.

```javascript
Something.findOrCreate(criteria, values)
.exec(function(err, attr, createdOrFound) {
  // ...
});
```


#### Usage

| # | Argument      | Type                  | Details    |
|---|---------------|:----------------------|:-----------|
| 1 | _criteria_    | ((dictionary?))       | The [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching records in the database.
| 2 |    values     | ((dictionary))                               | The attributes that the new record should have, if one is created.



#### Callback
|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    err              | ((Error?))          | The error that occurred, or `undefined` if there were no errors.
| 2 |    records          | ((array))           | The array of records from your database which match the given criteria.
| 3 | wasCreatedOrFound   | ((boolean))         | Whether a record could be found or created.

### Example

Ensure an a pet with `type: 'dog'` exists:
```javascript
Pet.findOrCreate({ type: 'dog' }, { type: 'dog' })
.exec(function(err, pet, wasCreatedOrFound) {
  if (err) { return res.serverError(err); }

  sails.log('Found or created a pet with type:', pet.type);
  return wasCreatedOrFound;
});
```

<docmeta name="displayName" value=".findOrCreate()">
<docmeta name="pageType" value="method">
