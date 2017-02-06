# .sendStatement()

Send a Waterline "statement" (stage 4 query) to the database and return the results.

```
someDatastore.sendStatement(statement).exec(function(err, parsedResult) {

});
```

### Usage
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 |  statement          | ((dictionary))      | A Waterline "statement". See the [Waterline query docs](https://github.com/treelinehq/waterline-query-docs/tree/8f0228cbb05fca72693cc2cb3747e05593b8063c) for more information on the format.|

##### Callback
|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | The error that occurred, or a falsy value if there were no errors.  _(The exact format of this error varies depending on the SQL query you passed in and the database adapter you're using.  See examples below for links to relevant documentation.)_
| 2 |    _parsedResult_   | ((Ref?))         | The parsed result from the database adapter, if any. (The exact format of this parsed result data varies depending on the SQL query you passed in, as well as the adapter you're using. See example below for links to relevant documentation.) |




### Example
```javascript
sails.getDatastore()
.sendStatement({
  select: ['title', 'author'],
  from: 'books',
  where: {
    title: 'robinson crusoe'
  }
}).exec(function (err, result) {
  if (err) { return res.serverError(err); }
  return res.json(result);
});
```


<docmeta name="displayName" value=".sendStatement()">
<docmeta name="pageType" value="method">
