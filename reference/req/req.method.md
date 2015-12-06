# req.method
リクエストのメソッド（別名:動詞）です。

### 使い方
```js
req.method;
```

### 例

クライアントが`/product`に対してPOSTリクエストをした場合 :

```js
req.method;
// -> "POST"
```

### 備考

> + All requests to a Sails server have a "method", even via WebSockets (this is thanks to the request interpreter)








<docmeta name="uniqueID" value="reqmethod305728">
<docmeta name="displayName" value="req.method">

