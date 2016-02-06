# req.is()
リクエストの"Content-Type"が指定されたmedia/mime `type`に合った時にTrueを返します。

細かく言うと、このメソッドは与えられた`type`と"Content-Type"ヘッダのマッチを確認します。

### 使い方
```js
req.is(type);
```


### 例
リクエストが"Content-Type" header, "text/html; charset=utf-8"を持っていると仮定すると:
```javascript
req.is('html');
// -> true
req.is('text/html');
// -> true
req.is('text/*');
// -> true
```



<docmeta name="uniqueID" value="reqis371514">
<docmeta name="displayName" value="req.is()">

