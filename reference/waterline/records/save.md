# * .save(`callback`)

### 目的
`save()`メソッドは現在の属性を使ってデータベースのレコードを更新します。これは新しく保存されたオブジェクトをコールバックで返します。

### 概要
#### パラメータ

| # | 説明          | 受け入れられるデータ型           | 必須か |
|---|---------------------|---------------------|------------|
| 1 |     コールバック        | `function`          | はい        |

#### コールバックパラメータ

| # | 説明              | 想定されるデータ型 |
|---|---------------------|---------------------|
| 1 |  エラー              | `Error`             |
| 2 |  保存されたデータ    | `{}`     |


### 使用例

```javascript
User.find().exec(
  function(err,myRecords){

    // Grab a record off the top of the returned array and save a new attribute to it
    var getOneRecord = myRecords.pop();
    getOneRecord.name = 'Hank';
    getOneRecord.save(
      function(err,s){
        console.log('User with ID '+s.id+' now has name '+s.name);
      });
  });

// User with ID 1 now has name Hank

// Don't forget to handle your errors.
// Don't forget to abide by the rules you set in your model

```
### 備考
> これはインスタンスメソッドです。現在、インスタンスメソッドはトランザクション出来ません。そのため、同じ意味を持つモデルメソッドを使うことをおすすめします。  

<docmeta name="uniqueID" value="save581656">
<docmeta name="methodType" value="association">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".save()">

