# インストーラブルフックを作る

インストーラブルフックはSailsアプリケーションの`node_modules`に保存されるカスタムのSailsフックです。インストーラブルフックは機能を複数のアプリケーションで共有したり[NPM](http://npmjs.org) でSailsコミュニティーに公開する際に特に便利です。もし *一つだけの* Sailsアプリケーションで利用するフックを作りたいときは [creating a project hook](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/projecthooks.html) を代わりにご覧ください。

インストーラブルフックを作るには:

1. フックの名前を選びます。名前は [core hook names](https://github.com/balderdashy/sails/blob/master/lib/app/configuration/default-hooks.js) とコンフリクトしないようにしなければいけません。
1. あなたのシステム上に`sails-hook-<your hook name>`という名前のフォルダを作成します。 `sails-hook-`を利用するかは任意ですが、統合性維持のためにこれを利用することが強く推奨されています。また、このプレフィックスはロードする際に取り外されます。
1. フォルダ内に`package.json`ファイルを作成します。もしシステム上に`npm`がインストールされていれば`npm init`を実行してその後のプロンプトに従うだけで簡単にできます。あるいは以下の最低条件に準拠したファイルを手動で作成することも出来ます。:
```
{
    "name": "sails-hook-your-hook-name",
    "version": "0.0.0",
    "description": "a brief description of your hook",
    "main": "index.js",
    "sails": {
      "isHook": true
    }
}
```
もし`package.json`を作成するために`npm init`を利用する場合、あとで手動でファイルを開いて`isHook: true`を含んだ`sails`を追加するのを忘れないで下さい。
1. [hook specification](http://sailsjs.org/documentation/concepts/extending-sails/hooks/hook-specification) に従ってあなたのフックのコードを`index.js`に書いてください。

新しいフォルダには他のファイルがあっても問題なく、それらのファイルは`require`で読み込むことが出来ます。Sailsによって自動的に読み込まれるのは`index.js`だけです。フックが動作するための依存を定義するには`package.json`で`dependencies`キーを設定する必要があります。(`npm install <dependency> --save`を使って`package.json`に簡単に依存情報を保存することも出来ます。)

### あなたの新規フックをテストする

他の人にフックを配布する前にテストを書きたいかもしれません。これは将来のバージョンのSailsとの互換性を確実にするのに助かるほか、イライラしたり、凶暴な行動によって周りのものを破壊する機会を劇的に減少させます。テストに関しての全体的なガイドは本ドキュメントの範疇外にですが、まず初めてみるには以下のステップが参考になるでしょう。:

1. Sailsを`devDependency`としてあなたのフックの`package.json`ファイルに追加します。:
```
"devDependencies": {
      "sails": "~0.11.0"
}
```
1. `npm install sails` か `npm link sails`(Sailsがシステムにグローバルにインストールされている場合)を使ってSailsを依存としてインストールします。
1. [Mocha](http://mochajs.org/) がまだインストールされていない場合`npm install -g mocha` を使ってインストールします。
1. フックのメインフォルダーの下に`test`フォルダを作成します。
2.　`basic.js`を作成し以下の基本的テストを作成します:
```
	var Sails = require('sails').Sails;

	describe('Basic tests ::', function() {

        // 実行中のアプリケーションインスタンスを格納する変数
		var sails;

        // 全てのテストを実行する前にSailsのliftを試みる
		before(function (done) {

			// フックは10秒でタイムアウトする
			this.timeout(11000);

			// Sailsのliftを試みる
		    Sails().lift({
		      hooks: {
		        // フックを読み込む
		        "your-hook-name": require('../'),
		        // gruntをスキップする（必要なければ）
		        "grunt": false
		      },
		      log: {level: "error"}
		    },function (err, _sails) {
		      if (err) return done(err);
		      sails = _sails;
		      return done();
		    });
		});

        // テスト完了後、Sailsを止める
		after(function (done) {

			// Sailsを止める（もしliftに成功していれば）
			if (sails) {
				return sails.lower(done);
			}
			// そうでなければ単にリターンする
			return done();
		});

		// Sailsがテストを読み込んでlift出来るかのテスト
		it ('sails does not crash', function() {
			return true;
		});

	});
```
1. `mocha -R spec` でテストを実行し、全体結果を見ます。
1. 完全なリファレンスは [Mocha](http://mochajs.org/) のドキュメントをご覧ください。

### フックを公開する

もしフックがテストされ問題ないように見えて、その名前のフックがまだ [NPM](http://npmjs.org) モジュールにない場合、`npm publish`を実行することで世界中と共有することが出来ます。やってみましょう！

* [Hooks overview](http://sailsjs.org/documentation/concepts/extending-sails/Hooks)
* [Using hooks in your app](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/usinghooks.html)
* [The hook specification](http://sailsjs.org/documentation/concepts/extending-sails/hooks/hook-specification)
* [Creating a project hook](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/projecthooks.html)


<docmeta name="uniqueID" value="Hooks74999">
<docmeta name="displayName" value="Installable Hooks">
<docmeta name="stabilityIndex" value="3">
