# res.status()

レスポンスのステータスコードを設定します。

### 使い方
```js
res.status(200);
```

### 例
```javascript
res.status(404);
res.send('oops');
```

### 備考
>+ ステータスコードはレスポンスを送信する前にセットすることが出来ます。
>+ `res.status()`は実際上、チェーン可能な'`res.statusCode=`のエイリアスです。









<docmeta name="uniqueID" value="resstatus819458">
<docmeta name="displayName" value="res.status()">

