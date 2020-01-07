# `res.status()`

Set the status code of this response.

### Usage
```usage
res.status(statusCode);
```

### Example
```javascript
res.status(418);
res.send('I am a teapot');
```

### Notes
>+ The status code may be set up until the response is sent.
>+ `res.status()` is effectively just a chainable alias of Node's `res.statusCode = …;`.
>+ As of Sails v1.x, for HTTP requests, `res.redirect()` [does not respect the status code established by `res.status()`](https://github.com/balderdashy/sails-docs/pull/796#issuecomment-284224746).










<docmeta name="displayName" value="res.status()">
<docmeta name="pageType" value="method">
