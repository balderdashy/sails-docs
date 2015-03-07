# ルーティング
### 概要

おおくの　Webアプリケーションの基本的な機能はリクエストされたURLを理解してレスポンスを返すことです。これを行うためにあなたのアプリケーションはあるURLと他のURLを区別する機能を持たなければなりません。

おおくのWebフレームワークのようにSailsはURLをコントローラやビューをマッピングするメカニズムである、ルータを提供します。**ルート**はSailsがリクエストを受け取った時にどのように対処するかを決めたルールです。Sailsには**カスタム**（あるいは明示的）と**オートマティック**（あるいは非明示的）の2種類のルートがあります。


###カスタムルート

Sailsではフレームワークによる制約なく好きなようにURLを決めることが出来ます。

すべてのSailsプロジェクトにはカスタムの（明示的な）**ルート**のオブジェクトをエクスポートするシンプルな[Node.js module](http://nodejs.org/api/modules.html)である[`config/routes.js`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.routes.html)があります。例えば以下の `routes.js`は6つのルールを定義しており、そのうちあるものはアクションを指しており、またあるものはビューを直接指しています。 

```javascript
// config/routes.js
module.exports = {
  'get /signup': { view: 'conversion/signup' },
  'post /signup': 'AuthController.processSignup',
  'get /login': { view: 'portal/login' },
  'post /login': 'AuthController.processLogin',
  '/logout': 'AuthController.logout',
  'get /me': 'UserController.profile'
}
```


それぞれの**ルート**は**アドレス**（左辺の`'get /me'`など）と**ターゲット**（右辺の`'UserController.profile'`など）から成り立っています。**アドレス**はURLパスであり、[HTTP method](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)を指定することも出来ます。**ターゲット**は幾つもの方法で定義することが出来ます([この部分における詳細のセクションをご覧ください](http://beta.sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html))が、上に見られるような2つの文法が最も有名です。Sailsはインカミングなリクエストを受け取った時にはすべてのカスタムルートに関して**アドレス**を元にマッチするかを確認します。そこでマッチするルートが見つかったらリクエストは**ターゲット**に渡されます。

例えば我々は`'get /me': 'UserController.profile'`を以下のように理解するでしょう。:

> "やあ、Sails。もし`http://mydomain.com/me`へのGETリクエストを受け取ったら`UserController`の`profile`を走らせてよ。いいね。"

<<<<<<< HEAD
もしルート自体の見た目上のレイアウトを変更したいときにはというと、全く問題ありません。こういう風にできます。:
=======
What if I want to change the view layout within the route itself?  No problem we could:
>>>>>>> 0a69dcc7a2ad18a99e1d1ae0f37ac7ebe6a63677

```javascript
'get /privacy': {
    view: 'users/privacy',
    locals: {
      layout: 'users'
    }
  },
```

<<<<<<< HEAD
#### 備考
+ リクエストがルートにマッチしたからといってそれが _直接_ ルートのターゲットにパスされるというわけではありません。例えばHTTPリクエストは通常いくつかの[ミドルウエア](http://beta.sailsjs.org/#/documentation/concepts/Middleware)を先に通ります。そしてもしルートがコントローラの[アクション](http://beta.sailsjs.org/#/documentation/concepts/Controllers?q=actions)を指している場合、リクエストは設定済みの[ポリシー](http://beta.sailsjs.org/#/documentation/concepts/Policies) を通過する必要があります。そしていくつかの特殊な[ルートオプション](http://beta.sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html?q=route-target-options) は特定の種類のリクエストを「スキップ」させることも有ります。
+ ルーターはNodeミドルウエアの標準的なファンクション(すなわち`function (req, res, next) {}`のような)も含め、どのような正当なルートターゲットに対する**ルート**でも**バインド**することが出来ます。しかしながら可能な限りSailsの慣例的な[ルートターゲットシンタックス](http://beta.sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html)を利用してください。これにより、開発の効率かやトレーニングの簡易化が図れ、プログラムのメンテナンス性も向上します。
=======
#### Notes
+ Just because a request matches a route address doesn't necessarily mean it will be passed to that route's target _directly_.  For instance, HTTP requests will usually pass through some [middleware](http://beta.sailsjs.org/#/documentation/concepts/Middleware) first.  And if the route points to a controller [action](http://beta.sailsjs.org/#/documentation/concepts/Controllers?q=actions), the request will need to pass through any configured [policies](http://beta.sailsjs.org/#/documentation/concepts/Policies) first.  Finally, there are a few special [route options](http://beta.sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html?q=route-target-options) which allow a route to be "skipped" for certain kinds of requests.
+ The router can also programmatically **bind** a **route** to any valid route target, including canonical Node middleware functions (i.e. `function (req, res, next) {}`).  However, you should always use the conventional [route target syntax](http://beta.sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html) when possible- it streamlines development, simplifies training, and makes your app more maintainable.
>>>>>>> 0a69dcc7a2ad18a99e1d1ae0f37ac7ebe6a63677



### 自動ルーティング

カスタムのルーティングに加え、Sailsは多くのルートを自動的にバインドします。もしURLがカスタムルートにマッチしなくてもどれかの自動ルートにマッチすればレスポンスを返します。Sailsにおける主な自動ルーティングは以下のとおりです。:

* [controllers](http://beta.sailsjs.org/#/documentation/concepts/Controllers)や[models](http://beta.sailsjs.org/#/documentation/concepts/ORM/Models.html)に完全なRESR APIを提供する、[Blueprintルート](http://beta.sailsjs.org/#/documentation/)。
* イメージやJavascriptやスタイルシートファイルをサポートする[Assets](http://beta.sailsjs.org/#/documentation/concepts/Assets)
* もし有効化されていれば、CSRFトークンを取得できるルートを提供する**/csrfToken**[CSRF](http://beta.sailsjs.org/#/documentation/concepts/Security/CSRF.html)


### サポートしているプロトコル

Sailsのルーターはプロトコル非依存です。すなわち、[HTTP requests](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)と[WebSockets](http://en.wikipedia.org/wiki/Websockets)から送られたメッセージの両方を処理する方法を知っています。 これはJWRと呼ばれるシンプルなフォーマットでreserved eventハンドラに送られるSocket.ioメッセージをリッスンすることによって実現しています。このスペックは[client-side socket SDK](http://beta.sailsjs.org/#/documentation/reference/websockets/sails.io.js)の枠を超えて定義・実装されています。



#### 備考
+上級のユーザーにとってはルーターを完全に回避して完全にカスタマイズした低レベルのWebSocketメッセージを直接Socket.ioサーバに送信することも出来ます。ソケットイベントはアプリケーションの[`onConnect`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.sockets.html?q=commonlyused-options)（[`config/sockets.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/sockets.js.html)にあります。） ファンクションで直接バインドすることが出来ます。ただし多くの場合に関してソケット通信のためのリクエストインタープリタの恩恵に預かったほうがいいということを気に留めておいてください。（HTTPとWebSocketでルートの一貫性を維持することはメンテナンス性を維持する上で重要です。）



<docmeta name="uniqueID" value="Routes849188">
<docmeta name="displayName" value="Routes">

