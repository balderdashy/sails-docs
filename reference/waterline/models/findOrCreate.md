# .findOrCreate( `criteria` , `record` , [`callback`] )
### 目的
1つ目のパラメータでレコードの存在を確認します。もし見つからなければ2つ目のパラメータのレコードが作成されます。

### 概要
#### パラメータ

| # | 説明          | 受け入れられるデータ型           | 必須か |
|---|---------------------|---------------------|------------|
| 1 |    検索条件   | `{}`,`[{}]`, `string`, `int`| はい |
| 2 |  作成するレコード  | `{}`,`[{}]`          |  はい  |
| 3 |     コールバック        | `function`          | はい        |

#### コールバックパラメータ

| # | 説明              | 想定されるデータ型 |
|---|---------------------|---------------------|
| 1 |  エラー              | `Error`             |
| 2 |  作成したレコード    | `{}`, `[{}]`          |

### 使用例

```javascript
User.findOrCreate({name:'Walter'}, {name:'Jessie'}).exec(function createFindCB(err, record){
  console.log('What\'s cookin\' '+record.name+'?');
});

// What's cookin' Jessie?
// Don't forget to handle your errors and abide by the rules you defined in your model

```
### 備考
> 全ての文字列引数はレコードのIDである必要があります。
> 配列である属性探したい場合、追加のカッコで囲まなければWaterlineはinQueryを行いたいと解釈してしまいます。


<docmeta name="uniqueID" value="findOrCreate760631">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".findOrCreate()">

