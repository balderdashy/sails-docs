# Lifecycle callbacks

### Overview

Sails exposes a handful of lifecycle callbacks on models that are called automatically before or after certain actions.  For example, we sometimes use lifecycle callbacks for automatically encrypting a password before creating or updating an Account model.  Another example use case is automatically regenerating a URL slug when a Project's `name` attribute is updated.

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


<docmeta name="uniqueID" value="Lifecyclecallbacks631538">
<docmeta name="displayName" value="Lifecycle callbacks">

