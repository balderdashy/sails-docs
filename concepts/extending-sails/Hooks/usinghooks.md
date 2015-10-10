# Sailsアプリケーションでフックを使う

## プロジェクトフックを使う
プロジェクトフックをSailsで使うには、まずもし`api/hooks`フォルダがなければ作成します。次に[プロジェクトフックを作成する](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/projecthooks.html) か使いたいフックを `api/hooks` フォルダにコピーします。

## インストーラブルフックを使う
インストーラブルフックを作成するには単にインストールしたいフックの名前（例：`npm install sails-hook-autoreload`）で`npm install`を実行します。また、アプリケーションの`node_modules`フォルダに直接[あなたが作成したインストーラブルフック](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/installablehooks.html)をコピーまたはリンクすることも出来ます。

## フックメソッドを作る
フックが露出する全てのメソッドは`sails.hooks[<hook-name>]`オブジェクトで利用可能です。例えば、`sails-hook-email`フックは`sails.hooks.email.send()`を提供します。(`sails-hook-` プレフィックスはなくなることにご留意ください。)どのメソッドが提供されるかはフックのドキュメンテーションをご覧ください。

## フックを設定する
一旦プロジェクトにインストーラブルフックを追加すると `config/local.js` や `config/env/development.js`のような通常のSailsの設定ファイルやあなたが作成したカスタムの設定ファイルで設定を行うことが出来ます。フックの設定は通常`sails-hook-`がなくされたフック名のネームスペースの下に配置されます。例えば`sails-hook-email`の`from`設定は`sails.config.email.from`で利用可能です。インストーラブルフックのドキュメンテーションでは設定可能なオプションを記述すべきです。

## Sailsがインストーラブルフックをロードする方法を変える
稀なケースですが、利用するインストーラブルフックの名前を変えたりフックの使う設定キーを変更することが必要な時があります。これはすでに使用したいインストーラブルフックと同名のプロジェクトフックがあったりすでに設定キーが使われていたりする場合などです。このようなコンフリクトを避けるためには`sails.config.installedHooks.<hook-identity>`設定オプションを使います。フックの識別子は *常に* フックがインストールされたフォルダの名前です。

```
// config/installedHooks.js
module.exports.installedHooks = {
   "sails-hook-email": {
      // load the hook into sails.hooks.emailHook instead of sails.hooks.email
      "name": "emailHook",
      // configure the hook using sails.config.emailSettings instead of sails.config.email
      "configKey": "emailSettings"
   }
};
```

> Note: `config/installedHooks.js` ファイルを自分で作る必要があることにご留意ください。

* [Hooks overview](http://sailsjs.org/documentation/concepts/extending-sails/Hooks)
* [The hook specification](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/hookspec)
* [Creating a project hook](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/projecthooks.html)
* [Creating an installable hook](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/installablehooks.html)


<docmeta name="uniqueID" value="Hooks75001">
<docmeta name="displayName" value="Using Hooks">
<docmeta name="stabilityIndex" value="3">
