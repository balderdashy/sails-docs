# .find(`criteria` , [`callback`])
### 目的
渡した条件オブジェクトに合うレコードを検索して返します。

### 概要
#### パラメータ

| # | 説明          | 受け入れられるデータ型           | 必須か |
|---|---------------------|---------------------|------------|
| 1 |    検索条件   | `{}`,`[{}]`, `string`, `int`  | はい |
| 2 |     コールバック        | `function`          | はい        |

#### コールバックパラメータ

| # | 説明              | 想定されるデータ型 |
|---|---------------------|---------------------|
| 1 |  エラー              | `Error`             |
| 2 |  見つかったレコード    | `[{}]`        |

### 使用例

```javascript
User.find({}).exec(function findCB(err, found){
  while (found.length)
    console.log('Found User with name ' + found.pop().name)
});

// Found User with name Flynn
// Found User with name Jessie

// Don't forget to handle your errors

```
### 備考
> 全ての文字列引数はレコードのIDである必要があります。
> このメソッドは結果を常に配列で返します。
> 配列である属性探したい場合、追加のカッコで囲まなければWaterlineはinQueryを行いたいと解釈してしまいます。




<docmeta name="uniqueID" value="find816978">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="10">
<docmeta name="displayName" value=".find()">

