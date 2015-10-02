# フック

## ステータス

> ##### 安定性: [3](http://nodejs.org/api/documentation.html#documentation_stability_index) - 安定

## フックとは何でしょうか

フックはSailsのコアに機能を追加するモジュールです。[hook specification](http://sailsjs.org/documentation/concepts/extending-sails/hooks/hook-specification) ではモジュールがSailsにコードをインポートできて新しい機能を利用可能になるための条件が定義されています。これらはコアとは別に保存されるため、フックを使うことでフレームワークを改変することなくアプリケーションや開発者の間でSailsのコードを共有することができます。

## フックとサービス

フックはSailsの[services](http://sailsjs.org/documentation/concepts/Services)と幾つかの共通した機能を持っています。両方とも開発者が共通的に使われるコードを1箇所に保管することが出来るようにし、これらのメソッドはSailsアプリケーションからグローバルに呼び出せます。しかし、この2つのコンセプトにはいくつかの重要な違いがあります。:

* サービスはアプリケーションと独立して提供できません。幾つかのタイプのフックは単一のアプリケーションに紐付けられますが([Project Hooks](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/projecthooks.html)をご覧ください。)その他のフックはSailsアプリケーションから独立して配布でき、`npm install`でインストールすることが出来ます。
* フックは独自の初期化システムを持っています。これによりダイナミックになり、Sails liftをしたときに自身の設定ができるようになります。
* フックはliftする前にSailsのアプリケーションに新規の[ルート](http://sailsjs.org/documentation/concepts/Routes)を作成できます。

とは言え、サービスは複数の[コントローラ](http://sailsjs.org/documentation/concepts/Controllers) や[モデル](http://sailsjs.org/documentation/concepts/models-and-orm/models) の間でコードを共有するのにいい方法ですが、
* 別のアプリケーションコードを再利用することは難しいです
* （developmentとproductionのような）別々の環境で別々の振る舞いをするととは出来ません。(e.g. development vs. production)

その他の再利用可能なコードに関してフックはぴったりです。

## フックの種類

Sailsでは3種類のフックが利用可能です:

1. **コアフック**.  これらのフックはリクエストハンドリングや、blueprintルートの作成、[Waterline](http://sailsjs.org/documentation/concepts/models-and-orm)を使ったデータベースの統合など、Sailsアプリの中での多くの共通機能を提供します。コアフックはSailsのコアにバンドルされてるので全てのアプリケーションで利用することが出来ます。
2. **プロジェクトフック**.  このフックはSailsアプリケーションの中の`api/hooks`フォルダにあります。プロジェクトフックはアプリ―ケーション間で再利用する必要ないコードでフックの長所を利用したい時に使う方法です。  
3. **インストーラブルフック**.  これらのフックは`npm install`を使うことでアプリケーションの中の`node_modules`フォルダにインストールすることが出来ます。インストーラブルフックを使うことでSailsコミュニティの開発者はSailsアプリケーション内で利用可能なプラグインのようなモジュールを作ることが出来ます。

## こちらもお読みください。

* [Using hooks in your app](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/usinghooks.html)
* [The hook specification](http://sailsjs.org/documentation/concepts/extending-sails/hooks/hook-specification)
* [Creating a project hook](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/projecthooks.html)
* [Creating an installable hook](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/installablehooks.html)


<docmeta name="uniqueID" value="Hooks74998">
<docmeta name="displayName" value="Hooks">
<docmeta name="stabilityIndex" value="3">
