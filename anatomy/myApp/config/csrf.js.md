# myApp/config/csrf.js
### 目的
このファイルはSailsアプリケーションがどのようにCSRFを扱うかを規定するものです。

Cross-Site Request Forgery Protectionトークンはトラッキングチップのようなものです。セッションはリクエストが「だれからのもの」であるということを説明する一方でCSFRトークンは「その人である」ということを説明します。

これを有効化した時Sailsサーバに対するGET以外のリクエストは`_csrf`と名付けられた特別なトークンを持っていなかればなりません。

このオプションはあなたのアプリケーションCSRFアタックから防御します。攻撃をしようとする人はユーザのセッションクッキーのみならず、アプリケーションにアクセスした時に与えられ（あるいは更新され）、タイム・スタンプされた秘密のCSRFトークンが必要になるのです。

これにより、ユーザのリクエストがリクエストが乗っ取られたものではない、意図的かつ有効なものであるということが確認できます。

このトークンは短時間だけ有効であり以下の方法で取得されなけえばなりません:

#####A) 伝統的な「ビュー指向」のアプリケーション:
 - ビューの一つからローカル変数とともに取得される、例：
```html
<form>
	<input type="hidden" name="_csrf" value="<%= _csrf %>" />
</form>
```

#####B)	AJAX（ソケット通信）またはシングルページアプリケーション: 
 - JSONを返す`/csrfToken`ルートにGETリクエストを送る、例:
```javascript
{ _csrf: 'ajg4JD(JGdajhLJALHDa' }
```

このオプションを有効化するにはフロントエンドのアプリケーションでトークンの管理をしなければなりません。伝統的なアプリケーションではアクションからビューにデータのフォームを渡すだけで簡単にできます。

AJAX（ソケット通信）アプリケーションでは/csrfTokenルートにアクセスし、正しいトークンを受け取ります。



### More Info
> For more information on CSRF, check out [this hyperlink](http://en.wikipedia.org/wiki/Cross-site_request_forgery).


<docmeta name="uniqueID" value="csrfjs233850">
<docmeta name="displayName" value="csrf.js">

```
/**
 * Cross-Site Request Forgery Protection Settings
 * (sails.config.csrf)
 *
 * CSRF tokens are like a tracking chip.  While a session tells the server that a user
 * "is who they say they are", a csrf token tells the server "you are where you say you are".
 *
 * When enabled, all non-GET requests to the Sails server must be accompanied by
 * a special token, identified as the '_csrf' parameter.
 *
 * This option protects your Sails app against cross-site request forgery (or CSRF) attacks.
 * A would-be attacker needs not only a user's session cookie, but also this timestamped,
 * secret CSRF token, which is refreshed/granted when the user visits a URL on your app's domain.
 *
 * This allows us to have certainty that our users' requests haven't been hijacked,
 * and that the requests they're making are intentional and legitimate.
 *
 * This token has a short-lived expiration timeline, and must be acquired by either:
 *
 * (a)		For traditional view-driven web apps:
 *			Fetching it from one of your views, where it may be accessed as
 *			a local variable, e.g.:
 *			<form>
 *				<input type="hidden" name="_csrf" value="<%= _csrf %>" />
 *			</form>
 *
 * or (b)	For AJAX/Socket-heavy and/or single-page apps:
 *			Sending a GET request to the `/csrfToken` route, where it will be returned
 *			as JSON, e.g.:
 *			{ _csrf: 'ajg4JD(JGdajhLJALHDa' }
 *
 *
 * Enabling this option requires managing the token in your front-end app.
 * For traditional web apps, it's as easy as passing the data from a view into a form action.
 * In AJAX/Socket-heavy apps, just send a GET request to the /csrfToken route to get a valid token.
 *
 * For more information on CSRF, check out:
 * http://en.wikipedia.org/wiki/Cross-site_request_forgery
 */

module.exports.csrf = false;

```
