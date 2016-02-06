# Blueprint API

### 概要

blueprintルートとblueprintアクションは一体となって**blueprint API**を構成し、このビルトインロジックはモデルとコントローラを作成する度にいつでも[RESTful JSON API](http://en.wikipedia.org/wiki/Representational_state_transfer) を用意します。

例えば`User.js`モデルと`UserController.js`コントローラファイルをプロジェクト内に作った時、blueprintのおかげですぐに`/user/create?name=joe`にアクセスしユーザを作成し、`/user`アクセスしてユーザの配列を参照できるようになります。これらは全てコーディングなしで実現可能です。

Blueprintsはプロトタイピングに最適ですが、オーバーライトやプロテクション、拡張や無効化が出来るためプロダクション環境においてもとてもパワフルです。

#### Blueprintルート

Blueprintが有効な状態で`sails lift`を実行した時にフレームワークはコントローラとモデル、コンフィグを確認し、[特定のルート](http://sailsjs.org/documentation/concepts/Routes)を自動的にバインドします。これらの暗黙のblueprintルート(sadowsとも呼びます)は`config/routes.js`ファイルで手動で設定することなくアプリケーションが特定のルートに反応できるようにします。デフォルトではblueprintルートはblueprint*アクション*(下記の「Blueprintアクション」をご覧ください。)と一致しますが全てはカスタムのコードによって上書き可能です。

Sailsでは3種類のblueprintルートがあります:

+ **RESTfulルート**, パスは常に`/:modelIdentity`または`/:modelIdentity/:id`です。これらのルートはHTTPの「動詞」を使い、取るべきアクションを決めます。例えば、`/user`に対する`POST`リクエストはユーザを新規作成し、`/user/123` に対する`DELETE`リクエストは主キーが123のユーザを削除します。本番環境ではRESTfulルートは一般的には[policies](http://sailsjs.org/documentation/concepts/Policies)で保護して許可無いアクセスを防止しなければなりません。
+ **Shortcutルート**, 取るべきアクションはパスにエンコードされています。例えば`/user/create?name=joe`ショートカットはユーザを新規作成し、`/user/update/1?name=mike`はユーザ１を更新します。これらのルートは`GET` リクエストのみに反応します。ショートカットルートを使うと非常に開発しやすいですが一般的に本番環境では無効化されるべきです。
+ **Actionルート**, カスタムコントローラアクションに対して自動的に作成されるものです。例えば`FooController.js`ファイルに`bar`メソッドがあった場合、blueprintアクションルートが有効な限り`/foo/bar`ルートは自動的に作成されます。RESTfulとショートカットルートとは違い、アクションルートはコントローラファイルは対応するモデルを持つ必要は*ありません*。


blueprintの設定オプションや異なるタイプのblueprintルートをどのように有効化、無効化するのかに関しては[コンフィグレーションリファレンスのblueprint部分](http://sailsjs.org/documentation/reference/sails.config/sails.config.blueprints.html)をご覧ください。


#### Blueprintアクション

Blueprintアクション（blueprintアクション*ルート*と混同しないように気をつけてください。）は同名のモデルを持つコントローラ(例:`ParrotController`は`Parrot`モデルを必要とします。)が使うことの出来る一般的なアクションです。これはいわばアプリ―ケーションのデフォルトの振る舞いです。例えば`User.js`モデル空の`UserController.js`コントローラがあった場合、`find`、`create`、`update`、`destroy`、`populate`、`add`、`remove`のアクションがコードを書くことなく暗示的に存在します。

デフォルトではblueprint RESTfulルートやshortcutルートはそれぞれの対応するblueprintアクションに転送されます。しかしながら、全ての全てのblueprintアクションはそのコントローラファイルにカスタムアクションを作成することによって(例:`ParrotController.find`)特定のコントローラによって上書きされることが出来ます。別の方法としては 自分のカスタムblueprintアクション(例:`api/blueprints/create.js`)を作成することで_アプリケーションの中のどこでも_ blueprintアクションをオーバーライドすることが出来ます。

現在のバージョンのSailsは以下のblueprintアクションを提供します:

+ [find](http://sailsjs.org/documentation/reference/blueprint-api/Find.html)
+ [findOne](http://sailsjs.org/documentation/reference/blueprint-api/FindOne.html)
+ [create](http://sailsjs.org/documentation/reference/blueprint-api/Create.html)
+ [update](http://sailsjs.org/documentation/reference/blueprint-api/Update.html)
+ [destroy](http://sailsjs.org/documentation/reference/blueprint-api/Destroy.html)
+ [populate](http://sailsjs.org/documentation/reference/blueprint-api/Populate.html)
+ [add](http://sailsjs.org/documentation/reference/blueprint-api/Add.html)
+ [remove](http://sailsjs.org/documentation/reference/blueprint-api/Remove.html)

結果的に、ドキュメントの中のこのセクションでカバーするblueprint APIメソッドは上記のアクションに1対1対応します。

### Blueprintsをオーバーライドする

(https://stackoverflow.com/questions/22273789/crud-blueprint-overriding-in-sailsjs より)

Sails v0.10でblueprint をオーバライドするにはapi/blueprintsフォルダを作り、その中にblueprintファイル(例: find.js, create.jsなど)を作成します。手始めにデフォルトのアクションにあるコードを見て進めてください。

**備考:** 現在全てのファイルは小文字である必要があります。(デフォルトのアクションはfindOne.jsを含みますが/api/blueprintsではこのファイルはfindone.jsである必要があります)

カスタムのblueprintを作成することも同様にサポートされていますが、現在自動的にルートの転送は行われません。もし/blueprints/foo.jsファイルを作った場合/config/routes.jsでルートのバインドを行う必要があります。（例えば）:

    GET /myRoute: {blueprint: 'foo'}


### コントローラごとにblueprintを無効化する

すべての設定は`config/blueprints.js`で コントローラの定義に'_config' キーを設定し、上書きしたい設定オブジェクトをアサインすることで、コントローラごとに上書きすることが出来ます。

```javascript
module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  }
}

```

### 備考

> + 以下のドキュメントはHTTPにフォーカスしていますがblueprint APIはリクエスト変換機能のおかげで（カスタムアクションやポリシーと同じように）WebSocketにも使うことが出来ます。使用例に関しては[browser SDK](http://sailsjs.org/documentation/reference/websockets/sails.io.js)のリファレンスセクションをご覧ください。
>

<docmeta name="uniqueID" value="blueprintapi170785">
<docmeta name="displayName" value="Blueprint API">
<docmeta name="stabilityIndex" value="2">
