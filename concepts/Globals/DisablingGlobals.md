# グローバルを無効化する

Sailsではどのグローバルを有効化するかを通常 [`config/globals.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/globals.js.html)に配置される[`sails.config.globals`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.globals.html)で判断しています。

全てのグローバル変数を無効化するにはこの設定を単に`false`と設定してください:

```js
// config/globals.js
module.exports.globals = false;
```

_いくつかの_ グローバル変数を無効化するには、その代わりに以下のようにオブジェクトを指定してください。:

```js
// config/globals.js
module.exports.globals = {
  _: false,
  async: false,
  models: false,
  services: false
};
```

### 備考

> + `sails`を含むいずれのグローバルもSailsが _ロードされてから_ のみ有効ということを覚えておいてください。別の言い方をすると`sails.models.user` や `User` は（`sails`が読み込みを完了していないので）ファンクションの外では使えません。

<!-- もう真実ではありません:
ドキュメントのこの節の大部分はあなたのSailsアプリケーションを代表するシングルトンオブジェクトである`sails`のメソッドとプロパティを紹介することにフォーカスしています。
-->

<docmeta name="displayName" value="Disabling Globals">
