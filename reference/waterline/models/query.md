# .query()

`.query()`はSails/WaterlineをSQLデータベース（PostgreSQLとmySQL）と使っている時のみ利用可能です。この目的は生のSQLクエリを実行することです。


### 例

```js
Pet.query('SELECT pet.name FROM pet', function(err, results) {
  if (err) return res.serverError(err);
  return res.ok(results.rows);
});
```



### 備考
> このメソッドはPostgreSQLとmySQLにのみ利用可能です。Mongoには.native()をご利用下さい。





<docmeta name="uniqueID" value="query546204">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".query()">

