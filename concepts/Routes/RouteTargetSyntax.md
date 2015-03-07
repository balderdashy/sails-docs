# ルートターゲットの記法
### 概要

Sailsでは**config/routes.js**において、いくつかの方法で明示的なルートを設定することが出来ます。すべてのルーティングせっては**アドレス**と**ターゲット**から成っています。例えば、:

```
'GET /foo/bar': 'FooController.bar'
^^^address^^^^  ^^^^^^target^^^^^^^
```

### ルートアドレス

ルートアドレスはターゲットに指定されたハンドラーやオプションの適用を受けるにはどのようなURLにマッチしていなければならないかを示すものです。ルートは必須事項のパスとオプションのリクエスト種別から成っています。:

```
'POST  /foo/bar'
^verb^ ^^path^^
```

どのようなリクエスト種別も指定されなかった場合、(**GET**, **POST**, **PUT**などのいずれかにかかわらず)パスにマッチするすべてのリクエストに対してターゲットが適用されます。先頭に`/`をつけるのを忘れずにいてください。適切に動作させるにはすべてのパスは`/`から始まらなければなりません。

####ワイルドカードとダイナミックパラメータ

特定のパスを**foo/bar**のように指定する代わりにワイルドカードとして`*`が使えます。:

```
'/*'
```
    
上のものはすべてのパスに当てはまります:

```
'/user/foo/*'
```
    
上のものは**/user/foo**で*始まる*すべてのパスに当てはまります。

`:paramName`を`*`の代わりにワイルドカードとして利用することにより、アドレス中のワイルドカードにマッチする部分を名前付きのパラメータとして利用することが出来ます。:

```
'/user/foo/:name/bar/:age'
```

これは以下のURLと同じものにマッチします:

```
'/user/foo/*/bar/*'
```
   
ただし、ワイルドカードにされた部分に与えられた値はそれぞれ`req.param('name')`と`req.param('age')`で取得出来ます。

#### アドレス中の正規表現

ワイルドカードによるアドレス記法に加えて、正規表現を用いてマッチすべきアドレスを定義する事ができます。正規表現を用いてアドレスを定義する方法は以下のとおりです。 :

`"r|<regular expression string>|<comma-delimited list of param names>"`

"**r**"の後に`|`、そして*デリミタなしの*正規表現文字列、そしてもう一つのパイプ、それから正規表現中で丸括弧方式で書かれた部分に対応するパラメータ名のリストと言う形式です。例えば:

`"r|^/\\d+/(\\w+)/(\\w+)$|foo,bar": "MessageController.myaction"`

これは `/123/abc/def`にマッチし、`MessageController`の中の`myaction`アクションを動作させその際には`abc`と`def`が`req.param('foo')`と`req.param('bar')`としてそれぞれ取り出せます。

<<<<<<< HEAD
2重のバックスラッシュ`\\d`と`\\w`にご留意ください。正規表現を正しく動作させるためにはこの部分のエスケープが必要です。
=======
Note the double-backslash in `\\d` and `\\w`; this escaping is necessary for the regular expression to work correctly!
>>>>>>> 0a69dcc7a2ad18a99e1d1ae0f37ac7ebe6a63677

#### ルートの順番

ワイルドカードや正規表現を利用する際には**config/routes.js**における記述順の問題に関してご留意ください。URLは上に書かれたパターンから下に書かれたパターンへの順番で適用されます。例えば以下の様な設定をしたとします。:

    '/user': 'UserController.doSomething',
    '/*'   : 'CatchallController.doSomethingElse'
    
マッチングが途中で打ち切られてしまうので、リクエスト`/user`は最初の設定のハンドラがコード内で`next()`を呼び出さない限りは2つ目の設定にマッチすることはありません。([policies](http://beta.sailsjs.org/#/documentation/concepts/Policies)のみが`next()`をコールすることが出来ます。)何かとても特殊なことをするという場合以外は、各リクエストは**config/routes.js**中の一つのリクエストにのみマッチするようにしておいたほうが無難です。

### ルートターゲット

カスタムルート中のアドレス部分はどのようなURLにマッチすべきかを示します。一方、*ターゲット*部分はマッチした後にSailsがどのように振る舞えばいいかを示します。ターゲットはいくつかの記法で記述できます。いくつかのケースでは並列で記述することにとっていくつかのターゲットのチェインを一つのアドレスに割り当てることも出来ますが、通常はそれぞれのアドレスは一つのターゲットを持ちます。以下にそれぞれのターゲットの記法を記し、その後提供可能な様々なオプションに関して説明します。

#### コントローラ・アクションに対するターゲットの記法

最もよく使われるターゲットは特定の[コントローラアクション](http://beta.sailsjs.org/#/documentation/concepts/Controllers?q=actions)を指定するルートです。以下の4つのルートは皆同じ意味です。:

```
'GET /foo/go': 'FooController.myGoAction',
'GET /foo/go': 'Foo.myGoAction',
'GET /foo/go': {controller: "Foo", action: "myGoAction"},
'GET /foo/go': {controller: "FooController", action:"myGoAction"},

```

それぞれの設定は`GET /foo/go`が**api/controllers/FooController.js**の`myGoAction`マップすることを示します。もし、対応するアクションがないときにはSailsはエラーメッセージを返してルートを無視します。そうでなければ**/foo/go** に対する**GET**リクエストがなされた時はいつでもアクションのコードが実行されます。

この記法におけるコントローラとアクションの名前はケースセンシティブです。

[blueprints API](/#/documentation/reference/blueprint-api)はデフォルトで("create", "update" and "delete"などの)いくつかのアクションをコントローラに追加することをご留意ください。 これらのアクションはすべてルーティング可能です。:

```
'GET /foo/go': 'UserController.find'
```

**api/controllers/UserController/js**ファイルと**api/models/User.js**ファイルが有ったとします。そこで以上の設定においてブラウザから**/foo/go**にアクセスすると、Blueprintのデフォルトの "find* アクションが実行され、`User`モデルの中のすべてのリストが表示されます。また、もし`find`と名付けられた[カスタムアクション](/#/documentation/concepts/Controllers?q=actions)が存在するときにはそれがかわりに呼び出されます。


####ビューをターゲットとする記法

その他のよく使われる記法としては[ビュー](http://beta.sailsjs.org/#/documentation/concepts/Views)をバインドするものです。この記法はシンプルです。**views**フォルダーにおける拡張子を除いたパスを記述するものです。:

```
'GET /home': {view: 'home/index'}
```

このルートは`GET /home`を**views/home/index.ejs**に保管されているビューにマップさせるものです。（仮にデフォルトのEJS[テンプレートエンジン](http://beta.sailsjs.org/#/documentation/concepts/Views/ViewEngines.html)が利用されているとすれば。）ビューファイルが存在する限り**/home**への**GET**リクエストは表示されます。

> このルートは直接ビューにルーティングされていますのでいかなるポリシーも適用されないことをご留意ください。
> 詳細に関してはスタックオーバーフローの[質問](http://stackoverflow.com/questions/21303217/sailsjs-policy-based-route-with-a-view/21340313#21340313)をご覧ください。

#### Blueprintをターゲットとする記法

場合によってはSailsの[blueprintアクション](http://beta.sailsjs.org/#/documentation/reference/blueprint-api?q=blueprint-actions)に対して通常とは異なるルーティングをマッピングする必要がある時があるでしょう。例えばもしそれぞれ**UserController**と**User**と命名されたコントローラとモデルがあり、Sailsが自動的に**GET /user**をblueprintの全データをリスト表示する"find"アクションにマップしたとします。このアクションに対して別のルーティングを割り当てたい場合はBlueprintをターゲットとする記法を利用できます。:

```
'GET /findAllUsers': {model: 'user', blueprint: 'find'},
'GET /user/findAll': {blueprint: 'find'}
```

この設定において`model`と`blueprint`のプロパティが設定されている一方で2つ目の設定では`blueprint`のみが使われていることにご注目ください。2つ目の設定において`model`の設定が指定されてないためSailsはアドレスを見てモデルが`User`であると推定します。`model`への明示的設定により以下のようにこの推定をオーバーライドすることもできます。:

```
'GET /user/findAll': {blueprint: 'find', model: 'pet'}
```

しかし、アプリケーションのAPIをごちゃごちゃで理解し難いものにしてしまうため、こういうことはめったにすべきではありません。

もし存在しないモデルやBlueprintを指定した場合Sailsはエラーを出力し、ルーティングを無視します。

たとえアクションがコントローラでオーバーライドされている場合でもBlueprintをターゲットとする記法を使うことが出来ます。

#### リダイレクトをターゲットとする記法
リダイレクトアドレスを文字列で渡すだけであるアドレスを別のアドレス（アプリ内なのか外部アドレスなのかにかかわらず）にリダイレクトさせることも出来ます。:

```
'/alias' : '/some/other/route'
'GET /google': 'http://www.google.com'
```

Sailsアプリ内で無限ループを引き起こさないようにご注意ください！

リダイレクトの過程で多くの場合、オリジナルのHTTPリクエストは失われ、単に**GET**として取り扱われることにご留意ください。上記の例では**/alias**への**POST**リクエストは**/some/other/route**への**GET**リクエストとして処理されます。これはブラウザ依存の振る舞いですが、リダイレクトの間もリクエストが残ると期待しないことをおすすめします。

#### レスポンスをターゲットとする記法
以下の記法を用いてデフォルトまたはカスタムの[レスポンス](http://beta.sailsjs.org/#/documentation/concepts/Custom-Responses)に対して直接マッピングを指定することも出来ます。:

```
'/foo': {response: 'notFound'}
```

単に**.js**拡張子を除いた形で**api/responses**にあるレスポンス名を指定するだけです。この記法におけるレスポンス名はケースセンシティブです。もし存在しないレスポンスを指定した場合Sailsはエラーを出力してルーティングを無視します。

#### ポリシーをターゲットとした記法

多くの場合において[**config/policies.js**](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html)設定ファイルを使ってコントローラに対して[ポリシー](http://beta.sailsjs.org/#/documentation/concepts/Policies) を設定するでしょう。しかしながら時々（特に [view](http://beta.sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html?q=view-target-syntax)や[blueprint](http://beta.sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html?q=blueprint-target-syntax) をターゲットする記法を使いたいときには）、個々ののルートに対してポリシーを直接指定したい時もあるでしょう。ポリシーをターゲットする記法は以下のとおりです。:

```
'/foo': {policy: 'myPolicy'}
```
しかしながらポリシーには以下の様な配列を使って常にひとつ以上のターゲットをチェーンする必要があります。:

```
'/foo': [{policy: 'myPolicy'}, {blueprint: 'find', model: 'user'}]
```

この例では**myPolicy**のポリシーを適用し、もしそれがパスした際には**User**モデルの**find**blueprintアクションを実行します。

### ルートターゲットのオプション

上記で説明した様々なルート記法の他にも、ルートターゲットに付加された各種のオプションに関して、`req.options`オブジェクトの中にあるルートハンドラを通過させることが出来ます。予約されたいくつかのプロパティはルートハンドラの振る舞いに影響をあたえることが出来ます。それらのプロパティは以下の表に挙げられています。

| プロパティ    | 適用可能なターゲット       | データ型 | 詳細 |
|-------------|:----------:|-----------|-----------|
|`skipAssets`|全て|((論理型))|もし、(**myImage.jpg**のような)ドットを含むアドレスをマッチさせたく**ない**場合`true`に設定してください。これにより[ワイルドカード](http://beta.sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html?q=wildcards-and-dynamic-parameters)を使っている場合に入力内容がアセットにマッチするのを維持します。[URL slugs](/#/documentation/concepts/Routes/URLSlugs.html)を使う際に便利です。|
|`skipRegex`|全て|((論理型))|ドットを含む全てのURLをスキップするだけでは寛大すぎる場合や別の基準に基づいて正規表現をハンドルしたい場合`skipRegex`を利用することが出来ます。このオプションではマッチすべき正規表現または正規表現の配列を指定することが出来ます。もしすべての条件がマッチした場合、ハンドラーはスキップされます。ハンドラーを正規表現を使ってバインドする場合と異なり`skipRegex`文字列ではなく*実際の [RegExpオブジェクト](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)*を渡さなければなりません。|
|`locals`|[controller](http://beta.sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html?q=controller-%2F-action-target-syntax), [view](http://beta.sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html?q=view-target-syntax), [blueprint](http://beta.sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html?q=blueprint-target-syntax), [response](http://beta.sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html?q=response-target-syntax)|((オブジェクト))|リクエストがハンドルされる間にレンダリングされるビューに対して渡されるデフォルトの[ローカル変数](http://beta.sailsjs.org/#/documentation/reference/res/res.view.html?q=arguments)を指定します。|
|`cors`|全て|((オブジェクト))または((論理型))または((文字列))|オリジンの異なるリクエストに対してどう処理するのかを定義します。詳細に関しては[CORSのメインドキュメント](http://beta.sailsjs.org/#/documentation/concepts/CORS)を御覧ください。|
|`populate`|[blueprint](http://beta.sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html?q=blueprint-target-syntax)|((boolean))|"find"または"findOne"のblueprintアクションの際にどのようなモデルフィールドが[populate](http://beta.sailsjs.org/#/documentation/reference/waterline/populated-values)されるかを表します。デフォルトでは[**config/blueprints.js**](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.blueprints.html)にある設定が適用されます。
|`skip`, `limit`, `sort`, `where`|[blueprint](http://beta.sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html?q=blueprint-target-syntax)|((オブジェクト))|blueprintSetの"find"に対する条件式を設定します。詳細に関しては[クエリーリファレンス](https://github.com/balderdashy/sails-docs/blob/master/reference/waterline/queries/queries.md)を御覧ください。

<docmeta name="uniqueID" value="RouteTargetSyntax278177">
<docmeta name="displayName" value="Custom Routes">

