# ルーティング
### 概要

おおくの　Webアプリケーションの基本的な機能はリクエストされたURLを理解してレスポンスを返すことです。これを行うためにあなたのアプリケーションはあるURLと他のURLを区別する機能を持たなければなりません。

おおくのWebフレームワークのようにSailsはURLをコントローラやビューをマッピングするメカニズムである、ルータを提供します。**ルート**はSailsがリクエストを受け取った時にどのように対処するかを決めたルールです。Sailsには**カスタム**（あるいは明示的）と**オートマティック**（あるいは非明示的）の2種類のルートがあります。


###カスタムルート

Sailsではフレームワークによる制約なく好きなようにURLを決めることが出来ます。

すべてのSailsプロジェクトにはカスタムの（明示的な）**ルート**のオブジェクトをエクスポートするシンプルな[Node.js module](http://nodejs.org/api/modules.html)である[`config/routes.js`](http://sailsjs.org/documentation/reference/sails.config/sails.config.routes.html)があります。例えば以下の `routes.js`は6つのルールを定義しており、そのうちあるものはアクションを指しており、またあるものはビューを直接指しています。 

```javascript
// config/routes.js
module.exports.routes = {
  'get /signup': { view: 'conversion/signup' },
  'post /signup': 'AuthController.processSignup',
  'get /login': { view: 'portal/login' },
  'post /login': 'AuthController.processLogin',
  '/logout': 'AuthController.logout',
  'get /me': 'UserController.profile'
}
```


それぞれの**ルート**は**アドレス**（左辺の`'get /me'`など）と**ターゲット**（右辺の`'UserController.profile'`など）から成り立っています。**アドレス**はURLパスであり、[HTTP method](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)を指定することも出来ます。**ターゲット**は幾つもの方法で定義することが出来ます([この部分における詳細のセクションをご覧ください](http://sailsjs.org/documentation/concepts/Routes/RouteTargetSyntax.html))が、上に見られるような2つの文法が最も有名です。Sailsはインカミングなリクエストを受け取った時にはすべてのカスタムルートに関して**アドレス**を元にマッチするかを確認します。そこでマッチするルートが見つかったらリクエストは**ターゲット**に渡されます。

例えば我々は`'get /me': 'UserController.profile'`を以下のように理解するでしょう。:

> "やあ、Sails。もし`http://mydomain.com/me`へのGETリクエストを受け取ったら`UserController`の`profile`を走らせてよ。いいね。"

もしルート自体の見た目上のレイアウトを変更したいときにはというと、全く問題ありません。こういう風にできます。:

```javascript
'get /privacy': {
    view: 'users/privacy',
    locals: {
      layout: 'users'
    }
  },
```

#### 備考
+ リクエストがルートにマッチしたからといってそれが _直接_ ルートのターゲットにパスされるというわけではありません。例えばHTTPリクエストは通常いくつかの[ミドルウエア](http://sailsjs.org/documentation/concepts/Middleware)を先に通ります。そしてもしルートがコントローラの[アクション](http://sailsjs.org/documentation/concepts/Controllers?q=actions)を指している場合、リクエストは設定済みの[ポリシー](http://sailsjs.org/documentation/concepts/Policies) を通過する必要があります。そしていくつかの特殊な[ルートオプション](http://sailsjs.org/documentation/concepts/Routes/RouteTargetSyntax.html?q=route-target-options) は特定の種類のリクエストを「スキップ」させることも有ります。
+ ルーターはNodeミドルウエアの標準的なファンクション(すなわち`function (req, res, next) {}`のような)も含め、どのような正当なルートターゲットに対する**ルート**でも**バインド**することが出来ます。しかしながら可能な限りSailsの慣例的な[ルートターゲットシンタックス](http://sailsjs.org/documentation/concepts/Routes/RouteTargetSyntax.html)を利用してください。これにより、開発の効率かやトレーニングの簡易化が図れ、プログラムのメンテナンス性も向上します。



### 自動ルーティング

カスタムのルーティングに加え、Sailsは多くのルートを自動的にバインドします。もしURLがカスタムルートにマッチしなくてもどれかの自動ルートにマッチすればレスポンスを返します。Sailsにおける主な自動ルーティングは以下のとおりです。:

* [controllers](http://sailsjs.org/documentation/concepts/Controllers)や[models](http://sailsjs.org/documentation/concepts/ORM/Models.html)に完全なRESR APIを提供する、[Blueprintルート](http://sailsjs.org//documentation/)。
* イメージやJavascriptやスタイルシートファイルをサポートする[Assets](http://sailsjs.org/documentation/concepts/Assets)
* もし有効化されていれば、CSRFトークンを取得できるルートを提供する**/csrfToken**[CSRF](http://sailsjs.org/documentation/concepts/Security/CSRF.html)


### サポートしているプロトコル

Sailsのルーターはプロトコル非依存です。すなわち、[HTTP requests](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)と[WebSockets](http://en.wikipedia.org/wiki/Websockets)から送られたメッセージの両方を処理する方法を知っています。 これはJWRと呼ばれるシンプルなフォーマットでreserved eventハンドラに送られるSocket.ioメッセージをリッスンすることによって実現しています。このスペックは[client-side socket SDK](http://sailsjs.org/documentation/reference/websockets/sails.io.js)の枠を超えて定義・実装されています。



#### 備考
+上級のユーザーにとってはルーターを完全に回避して完全にカスタマイズした低レベルのWebSocketメッセージを直接Socket.ioサーバに送信することも出来ます。ソケットイベントはアプリケーションの[`onConnect`](http://sailsjs.org/documentation/reference/sails.config/sails.config.sockets.html?q=commonlyused-options)（[`config/sockets.js`](http://sailsjs.org/documentation/anatomy/myApp/config/sockets.js.html)にあります。） ファンクションで直接バインドすることが出来ます。ただし多くの場合に関してソケット通信のためのリクエストインタープリタの恩恵に預かったほうがいいということを気に留めておいてください。（HTTPとWebSocketでルートの一貫性を維持することはメンテナンス性を維持する上で重要です。）



<docmeta name="uniqueID" value="Routes849188">
<docmeta name="displayName" value="Routes">
