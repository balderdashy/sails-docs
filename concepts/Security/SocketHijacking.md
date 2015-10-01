# セッションハイジャック

残念ながらクロスサイトによるリクエスト偽装はHTTPプロトコルに限った話ではありません。Webソケットハイジャック（[CSWSH](http://www.christian-schneider.net/CrossSiteWebSocketHijacking.html)ともいわれています）は多くのリアルタイムアプリケーションで見られる脆弱性です。幸いSailsではHTTPとWebSocketのいずれも「一等市民」と見なしていますので内蔵されている[CSRF protection](http://beta.sailsjs.org/#/documentation/concepts/Security/CSRF.html)と[configurable CORS rulesets](http://beta.sailsjs.org/#/documentation/concepts/Security/CORS.html) は両方のプロトコルをサポートしています。

[`config/csrf.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/csrf.js.html) でSailsに内蔵の防護策を有効化し、入ってくるソケットリクエストに`_csrf`を持たせることでアプリケーションをCSWSHに対応させることができます。さらにアプリケーションがクロスオリジン（別のドメインやサブドメイン）のソケット接続を許可する場合それにしたがってCORS設定を変更します。[`config/sockets.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/sockets.js.html)で`authorization`設定を行い、ニーズに合わせてソケットの接続の可否を許可するカスタムのファンクションを用意することもできます。

#### 備考
+ CSWSH防御はユーザが同じクライアントアプリケーションから複数のソケットサービスに接続すること（Chromeの中に保存されているクッキーのデータがChase.comとHorrible-Hacker-Site.comの両方で利用可能になるような）を想定した機能です。




<docmeta name="uniqueID" value="SocketHijacking397141">
<docmeta name="displayName" value="Socket Hijacking">

