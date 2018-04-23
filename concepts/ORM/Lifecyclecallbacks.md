# Lifecycle callbacks

### Overview

Lifecycle callbacks are functions that are automagically called before or after certain _model_ actions.  For example, you might use lifecycle callbacks to automatically compute the value of a `fullName` attribute before creating or updating a `User` record.

Sails exposes a handful of lifecycle callbacks by default.

##### Callbacks on `create`

The `afterCreate` lifecycle callback will only be run on queries that have the `fetch` meta flag set to `true`. For more information on using the `meta` flags see [Waterline Queries](https://sailsjs.com/documentation/reference/waterline-orm/queries/meta).

  - beforeCreate: fn(recordToInsert, cb)
  - afterCreate: fn(newlyInsertedRecord, cb)

> `beforeCreate()` is not run on bulk inserts of data using `createEach`.

##### Callbacks on `update`

The `afterUpdate` lifecycle callback will only be run on queries that have the `fetch` meta flag set to `true`. For more information on using the `meta` flags see [Waterline Queries](https://sailsjs.com/documentation/reference/waterline-orm/queries/meta).

  - beforeUpdate: fn(valuesToUpdate, cb)
  - afterUpdate: fn(updatedRecord, cb)

##### Callbacks on `destroy`

The `afterDestroy` lifecycle callback will only be run on queries that have the `fetch` meta flag set to `true`. For more information on using the `meta` flags see [Waterline Queries](https://sailsjs.com/documentation/reference/waterline-orm/queries/meta).

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
      required: true
    }

  },


  beforeCreate: function (values, proceed) {
    // Hash password
    sails.helpers.passwords.hashPassword(values.password).exec((err)=>{
      if (err) { return proceed(err); }
      return proceed();
    });//_∏_
  }
  
};
```



<docmeta name="displayName" value="Lifecycle callbacks">
