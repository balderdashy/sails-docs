# res.location()
与えられたURL(`url`)のエクスプレッションに"Location"レスポンスヘッダーを設定します。

### 使い方
res.location(url);

### 例
```javascript
res.location('/foo/bar');
res.location('foo/bar');
res.location('http://example.com');
res.location('../login');
res.location('back');
```

### 備考
>+ res.redirect()と同じURL表記を使えます。










<docmeta name="uniqueID" value="reslocation779137">
<docmeta name="displayName" value="res.location()">

