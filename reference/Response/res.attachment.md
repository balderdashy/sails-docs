# res.attachment()

Sets the "Content-Disposition" header of the current response to "attachment". If a `filename` is given, then the "Content-Type" will be automatically set based on the extension of the file (e.g. `.jpg` or `.html`), and the "Content-Disposition" header will be set to "filename=`filename`".

### Usage
```javascript
res.attachment([filename]);
```

### Example
```javascript
res.attachment();
// -> response header will contain:
//   Content-Disposition: attachment

res.attachment('path/to/logo.png');
// -> response header will contain:
//   Content-Disposition: attachment; filename="logo.png"
//   Content-Type: image/png
```




<docmeta name="uniqueID" value="resattachment107506">
<docmeta name="displayName" value="res.attachment()">

