# .sendStatement()

Send a Waterline "statement" (stage 4 query) to the database and return the results.

```
someDatastore.sendStatement(statement).exec(explicitCb);
```

### Usage
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 |  statement          | ((dictionary))      | A Waterline "statement". See the [Waterline query docs](https://github.com/treelinehq/waterline-query-docs/tree/8f0228cbb05fca72693cc2cb3747e05593b8063c) for more information on the format.|



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
