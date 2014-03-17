# Model Properties

### Overview

#### Model Attributes

Here you will find information about defining models in your Sails project as well as the data types supported by those models.

#### Lifecycle Callbacks

Sails exposes a number of functions that can be called at various times during your query.  Look here for information on how to use custom logic at a specific time relative to your query. 

#### Validations

Look here for information on validating data.  It describes what types of validations are available and gives some examples on how to use them.

#### Associations Between Models

This is where you will look in order to learn how to make associations between models.  If you have a model named `User` and a model named `Pet`, you can do things like finding a `Pet` based on the the `User` that owns it. Look here to find out how it all works. 


# tableName

### Overview

> TODO

### Example

> TODO



# :attribute.primaryKey
### Overview
> TODO



# attributes
### Overview

Model attributes are basic pieces of information about a model. A model called `Person`
might have attributes called `firstName`, `lastName`, `phoneNumber`, `age`, `birthDate` and `emailAddress`.

> Note, this section applies only if you are using [Waterline](https://github.com/balderdashy/waterline) as your ORM.  If you're not sure what this means, ignore this message.

### Attribute Types

The following attribute types are currently supported by Sails via [Waterline](https://github.com/balderdashy/waterline)

- string
- text
- integer
- float
- date
- time
- datetime
- boolean
- binary
- array
- json






# Lifecycle Callbacks

### Overview

Sails exposes a handful of lifecycle callbacks on models that are called automatically before or after certain actions.  They are primarily useful for mutating data before records are saved. For example, we sometimes use lifecycle callbacks for automatically encrypting a password before creating or updating an Account model.  Another example use case is automatically regenerating a URL slug when a Project's `name` attribute is updated.


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
  - afterDestroy: fn(cb)


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
      cb();
    });
  }
};
```



