# sails console

Sailsアプリケーションを静かにliftし（すなわちログをサイレントにした状態で）[node REPL](http://nodejs.org/api/repl.html)に入ります。これは全てのモデルやサービス、設定などにアクセスして利用できるということです。Waterlineを試したり、簡単にデータ管理をしたり、プロジェクトの実行時設定を確認するのに便利です。

### 例

```sh
$ sails console

info: Starting app in interactive mode...

info: Welcome to the Sails console.
info: ( to exit, type <CTRL>+<C> )

sails>
```

> `sails console`がサーバ上で起動されているため、ルートはHTTPとソケットを通じて（ブラウザなどから）を通じてアクセス可能ということを覚えておいてください。






### sails console内のグローバル変数

SailsはSailsアプリケーションに対してするように、いつくかの[グローバル変数](http://sailsjs.org/documentation/reference/Globals) をコンソールに露出しています。これは特にREPLで便利です。デフォルトでは`sails`アプリケーションインスタンスとモデル、サービスへのアクセスと、同様にLo-Dash (`sails.util._`)とasync (`async`)のアクセスも持ちます。


> **警告**
>
> Be careful when using `_` as a variable name in the Node REPL- and when possible, don't.
> (It doesn't work quite like you'd expect.)
>
> Instead, use lodash as `sails.util._`, e.g.:
> ```sh
> sails> sails.util._.keys(sails.config)
> ```
>
> Or alternatively, build yourself a local variable to use for familiarity:
>
> ```sh
> sails> var lodash = _;
> ```
>
> Then you can do:
>
> ```sh
> sails> lodash.keys(sails.config);
> ```

### さらなる例

#### Waterline

`Model.action(query).exec(console.log)`フォーマットのconsole.logは結果を見るのに最適です。

```sh
sails> User.create({name: 'Brian', password: 'sailsRules'}).exec(console.log)
undefined
sails> null { name: 'Brian',
  password: 'sailsRules',
  createdAt: "2014-08-07T04:29:21.447Z",
  updatedAt: "2014-08-07T04:29:21.447Z",
  id: 1 }
```

いいですね、これがデータベースに挿入されます。しかしながら、undefinedとnullにお気づきのことと思います。気にしないでください。.exec()は値に対するエラーとデータを返すということを思い出してください。そのため、`.exec(console.log)`を実行することは`.exec(console.log(err, data))`を実行することと同じです。2番めのメソッドはundefinedのメッセージを削除し、新しい行にnullを追加します。更に多くの方が必要であれば、ご自由に出来ます。

#### Sailsをエクスポートする

Sailsコンソールにおいて、`sails`とタイプすることで、Sailsのプロパティを見れます。これはSailsに関して更に学んだり、プロパティを上書きしたりグローバルを無効化しているかどうかを確認するのに使えます。

```sh
sails> sails
  |>   [a lifted Sails app on port 1337]
\___/  For help, see: http://links.sailsjs.org/docs

Tip: Use `sails.config` to access your app's runtime configuration.

1 Models:
User

1 Controllers:
UserController

20 Hooks:
moduleloader,logger,request,orm,views,blueprints,responses,controllers,sockets,p
ubsub,policies,services,csrf,cors,i18n,userconfig,session,grunt,http,projecthooks

sails>
```

<docmeta name="uniqueID" value="sailsconsole198558">
<docmeta name="displayName" value="sails console">
