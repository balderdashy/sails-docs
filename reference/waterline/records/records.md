# Records

レコードはデータベースのエントリーと1対1の対応をする一意に特定できるオブジェクトです。例:Oracle/MSSQL/PostgreSQL/MySQLでの行、MongoDBでのドキュメント、Redisでのハッシュ

```js
Order.findOne().exec(function (err, order){
  var record = order;
});
```

多くの部分でレコードは単なるのJavaScriptオブジェクト（あるいはPOJOとも呼ばれます）です。しかしながら、[プログラム的な変更](http://en.wikipedia.org/wiki/Active_record_pattern)をデータベースに永続化するための特別なメソッドである([`.save()`](http://sailsjs.org/documentation/reference/waterline/records/save.html))のようにラップされたデータをフォーマットするための幾つかの数えきれないprotectedのメソッドがあります。


<docmeta name="uniqueID" value="record890682">
<docmeta name="displayName" value="Records">
