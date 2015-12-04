# myApp/README.md
### 目的
もしあなたのアプリケーションの[README file](http://en.wikipedia.org/wiki/README)を作りたければ、ここがそれを保存する場所です。もしアプリケーションがGihubによってホストされていればこのファイルのコンテンツはレポジトリページの最下部に表示されます。


<docmeta name="uniqueID" value="READMEmd802820">
<docmeta name="displayName" value="README">

```
# `tasks`フォルダに関して

`tasks`ディレクトリはGruntタスクのとその設定と使いやすくセットにしたものです。Gruntの統合は主にフロントエンドの(スタイルシート、スクリプト、マークアップテンプレートのような) アセットをバインドするために便利ですが同様にbrowserifyコンパイルからデータベース移行までありとあらゆる開発タスクを実行するのにも使えます。

[Grunt](http://gruntjs.com/)を使ったことがなければ、[Gruntfile](http://gruntjs.com/sample-gruntfile)の生成やGruntプラグインの使い方をカバーした[Getting Started](http://gruntjs.com/getting-started)のガイドをご覧なってください。そのプロセスに詳しくなってから、こちらをご覧ください。


### これはどのように動作しますか

Sailsにバンドルされたアセットパイプラインはプロジェクトをより整合性の取れ、生産性の高いたものにするために作られた慣習的デフォルトを使って設定されたGruntタスクのセットから成り立っています。

Sailsではフロントエンドアセットのワークフローは完全にカスタマイズ可能ですが、すぐに使える幾つかのサジェスチョンを含んでおりますが。Sailsはあなたのアプリケーションにおけるブラウザベースのフロントエンドを構築する際に発生しうる全ての問題を予期できるような振りはしていません。そもそも一体誰があなたがブラウザ向けのアプリケーションを作っている言ったのでしょうか？



### Sailsはどのタスクを自動実行しますか?

Sailsは特定のコマンドを実行した際に以下の幾つかのタスク(これらは`tasks/register`フォルダにあります)を自動実行します。

###### `sails lift`

`default`のタスク(`tasks/register/default.js`)を実行します。

###### `sails lift --prod`

`prod`のタスク(`tasks/register/prod.js`)を実行します。

###### `sails www`

`build`のタスク(`tasks/register/build.js`)を実行します。

###### `sails www --prod` (production)

`buildProd`のタスク(`tasks/register/buildProd.js`)を実行します。


### これをSASSやAngular, client-side Jade templates, etc?

これらのGruntタスクは全て必要に応じて、編集、省略、置き換えが出来ます。更に`someTask.js`ファイルを`grunt/config`フォルダに追加し、適切な親タスクに登録するだけ(`grunt/register/*.js`のファイルをご覧ください)であなたのGruntタスクを追加することが出来ます。


### Gruntを使わなければいけませんか?

いいえ！もしSailsにおけるGruntとの統合を無効化したければ単にGruntfileを削除するかGruntフックを無効化してください。


### フロントエンドを作っていないのですがどうすればいいでしょうか?

それでも構いません。Sailsの中心的な考え方の一つはクライアント無関知主義であり、（Android/iOS/CordovaのネイティブアプリやサーバサイドSDKも含め）あらゆる種類のクライアントから使われるAPIを構築することに主眼をおいています。

前述の方法にしたがってGruntを完全に無効化することも出来ます。

それでも一般的なWebフロントエンドのこととは別の目的にGruntを使いたい場合は単にプロジェクトの`assets`フォルを削除して、`grunt/register`と`grunt/config`のフォルダかフロントエンド関連のタスクを除いてください。将来のプロジェクトで`assets`フォルダとフロントエンド関連のタスクを省略するには`sails new myCoolApi --no-frontend`を実行してください。また、`sails-generate-frontend`モジュールをコミュニティの代替品を使ったり、自作することで置き換えることも出来ます。これにより `sails new` でネイティブのiOSアプリケーション、Androidアプリケーション、Cordovaアプリケーション、SteroidsJSアプリケーション等向けのボイラーテンプレートを作成することが出来ます。


```
