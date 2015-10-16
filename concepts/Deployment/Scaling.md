# スケーリング

直近の予定としてトラフィックの増大を想定しているなら（あるいはすでに多くのトラフィックがあるなら）
多くの人のアクセスを受け入れられるようなスケーラブルなアーキテクチャでのセットアップを行いましょう。

### ベンチマーク

ほとんどの部分に関してSailsのベンチマークは他のConnectやExpress、Socket.ioのアプリケーションと全く同じです。このことはいくつ管異なる環境下で確認されており、直近のものは[これ](http://serdardogruyol.com/?p=111)です。もしあなた自身でおこなったベンチマークの結果をシェアしてもいいならgithubひプルリクエストを送ってください。


### アーキテクチャ例

```
                       Sails.js server
                             ....                 
                    /  Sails.js server  \      /  Database (e.g. Mongo, Postgres, etc)
Load Balancer  <-->    Sails.js server    <-->    Socket store (Redis)
                    \  Sails.js server  /      \  Session store (Redis)
                             ....                 
                       Sails.js server
```


### クラスタでのデプロイのためにアプリケーションを設定する

+ モデルに使われているデータベース（MySQLやPostgres、Mongoなど）がスケーラブルなこと（シェーディングやクラスタリングがなされている）を確認して下さい。
+ 共有のセッションストアを利用する設定をしてください。
  + Radisを使った実装がサポートされています。(`config/session.js`の`adapter`オプションをご確認ください)
+ もしもSocketを使ってるなら:
  + 共有のソケットストアを利用する設定をしてください。
    + Radisを使った実装がサポートされています。(config/sockets.jsの`adapter`オプションをご確認ください
    + Socket.ioのデフォルト設定ではまず[long-polling](http://en.wikipedia.org/wiki/Push_technology#Long_polling)を使って接続を試みるようになっています。これが動作するにするためサーバー環境はsticky load-balancing (sticky sessionsとも言います)を[サポートしなければならない](http://socket.io/blog/introducing-socket-io-1-0/#scalability)、さもなければコネクションがWebsockets使用のものにアップグレードされるまで（そしてWebsocketsが利用可能なとき以外は）失敗します。
      **Heroku**ではベータ版のsticky load-balancing機能を [明示的に有効化](https://devcenter.heroku.com/articles/session-affinity)しなければなりません。
      stickky load balancingが無い環境では[config/sockets.js](https://github.com/balderdashy/sails-docs/blob/v0.11/reference/sails.config/sails.config.sockets.md)で`transports`設定を`['websocket']`にしてwebsocketの使用を強制することでlong-pollingを避けなければなりません。クライアント側でも透過性の設定をしなければなりません。（もし`sails.io.js`を使っているのであれば`sails.io.js`をインクルードした直後に`<script>io.sails.transports=['websocket']</script>`を追加するだけで簡単にできます） この問題に対する更に劇的な読み物としては[このスレッド](https://github.com/Automattic/engine.io/issues/261)をお読みください。
 + その他の依存関係にある部分が共有メモリに依存していないことを確認してください。

### Sailsのクラスタを複数台のサーバにアップロードする

+ ロードバランサの後ろに複数個のインスタンス（つまりプロジェクトが動いているサーバ）をセットアップする。
  + それぞれのインスタンスで`forever`を使ってSailsを起動する。
  + ロードバランサーに関してのさらなる詳細は: https://en.wikipedia.org/wiki/Load_balancing_(computing)
+ ロードバランサーがSSLを終端するように設定する
  + そのためSails側でSSLを設定する必要はありません。（通信はすでに復号されています。）


<docmeta name="uniqueID" value="Scaling291270">
<docmeta name="displayName" value="Scaling">
