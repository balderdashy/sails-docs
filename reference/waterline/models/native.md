# .native()

`.native()` はSails/WaterlineをMongoDBと使っている時のみ利用可能です。

与えられたモデルを示すMongoコレクションを生で返し、これにより生のMongoクエリーを実行することが出来ます。

完全なドキュメントや利用例は[ネイティブのMongoドライバ](https://github.com/mongodb/node-mongodb-native#introduction)を御覧ください


`sails-mongo`は設定されたコネクション・データストアごとに一つだけのMongoコネクションを持つことが出来ます。この結果、`.native()`を使っている時に`db`を手動で閉会する必要はありません。低レベルの利用方法では`require('mongodb')`を直接行うこともできます。

### 例

```js
Pet.native(function(err, collection) {
  if (err) return res.serverError(err);

  collection.find({}, {
    name: true
  }).toArray(function (err, results) {
    if (err) return res.serverError(err);
    return res.ok(results);
  });
});
```

ソース: https://gist.github.com/mikermcneil/483987369d54512b6104

### 備考

> + このメソッドはMongoでのみ動作します。SQLデータベースの生機能に関しては[`.query()`](http://sailsjs.org/documentation/reference/waterline/models/query.html)をご利用下さい。


<docmeta name="uniqueID" value="native900002">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".native()">
