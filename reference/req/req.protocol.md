# req.protocol
リクエスト(`req`)に使われたプロトコルです。

### 使い方
```javascript
req.protocol;
```

### 例

```js
switch (req.protocol) {
  case 'http':
    // this is an HTTP request
    break;
  case 'https':
    // this is a secure HTTPS request
    break;
}
```



<docmeta name="uniqueID" value="reqprotocol732076">
<docmeta name="displayName" value="req.protocol">

