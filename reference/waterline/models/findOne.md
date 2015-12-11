# .findOne( `criteria` , [`callback`] )
### 目的
条件式に合うレコードを1つ返します。

### 概要
#### パラメータ

| # | 説明          | 受け入れられるデータ型           | 必須か |
|---|---------------------|---------------------|------------|
| 1 |    検索条件   | `{}``string`| はい |
| 2 |     コールバック        | `function`          | はい        |

#### コールバックパラメータ

| # | 説明              | 想定されるデータ型 |
|---|---------------------|---------------------|
| 1 |  エラー              | `Error`             |
| 2 |  見つかったレコード    | `{}`        |


### 使用例

```javascript
User.findOne({name:'Jessie'}).exec(function findOneCB(err, found){
  console.log('We found '+found.name);
});

// We found Jessie
// Don't forget to handle your errors

```
### 備考
> 全ての文字列引数はレコードのIDである必要があります。
> 配列である属性探したい場合、追加のカッコで囲まなければWaterlineはinQueryを行いたいと解釈してしまいます。

> 該当するレコードがない場合、`found`の値は`undefined`になります。`findOne`ではレコードが見つからないことはエラーには *なりません*

<docmeta name="uniqueID" value="findOne423345">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="10">
<docmeta name="displayName" value=".findOne()">

