# sails new

`sails new <appName>`は **appName** と命名されたフォルダにSailsプロジェクトを新規作成します。

##### オプション:

  * `--no-linker` 静的なHTMLファイルに対するアセットリンクを無効化します。（関連するGruntタスクは生成されません）
  * `--no-frontend` `assets`フォルダとファイルの生成を無効化します。ビューはsailsjs.orgにあるリソースにハードコードでリンクされます。
  * `--template=[template language]` デフォルト以外のテンプレート言語(例:`jade`)を使います。その言語向けのビュージェネレータ(例:`sails-generate-views-jade`) がグローバルなnodeパスに(例えば`~/node_modules/`でもいいです).インストールされている必要があります。 

> `sails new` は単に[`sails-generate-new`](http://github.com/balderdashy/sails-generate-new)を実行する特別な[ジェネレータ](http://sailsjs.org/documentation/concepts/extending-sails/Generators) です。別の言い方をすれば`sails new foo`を実行することは`sails generate new foo`のエイリアスを実行することであり、ほかのジェネレータを同じように実際に実行されるモジュールは`~/.sailsrc`で上書きできます。


<docmeta name="uniqueID" value="sailsnew912235">
<docmeta name="displayName" value="sails new">
