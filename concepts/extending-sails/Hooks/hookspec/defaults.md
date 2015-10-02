# `.defaults`

`defaults`機能はオブジェクトまたは単一の引数を取るファンクション (以下の&ldquo;using `defaults` as a function&rdquo; をご覧ください)として実装することが出来、オブジェクトを返すことが出来ます。あなたが指定したオブジェクトはSailsのデフォルトの設定を提供するために使われます。あなたのフックのデフォルト設定を指定するためにこれを使うべきです。例えば、リモートサービスと通信するフックを作っている場合、以下のようにデフォルトのドメインとタイムアウトの長さを提供します。:

```
{
   myapihook: {
      timeout: 5000,
      domain: "www.myapi.com"
   }
}
```

Sailsの設定で`myapihook.timeout`が提供されていた場合、その値が使われます。そうでなければデフォルトの`5000`が使われます。

##### フック設定のネームスペース
[プロジェクトフック](http://sailsjs.org/documentation/concepts/extending-sails/Hooks?q=types-of-hooks)に関してはフックを一意に示すキー(例：上記の`myapihook`)のもとにフックの設定を置かなければなりません。[インスタンスフック](http://sailsjs.org/documentation/concepts/extending-sails/Hooks?q=types-of-hooks)に関しては特別な`__configKey__`キーを使い、フックのエンドユーザが必要に応じて[設定キーを変更](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/usinghooks.html?q=changing-the-way-sails-loads-an-installable-hook) 出来るようにしなければなりません。`__configKey__`を使うフックのデフォルトのキーはフック名です。例えば以下の`defaults`オブジェクトを持つ`sails-hooks-myawesomehook`と呼ばれるフックを作った時には:

```
{
   __configKey__: {
      name: "Super Bob"
   }
}
```

これはデフォルトでは`sails.config.myawesomehook.name`の値を提供することになります。もしエンドユーザーがフックの名前を`foo`に上書きした場合、`defaults` オブジェクトは `sails.config.foo.name`のデフォルト値を提供することになります。

##### `defaults`をファンクションとして使う

`defaults`機能でプレーンオブジェクトの代わりにファンクションを指定した場合、Sailsの設定で上書きされた (`config`)を受け取ることになります。設定の上書きはSailをliftする際に設定を渡したり(例：`sails lift --prod`)、Sailsをプログラム的にliftまたは読み込む際に最初の引数にオブジェクトを渡したり(例：`Sails.lift({port: 1338}, ...)`)、[`.sailsrc`](http://sailsjs.org/documentation/anatomy/myApp/sailsrc.html)を使ったりする方法でできます。`defaults`ファンクションはあなたのフックのデフォルト設定を表すプレーンオブジェクトを返さなければなりません。

<docmeta name="uniqueID" value="Hooks75003">
<docmeta name="displayName" value=".defaults">
<docmeta name="stabilityIndex" value="3">
