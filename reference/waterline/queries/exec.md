# .exec(`callback`)
### 目的
stringableなメソッドのチェーンの最後に実行されます。これがアダプタへクエリを発行するように知られます。
#### パラメータ
| # | 説明          | 受け入れられるデータ型           | 必須か |
|---|---------------------|---------------------|------------|
| 1 |     コールバック        | `function`          | はい        |
#### コールバックパラメータ
| # | 説明              | 想定されるデータ型 |
|---|---------------------|---------------------|
| 1 |  エラー              | `Error`             |
| 2 |  返されたデータ    | `{}`, `[{}]`, `int`     |
### 使用例
```javascript 
// refer to any of the examples above
```
### 備考
> .find()メソッドはコールバックが与えられない時はチェーン可能なオブジェクトを返します。このメソッドはさらなるフィルタ結果のために.find()にチェーンすることが出来ます。

> .exec()を実行しなければクエルは実行されません。



<docmeta name="uniqueID" value="exec550068">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".exec()">

