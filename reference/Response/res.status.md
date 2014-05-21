# res.status()

Set the status code of this response.

### Usage
```js
res.status(200);
```

### Example
```javascript
res.status(404);
res.send('oops');
```

### Notes
>+ The status code may be set up until the response is sent.
>+ `res.status()` is effectively just a chainable alias of node's '`res.statusCode=`.









<docmeta name="uniqueID" value="resstatus819458">
<docmeta name="displayName" value="res.status()">

