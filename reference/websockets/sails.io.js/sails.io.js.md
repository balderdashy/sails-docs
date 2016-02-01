# Socket Client (`sails.io.js`)

> ドキュメントのこのセクションはブラウザ向けのSailsソケットクライアントSDKに関して触れています。これはJavascriptで書かれていますのでサーバでも利用可能です。
>
> コミュニティプロジェクトとして、ネイティブのiOS、AndroidやWindows Phone向けのっSails/Socket.io実装もあり、これは非常に有用です。


### 概要

Sailsのソケットクライアント([`sails.io.js`](https://github.com/balderdashy/sails.io.js))は新規のSailsアプリケーションにデフォルトでバンドルされている小型のブラウザライブラリです。これはSailsバックエンドとの間でできるだけ簡単にメッレージをやり取りすることを目的として作られたSocket.ioクライアントの上に存在する軽量なラッパーです。

`sails.io.js`の主な役割は WebSockets/Socket.ioを使ったSailsアプリケーションとの遣り取りをするために親しみやすいajax風のインタフェースを提供することです。これは基本的には `.get()`、`.post()`、`.put()`、`.delete()`のメソッドを提供して、アプリケーションの他の部分と同じルートを再利用しながらリアルタイム機能の恩恵に預かれるようにするということを意味します。言い換えれば、ブラウザの中で`io.socket.post('/user')`を実行することはSailsアプリ―ケーションの中の同じルートへの同じHTTP POSTリクエストと全く同じようにルーティングされるということです。


### これは何かと一緒に使えますか

はい。Sailsのソケットクライアントは（それが、angularであれ、backboneであれ、emberやknockoutなどであれ）フロントエンドフレームワークの特徴を最大限良いかして一緒に使えます。


### これは使わなければいけないものですか

いいえ。Sailsのソケットクライアントはリアルタイムやチャットのアプリケーションを作成するのに極めて便利ですが、その他の `assets/`ディレクトリに関してはAndroidのネイティブアプリケーションやインタフェースを含まないAPIを作っている時にはおそらく特に便利ではないでしょう。

幸い、Sailsにおける他の全てのboilerplateファイルやフォルダーと同様にソケットクライアントは完全に任意項目です。この機能の削除は単に`assets/js/dependencies/sails.io.js`を削除するだけでできます。

<!--

  TODO: 幾つかの点に関してもう少し技術的な説明が必要です。

内部的にはsails.io.jsはSocket.ioメッセージをSailsによって解釈された際にはblueprintやルーティング設定にしたがって適切なポリシーやコントローラにルーティングされるように予約された名前を使って行うものです。
-->




<docmeta name="uniqueID" value="BrowserSDK293544">
<docmeta name="displayName" value="Socket Client">
<docmeta name="stabilityIndex" value="3">

