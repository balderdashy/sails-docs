# res.type()

Sets the "Content-Type" response header to the specified `type`.

This method is pretty forgiving (see examples below), but note that if `type` contains a `"/"`, `res.type()` assumes it is a MIME type and interprets it literally.

### Usage
```javascript
res.type(type);
```

### Example
```javascript
res.type('.html');
res.type('html');
res.type('json');
res.type('application/json');
res.type('png');
```





<docmeta name="uniqueID" value="restype43929">
<docmeta name="displayName" value="res.type()">

