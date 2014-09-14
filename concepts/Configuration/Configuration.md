# 設定

### 概要

Sailsは[「設定より規約」](http://en.wikipedia.org/wiki/Convention_over_configuration)の哲学に忠実に則っているため、便利なデフォルト設定をその時時のカスタムの設定に変更する方法を学ぶことが重要です。Sailのほとんどの規約に対してそれを個別のニーズに合わせて上書きしたり調整する事のできる設定が提供されています。ドキュメントのこのセッションではSailで利用可能な設定の完全なリファレンスが掲載されています。

Sailアプリはコマンドラインの引数や[環境変数](http://en.wikipedia.org/wiki/Environment_variable)によって、またグローバルや個別の[`.sailsrc`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/sailsrc.html)ファイルを編集することによって、さらに（これが最もよく使われますが）規約上では[`config/`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config)フォルダーに置かれているboilerplateの設定ファイルを書き換えることで[プログラム的に設定](https://github.com/mikermcneil/sails-generate-new-but-like-express/blob/master/templates/app.js#L15)することが出来ます。アプリケーションの中で利用される各種の設定を統合したauthoratativeは実行時に `sails`グローバル変数の`sails.config`として利用することが出来ます。


### 通常の設定ファイル (`config/*`)

デフォルトで多くの設定ファイルがSailアプリに含まれています。これらのboilerplateファイルは多くのインラインコメントを含んでいます。これにより迅速にその場で設定の意味を確認できるようにしてドキュメントとエディタの間を行ったり来たりしなくてもいいようになっています。

多くのケースでは`sails.config`オブジェクトのトップレベルのキー(例えば `sails.config.views`)は設定ファイルの名称 (例えば`config/views.js`)に対応しています。しかしながら設定ファイルは開発者によって`config/`内で横断的に改変されることがあります。重要な部分は設定の名前 (すなわち key) でありファイル名ではありません。

例えばあなたたが`config/foo.js`という新しいファイルを作成したとします。:

```js
// config/foo.js
// 以下のオブジェクトは `sails.config.blueprints`にマージされます。:
module.exports.blueprints = {
  shortcuts: false
};
```

個々の設定に関しての完全な設定プションやそれぞれが通常記録されているファイルに関してはこのセクションの各参照ページをご覧ください。まあ、より高度な概要に関しては[The Anatomy of a Sails App](./#!documentation/anatomy)の["`config/`"](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config) in [The Anatomy of a Sails App](./#!documentation/anatomy) のセクションに記述されています。





### アプリケーション内で`sails.config`にアクセスする

`config`オブジェクトはSailsアプリのインスタンス(`sails`)によって利用可能です。デフォルトではこの設定オブジェクトは起動時に[グローバルにアクセス可能](http://beta.sailsjs.org/#/documentation/concepts/Globals)にされるためアプリケーションのどこからでもアクセス可能です。

##### 例
```javascript
// この例はプロダクションモードに居るかを確認してCSRFを有効化します。
// プロダクションモードでない場合はエラーを出力して停止します。
if (sails.config.environment === 'production' && !sails.config.csrf) {
  throw new Error('STOP IMMEDIATELY ! CSRF should always be enabled in a production deployment!');
}
```



### カスタムの設定
Sailsは異なるトップレベルキーによって名前空間を分けられた多くの設定を（例えば`sails.config.sockets` と`sails.config.blueprints`のように）認識可能です。しかしながら`sails.config`を（例えば`sails.config.someProprietaryAPI.secret`のように）あなたのカスタムの設定のために利用することも可能です。

##### 例

```javascript
// config/linkedin.js
module.exports.linkedin = {
  apiKey: '...',
  apiSecret: '...'
};
```

```javascript
// In your controller/service/model/hook/whatever:
// ...
var apiKey = sails.config.linkedin.apiKey;
var apiSecret = sails.config.linkedin.apiSecret;
// ...
```




### `sails`のコマンドライン・インタフェースを設定する

設定に関しては多くのケースでポートやデータベース接続などの利用先固有の実行時設定の管理を強いられます。しかしSailsのCLIをカスタマイズすることで繰り返し行う作業を減らしたりワークフローを簡単にしたりその他のオリジナルの自動化ツールを作成したりすることが出来ます。Sails v0.10からこれを実現する機能がサポートされました。

[`.sailsrc`ファイル](http://beta.sailsjs.org/#/documentation/anatomy/myApp/sailsrc.html)はその他のコンフィグレーションファイルと異なりSailsのCLIをシステムワイドでもグループディレクトリ単位でも特定のディレクトリに`cd`した時限定で使い分けることが出来ます。これを行うことの第一の目的は`sails generate`と`sails new`が実行された時に動作する[ジェネレータ](http://beta.sailsjs.org/#/documentation/concepts/extending-sails/Generators)とあなたがカスタマイズしたり設定をハードコピーして上書きしたジェネレータを併用するためです。

そしてSailsは現在の作業ディレクトリの最寄りの`.sailsrc`ファイルを参照するため _**データベースパスワード**のような_ クラウドベースのレポジトリに保管することの難しいセンシティブな情報を安全に扱うことが出来ます。これを行うには`.sailsrc`ファイルをあなたの"$HOME"ディレクトリにインクルードするだけで構いません。さらなる詳細は[`.sailsrc`のドキュメンテーション](http://beta.sailsjs.org/#/documentation/anatomy/myApp/sailsrc.html)を御覧ください。




### Notes
> `sails.config`にあるいくつかの規定の設定はSailsの起動時にのみ読み込まれます。言い換えれば実行中にいくつかのオプションを変えたとしてもそれは有効にならないことが有ります。例えば実行中にアプリケーションのポート設定を変更したい場合には`sails.config.port`を書き換えたりオーバーライドしたり、コマンドラインのオプションを変えたりするだけでなくSailsを再起動する必要がありま



<docmeta name="uniqueID" value="Configuration615655">
<docmeta name="displayName" value="Configuration">

