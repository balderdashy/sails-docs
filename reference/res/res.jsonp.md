# res.jsonp()

Send a JSON or JSONP response.

Identical to [`res.json()`](/#/documentation/reference/res/res.json.html), except if a "callback" parameter exists, a [JSONP](http://en.wikipedia.org/wiki/JSONP) response will be sent instead, using the value of the "callback" parameter as the name of the function wrapper.

### Usage
```js
return res.jsonp([statusCode, ] data);
```

### Example

```js
return res.jsonp({
  users: [{
    name: 'Thelma',
    id: 1
  }, {
    name: 'Leonardo'
    id: 2
  }]
});
```

<!--

Need to make this better:

By default the JSONP callback name is simply callback, however you may alter this with the jsonp callback name setting. The following are some examples of JSONP responses using the same code:

```javascript
// ?callback=foo
res.jsonp({ user: 'tobi' })
// foo({ "user": "tobi" })

app.set('jsonp callback name', 'cb');

// ?cb=foo
res.jsonp(500, { error: 'message' })
// foo({ "error": "message" })
```
-->

### Notes
> + Don't forget this method's name is all lowercase.
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).







<docmeta name="uniqueID" value="resjsonp798206">
<docmeta name="displayName" value="res.jsonp()">

