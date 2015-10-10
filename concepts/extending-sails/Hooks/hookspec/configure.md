# `.configure()`

`configure`機能は[`defaults` objects](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/hookspec/defaults.html) が全てのフックに対して適用されたあとでフックを設定するための手段です。カスタムフックの`configure()`が実行された時全てのユーザレベルでの設定とコアフックのセッティングは`sails.config`にマージされます。しかしながらカスタムフックを読み込む順番は保証されていないので別のフックの設定に依存してはいけません。

`configure` は引数を持たないファンクションとして実装され、いかなる返り値も返すことが出来ません。例えば以下の`configure`ファンクションははリモートAPIを通信するためのものであり、ユーザがフックの`ssl`設定をどうするのかによってアクセスするエンドポイントを変更するものです。フックの設定キーは`this.configKey`として`configure`で利用可能なことを覚えておいてください。:

```
configure: function() {

   // SSLがONならSSLのエンドポイントを使う
   if (sails.config[this.configKey].ssl == true) {
      sails.config[this.configKey].url = "https://" + sails.config[this.configKey].domain;
   }
   // そうでなければHTTPを使う
   else {
      sails.config[this.configKey].url = "http://" + sails.config[this.configKey].domain;
   }
}
```

`configure`　を使う主な利点はすべての`configure`ファンクションは全ての[`initialize` functions](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/hookspec/initialize.html) の前に実行されることが保証されているということです。したがってフックの`initialize`ファンクションは別のフックの設定を調べることが出来ます。

<docmeta name="uniqueID" value="Hooks75004">
<docmeta name="displayName" value=".configure()">
<docmeta name="stabilityIndex" value="3">
