# CSRF

クロスサイトのリクエスト強制([CSRF](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)))はすでに認証されているWebアプリケーションに対してエンドユーザが意図しないリク絵イストを強制するものです。言い換えればこの防御なしにはChase.comで使うためにChromeに保存されたクッキーのデータを今アクセスしているHorrible-Hacker-Site.comのために使われてしまうということです。 

### CSRF防御を有効にする

Sailsは設定するだけで簡単に使えるオプショナルなCSRF防御策を用意しています。これを有効化するためには[sails.config.csrf](http://sailsjs.org/documentation/reference/Configuration/CSRF.html)(通常プロジェクトの中の[`config/csrf.js`](http://sailsjs.org/documentation/anatomy/myApp/config/csrf.js.html)ファイルに保管されています。)に以下の編集を加えます。:

```js
csrf: true
```

すでにSailsのバックエンドとPOST,PUT,やDELETEで通信しなければならないコードが有る場合、それらの通信はパラメータかヘッダーにCSRFトークンを持たなければならなくなるということにお気をつけ下さい。これから詳しく説明します。



### CSRFトークン

多くのNodeアプリケーションと同じようにSailsとExpressはこれらの攻撃に対応するための[CSRF protection middleware](http://www.senchalabs.org/connect/csrf.html)接続に対応しています。このミドルウエアは[Synchronizer Token Pattern](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet#General_Recommendation:_Synchronizer_Token_Pattern)を実装しています。CSRF防御が有効なときにGETでないアクセス方法はHTTPのBodyやクエリストリング、もしくはヘッダーに特別なトークンを持つことで認証されなければなりません。

CSRFトークンは一時的でセッション依存です。例えばマリーとモハメドがSailsで動作しておりCSRF防御が有効になっているいるEコマースサイトにアクセスするとします。月曜日にマリーもモハメドも買い物をするとします。これを実現するにはマリーとモハメドに一つづつ、少なくとも2つの別々のトークンを用意する必要があります。それからWebバックエンドはトークンがないあるいは、トークンが間違っているリクエストを拒否するでしょう。これでマリーがオンラインポーカを使っている時にサードパーティのWebサイトが彼女のブラウザに入り込んでクッキーを使って彼女が意図しないアクセスをすることはできないようになります。

### CSRFトークンを発行する

CSRFトークンを取得するには[locals](http://sailsjs.org/documentation/concepts/Views/Locals.html)を使ってビューでこれを立ち上げる（昔ながらのマルチーページアプリケーションに向いています）か特別な防御がされているJSONエンドポイントからAJAXやソケットで取得（シングルページアプリケーション（SPA）で便利です。）しなければいけません。


##### ビューのローカルを使う:

古いやり方のフォーム送信ではビューからフォームにデータを渡すのが簡単です。ビューのローカルにアクセス可能な場所からトークンを取得することができます。: `<%= _csrf %>`

e.g.:
```html
<form action="/signup" method="POST">
 <input type="text" name="emailaddress"/>
 <input type='hidden' name='_csrf' value='<%= _csrf %>'>
 <input type='submit'>
</form>
```
もしフォームから`multipart/form-data`を行おうとしている場合は`_csrf`フィールドが`file`インプットの前に行われるようにしてください、そうしなければファイルのアップロードが行われる前にタイムアウトして403エラーが発生するおそれがあります。





##### AJAX/WebSocketsを使う

AJAX/Socket多く使うアプリケーションではトークンをJSONで渡すビルトインの`/csrfToken`ルートを使うといいでしょう。例:

```json
{
  "_csrf": "ajg4JD(JGdajhLJALHDa"
}
```




### CSRFトークンを使う

CSRF防御を有効にしたらあなたのSailsアプリケーションに対して行われる全てのPOST, PUTあるいはDELETEリクエストはパラメータやヘッダーとしてCSRFトークンをもつ必要があります。さもなければ403 (Forbidden)レスポンスでアクセス拒否されることになります。

もし、jQueryからのAjaxリクエストを送るとしたら:
```js
$.post('/checkout', {
  order: '8abfe13491afe',
  electronicReceiptOK: true,
  _csrf: 'USER_CSRF_TOKEN'
}, function andThen(){ ... });
```

幾つかのクライアントモジュールではAJAXリクエスト自体にアクセス権がりません。このような場合はCSRFトークンをクエリーのURLに直接含ませることを考慮すべきです。しかしこれを行うにはURLのエンコードをトークンが消費される前に行うのを忘れずにいてください。
```js
..., {
  checkoutAction: '/checkout?_csrf='+encodeURIComponent('USER_CSRF_TOKEN')
}
```



### 備考

> + 多くの組織や開発者にとってCSRF防御はユーザがブラウザからログインしたりセキュアなアクセスをするときにのみ必要になるでしょう。もし _そうでない_ 場合、（例えばユーザがネイティブのiOSアプリケーションやAndroidアプリケーションからのみセキュアなアクセスが出来る場合）CSRF防御は必要ないとみなすこともできます。なぜでしょうか？それは厳密にはこのページで取り上げられている一般的なCSRF攻撃は　_同じアプリケーション_  (例えばChromeなど)をから異なるサイトにアクセスが使うシナリオ（例えばChase.comとHorrible-Hacker-Site.comのような）でのみ _可能とされている_ からです。
> + CSRFに関してのさらなる情報は[Wikipedia](http://en.wikipedia.org/wiki/Cross-site_request_forgery)をご覧ください。
> + CSRFトークンを従来のフォーム送信で利用する方法は上の例をご覧下さい。("Using View Locals"の項目)
> + CSRFトークンはパラメータの代わりにヘッダーとして送信できます。最新情報に関しては[Connect documentation](http://www.senchalabs.org/connect/csrf.html)をご覧ください。 次の（v0.10以降の）マイナーリリースではおそらくSailsはExpress 4を採用します。これで新しいExpressのCSRFミドルウエアが内蔵されることになりますが、後方互換性は確保されます。

<docmeta name="uniqueID" value="CSRF300312">
<docmeta name="displayName" value="CSRF">
