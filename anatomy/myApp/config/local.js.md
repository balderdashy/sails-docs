# myApp/config/local.js
### 目的

このファイルはSailsのローカル環境設定を保管しています。アプリケーションのポートやプロダクション環境を変更したい時に編集してください。
  
アプリケーションを開発中、開発しているコンピュータに特有の情報（DBパスワードなど）はこのファイルに保存されるべきです。

アプリケーションをプロダクション環境にデプロイ出来るようになった時にはデプロイ先ののサーバの設定をこのファイルに保存すべきです。


> 備考: 
このファイルは.gitignoreにインクルードされますのでSailsアプリケーションのバージョン管理にgitを使っている場合、このファイルはレポジトリにコミットされないということを覚えておいてください！
> 
> この利点はつまり個人的情報（データベースパスワードなど）をうっかりレポジトリにコミットしてしまう心配なくあなたのローカルマシンに対する設定をすることが出来るということです。さらに他の開発メンバーがあなたの設定内容を上書きしてコミットしてしまうことも防げます。

##### ポート
`port`設定はアプリケーションがどのTCPポートにデプロイするかを決めます。ポートは複数の異なるネットワークアプリケーションを同じコンピュータで同時に実行するためのトランスポートレイヤーでのコンセプトです。

ポートに関しての更に詳しくは<a href="http://en.wikipedia.org/wiki/Port_(computer_networking)">こちら<a>をご覧ください。

デフォルトでは設定されていればSailsユーザの`PORT`環境変数を使います。そうでなければポート1337を使うようフェイルバックされます。

プロダクション環境ではこの設定を 80 (http://)かSS証明書があれば443 (https://)に変更することと思います。 


##### 実行環境
Sailsアプリケーションの「実行環境」は'development'か'production'です。

'development'ではアプリケーションではあなたを助けるために通常以外のことを行います。例えばデバッグ出力でより詳細なエラーを表示します。

プロダクション環境ではSailsは自身（と依存関係）のパフォーマンスを最適化します。Sailsアプリケーションを安定的でハイパフォーマンスかつスケーラブルにするために、アプリケーションをサーバにデプロイする前には常にproductionモードにすべきです。

デフォルトではSailsは`NODE_ENV`環境変数を使って実行環境を設定します。もしNODE_ENVがセットされていなければSailsは'development'環境で動作します。



<docmeta name="uniqueID" value="localjs386958">
<docmeta name="displayName" value="local.js">

```
/**
 * Local environment settings
 *
 * While you're DEVELOPING your app, this config file should include
 * any settings specifically for your development computer (db passwords, etc.)
 *
 * When you're ready to deploy your app in PRODUCTION, you can always use this file
 * for configuration options specific to the server where the app will be deployed.
 * But environment variables are usually the best way to handle production settings.
 *
 * PLEASE NOTE:
 *		This file is included in your .gitignore, so if you're using git
 *		as a version control solution for your Sails app, keep in mind that
 *		this file won't be committed to your repository!
 *
 *		Good news is, that means you can specify configuration for your local
 *		machine in this file without inadvertently committing personal information
 *		(like database passwords) to the repo.  Plus, this prevents other members
 *		of your team from commiting their local configuration changes on top of yours.
 *
 *
 * For more information, check out:
 * http://links.sailsjs.org/docs/config/local
 */

module.exports = {

  // Your SSL certificate and key, if you want to be able to serve HTTP responses
  // over https:// and/or use websockets over the wss:// protocol
  // (recommended for HTTP, strongly encouraged for WebSockets)
  //
  // In this example, we'll assume you created a folder in your project, `config/ssl`
  // and dumped your certificate/key files there:
  // ssl: {
  //   ca: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl_gd_bundle.crt'),
  //   key: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl.key'),
  //   cert: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl.crt')
  // },


  // The `port` setting determines which TCP port your app will be deployed on
  // Ports are a transport-layer concept designed to allow many different
  // networking applications run at the same time on a single computer.
  // More about ports: http://en.wikipedia.org/wiki/Port_(computer_networking)
  //
  // By default, if it's set, Sails uses the `PORT` environment variable.
  // Otherwise it falls back to port 1337.
  //
  // In production, you'll probably want to change this setting
  // to 80 (http://) or 443 (https://) if you have an SSL certificate

  port: process.env.PORT || 1337,



  // The runtime "environment" of your Sails app is either 'development' or 'production'.
  //
  // In development, your Sails app will go out of its way to help you
  // (for instance you will receive more descriptive error and debugging output)
  //
  // In production, Sails configures itself (and its dependencies) to optimize performance.
  // You should always put your app in production mode before you deploy it to a server-
  // This helps ensure that your Sails app remains stable, performant, and scalable.
  //
  // By default, Sails sets its environment using the `NODE_ENV` environment variable.
  // If NODE_ENV is not set, Sails will run in the 'development' environment.

  environment: process.env.NODE_ENV || 'development'

};

```
