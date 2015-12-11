# .count( [`criteria`, ] `callback` )
### 目的
データベースの中に与えられた検索条件を満たすレコードが何件あるかを返します。

### 概要
#### パラメータ

| # | 説明          | 受け入れられるデータ型           | 必須か |
|---|---------------|------------------------------|------------|
| 1 | 検索条件       | `{}`,`[{}]`, `string`, `int` | いいえ       |
| 2 | コールバック    | `function`                   | いいえ      |

#### コールバックパラメータ

| # | 説明              | 想定されるデータ型 |
|---|-------------------|---------------------|
| 1 | エラー             | `Error`             |
| 2 | レコード数         | `int`               |

### 

```javascript 
User.count({name:'Flynn'}).exec(function countCB(error, found) {
  console.log('There are ' + found + ' users called "Flynn"');

  // There are 1 users called 'Flynn'
  // Don't forget to handle your errors
});
  

```
### 備考
> 全ての文字列引数はレコードのIDである必要があります。



<docmeta name="uniqueID" value="count42579">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".count()">

