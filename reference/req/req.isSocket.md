# req.isSocket

リクエスト (`req`)がSocket.ioのコネクションから来るかどうかを識別するフラグです。


### 使い方
```js
req.isSocket;
```

### 例
```javascript
if (req.isSocket){
  // You're a socket.  Do cool socket stuff.
}
else {
  // Just another HTTP request.
}
```

### 備考

> + HTTPリクエストに対してSocket.ioリクエスト依存のpubsubや`subscribe()`や`watch()`などのWebSocket中心のメソッドをスキップさせるのに便利です。これによりHTTPリスエストとWebSocketリクエストに関してバックエンドのコードの再利用が出来ます。
> + お気付きの通り、`req.isSocket`はソケットに接続されている **他者に送信する** コードを実行する前に確認する必要がありません。それらのメソッドはリクエスト依存ではないので、どちらにせよ動作します。










<docmeta name="uniqueID" value="reqisSocket87074">
<docmeta name="displayName" value="req.isSocket">

