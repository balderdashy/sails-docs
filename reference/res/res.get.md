# res.get()

指定されたレスポンスヘッダ―(`header`)の現在の値を返します。

### 使い方
```js
res.get(header);
```

### 例
```javascript
res.get('Content-Type');
// -> "text/plain"
```

### 備考
>+ `header`引数は大文字小文字を区別しません。
>+レスポンスヘッダーはレスポンスが送信される前に変更が可能です。[`res.set()`](http://sailsjs.org/documentation/reference/res/res.set.html)を御覧ください。













<docmeta name="uniqueID" value="resget697790">
<docmeta name="displayName" value="res.get()">
