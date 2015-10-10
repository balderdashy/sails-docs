# プロジェクトフックを作る

プロジェクトフックは`api/hooks`の中にあるカスタムのSailsフックです。プロジェクトフックは[デフォルト](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/hookspec/defaults.html) や[ルート](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/hookspec/routes.html) のようなフックの利点を使ったコードを一つのアプリケーション内の複数のモジュールで共有されるのに便利です。もし *複数の* Sailsアプリケーションでコードを共有したい場合は[creating an installable hook](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/installablehooks.html) を代わりにご覧ください。

プロジェクトフックを作るには:

1. 新しいフックの名前を選びます。これは[core hook names](https://github.com/balderdashy/sails/blob/master/lib/app/configuration/default-hooks.js) とコンフリクトしてはいけません。
2. アプリケーションの`api/hooks`フォルダにその名前のフォルダを作ります。
3. `index.js`をそのフォルダに足します。
4. [hook specification](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/hookspec) に従って`index.jsにコードを書きます。

新しいフォルダには他のファイルがあっても問題なく、それらのファイルは`require`で読み込むことが出来ます。Sailsによって自動的に読み込まれるのは`index.js`だけです。

フォルダを作る代わりにプロジェクトの`api/hooks`フォルダに`api/hooks/myProjectHook.js`ファイルを作ることも出来ます。

#### フックが適切に読み込まれていることをテストする

フックがSailsによって読み込まれているかどうかを確認するには`sails lift --verbose`を使います。もしフックがロードされていれば

`verbose: your-hook-name hook loaded successfully.`

以上の様なメッセージをログで確認することが出来ます。

* [Hooks overview](http://sailsjs.org/documentation/concepts/extending-sails/Hooks)
* [Using hooks in your app](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/usinghooks.html)
* [The hook specification](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/hookspec)
* [Creating an installable hook](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/installablehooks.html)

<docmeta name="uniqueID" value="Hooks75000">
<docmeta name="displayName" value="Project Hooks">
<docmeta name="stabilityIndex" value="3">
