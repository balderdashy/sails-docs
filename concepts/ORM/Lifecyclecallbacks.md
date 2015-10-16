# ライフサイクルコールバック

### 概要

ライフサイクルコールバックはとくていの _モデル_ の前後に魔法のように自動的に呼び出されるファンクションです。例えば我々は時々`Account`モデルをcreateしたりupdateしたりする際にパスワードを暗号化する事がありますが、これにライフサイクルコールバックが使えます。

Sailsではデフォルトで便利なライフサイクルコールバックを露出させています。


##### `create`時のコールバック

  - beforeValidate: fn(values, cb)
  - afterValidate: fn(values, cb)
  - beforeCreate: fn(values, cb)
  - afterCreate: fn(newlyInsertedRecord, cb)

##### `update`時のコールバック

  - beforeValidate: fn(valuesToUpdate, cb)
  - afterValidate: fn(valuesToUpdate, cb)
  - beforeUpdate: fn(valuesToUpdate, cb)
  - afterUpdate: fn(updatedRecord, cb)

##### `destroy`時のコールバック

  - beforeDestroy: fn(criteria, cb)
  - afterDestroy: fn(destroyedRecords, cb)


### 例

もしパスワードを保存前に暗号化したいときは`beforeCreate`コールバックを使います。

```javascript
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    username: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      minLength: 6,
      required: true,
      columnName: 'encrypted_password'
    }

  },


  // コールバック
  beforeCreate: function (values, cb) {

    // パスワードを暗号化
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return cb(err);
      values.password = hash;
      //エラーを返す引数でcd()をコールします。これはいくつかの条件がFailした時に処理全体をキャンセルすることが出来、便利です。
      cb();
    });
  }
};
```


<docmeta name="uniqueID" value="Lifecyclecallbacks631538">
<docmeta name="displayName" value="Lifecycle callbacks">

