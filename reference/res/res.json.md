# res.json()

Sends a JSON response composed of the specified `data`.

### Usage
```usage
return res.json(data);
```

### Details

This method is identical to res.send() when an object or array is passed, however it may be used for explicit JSON conversion of non-objects (null, undefined, etc), though these are technically not valid JSON.

### Examples

```javascript
return res.json({ firstName: 'Tobi' });
```

```javascript
return res.status(201).json({ id: 201721 });
```

```javascript
var leena = await User.findOne({ firstName: 'Leena' });
if (!leena) { return res.notFound(); }
return res.json(leena.id);//« you can send down primitives, like numbers
```

### Notes
> + Don't forget this method's name is all lowercase.
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).




<docmeta name="displayName" value="res.json()">
<docmeta name="pageType" value="method">
