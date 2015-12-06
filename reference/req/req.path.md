# req.path

リクエストの[リクエストURL文字列](http://nodejs.org/api/http.html#http_message_url)から得たURLパス名です。これはURLのスラッシュ以降(例: `/foo/bar`)の部分を示しますが、クエリ文字列(例: `?name=foo`)やフラグメント(例:`#foobar`)を示さないことにご留意下さい.


### 使い方

```js
req.path;
```


### 例

クライアントが以下のリクエストを送ったとします。:

> http://localhost:1337/donor/37?name=foo#foobar

`req.path` は以下のように定義されます:

```js
req.path;
// -> "/donor/37"
```








<docmeta name="uniqueID" value="reqpath216836">
<docmeta name="displayName" value="req.path">

