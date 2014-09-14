# アセット

### 概要

アセットとはあなたがサーバにおいて公開したい[スタティックファイル](http://en.wikipedia.org/wiki/Static_web_page)(js,css,imagesなど)を指します。Sailsではアセットは[`assets/`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/assets)ディレクトリに配置されあなたがアプリケーションをデプロイした時に非表示の一時テクディレクトリ(`.tmp/public/`)に保存され、処理並びに同期がされます。この`.tmp/public`フォルダーの中身はSailsが実際に提供するものです。これはおおまかに言って[express](https://github.com/expressjs)における"public"フォルダーやApacheのようなWebサーバにおける"www"フォルダーと同等です。この中間ステップを踏むことでSailsはアセットがクライアントで実際に使われるための前処理や事前コンパイル（LESSやCoffeeScript、SASS、spritesheets、Jade templatesなどの）を行うことが出来ます。


### スタティックミドルウエア

舞台裏ではSailsはアセットを提供するためにExpressの[static middleware](http://www.senchalabs.org/connect/static.html)を使っています。このミドルウエアの設定（例えばキャッシュの設定など）は[`/config/http.js`](/#/documentation/reference/sails.config/sails.config.http.html)でできます。


##### `index.html`

ほとんどのWebサーバのようにSailsは`index.html`の習慣を採用しています。例えばあなたが新しいSailsプロジェクトの中に`assets/foo.html`を作ったとすると`http://localhost:1337/foo.html`でアクセス可能になります。しかしもしあなたが`assets/foo/index.html`を作ったとすると`http://localhost:1337/foo/index.html`でも`http://localhost:1337/foo`でもアクセスすることが出来るようになります。


##### ルートの優先

[スタティックミドルウエア](http://stephensugden.com/middleware_guide/)がSailsのルータの**背後に**インストールされるということを理解することは重要な事です。
そのためもしあなたが[カスタムのルート](/#/documentation/concepts/Routes?q=custom-routes)を定義しその一方で競合するパスにアセットを配置した場合、カスタムルートの設定はアクセスがスタティックミドルウエアに到達する前にそのルーティングを妨害してしまいます。
例えば、もしあなたが`assets/index.html`を作成し、[`config/routes.js`](/#/documentation/reference/sails.config/sails.config.routes.html)ファイルで何もルートを定義しなかった場合そのファイルはホームページとして提供されます。しかし、もしあなたがカスタムのルート`'/': 'FooController.bar'`,を定義した場合、そのルート設定が優先されます。


<docmeta name="uniqueID" value="Assets220313">
<docmeta name="displayName" value="Assets">

