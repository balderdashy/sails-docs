# .toJSON()

### 目的
このメソッドはクローンされたモデルインスタンスを返します。しかし、これは全てのインスタンスメソッドを含みます。これに関して備考を読むようにして下さい。

### 概要


#### 返り値

| # | 説明              | 想定されるデータ型 |
|---|---------------------|---------------------|
| 1 |  クローンされたレコード    | `{}`     |


### 使用例

```javascript
User.find().exec(
  function(err,myRecord){
    var datUser = myRecord.pop().toObject();
    console.log(datUser);
  });

/* { id: 2,
  createdAt: '2013-10-31T22:42:25.459Z',
  updatedAt: '2013-11-01T20:12:55.534Z',
  name: 'Hank',
  phoneNumber: '101-150-1337' } */

User.find().exec(
  function(err,myRecord){
    var datUser = myRecord.pop().toJSON();
    console.log(datUser);
  });

/* { id: 2,
  createdAt: '2013-10-31T22:42:25.459Z',
  updatedAt: '2013-11-01T20:12:55.534Z',
  name: 'Hank' } */



// Don't forget to handle your errors

```

モデルで

```javascript
module.exports = {
  attributes: {
    name: 'string',
    phoneNumber: 'string',

    // Override the default toJSON method

    toJSON: function() {
      var obj = this.toObject();
      delete obj.phoneNumber;
      return obj;
    }
  }
}

```
### 備考
> toJSONの真価はres.jsonを通じて送り出される全てのモデルインスタンスがtoJSONを経由するということです。
> 特定のモデル(すぐに使えるblueprints含め)を扱う全てのコントローラアクションにカスタムのコードを書く代わりに単にデフォルトのtoJSONファンクションを上書きすることにより出て行くデータを操作できます。
> メールアドレス等のプライベートな情報が全てのクライアントに送られないようにするためにこれを使うべきです。

> これはインスタンスメソッドです。現在、インスタンスメソッドはトランザクション出来ません。そのため、同じ意味を持つモデルメソッドを使うことをおすすめします。  


<docmeta name="uniqueID" value="toJSON161307">
<docmeta name="methodType" value="instance">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".toJSON()">

