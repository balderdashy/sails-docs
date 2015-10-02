# `.routes`

`routes`機能を使うことでカスタムフックはSailsアプリケーションがロードされるときに簡単に新しいルートをバインド出来るようになります。もし実装されていた場合`routes`は`before`キーか`after`気のどちらか両方かを持ちます。これらのキーの値は[route addresses](http://sailsjs.org/documentation/concepts/Routes/RouteTargetSyntax.html?q=route-address)をキーに持ち、通常の`(req, res, next)`のパラメータをもつルートハンドリングファンクションを値に持つオブジェクトである必要があります。`before`オブジェクトで指定される全てのルートはカスタムユーザルート([sails.config.routes](http://sailsjs.org/documentation/reference/sails.config/sails.config.routes.html)で定義される)や[ブループリントルート](http://sailsjs.org/documentation/reference/blueprint-api?q=blueprint-routes)よりも *前に* 来ます。反対に`after`で定義されるルートはカスタムユーザルートやブループリントルートの *後に* 来ます。例えば以下の`count-requests`フックを考えてみましょう:

```javascript
module.exports = function (sails) {

   return {

      initialize: function(cb) {
         this.numRequestsSeen = 0;
         this.numUnhandledRequestsSeen = 0;
         return cb();
      },

      routes: {
         before: {
            'GET /*': function (req, res, next) {
               this.numRequestsSeen++;
               return next();
            }
        },
        after: {
            'GET /*': function (req, res, next) {
               this.numUnhandledRequestsSeen++;
               return next();
            }
        }
    };
};
```

このフックは`before`で提供されたファンクションを通じて全てのリクエストを行い、`numRequestsSeen`変数をインクリメントします。同様に `after` オブジェクトで提供されたファンクションを通じ全ての *ハンドルされていない* リクエスト（つまりアプリケーションのカスタムルート設定やブループリントルートで示されていない全てのルート）を処理します。

> フックでセットアップされた2つの変数はSailsアプリケーションの中の他のモジュールから `sails.hooks["count-requests"].numRequestsSeen` と `sails.hooks["count-requests"].numUnhandledRequestsSeen` としてアクセスできます。

<docmeta name="uniqueID" value="Hooks75006">
<docmeta name="displayName" value=".routes">
<docmeta name="stabilityIndex" value="3">
