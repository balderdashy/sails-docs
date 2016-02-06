# req.socket

現在のリクエスト(`req`)がSocket.ioクライアント経由で行われていた場合、`req.socket` はSocket.ioの生のインスタンスを参照します。

### 使いかた

```js
req.socket;
```


### 詳細

> **警告:**
>
> `req.socket`はSailsの将来のリリースで廃止されるかもしれません。代わりに[`sails.sockets.*`](http://sailsjs.org/documentation/reference/Sockets)メソッドを使うべきです。

現在のリクエスト(`req`)がSoket.ioクライアント経由ではない場合、`req.socket`は同様の意味を持ちません。最も一般的なシナリオではHTTPリクエスト`req.socket`は確かに _存在します_ がその下にあるTCPソケットを指します。`req.socket`を使う前に[`req.isSocket`](http://sailsjs.org/documentation/reference/req/req.isSocket.html)フラグを確認し、リクエストが確かにSocket.io経由であることを確かめるべきです。

`req.socket.id`は現在のソケットを指すユニークな識別子です。これはクライアントが初めて接続した際にSocket.ioサーバが作成し、ソケットが切断されるまで（もしもクライアントがWebブラウザであればブラウザタブが閉じられるまで。）の間有効なユニーク識別子で在り続けます。

Sailsは同様に`req.socket`、`req.socket.join`、`req.socket.leave`、`req.socket.broadcast`その他全てのSocket.ioからのメソッドやプロパティに対するローレベルで直接的なアクセスを提供します。詳しくは[Socket.io wiki](https://github.com/Lear。いおnBoost/socket.io/wiki/Rooms)の該当する箇所をご確認下さい。


### 例

```js
if (req.isSocket) {
  // Low-level Socket.io methods and properties accessible on req.socket.
  // ...
}
else {
  // This is not a request from a Socket.io client, so req.socket
  // may or may not exist.  If this is an HTTP request, req.socket is actually
  // the underlying TCP socket.
  // ...
}
```





<docmeta name="uniqueID" value="reqsocket572002">
<docmeta name="displayName" value="req.socket">
