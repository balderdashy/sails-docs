#デプロイ

###概要

####デプロイする前に

アプリケーションをデプロイする前に以下のことを自問してみてください。

+ あなたが予期している通信は何ですか。
+ 契約上（SLAなど）、稼働時間の補償に適合する必要がありますか。
+ どんな種類のフロントエンドアプリかあなたのインフラを「叩いて」きますか。
  + Androidアプリケーション
  + iOSアプリケーション
  + デスクトップWebブラウザ
  + モバイルWebブラウザ (タブレットや携帯、iPadminiなど)
  + テレビ？時計？トースター？。。。
+ それらはどんなものをリクエストしてきますか。
  + JSON?
  + HTML?
  + XML?
+ Socket.ioを利用してリアルタイムのPublish/Subscribeデザインパターンに対応する必要がありますか。
  + 例：チャット、リアルタイム分析、アプリ内通知・メッセージ
+ クラッシュした時やエラーが起こった時どうやって監視しますか。
  + Sailsのログ設定を見てみてください。



#### 1台のサーバにデプロイする

Node.jsはものすごく速いです。そのため来るべきトラフィックをハンドルするためには1台のサーバーで十分です（少なくとも最初のうちは）

##### 設定

+ すべてのプロダクション環境の設定は`config/env/production.js`に保存されています。
+ アプリケーションが80番ポートで動作するように設定してください（Nginxのようなプロキシを使わない時は）もしNginxを使っているときはアプリケーションにWebSocketをリレーするように設定してください。Nginxの[WebSocket proxying](http://nginx.org/en/docs/http/websocket.html)ドキュメントでこれに関する手順を見ることが出来ます。
+ すべてのcssとjsがバンドルされるようにプロダクション環境を設定し、内部サーバが適切な環境に切り替わるようにしてください。（[linker](https://github.com/balderdashy/sails-wiki/blob/0.9/assets.md)が必要です）
+ データベース設定がプロダクション環境に設定されていることを確認して下さい。これはあなたがMySQLのようなリレーショナルデータベースを利用しているときは特に重要です。なぜならSailsはプロダクション環境で実行された時にはすべてのモデルを`migrate:safe`に設定します。つまり自動マイグレーションは行われません。データベースの作成は以下の手順でできます。
  + データベースをサーバ上に作成しローカル上でそのデータベースへの接続をするように設定し、更に`migrate:alter`の設定をしたうえでSailsを起動します。こレにより自動的にセットアップできます。
  + データベースサーバにリモートから接続できない場合は単純にローカルのスキーマをダンプしてデータベースサーバでインポートしてください。
+ POST, PUT, DELETEのリクエストに対してCSRF防御を適用します。
+ SSLを有効化します。
+ もしSocketを使ってる時は:
  + `config/sockets.js`を適切に設定し、[ここ](https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO#recommended-production-settings)に書いているsocket.ioが推奨するプロダクション環境での設定に適合するようにします。
    + 例：`flashsocket` transportを有効化する

##### Deploy

プロダクション環境ではSailsがクラッシュしてもデーモンが走り続けられるように、`sails lift`を直接使う代わりにforeverかPM2を使います。

+ foreverをインストールする: `sudo npm install -g forever`
  + foreverについての詳細: https://github.com/nodejitsu/forever
+ あるいはPM2をインストールする: `sudo npm install pm2 -g --unsafe-perm`
  + PM2についての詳細: https://github.com/Unitech/pm2 
+ アプリケーションディレクトリーから`forever start app.js --prod`また` pm2 start app.js -x -- --prod`を実行してサーバを起動する。
  + これは`sails lift --prod`と同じです。しかしこのようにすることでSailsがクラッシュしても自動的に復旧します。
 


<docmeta name="uniqueID" value="Deployment402941">
<docmeta name="displayName" value="Deployment">

