# Attributes
### Overview

Model attributes are basic pieces of information about a model.  For example, a model called `Person` might have attributes named `firstName`, `lastName`, `phoneNumber`, `age`, `birthDate` and `emailAddress`.

<!---
TODO: address sql vs. no sql and stuff like:
"""
In most cases, this data is _homogenous_, meaning each record has the same attributes,
"""
-->



### Defining attributes

A model's `attributes` [setting](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings) allows you to provide a set of attributes, each defined as a dictionary (aka plain JavaScript object):

```javascript
// api/models/User.js
{
  attributes: {
    emailAddress: { type: 'string', required: true, },
    karma: { type: 'number', },
    isSubscribedToNewsletter: { type: 'boolean', defaultsTo: true, },
  },
}
```

Within each attribute, there are one or more keys, or options, which are used to provide additional direction to Sails and Waterline.  These attribute keys tell the model how to go about ensuring type safety, enforcing high-level validation rules, and (if you have automigrations enabled) how it should go about setting up tables or collections in your database.



### Type safety


##### Type

Except for [associations](http://sailsjs.com/documentation/concepts/models-and-orm/associations), every attribute must declare a `type`.

This is the type of data that will be stored for this attribute -- used for logical type safety checks of queries and results.  Here is a list of the data types supported by Sails and Waterline:

- string
- number
- boolean
- json
- ref



##### Required?

TODO


##### Defaults to...

When a record is created, if no value was supplied, the record will be created with the specified `defaultsTo` value. The supplied value can also be a function that waterline will run while creating the record.

```javascript
attributes: {
  phoneNumber: {
    type: 'string',
    defaultsTo: '111-222-3333'
  },
  orderNumber: {
    type: 'text',
    defaultsTo: function() {
      return uuid.v4();
    }
  }
}
```


### Validations

In addition to basic type safety checks, Sails offers several different high-level validation rules.  For example, the `enum` rule verifies that any new value stored for this attribute must _exactly match_ one of a few different hard-coded constants:

```javascript
unsubscribeReason: {
  type; 'string',
  enum: ['boring', 'too many emails', 'recipes too difficult', 'other'],
  required: true
}
```

For a complete list of high-level validation rules, see [Validations](http://sailsjs.com/documentation/concepts/models-and-orm/validations).




<!--

TODO: need ot move primary key out to the top-level (it's a model setting now)

commented-out content at: https://gist.github.com/rachaelshaw/f10d70c73780d5087d4c936cdefd5648#1
-->


### columnName

Inside an attribute definition, you can specify a `columnName` to force Sails/Waterline to store data for that attribute in a specific column in the configured connection (i.e. database).  Be aware that this is not necessarily SQL-specific-- it will also work for MongoDB fields, etc.

While the `columnName` property is primarily designed for working with existing/legacy databases, it can also be useful in situations where your database is being shared by other applications, or you don't have access permissions to change the schema.

To store/fetch your model's `numberOfWheels` attribute into/from the `number_of_round_rotating_things` column:
```javascript
  // An attribute in one of your models:
  // ...
  numberOfWheels: {
    type: 'integer',
    columnName: 'number_of_round_rotating_things'
  }
  // ...
```


Now for a more thorough/realistic example.

Let's say you have a `User` model in your Sails app that looks like this:

```javascript
// api/models/User.js
module.exports = {
  connection: 'shinyNewMySQLDatabase',
  attributes: {
    name: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    email: {
      type: 'email',
      unique: true
    }
  }
};
```


Everything works great, but instead of using an existing MySQL database sitting on a server somewhere that happens to house your app's intended users:

```javascript
// config/connections.js
module.exports = {
  // ...

  // Existing users are in here!
  rustyOldMySQLDatabase: {
    adapter: 'sails-mysql',
    user: 'bofh',
    host: 'db.eleven.sameness.foo',
    password: 'Gh19R!?had9gzQ#Q#Q#%AdsghaDABAMR>##G<ADMBOVRH@)$(HTOADG!GNADSGADSGNBI@(',
    database: 'jonas'
  },
  // ...
};
```

Let's say there's a table called `our_users` in the old MySQL database that looks like this:

| the_primary_key | email_address | full_name | seriously_encrypted_password|
|------|---|----|---|
| 7 | mike@sameness.foo | Mike McNeil | ranchdressing |
| 14 | nick@sameness.foo | Nick Crumrine | thousandisland |


In order to use this from Sails, you'd change your `User` model to look like this:

```javascript
// api/models/User.js
module.exports = {
  connection: 'rustyOldMySQLDatabase',
  tableName: 'our_users',
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      columnName: 'the_primary_key'
    },
    name: {
      type: 'string',
      columnName: 'full_name'
    },
    password: {
      type: 'string',
      columnName: 'seriously_encrypted_password'
    },
    email: {
      type: 'email',
      unique: true,
      columnName: 'email_address'
    }
  }
};
```

> You might have noticed that we also used the [`tableName`](http://sailsjs.org/documentation/concepts/ORM/model-settings.html?q=tablename) property in this example.  This allows us to control the name of the table that will be used to house our data.






### Automigrations

##### columnType

TODO

##### autoIncrement

Sets up the attribute as an auto-increment key.  When a new record is added to the model, if a value for this attribute is not specified, it will be generated by incrementing the most recent record's value by one. Note: Attributes which specify `autoIncrement` should always be of `type: 'integer'`. Also, bear in mind that the level of support varies across different datastores. For instance, MySQL will not allow more than one auto-incrementing column per table.

```javascript
attributes: {
  placeInLine: {
    type: 'integer',
    autoIncrement: true
  }
}
```

##### unique

Ensures no two records will be allowed with the same value for the target attribute. This is an adapter-level constraint, so in most cases this will result in a unique index on the attribute being created in the underlying datastore.

```javascript
attributes: {
  username: {
    type: 'string',
    unique: true
  }
}
```
> When using MySQL with the `utf8mb4` character set, you will need to add the `size` constraint to the appropriate column in your table directly via MySQL. Otherwise, since `type: 'string'` is translated to `varchar(255)` in the MySQL adapter, the `unique: true` constraint will cause an 'index too long' error: `ER_INDEX_COLUMN_TOO_LONG: Index column size too large. The maximum column size is 767 bytes.`


<!--

commented-out content at: https://gist.github.com/rachaelshaw/f10d70c73780d5087d4c936cdefd5648#2


commented-out content at: https://gist.github.com/rachaelshaw/f10d70c73780d5087d4c936cdefd5648#3


TODO: move enum to validations page


commented-out content at: https://gist.github.com/rachaelshaw/f10d70c73780d5087d4c936cdefd5648#4


commented-out content at: https://gist.github.com/rachaelshaw/f10d70c73780d5087d4c936cdefd5648#5


-->







<docmeta name="displayName" value="Attributes">
