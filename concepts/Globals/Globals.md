# グローバル
### 概要

物事を便利にするためにSailsでは多くの便利な変数をグローバルにアクセス可能にしています。デフォルトではアプリケーションの[models](http://sailsjs.org/documentation/reference/Models)や[services](http://sailsjs.org/documentation/reference/Services)やグローバルオブジェクトである`sails`がグローバルスコープに有ります。つまりこれはバックエンドのコードのどこからでも名前を使って呼び出すことが出来るということです。(Sailsが[読み込まれている限りは](https://github.com/balderdashy/sails/tree/master/lib/app))

Sailsのコアはこれらのグローバル変数に全く依存していません。それぞれのグローバル変数は全て`sails.config.globals`(通常`config/globals.jsに記述されています。)から無効化することが出来ます。


### アプリケーションオブジェクト (`sails`)
多くの場合、`sails`オブジェクトはグローバルからアクセス可能であるべきでしょう。これを行うことでアプリケーションのコードはより綺麗になります。しかしながらもし_本当に`sails`を含む _全ての_ グローバルを _無効化したい_ 場合、`sails`オブジェクトをリクエストオブジェクトの(`req`)から取得することも出来ます。

###モデルとサービス
アプリケーションの中の[モデル](http://sailsjs.org/documentation/reference/Models) と [サービス](http://sailsjs.org/documentation/reference/Services)は`globalId`を使ってグローバルにアクセス可能になっています。例えば`api/models/Foo.js`で定義されているモデルは`Foo`でグローバルにアクセス可能で、`api/services/Baz.js`で定義されているサービスは`Baz`でアクセス可能です。

### Async (`async`) とLodash (`_`)
Sailsは同様に[lodash](http://lodash.com)のインスタンスを`_`で、[async](https://github.com/caolan/async)のインスタンスを`async`でグローバルにアクセス可能にしています。これらのよく使われるユーティリティはデフォルトで用意されていますので、プロジェクトを新規作成する際にも`npm install`しなくてもいいのです。Sailsにおける他のグローバルと同様にこれは無効化が出来ます。


<docmeta name="uniqueID" value="Globals668238">
<docmeta name="displayName" value="Globals">
