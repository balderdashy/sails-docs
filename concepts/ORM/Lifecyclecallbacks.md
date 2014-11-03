# 生命週期回呼（Lifecycle callbacks）

### 概觀

Sails 公開了一些模型的生命週期回呼，在做某些動作之前或之後會自動被呼叫。例如，我們有時候會使用生命週期回呼在建立或更新帳號模型前自動加密密碼。另一個使用情況是當專案的 `name` 屬性更新時自動重新產生網址。

##### `create` 的回呼

  - beforeValidate: fn(values, cb)
  - afterValidate: fn(values, cb)
  - beforeCreate: fn(values, cb)
  - afterCreate: fn(newlyInsertedRecord, cb)

##### `update` 的回呼

  - beforeValidate: fn(valuesToUpdate, cb)
  - afterValidate: fn(valuesToUpdate, cb)
  - beforeUpdate: fn(valuesToUpdate, cb)
  - afterUpdate: fn(updatedRecord, cb)

##### `destroy` 的回呼

  - beforeDestroy: fn(criteria, cb)
  - afterDestroy: fn(destroyedRecords, cb)


### 範例

如果你想在密碼儲存到資料庫前先加密，你可以使用 `beforeCreate` 生命週期回呼。

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


  // 生命週期回呼
  beforeCreate: function (values, cb) {

    // 密碼加密
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return cb(err);
      values.password = hash;
      // 呼叫 cb() 時帶入一個參數，會返回錯誤。當某些條件失敗要取消整個操作時很有用。
      cb();
    });
  }
};
```


<docmeta name="uniqueID" value="Lifecyclecallbacks631538">
<docmeta name="displayName" value="Lifecycle callbacks">

