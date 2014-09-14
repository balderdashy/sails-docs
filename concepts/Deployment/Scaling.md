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
    + 備考:もしソケットストアを利用する実装をしていない場合ロードバランサーでsticky sessionsを設定することが解決策になりえます。
+ その他の依存関係にある部分が共有メモリに依存していないことを確認してください。

### Sailsのクラスタを複数台のサーバにアップロードする

+ ロードバランサの後ろに複数個のインスタンス（つまりプロジェクトが動いているサーバ）をセットアップする。
  + それぞれのインスタンスで`forever`を使ってSailsを起動する。
  + ロードバランサーに関してのさらなる詳細は: http://en.wikipedia.org/wiki/Load_balancing_(computing)
+ ロードバランサーがSSLを終端するように設定する
  + そのためSails側でSSLを設定する必要はありません。（通信はすでに復号されています。）


<docmeta name="uniqueID" value="Scaling291270">
<docmeta name="displayName" value="Scaling">

