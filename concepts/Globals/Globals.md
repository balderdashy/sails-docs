# グローバル
### 概要

物事を便利にするためにSailsでは多くの便利な変数をグローバルにアクセス可能にしています。デフォルトではアプリケーションの[models](http://beta.sailsjs.org/#/documentation/reference/Models)や[services](http://beta.sailsjs.org/#/documentation/reference/Services)やグローバルオブジェクトである`sails`がグローバルスコープに有ります。つまりこれはバックエンドのコードのどこからでも名前を使って呼び出すことが出来るということです。(Sailsが[読み込まれている限りは](https://github.com/balderdashy/sails/tree/master/lib/app))

Sailsのコアはこれらのグローバル変数に全く依存していません。それぞれのグローバル変数は全て`sails.config.globals`(通常`config/globals.jsに記述されています。)から無効化することが出来ます。


### アプリケーションオブジェクト (`sails`)
多くの場合、`sails`オブジェクトはグローバルからアクセス可能であるべきでしょう。これを行うことでアプリケーションのコードはより綺麗になります。しかしながらもし_本当に`sails`を含む _全ての_ グローバルを _無効化したい_ 場合、`sails`オブジェクトをリクエストオブジェクトの(`req`)から取得することも出来ます。

###モデルとサービス
アプリケーションの中の[モデル](http://beta.sailsjs.org/#/documentation/reference/Models) と [サービス](http://beta.sailsjs.org/#/documentation/reference/Services)は`globalId`を使ってグローバルにアクセス可能になっています。例えば`api/models/Foo.js`で定義されているモデルは`Foo`でグローバルにアクセス可能で、`api/services/Baz.js`で定義されているサービスは`Baz`でアクセス可能です。

### Async (`async`) とLodash (`_`)
Sailsは同様に[lodash](http://lodash.com)のインスタンスを`_`で、[async](https://github.com/caolan/async)のインスタンスを`async`でグローバルにアクセス可能にしています。これらのよく使われるユーティリティはデフォルトで用意されていますので、プロジェクトを新規作成する際にも`npm install`しなくてもいいのです。Sailsにおける他のグローバルと同様にこれは無効化が出来ます。

### グローバルを無効化する

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

> + `sails`を含む全てのグローバル変数はSailsがロードされた _あとに_ のみアクセス可能になるということを覚えておいてください。別の言い方で言えば`sails.models.user`や`User`をファンクションの外で使うことは出来ません。（なぜなら`sails`はまだロード完了していないからです。） 

<!-- 以下のことはもう真実ではありません。:
このセクションの多くの部分はアプリケーションを意味するシングルトンオブジェクトである`sails`のメソッドやプロパティに関して書いています。 
-->

<docmeta name="uniqueID" value="Globals668238">
<docmeta name="displayName" value="Globals">

