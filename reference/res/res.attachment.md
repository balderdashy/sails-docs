# res.attachment()

現在のリクエストの "Content-Disposition"に"attachment"をセットします。`filename`が与えられていれば"Content-Type"はファイル名の拡張子(`.jpg`または`.html`など)から自動的に推測されてセットされ"Content-Disposition"ヘッダーには"filename=`filename`"がセットされます。

### 使い方
```javascript
res.attachment([filename]);
```

### 例
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

