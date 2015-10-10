# Sailsを拡張する

Nodeの思想を維持するためにSailsは可能な限りコアを小さく、なるべく全てのものを移譲して、もっとも重要なものはモジュール[*](./#foot1)に分けています。現在Sailsには3種類の拡張方法があります。

+ [**Generators**](http://sailsjs.org/documentation/concepts/extending-sails/Generators) - SailsのCILに機能を足したり、上書きするためのものです。  *例*: [sails-generate-model](https://www.npmjs.com/package/sails-generate-model), `sails generate model foo`の形式でコマンドラインからモジュールを生成することが出来るようになります。
+ [**Adapters**](http://sailsjs.org/documentation/concepts/extending-sails/Adapters) - Waterline（SailsのORM)に新しいデータソース（データベースやAPI,ハードウエアなど）を追加するものです。*例*: [sails-postgresql](https://www.npmjs.com/package/sails-postgresql), Sailsの公式[PostgreSQL](http://www.postgresql.org/)アダプタです。
+ [**Hooks**](http://sailsjs.org/documentation/concepts/extending-sails/Hooks) - Satilsの実行時に機能を追加したり上書きするためのものです。*例*: [sails-hook-autoreload](https://www.npmjs.com/package/sails-hook-autoreload), 手動でサーバを再起動することなくSaplsプロジェクトのAPIをリフレッシュすることが出来ます。

もしもSailsのプラグインを開発したい場合、最も多くの場合において[hook](http://sailsjs.org/documentation/concepts/extending-sails/Hooks)を作ることになるでしょう。

<a name="foot1">*</a> <sub>リクエストフックのような幾つかの重要なモジュールはSailsのコアにバンドルされていますが厳密には削除したり別々にインストールすることも出来ます。</sub>

<docmeta name="uniqueID" value="extendingsails78468">
<docmeta name="displayName" value="Extending Sails">
