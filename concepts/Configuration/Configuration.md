# 設定

### 概要

Sailsは[「設定より規約」](http://en.wikipedia.org/wiki/Convention_over_configuration)の哲学に忠実に則っているため、便利なデフォルト設定をその時時のカスタムの設定に変更する方法を学ぶことが重要です。Sailのほとんどの規約に対してそれを個別のニーズに合わせて上書きしたり調整する事のできる設定が提供されています。ドキュメントのこのセッションではSailで利用可能な設定の完全なリファレンスが掲載されています。

Sailアプリはコマンドラインの引数や[環境変数](http://en.wikipedia.org/wiki/Environment_variable)によって、またグローバルや個別の[`.sailsrc`](http://sailsjs.org/documentation/anatomy/myApp/sailsrc.html)ファイルを編集することによって、さらに（これが最もよく使われますが）規約上では[`config/`](http://sailsjs.org/documentation/anatomy/myApp/config)フォルダーに置かれているboilerplateの設定ファイルを書き換えることで[プログラム的に設定](https://github.com/mikermcneil/sails-generate-new-but-like-express/blob/master/templates/app.js#L15)することが出来ます。アプリケーションの中で利用される各種の設定を統合したauthoratativeは実行時に `sails`グローバル変数の`sails.config`として利用することが出来ます。


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

個々の設定に関しての完全な設定プションやそれぞれが通常記録されているファイルに関してはこのセクションの各参照ページをご覧ください。まあ、より高度な概要に関しては[The Anatomy of a Sails App](./#!documentation/anatomy)の["`config/`"](http://sailsjs.org/documentation/anatomy/myApp/config) in [The Anatomy of a Sails App](http://sailsjs.org/documentation/anatomy) のセクションに記述されています。

### 環境依存のファイル (`config/env/*`)

通常の設定ファイルで定義された設定内容は一般的にどの環境でも（すなわち、development、production、testなど）有効です。特定の環境に対してのみ影響を与える設定を行いたい場合は環境依存の特別な設定ファイルやフォルダを利用できます。:
 		 
* `/config/env/<environment-name>`以下に配置されたフォルダは`<environment-name>`環境のときに *のみ* ロードされます。例えば`config/env/production`以下に保存されたファイルはproductionモードでSailが起動された時にのみロードされます。
* `config/env/<environment-name>.js`として保存されたファイルは`<environment-name>`環境のときに *のみ* ロードされ、環境依存のサブフォルダに設置された全ての設定のよりも優先する形でこれらに統合されます。例えば`config/env/production.js`は`config/env/production`に設置された設定内容よりも優先してロードされます。

### `config/local.js`ファイル

ローカル環境（例えばあなたのラップトップなど）に対しての設定には`config/local.js`を利用することが出来ます。このファイルの設定は[.sailsrc](http://sailsjs.org/documentation/concepts/Configuration/usingsailsrcfiles.html)以外の全てのファイルよりも優先されます。これはローカル環境でのみ利用されることを想定しているため、バージョン管理の範囲外に置く（この理由によりデフォルトの`.gitignore`ファイルに入っています）必要があります。`local.js`をローカルのデータベース設定やアプリケーションをローカルで起動する際のポート番号の指定などにお使いください。

さらなる情報は[http://sailsjs.org/documentation/concepts/Configuration/localjsfile.html](http://sailsjs.org/documentation/concepts/Configuration/localjsfile.html)をご覧ください。


### アプリケーション内で`sails.config`にアクセスする

`config`オブジェクトはSailsアプリのインスタンス(`sails`)によって利用可能です。デフォルトではこの設定オブジェクトは起動時に[グローバルにアクセス可能](http://sailsjs.org/documentation/concepts/Globals)にされるためアプリケーションのどこからでもアクセス可能です。

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

[`.sailsrc`ファイル](http://sailsjs.org/documentation/anatomy/myApp/sailsrc.html)はその他のコンフィグレーションファイルと異なりSailsのCLIをシステムワイドでもグループディレクトリ単位でも特定のディレクトリに`cd`した時限定で使い分けることが出来ます。これを行うことの第一の目的は`sails generate`と`sails new`が実行された時に動作する[ジェネレータ](http://sailsjs.org/documentation/concepts/extending-sails/Generators)とあなたがカスタマイズしたり設定をハードコピーして上書きしたジェネレータを併用するためです。

そしてSailsは現在の作業ディレクトリの最寄りの`.sailsrc`ファイルを参照するため _**データベースパスワード**のような_ クラウドベースのレポジトリに保管することの難しいセンシティブな情報を安全に扱うことが出来ます。これを行うには`.sailsrc`ファイルをあなたの"$HOME"ディレクトリにインクルードするだけで構いません。さらなる詳細は[`.sailsrc`のドキュメンテーション](http://sailsjs.org/documentation/anatomy/myApp/sailsrc.html)を御覧ください。




### Notes
> `sails.config`にあるいくつかの規定の設定はSailsの起動時にのみ読み込まれます。言い換えれば実行中にいくつかのオプションを変えたとしてもそれは有効にならないことが有ります。例えば実行中にアプリケーションのポート設定を変更したい場合には`sails.config.port`を書き換えたりオーバーライドしたり、コマンドラインのオプションを変えたりするだけでなくSailsを再起動する必要がありま



<docmeta name="displayName" value="Configuration">
