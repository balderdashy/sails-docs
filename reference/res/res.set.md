# res.set()
特定のレスポンスヘッダ(`header`) に特定の値(`value`)をセットします
 
代わりに、キーをフィールド名、値を設定したい値にする形の複数のヘッダフィールドを含む一つオブジェクトの引数(`headers`)を渡すことも可能です。

### 使い方
```js
res.set(header, value);
```

-または-

```js
res.set(headers);
```

### 例
```javascript

res.set('Content-Type', 'text/plain');

res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  'ETag': '12345'
})

```


<docmeta name="uniqueID" value="resset167965">
<docmeta name="displayName" value="res.set()">

