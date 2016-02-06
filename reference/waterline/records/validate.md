# * .validate(`callback`)

### 目的
現在のキーと値がモデルで指定された属性オブジェクトに適合するかを確認します。

### 概要
#### パラメータ

| # | 説明          | 受け入れられるデータ型           | 必須か |
|---|---------------------|---------------------|------------|
| 1 |     コールバック        | `function`          | はい        |

#### コールバックパラメータ

| # | 説明              | 想定されるデータ型 |
|---|---------------------|---------------------|
| 1 |  エラー              | `Error`             |


### 使用例

```javascript
User.find().exec(
  function(err,myRecords){

    // Grab a record off the top, change it to the wrong data type, then try to validate
    var getOneRecord = myRecords.pop();
    getOneRecord.name = ['Marie','Hank'];
    getOneRecord.name.validate(
      function(err){
        if (err)
          console.log(JSON.stringify(err));
      });
  });
  
// {"ValidationError":{"name":[{"data":["Marie","Hank"],"message":"Validation error: \"Marie,Hank\" is not of type \"string\"","rule":"string"}]}}

```

モデルで

```javascript
module.exports = {

  attributes: {
    name: 'string'

  }

};
```

### 備考
> これは`Model.validate({ attributes }, cb)`の短縮版です。
> バリデーション無しで`.save()`した場合、Waterlineはまずコンバートを試みて、それでも出来なければエラーを返します。
> このケースでは、配列は'Marie,Hank'のような文字列に置き換えられます。

> エラー長い限り、コールバックのパラメータはありません。便りがないのは良い便りです。

> これはインスタンスメソッドです。現在、インスタンスメソッドはトランザクション出来ません。そのため、同じ意味を持つモデルメソッドを使うことをおすすめします。  

<docmeta name="uniqueID" value="validate76690">
<docmeta name="methodType" value="instance">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".validate()">

