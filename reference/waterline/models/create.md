# .create( `values`, [`callback`] )
### 目的
データベースに新しいモデルのインスタンスを作成します。

### 概要

#### パラメータ
| # | 説明          | 受け入れられるデータ型           | 必須か |使用例
|---|---------------------|---------------------|------------|
| 1 |  作例したいレコード  |      `{}`, `[{}]`   | はい      |
| 2 |     コールバック        | `function`          | いいえ        |

#### コールバックパラメータ

| # | 説明              | 想定されるデータ型 |
|---|---------------------|---------------------|
| 1 |  エラー              | `Error`             |
| 2 |  作成されたレコード    | `{}`, `[{}]`        |



### 使用例

```javascript
// create a new record with name 'Walter Jr'

User.create({name:'Walter Jr'}).exec(function createCB(err, created){
  console.log('Created user with name ' + created.name);
});

// Created user with name Walter Jr
// Don't forget to handle your errors and abide by the rules you defined in your model
```



<docmeta name="uniqueID" value="create312605">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".create()">

