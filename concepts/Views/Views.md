# ビュー
### 概要

Sailsではビューは _サーバー上で_ コンパイルされ、HTMLページに挿入されるテンプレートのことです。多くの場合、ビューはHTTPリクエストに対するレスポンスとして利用されます。（例えばホームページを表示するような使い方です。)

また、その他の方法としてはビューはバックエンドコードの中で文字列として直接取得されます。([`sails.renderView()`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)をご覧ください。) 例えばHTMLメールを送信したり、レガシーなAPIを利用する際に大きなXML文字列を使ったりする場合にです。


##### ビューを作成する

デフォルトではSailsはビューエンジンとしてEJS ([Embedded Javascript](http://embeddedjs.com/))を利用するように設定されています。EJSの構文はとても慣習的ですので、もしPHPやASP、ERB、GSP,JSPなどの言語を使ったことがある人ならすぐに何をしているかがわかるでしょう。

別のエンジンを利用したい場合、様々な選択肢があります。Sailは[Consolidate](https://github.com/visionmedia/consolidate.js/)を通じ[Express](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)と互換性のある全てのテンプレートエンジンを利用することが出来ます。

ビューはデフォルトでは[`views/`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/views)フォルダーで定義されますが、他のSailsのデフォルトパスと同じように[設定が可能です](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)。もしダイナミックなHTMLページを提供する必要が無い場合（例えばモバイルアプリケーションのAPIを開発しているような場合）、ディレクトリをアプリケーションから削除しても構いません。


##### ビューをコンパイルする

`res`オブジェクトにアクセス出来るところならどこでも（すなわち、コントローラ、アクション、カスタムレスポンスやポリシーで）[`res.view`](http://beta.sailsjs.org/#/documentation/reference/res/res.view.html)を利用してビューをコンパイルし、その結果のHTMLをユーザに送出することが出来ます。

同様にビューディレクトリを`routes.js`ファイルに結びつけることが出来ます。これにはアプリケーションのビューの`views/`ディレクトリからの相対パスを指定するだけです。例えば：

```javascript
{
  'get /': {
    view: 'homepage'
  },
  'get /signup': {
    view: 'signupFlow/basicInfo'
  },
  'get /signup/password': {
    view: 'signupFlow/chooseAPassword'
  },
  // and so on.
}
```

##### シングルページアプリケーションでは?

ナビゲーションのうちいくつか（あるいは全て）がクライアントサイドで行われるようなアプリケーションを開発している場合、すなわちユーザーが画面遷移するたびにブラウザが新しいHTMLページを持ってくるのではなく、クライアントサイドコードが事前にロードされていて直接サーバーにアクセスし直すことなくクライアントサイドでマークアップテンプレートがレンダリングされるような場合。

このようなケースではシングルページアプリケーションを高速化するために幾つかの方法があります:

+ `views/publicSite.ejs`のような単一のビューを使う  利点:
  + Sailsのテンプレートエンジンを利用してクライアントでレンダリングされるビューに直接データを受け渡すことが出来ます。これによってユーザーデータなどをAjaxやWeb Socketによるアクセスなしにクライアントサイドのjavascriptに直接渡すことが簡単にできます。
+ `assets/index.html`のようなアセットページに有る単一のHTMLファイルを利用する。 利点:
  + サーバサイドデータを直接クライアントに渡すことは出来ませんが、クライアントサイドとサーバサイドのアプリケーションを完全に分割できます。
  + アセットフォヅダにあるものは全てスタティックなCDN（CloudfrontやCloudFlareのような）に移動でき、これにより地理的に分散しているCDNプロバイダの最も近いものからコンテンツを取得できるということの恩恵に預かられます。


<docmeta name="uniqueID" value="Views426660">
<docmeta name="displayName" value="Views">

