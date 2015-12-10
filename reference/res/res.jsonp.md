# res.jsonp()

JSONまたはJSONPのレスポンスを送信します。

"callback"パラメータが存在する場合に"callback"パタメータをファンクションラッパーの名前に使った[JSONP](http://en.wikipedia.org/wiki/JSONP)レスポンスを返すということ以外は[`res.json()`](http://sailsjs.org/documentation/reference/res/res.json.html)と同じです。

### 使い方
```js
return res.jsonp([statusCode, ] data);
```

### 例

```js
return res.jsonp({
  users: [{
    name: 'Thelma',
    id: 1
  }, {
    name: 'Leonardo'
    id: 2
  }]
});
```

<!--

これを改善する必要があります:

デフォルトではJSONPコールバック名は単にcallbakですが、これをコールバック名の設定で変更することが出来ます。以下に同じコードを使ったJSONPのサンプルを挙げます:

```javascript
// ?callback=foo
res.jsonp({ user: 'tobi' })
// foo({ "user": "tobi" })

app.set('jsonp callback name', 'cb');

// ?cb=foo
res.jsonp(500, { error: 'message' })
// foo({ "error": "message" })
```
-->

### 備考
> + メソッド名が全て小文字なことを忘れないでください。
> + このメソッドは **ターミナル**であり、リクエストを処理するための一般的に最後の1行であるべきです。（そのためこれらのドキュメントの使用方法では`return`を使うと考えるべきです。）。







<docmeta name="uniqueID" value="resjsonp798206">
<docmeta name="displayName" value="res.jsonp()">
