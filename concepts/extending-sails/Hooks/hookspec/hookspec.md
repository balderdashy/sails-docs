# フックのスペック

## 概要

それぞれのSailsフックは一つの引数（実行中のSailsインスタンス）を取るjavascriptファンクションとして実装され、このドキュメントで追って説明する一つまたは複数のキーを返します。そのため最も基本的なフックは以下通りです。:

```
module.exports = function myBasicHook(sails) {
   return {};
}
```

これは特に多くのことをしませんが、それでも、動作します。 

フックはそれぞれのフォルダの`index.js`に保存される必要があります。フォルダ名はフックを一意に決めるものでなければならず、フォルダには任意の数のサブフォルダや追加ファイルを置くことが出来ます。以前の例を拡張した`myBasicHook`をプロジェクトの `api/hooks/my-basic-hook` で`index.js` として保存して、`sails lift --verbose`でSailsを立ち上げると以下のメッセージが表示されます。:

`verbose: my-basic-hook hook loaded successfully.`

## フックファンクション
以下の機能をフックの中で実装することが出来ます。全てのファンクションは任意で、フックファンクションによって返されたオブジェクトに追加される形で実装されても構いません。

* [.defaults](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/hookspec/defaults.html)
* [.configure()](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/hookspec/configure.html)
* [.initialize()](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/hookspec/initialize.html)
* [.routes](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/hookspec/routes.html)

## カスタムフックのデータとファンクション

メインのフックファンクションからリターンされたオブジェクトに追加されたすべてのキーは `sails.hooks[<hook name>]` で提供されます。このようにしてエンドユーザはカスタムフックを使います。フックの中でプライベートにして置きたい変数やファンクションは返されるオブジェクトの中から *除外する* ことができます。

```
// File api/hooks/myhook/index.js
module.exports = function myHook(sails) {

   // この変数はプライベートになります。
   var foo = 'bar';

   // この変数はパブリックになります。
   this.abc = 123;

   return {

      // このファンクションはパブリックになります。
      sayHi: function (name) {
         console.log(greet(name));
      }

   };

   // このファンクションはプライベートになります。
   function greet (name) {
      return "Hi, " + name + "!";
   }

};
```

そのため、上記のパブリック変数とパブリックファンクションは`sails.hooks.myhook.abc` と `sails.hooks.myhook.sayHi` になります。

<docmeta name="uniqueID" value="Hooks75002">
<docmeta name="displayName" value="Hook Specification">
<docmeta name="stabilityIndex" value="3">
