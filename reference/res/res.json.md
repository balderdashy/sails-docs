# res.json()

Sends a JSON response composed of a stringified version of the specified `data`.

### Usage
```js
return res.json([statusCode, ] data);
```

### Details

This method is identical to res.send() when an object or array is passed, however it may be used for explicit JSON conversion of non-objects (null, undefined, etc), though these are technically not valid JSON.

### Example
```javascript
res.json(null)
res.json({ user: 'tobi' })
res.json(500, { error: 'message' })
```

### Notes
> + Don't forget this method's name is all lowercase.
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).



<docmeta name="uniqueID" value="resjson72272">
<docmeta name="displayName" value="res.json()">

