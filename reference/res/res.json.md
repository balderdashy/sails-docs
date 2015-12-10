# res.json()

与えられた`data`を文字列化したものを含むJSONを送信します。

### 使い方
```js
return res.json([statusCode, ] data);
```

### 詳細

このメソッドは配列が与えられた時のres.send()と同じ働きをしますが、non-objects(null、undefinedなど)に関してそれが厳密には正しいJSONでなくても明示的にJSONに変換するために使います。

### 例
```javascript
res.json(null)
res.json({ user: 'tobi' })
res.json(500, { error: 'message' })
```

### 備考
> + メソッド名が全て小文字なことを忘れないでください。
> + このメソッドは **ターミナル**であり、リクエストを処理するための一般的に最後の1行であるべきです。（そのためこれらのドキュメントの使用方法では`return`を使うと考えるべきです。）。



<docmeta name="uniqueID" value="resjson72272">
<docmeta name="displayName" value="res.json()">

