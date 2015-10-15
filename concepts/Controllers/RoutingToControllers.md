# コントローラへのルート

Sailsはデフォルトで各コントローラに[blueprint action route](http://sailsjs.org/documentation/reference/blueprint-api)を生成しますので`/:コントローラ/:アクション`への`GET`リクエストはアクションをトリガーします。前のセクションの例が`api/controllers/SayController.js`として保存されていればアプリケーションがリフトされるときはいつでも`/say/hi`や`/say/bye`がデフォルトで有効になります。
コントローラがサブフォルダ`/we`に保存されていればルートは `/we/say/hi`と`/we/say/bye`になります。Sailsの自動ルートバインディングに関するさらなる情報は[blueprints documentation](http://sailsjs.org/documentation/reference/blueprint-api) をご覧ください。

デフォルトのルートに加え、Sailsでは[`config/routes.js`](http://sailsjs.org/documentation/concepts/Routes)ファイルを付けうことで手動でルートのバインディングが出来ます。ルートを明示的に設定する必要のある例は:

+ [HTTP method](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)(verbとも呼ばれます)に基づきアクションが個別のルートを取り扱いたい時。前述の **action blueprint** は `GET`、`POST`、`PUT`、`DELETE`などを含め、*すべての* アクションに与えられたリクエストメソッドをバインディングします。
+ カスタムURLでアクションにアクセスできるようにしたい時。(例: `PUT /login`、`POST /signup`や`GET /:username`ような"vanity URL")
+ ルートがどう処理されるのかに関して追加の設定を行いたい場合。(例: 特別なCORS設定)

`config/routes.js`ファイルで手動のルート設定を行うには、HTTP verbとパス(すなわち **ルートアドレス**)をキーとして、コントローラー名+ `.` +アクションを値（すなわち **ルートターゲット**）として使います。

例えば以下の手動設定ルートは`/make/a/sandwich`がPOSTリクエストを受けた時はいつでも`api/controllers/SandwichController.js`の`makeIt()`アクションをトリガーします。:

```js
  'POST /make/a/sandwich': 'SandwichController.makeIt'
```


> **備考:**
>
> サブフォルダに保存されたコントローラに関してはサブフォルダ名はコントローラ名の一部になります。:
>
> ```js
>   '/do/homework': 'stuff/things/HomeworkController.do'
> ```
>
> これで`/do/homework`がリクエストされた時はいつでも`api/controllers/stuff/things/HomeworkController.js`の`do()`アクションをトリガーするようになります。

手動ルーティングに関しての全体的なディスカッションはこのドキュメントのスコープから外れます。利用可能な全てのオプションに関しては[routes documentation](http://sailsjs.org/documentation/concepts/Routes) をご覧ください。


<docmeta name="displayName" value="Routing to Controllers">
