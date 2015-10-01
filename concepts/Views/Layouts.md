# レイアウト

多くの異なるページを持つアプリケーションを構築する際に外挿マークアップを利用して幾つかのHTMLファイルをレイアウトに挿出来ると便利です。この[総コード量の減少](http://en.wikipedia.org/wiki/Don't_repeat_yourself)を行うことで複数のファイルで同じ変更をするのを避けることが出来ます。

SailsとExpressではレイアウトはビューエンジン自体に実装されています。例えば、`jade`は独自のシンタックスを持つ独自のレイアウトシステムを持っています。

簡便のためにSailsは**デフォルトのテンプレートエンジンであるEJSを使う際にのみ**レイアウトをサポートします。もし別のテンプレートエンジンに変更したい際には[that view engine's documentation](./#!documentation/reference/Views/ViewEngines.html)をご覧になって適切なレイアウトをお探しください。


### レイアウトを作成する

Sailsのレイアウトはアプリケーションの`views/`フォルダーに特別な`.ejs`ファイルとして存在し、別のビューにラップしたり挟み込んだりして使えます。レイアウトは通常プリミティブな前置き(例：`!DOCTYPE html<html><head>....</head><body>`) と後付(`</body></html`)を含んでいます。そして`<%- body %>`を使うことでオリジナルのビューをインクルードすることが出来ます。レイアウトはビュー無しで使われることはありません。つまり、ブレンドサンドイッチを提供するようなものです。

レイアウトは[`config/views.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/views.js.html)で設定や無効化をすることが出来、`layout`と呼ばれる特別な[local](./#!documentation/reference/Views/Locals.html)を設定することで特定のルートやアクションに関しての設定を行うことが出来ます。デフォルトではSailsは`views/layout.ejs`に置かれたレイアウトを利用することで全てのビューを仕上げます。


### 備考

> #### どうしてレイアウトはESJでのみ動作するのですか?
> Express3ではlayouts/partialsに対する内蔵サポートは廃止されています。その代わりに開発者はビューエンジン自体を使ってこの機能を実装することを期待されています。詳細に関しては(https://github.com/balderdashy/sails/issues/494 をご覧ください。)
> 
> Express3を採用するにあたってSailsでは簡便のためとExpress 2.xやSails 0.8.xで作られたアプリケーションとの後方互換性のため、そして特に他のMVCフレームワークから移行するルーザーにとってわかりやすくするためにレガシーな`layouts`を採用しています。その結果レイアウトはデフォルトのビューエンジンであるejでのみテストされているのです。
>
> もし、レイアウトを使いたくなかったり、ejs以外のサーバサイドテンプレートエンジンを使っている場合（Jadeやhandlebars、haml、dustなど）[`sails.config.views`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.views.html)で`layout:false`をセットすることであなたの使っているビューエンジンのみでlayout/partialのサポートをすることができます。




<docmeta name="uniqueID" value="Layouts870655">
<docmeta name="displayName" value="Layouts">

