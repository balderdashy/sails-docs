# Sockets (sails.sockets)

### 概要

Sailsは`sails.sockets`を使ったリアルタイム通信のためのいくつかの低レベルのメソッドを露出させています。これらのメソッドは `sails.io`として利用可能な[Socket.io](http://socket.io)を使って実装されています。しかしながら`sails.sockets`を代わりに使うことにより、より低レイヤーの実装の将来的な変更に対応することができます。もしあなたのアプリケーションが主にモデルの変更に関してクライアントに送信しているのであれば[モデルPubSubメソッド](https://github.com/balderdashy/sails-docs/blob/0.10/reference/ModelMethods.md#publishcreate-datasocket-) を代わりに使うべきです。

### `sails.io`を探していますか。

下層レイヤーの[socket.io](http://socket.io/)シングルトンにアクセスするためには`sails.io`を使うこともできます。しかし、今後のリリースでは低レイヤー実装をよりフレキスブルかつ拡張可能にするために`sails.io`が廃止される可能性がありますので、Sails v0.10からはソケット関連の低レベルアクセスの多くの場合に関して`sails.sockets`を使うべきです。


<docmeta name="uniqueID" value="Sockets505826">
<docmeta name="displayName" value="sails.sockets">
<docmeta name="stabilityIndex" value="3">
