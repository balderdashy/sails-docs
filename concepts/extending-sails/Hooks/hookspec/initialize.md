# `.initialize(cb)`

`initialize`機能を使うと別のフックに依存していたり非同期であるかもしれないスタートアップタスクを実行することが出来ます。全てのSails設定はフックの`initialize`が行われる前に実行されることが保証されています。`initialize`の中に挿入したいタスクの例としては:

* リモートAPIへのログイン
* フックメソッドれつかれるデータベースからの読み込み
* ユーザーによって設定されたディレクトリからのサポートファイルの読み込み
* 別のフックが先に読み込まれるのを待つ

他のフック機能と同じように`initialize`はオプショナルでありフックの定義に書かなくても構いません。もし実装されていれば`initialize`は一つの引数（Sailsがロード完了するために必要なコールバックファンクション）をとります。:

```javascript
initialize: function(cb) {

   // Do some stuff here to initialize hook
   // And then call `cb` to continue
   return cb();

}
```

##### フックのタイムアウト設定

デフォルトではフックは`initialize`を10秒で終了させられない場合、Sailsがエラーを出力する前に`cb`を呼び出します。このタイムアウトは`_hookTimeout`キーSailsが待つべきミリ秒数を指定することで設定可能です。それはフックの[`defaults`](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/hookspec/defaults.html) で行うことが出来ます。

```
defaults: {
   __configKey__: {
      _hookTimeout: 20000 // wait 20 seconds before timing out
   }
}
```

##### フックイベントと依存

フックの初期化に成功した際、以下の名前のイベントを発生させます:

`hook:<hook name>:loaded`

例えば:

* コアの`orm`フックは初期化完了後に`hook:orm:loaded`イベントを発生させます。
* `node_modules/sails-hook-foo`にインストールされたフックはデフォルトでは`hook:foo:loaded`を発生させます。
* 同じ`sails-hook-foo`フックが`sails.config.installedHooks['sails-hook-foo'].name`で`bar`と設定された場合は`hook:bar:loaded`を発生させます
* `node_modules/mygreathook`にインストールされたフックは`hook:mygreathook:loaded`イベントを発生させます。
* `api/hooks/mygreathook` にインストールされたフックは`hook:mygreathook:loaded`イベントを発生させます。

"hook loaded"を利用することであるフックを別のフックに依存させることが出来ます。これをやるには単にフックの`initialize`を`sails.on()`でラップします。例えば、あるフックが`orm`フックが読み込まれるのを待つようにするためにはあなたのフックの`initialize`を以下のようにします。:

```javascript
initialize: function(cb) {

   sails.on('hook:orm:loaded', function() {

      // カスタムフックの初期化を完了
      // そして、cb()をコールする
      return cb();

   }
}
```

あるフックを別の幾つかのフックに依存させるには待つべきイベントの名前を配列に入れて`sails.after`をコールします:

```javascript
initialize: function(cb) {

   var eventsToWaitFor = ['hook:orm:loaded', 'hook:mygreathook:loaded'];
   sails.after(eventsToWaitFor, function() {

      // カスタムフックの初期化を完了
      // そして、cb()をコールする
      return cb();

   }
}
```

<docmeta name="uniqueID" value="Hooks75005">
<docmeta name="displayName" value=".initialize()">
<docmeta name="stabilityIndex" value="3">
