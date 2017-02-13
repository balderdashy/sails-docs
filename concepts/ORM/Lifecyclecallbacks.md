# Lifecycle callbacks

### Overview

Lifecycle callbacks are functions that are automagically called before or after certain _model_ actions. For example, we sometimes use lifecycle callbacks to automatically hash a password before creating or updating an `Account` model.

Sails exposes a handful of lifecycle callbacks by default.

No lifecycle callbacks are run on bulk inserts of data using `createEach`.


##### Callbacks on `create`

The `afterCreate` lifecycle callback will only be run on queries that have the `fetch` meta flag set to `true`. For more information on using the `meta` flags see [Waterline Queries](http://sailsjs.com/documentation/reference/waterline-orm/queries/meta).

  - beforeCreate: fn(recordToInsert, cb)
  - afterCreate: fn(newlyInsertedRecord, cb)

##### Callbacks on `update`

The `afterUpdate` lifecycle callback will only be run on queries that have the `fetch` meta flag set to `true`. For more information on using the `meta` flags see [Waterline Queries](http://sailsjs.com/documentation/reference/waterline-orm/queries/meta).

  - beforeUpdate: fn(valuesToUpdate, cb)
  - afterUpdate: fn(updatedRecord, cb)

##### Callbacks on `destroy`

The `afterDestroy` lifecycle callback will only be run on queries that have the `fetch` meta flag set to `true`. For more information on using the `meta` flags see [Waterline Queries](http://sailsjs.com/documentation/reference/waterline-orm/queries/meta).

  - beforeDestroy: fn(criteria, cb)
  - afterDestroy: fn(destroyedRecord, cb)


### Example

If you want to hash a password before saving in the database, you might use the `beforeCreate` lifecycle callback.

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
      columnName: 'hashed_password'
    }

  },


  // Lifecycle Callbacks
  beforeCreate: function (values, cb) {

    // Hash password
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
