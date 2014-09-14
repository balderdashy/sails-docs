# ミドルウエア

SailsはExpress / Connectのミドルウエアと(実は全ての部分が)完全な互換性を持っています。[コントローラアクション](http://beta.sailsjs.org/#/documentation/concepts/Controllers?q=actions)や[ポリシー](http://beta.sailsjs.org/#/documentation/concepts/Policies)を始めとした、あなたがSails上で書くコードの大半は事実上ミドルウエアであると言えます。



### HTTPミドルウエア

また、SailsはHTTPリクエストを処理する目的で追加の[設定可能なミドルウエアスタック](http://beta.sailsjs.org/#/documentation/concepts/Middleware?q=adding-or-overriding-http-middleware)を利用しています。アプリケーションがHTTPリクエストを受け取った時は常に、設定されたミドルウエアスタックが順に実行されます。


> HTTPミドルウエアスタックは「実際の」HTTPリクエスト時にのみ利用され、**バーチャルなリクエスト**（例えばliveなSocket.ioコネクションからのリクエスト）は無視されるということを覚えておいてください。


#### コンベンショナルのデフォルト

SailsはにはコンベンショナルななHTTPミドルウエアがバンドルされています。もちろんこれは、無効化したり、上書きしたり、アレンジしなおしたり、追加することも出来ますが、多くのアプリケーションの開発時及び運用時にはプリインストールのスタックは完璧に対応することが出来ます。以下に、外部からのリクエストを受けた時には毎回実行されるに標準的なミドルウエアファンクションの表を実行順に掲載します。:

 HTTP ミドルウエアキー       | 目的
 ------------------------- | ------------
 **startRequestTimer**     | リクエストの始まった時間を記録するためにメモリ上に変数を配置します。これはスローリクエストの診断データに使います。
 _cookieParser_ *          | この後のミドルウエアやアプリケーションで使うためにCookieのデータをパースします。
 _session_ *               | [session設定](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.session.html)を使ってユニークなセッションオブジェクトを準備します。
 **bodyParser**            | [Skipper](https://github.com/balderdashy/skipper)を使ってHTTPリクエストボディからパラメータとバイナリストリーム(ストリーミングファイルアップロード時に)をパースします。
 **compress**              | gzip/deflateを使ってレスポンスを圧縮します。
 **methodOverride**        | faux HTTPメソッドを提供します。これによりクライアントがサポートしない場合(例えばレガシーなInternet Explorerのように)でもPUTやDELETEのようなHTTPリクエストを使えるようにします。もしリクエストが`"PUT"`に設定された`_method`パラメータを持っていればあたかもそのリクエストは適切なPUT リクエストであったかのようにルーティングされます。さらなる情報が欲しい場合は[Connect's methodOverride docs](http://www.senchalabs.org/connect/methodOverride.html) を御覧ください。
 **poweredBy**             | `X-Powered-By`ヘッダーを外行きのレスポンスに対して付加します。
 **$custom**               | Sails v0.9.x.における設定プションに対する後方互換性を提供します。Sailsv0.10ではより多くの柔軟な設定をHTTPミドルウエアに対して行えるようにしたため、`sails.config.express.customMiddleware`を使わない限りはこのアイテムを自身を持ってリストから取り除くことも出来ます。
 _router_ *                | ここでアプリケーションの諸々のロジックがリクエストに対して適用されます。hooksにある(
csrf tokenの強制などの)`"before"` ハンドラやいくつかのSailsロジックに加え、([`sails.config.routes`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.routes.html)での) 明示的ルーティングやblueprintsルーティングを使ってリクエストをルーティングします。
 _www_ *                   | [static middleware](http://www.senchalabs.org/connect/static.html)のコネクションを使ってアプリケーションのパブリックフォルダ( [`sails.config.paths`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)で設定することが出来, 通常 [`.tmp/public/`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md))にあるスタティックなファイル(通常は画像やスタイルシート、スクリプト)を提供します。 **favicon**               | [browser favicon](http://en.wikipedia.org/wiki/Favicon)がアプリケーション中で`/assets/favicon.ico`として設定されていればこれを提供します。
 _404_ *                   | どのルーティングにもマッチしないリクエストをハンドルします - `res.notFound()`をトリガーします  <!-- technically, this emits the `router:request:404` event)  -->
 _500_ *                   | 内部エラーをトリガーしたリクエストをハンドルします。 - `res.serverError()`をトリガーします <!-- technically, this emits the `router:request:500` event)  -->

###### 凡例:

+ `*` - アスタリスク(*) がついたミドルウエアは _ほぼ絶対に_ 編集したり削除したりする必要はありません。自分で何をやっているのかを本当に理解している時にのみこれらを編集したり削除したりしてください。



#### HTTPミドルウエアを追加または上書きする。

カスタムのHTTPミドルウエアを設定するには、まず新しいHTTPキー`sails.config.http.middleware.FOO`を定義して設定済みのミドルウエアファンクションとして設定します。そして`sails.config.http.middleware.order`のミドルウエアチェーンの配列の中の好きなところにキー名(“FOO”)を文字列で追加します。("cookieParser”の直前に置くのがいいでしょう。):

`config/http.js`での例:

```js
  // ...
  middleware: {
    
    // Define a custom HTTP middleware fn with the key `foobar`:
    foobar: function (req,res,next) { /*...*/ next(); },

    // Define another couple of custom HTTP middleware fns with keys `passportInit` and `passportSession`
    // (notice that this time we're using an existing middleware library from npm)
    passportInit    : require('passport').initialize(),
    passportSession : require('passport').session(),

    // Override the conventional cookie parser:
    cookieParser: function (req, res, next) { /*...*/ next(); },


    // Now configure the order/arrangement of our HTTP middleware
    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'passportInit',            // <==== passport HTTP middleware should run after "session"
      'passportSession',         // <==== (see https://github.com/jaredhanson/passport#middleware)
      'bodyParser',
      'compress',
      'foobar',                  // <==== we can put this stuff wherever we want
      'methodOverride',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ]
  },
  
  customMiddleware: function(app){
     //Intended for other middleware that doesn't follow 'app.use(middleware)' convention
     require('other-middleware').initialize(app);
  }
  // ...
```


### SailsにおけるExpressミドルウエア

Sailsのとても良い所の一つはすでに存在するExpress/Connectの恩恵に預かることが出来るという点です。しかし _実際に_
 やってみようとした人の共通の疑問は:

> _”何処で`app.use()`すればいいのか?”_ということです。

ほとんどのケースにおいてこの答えはExpressのミドルウエアをHTTPミドルウエアとして[`sails.config.http.middleware`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html)でインストールすることです。
これでアプリケーションにおける全てのHTTPリクエストの際にこれらトリガーされることになります。また他のHTTPミドルウエアと関連してどの順番で動作すればいいのかを設定することも出来ます。

### SailsにおけるExpress Routingミドルウエア

 [`config/policies.js`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html)で設定することによりポリシーとしてExpressミドルウエアをインクルードすることも出来ます。また、実際のラッパーポリシーの中にmiddlewareをrequireしてセットアップすることも出来ます(通常、そうするのがいいです)し、単にpolicies.jsファイルで直接requireする事もできます。以下の例では簡潔さを優先して後者の手法を取っています。:


```js
{
  '*': true,
  
  ProductController: {
  
    // Prevent end users from doing CRUD operations on products reserved for admins
    // (uses HTTP basic auth)
    '*': require('http-auth')({
      realm: 'admin area'
    }, function customAuthMethod (username, password, onwards) {
      return onwards(username === "Tina" && password === "Bullock");
    }),
    
    // Everyone can view product pages
    show: true
  }
}
```



<!--

  TODO:

### Advanced Express Middleware In Sails

You can actually do this in a few different ways, depending on your needs.



Generally, the following best-practices apply:

If you want a middleware function 
 
+ If you want a piece of middleware to run only when your app's explicit or blueprint routes are matched, you should include it as a policy.
+ this will run passport for all incoming http requests, including images, css, etc.

If you want a middleware function to run for all you should include it at the top of your `config/routes.js` as a wildcard route.  for your controller (both HTTP and virtual) requests
-->





<docmeta name="uniqueID" value="middleware198259">
<docmeta name="displayName" value="Middleware">
