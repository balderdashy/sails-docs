# コンベンショナルのデフォルト

Sailsにはすぐに使えるコンベンショナルなHTTPミドルウエアがバンドルされています。もちろんこれは、無効化したり、上書きしたり、アレンジしなおしたり、追加することも出来ますが、多くのアプリケーションの開発時及び運用時にはプリインストールのスタックは完璧に対応することが出来ます。以下に、外部からのリクエストを受けた時には毎回実行されるに標準的なミドルウエアファンクションの表を実行順に掲載します。:

 HTTP ミドルウエアキー        | 目的
 ------------------------- | ------------
 **startRequestTimer**     | リクエストの始まった時間を記録するためにメモリ上に変数を配置します。これはスローリクエストの診断データに使います。
 _cookieParser_ *          | この後のミドルウエアやアプリケーションで使うためにCookieのデータをパースします。
 _session_ *               | [session設定](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.session.html)を使ってユニークなセッションオブジェクトを準備します。
 **bodyParser**            | [Skipper](https://github.com/balderdashy/skipper)を使ってHTTPリクエストボディからパラメータとバイナリストリーム(ストリーミングファイルアップロード時に)をパースします。
 **compress**              | gzip/deflateを使ってレスポンスを圧縮します。
 **methodOverride**        | faux HTTPメソッドを提供します。これによりクライアントがサポートしない場合(例えばレガシーなInternet Explorerのように)でもPUTやDELETEのようなHTTPリクエストを使えるようにします。もしリクエストが`"PUT"`に設定された`_method`パラメータを持っていればあたかもそのリクエストは適切なPUT リクエストであったかのようにルーティングされます。さらなる情報が欲しい場合は[Connect's methodOverride docs](http://www.senchalabs.org/connect/methodOverride.html) を御覧ください。
 **poweredBy**             | `X-Powered-By`ヘッダーを外行きのレスポンスに対して付加します。
 **$custom**               | Sails v0.9.x.における設定プションに対する後方互換性を提供します。Sailsv0.10ではより多くの柔軟な設定をHTTPミドルウエアに対して行えるようにしたため、`sails.config.express.customMiddleware`を使わない限りはこのアイテムを自身を持ってリストから取り除くことも出来ます。
 _router_ *                | ここでアプリケーションの諸々のロジックがリクエストに対して適用されます。hooksにある(csrf tokenの強制などの)`"before"` ハンドラやいくつかのSailsロジックに加え、([`sails.config.routes`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.routes.html)での) 明示的ルーティングやblueprintsルーティングを使ってリクエストをルーティングします。
 _www_ *                   | Connectの [スタティックミドルウエア](http://www.senchalabs.org/connect/static.html)アプリケーションの"public"フォルダ(通常[`.tmp/public/`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)に配置されている[`sails.config.paths`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)で設定されます)にあるスタティックファイル(通常画像やスタイルシート、スクリプト)を提供します。
 **favicon**               | [browser favicon](http://en.wikipedia.org/wiki/Favicon)がアプリケーション中で`/assets/favicon.ico`として設定されていればこれを提供します。
 _404_ *                   | どのルーティングにもマッチしないリクエストをハンドルします - `res.notFound()`をトリガーします  <!-- technically, this emits the `router:request:404` event)  -->
 _500_ *                   | 内部エラーをトリガーしたリクエストをハンドルします。 - `res.serverError()`をトリガーします <!-- technically, this emits the `router:request:500` event)  -->

<docmeta name="displayName" value="Conventional Defaults">
