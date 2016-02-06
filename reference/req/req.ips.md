# req.ips
"trust proxy"が有効の時、この値にはリクエストの"X-Forwarded-For"の中身がIPアドレス文字列の配列として与えられます。そうでない時は空の配列を返します

### 使い方
```js
req.ips;
```

### 例
リクエストがヘッダー"X-Forwarded-For: client, proxy1, proxy2"を含むとき:

```js
req.ips;
// -> ["client", "proxy1", "proxy2"]`

// ("proxy2" is the furthest "down-stream" IP address)
```









<docmeta name="uniqueID" value="reqips78262">
<docmeta name="displayName" value="req.ips">

