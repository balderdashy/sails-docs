# res.get()

Returns the current value of the specified response header (`header`).

### Usage
```js
res.get(header);
```

### Example
```javascript
res.get('Content-Type');
// -> "text/plain"
```

### Notes
>+ The `header` argument is case-insensitive.
>+Response headers can be changed up until the response is sent - see [`res.set()`](/#/documentation/reference/res/res.set.html).













<docmeta name="uniqueID" value="resget697790">
<docmeta name="displayName" value="res.get()">

