# .destroy( `criteria` , [`callback`] )
### 目的
与えられた条件式に合う、データベース中にある全てのレコードを削除します。

### 概要
#### パラメータ

| # | 説明          | 受け入れられるデータ型           | 必須か |
|---|---------------------|---------------------|------------|
| 1 |    検索条件   | `{}`,`[{}]`, `string`, `int`  | はい |
| 2 |     コールバック        | `function`          | いいえ        |

#### コールバックパラメータ

| # | 説明              | 想定されるデータ型 |
|---|---------------------|---------------------|
| 1 |  エラー              | `Error`             |
| 2 |  削除されたレコード    | `[{}]`        |

### 使用例

```javascript
User.destroy({name:'Flynn'}).exec(function deleteCB(err){
  console.log('The record has been deleted');
});

// Or if there are multiple records to delete

User.destroy({id:['id1', 'id2']}).exec(function deleteCB(err){
  console.log('The record has been deleted');
});

// If the record existed, then it has been deleted
// Don't forget to handle your errors

```
### 備考
> 削除する前にデータが存在することを確認する必要がありますので、先にfind()しなければいけません。
> 全ての文字列引数はレコードのIDである必要があります。


<docmeta name="uniqueID" value="destroy398816">
<docmeta name="methodType" value="instance">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".destroy()">

