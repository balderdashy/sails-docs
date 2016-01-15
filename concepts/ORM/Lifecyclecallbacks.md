# Lifecycle callbacks

### Overview

Lifecycle callbacks are functions that are automagically called before or after certain _model_ actions. For example, we sometimes use lifecycle callbacks to automatically encrypt a password before creating or updating an `Account` model.

Sails exposes a handful of lifecycle callbacks by default.


##### Callbacks on `create`

  - beforeValidate: fn(values, cb)
  - afterValidate: fn(values, cb)
  - beforeCreate: fn(values, cb)
  - afterCreate: fn(newlyInsertedRecord, cb)

##### Callbacks on `update`

  - beforeValidate: fn(valuesToUpdate, cb)
  - afterValidate: fn(valuesToUpdate, cb)
  - beforeUpdate: fn(valuesToUpdate, cb)
  - afterUpdate: fn(updatedRecord, cb)

##### Callbacks on `destroy`

  - beforeDestroy: fn(criteria, cb)
  - afterDestroy: fn(destroyedRecords, cb)


### Example

If you want to encrypt a password before saving in the database, you might use the `beforeCreate` lifecycle callback.

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


  // Lifecycle Callbacks
  beforeCreate: function (values, cb) {

    // Encrypt password
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return cb(err);
      values.password = hash;
      //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
      cb();
    });
  }
};
```



<docmeta name="displayName" value="Lifecycle callbacks">
