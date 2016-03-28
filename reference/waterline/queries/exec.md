# .exec()

Execute a Waterline [query instance](http://sailsjs.org/documentation/reference/waterline-orm/queries).

```javascript
query.exec(function afterwards(err, result) {

});
```

### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |    callback         | ((function))                                 | The Node-style callback that will be called when the query completes; successfully or otherwise.

##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    err              | ((Error?))          | The error that occurred, or `undefined` if there were no errors.
| 2 |    result           | ((JSON))            | The result from the database.  Exact data type depends on the query.  If an error occurred (i.e. `err` is truthy), then this result argument should be ignored.





### Example

```javascript
Zookeeper.find().exec(function (err, zookeepers) {
  if (err) {
    // uh oh
    // (handle error; e.g. `return res.negotiate()`)
    return;
  }

  // would you look at all those zookeepers?
  // (now let's do the next thing;
  //  e.g. `_.reduce(zookeepers, ...)` and/or `return res.json(zookeepers)`)
});
//
// (don't put code out here)
```


### Notes
> If you don't run `.exec()` or use promises, your query will not execute. For help using `.exec()` with model methods like `.find()`, read more about the [chainable query object](http://sailsjs.org/documentation/reference/waterline-orm/queries).




<docmeta name="displayName" value=".exec()">
<docmeta name="pageType" value="method">

