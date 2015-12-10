# res.redirect()

与えられた絶対パスまたは相対パスにユーザーエージェントをリダイレクトする。


### 使い方
```js
return res.redirect(url);
```

### 引数

|   | 引数            | 型          | 詳細     |
|---|----------------|:-----------:|---------|
| 1 | `url`          | ((string))  | URL表現 (完全なスペックに関しては以下をご覧ください。).<br/> 例:`"http://google.com"` あるいは `"/login"`



### 詳細

Sails/Express/Koa/Connectはいくつかのリダイレクトの形をサポートします。まずは別のドメインへの完全な形のURIです。:

```javascript
return res.redirect('http://google.com');
```

2番めにはドメインに対しての相対リダイレクトです。例えば、http://example.com/admin/post/new にいる場合、`/admin`へのリダイレクトはhttp://example.com/adminへ導かれます。:

```javascript
return res.redirect('/checkout');
```

<!--
おそらく、便利というよりややこしいです。:

次のリダイレクトはアプリケーションのマウントポイントからの相対パスです。例えば、ブログアプリケーションが/blogにマウントされていた場合、理想的にはどこにマウントされているのかという知識は必要ないはずので、/admin/post/newへのリダイレクトは単にhttp://example.com/admin/post/newへになりますので、以下の相対リダイレクトはhttp://example.com/blog/admin/post/newを与えます:

```javascript
return res.redirect('admin/post/new');
```
-->


パス名に対するリダイレクトも同様に可能です。もしhttp://example.com/admin/post/newにいる場合、以下のリダイレクトはhttp//example.com/admin/postに導かれます:

```javascript
return res.redirect('..');
```
最後の特別なケースはBackリダイレクトであり、これは"Referer" (あるいは"Referrer")ヘッダー（もし省略されていた場合、デフォルトとして`/`に）を利用してリクエストが来る前へリダイレクトで戻す方法です。

```javascript
return res.redirect('back');
```

### 備考
> + このメソッドは **ターミナル**であり、リクエストを処理するための一般的に最後の1行であるべきです。（そのためこれらのドキュメントの使用方法では`return`を使うと考えるべきです。）。
> + アプリケーションで`res.redirect()`が呼び出された時、Sailsはステータスコード[302](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#3xx_Redirection)でレスポンスします。これはユーザエージェントに対して、与えられたURLに対して新しいリクエストを行うよう示すものです。これは、ユーザエージェントに対してリダイレクトを _強制_ するものではなくただ、そのように振る舞ってくれることを期待するだけのものです。
> + 一般的に、リクエストが「JSONを要求」している（すなわち、[`req.wantsJSON`](http://sailsjs.org/documentation/reference/req/req.wantsJSON.html)）場合、`res.redirect()`を使う必要はありません。
> + リクエストがSocket.ioから出ている場合、常に「JSONを要求」しているとされますｓ．`res.redirect(http://sailsjs.org/documentation/reference/res/res.redirect.html)`をソケットに対してコールした場合、Sailsはサーバサイドで内部的にリクエストをリダイレクトし、効果的にリダイレクトがが行われるように強制します。（すなわち、302ステータスコードを送信する代わりに、サーバーが単にリダイレクト先にURLに対する新規リクエストを送信します。）
>  + その結果、ソケットリクエストにおいては（技術的にはプロキシーで実現が出来るものの）外部のドメインへのリダイレクトはサポートされていません。
>  + この振る舞いは将来のバージョンのSailsではよりHTTPの振る舞いに合った形に変更されるかもしれません。










<docmeta name="uniqueID" value="resredirect444617">
<docmeta name="displayName" value="res.redirect()">
