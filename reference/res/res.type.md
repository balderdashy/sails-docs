# res.type()

レスポンスの"Content-Type"ヘッダーに指定された`type`をセットします。

このメソッドは非常に寛容（下記の例を御覧ください）ですが、`type`が`"/"`を含んでいた場合、これはMINEタイプだとみなし、そのまま解釈します。

### 使い方
```javascript
res.type(type);
```

### 例
```javascript
res.type('.html');
res.type('html');
res.type('json');
res.type('application/json');
res.type('png');
```





<docmeta name="uniqueID" value="restype43929">
<docmeta name="displayName" value="res.type()">

