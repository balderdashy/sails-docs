# Models

### Overview

A model represents a collection of structured data, usually corresponding to a single table in a database.  Models are defined by creating a file in an app's `api/models/` folder.

```javascript
// api/models/Product.js
module.exports = {
  attributes: {
    nameOnMenu: { type: 'string' },
    price: { type: 'string' },
    percentRealMeat: { type: 'float' },
    numCalories: { type: 'integer' }
  }
}
```

##### Using models

Models may be accessed from our controllers, policies, services, responses, tests, and in custom model methods.  There are many built-in methods available on models, the most important of which are the query methods: [find](), [create](), [update](), and [destroy]().  These methods are [asynchronous]() - under the covers, Waterline has to send a query to the database and wait for a response.

Consequently, query methods return a deferred query object.  To actually execute a query, `.exec(cb)` must be called on this deferred object, where `cb` is a callback function to run after the query is complete.

Waterline also includes opt-in support for promises.  Instead of calling `.exec()` on a query object, we can call `.then()`, `.spread()`, or `.fail()`, which will return a [Q promise](https://github.com/kriskowal/q).



### Class methods

Besides data, models may also have **class methods**: functions built into the model itself that perform some task. **Class methods** are functions available at the top level of a model.  These are useful for pulling code out of our controllers and into reusuable functions that can be called from anywhere (i.e. don't depend on `req` or `res`.)

```javascript
// api/models/User.js
module.exports = {

  attributes: {

    name: { 
      type: 'string'
    },
    enrolledIn: {
      collection: 'Course.students', via: 'students'
    }
  },

  /**
   * Enrolls a user in one or more courses.
   * @param  {Object}   options
   *            => courses {Array} list of course ids
   *            => id {Integer} id of the enrolling user
   * @param  {Function} cb
   */
  enroll: function (options, cb) {

    User.findOne(options.id).exec(function (err, theUser) {
      if (err) return cb(err);
      if (!theUser) return cb(new Error('User not found.'));
      theUser.enrolledIn.add(options.courses);
      theUser.save(cb);
    });
  }
};
```



### Adapters

Like most MVC frameworks, Sails supports [multiple databases]().  That means the syntax to query and manipulate our data is always the same, whether we're using MongoDB, MySQL, or any other supported database.

Waterline builds on this flexibility with its concept of adapters.  An adapter is a bit of code that maps methods like `find()` and `create()` to a lower-level syntax like `SELECT * FROM` and `INSERT INTO`.  The Sails core team maintains open-source adapters for a handful of the [most popular databases](), and a wealth of [community adapters]() are also available.

Custom Waterline adapters are actually [pretty simple to build](), and can make for more maintainable integrations; anything from a proprietary enterprise system, to an open API like LinkedIn, to a cache or traditional database.


### Connections

A **connection** represents a particular database configuration.  It includes an adapter, as well as information like the host, port, username, password, and so forth.  Connections are defined in [`config/connections.js`]().

```javascript
// in config/connections.js
// ...
{
  adapter: 'sails-mysql',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'g3tInCr4zee&stUfF'
}
// ...
```

The default database connection for a Sails app is located in the base model configuration (`config/models.js`), but it can also be overriden on a per-model basis by specifying a [`connection`]().


### Object Relational Mapping (ORM)

Sails comes installed with its default ORM called Waterline, a datastore-agnostic tool that dramatically simplifies interaction with one or more databases.  It provides an abstraction layer on top of the underlying database, allowing you to easily query and manipulate your data without writing nasty integration code.

For instance, in schemaful databases like Postgres, Oracle, and MySQL, models are represented by tables.  In MongoDB, they're represented by Mongo "collections".  In Redis, they're represented using key/value pairs.

But in each case, the code you write to create new records, fetch/search for existing records, update records, or destroy records is _exactly the same_.  Waterline allows you to query and join (or `.populate()`) records between models, _even if_ the data for each model lives in a different database.

This means that you can switch some or all of our app's models from Mongo, to Postgres, to MySQL, to Redis, and back again - without changing any code. For the times we still need database-specific functionality, luckily Waterline provides a query interface that allows us to talk directly to our models' underlying database driver (see [.query()]() and [.native()]().)


### Analogy

Imagine a file cabinet full of completed pen-and-ink forms. All of the forms have the same fields (e.g. "name", "birthdate", "maritalStatus"), but for each form, the _values_ written in the fields vary.  For example, one form might contain "Lara", "2000-03-16T21:16:15.127Z", "single", while another form contains "Larry", "1974-01-16T21:16:15.127Z", "married".

Now imagine you're running a hotdog business.  If you were _very_ organized, you might set up your file cabinets as follows:

+ **Employee** (contains your employee records)
  + `fullName`
  + `hourlyWage`
  + `phoneNumber`
+ **Location** (contains a record for each location you operate)
  + `streetAddress`
  + `city`
  + `state`
  + `zipcode`
  + `purchases`
    + a list of all the purchases made at this location
  + `manager`
    + the employee who manages this location
+ **Purchase** (contains a record for each purchase made by one of your customers)
  + `madeAtLocation`
  + `productsPurchased`
  + `createdAt`
+ **Product** (contains a record for each of your various product offerings)
  + `nameOnMenu`
  + `price`
  + `numCalories`
  + `percentRealMeat`
  + `availableAt`
    + a list of the locations where this product offering is available.


In your Sails app, a **model** is like one of the file cabinets.  It contains **records**, which are like the forms.  `Attributes` are like the fields in each form.



### Notes
+ This documentation on models is not applicable if you are overriding the built-in ORM, [Waterline](https://github.com/balderdashy/waterline).  In that case, your models will follow whatever convention you set up, on top of whatever ORM library you're using (e.g. Mongoose.)




# attributes
### Overview

Model attributes are basic pieces of information about a model. A model called `Person` might have attributes called `firstName`, `lastName`, `phoneNumber`, `age`, `birthDate` and `emailAddress`.

> TODO: address sql vs. no sql and stuff like:
> """
> In most cases, this data is _homogenous_, meaning each record has the same attributes, 
> """

### Attribute Options

These options can be used to enforce various constraints and add special enhancements to our model attributes. 

###### type

Specifies the type of data that will be stored in this attribute.  One of:

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


###### defaultsTo

When a record is created, if no value was supplied, the record will be created with the specified `defaultsTo` value.

```javascript
attributes: {
  phoneNumber: {
    type: 'string',
    defaultsTo: '111-222-3333'
  }
}
```

###### autoIncrement

Sets up the attribute as an auto-increment key.  When a new record is added to the model, if a value for this attribute is not specified, it will be generated by incrementing the most recent record's value by one. Note: Attributes which specify `autoIncrement` should always be of `type: integer`. Also, bear in mind that the level of support varies across different datastores. For instance, MySQL will not allow more than one auto-incrementing column per table.

```javascript
attributes: {
  placeInLine: {
    type: 'integer',
    autoIncrement: true
  }
}
```

###### unique

Ensures no two records will be allowed with the same value for the target attribute. This is an adapter-level constraint, so in most cases this will result in a unique index on the attribute being created in the underlying datastore.

```javascript
attributes: {
  username: {
    type: 'string',
    unique: true
  }
}
```

<!--

Omitting `index` from docs for now.

###### index

Will create a simple index in the underlying datastore for faster queries if available. This is only for simple indexes and currently dosn't support compound indexes. For these you will need to create them yourself or use a migration.

There is currently an issue with adding indexes to string fields. Because Waterline performs its queries in a case insensitive manner we are unable to use the index on a string attribute. There are some workarounds being discussed but nothing is implemented so far. This will be updated in the near future to fully support indexes on strings.

```javascript
attributes: {
  email: {
    type: 'string',
    index: true
  }
}
```
-->

###### primaryKey

Use this attribute as the the primary key for the record. Only one attribute per model can be the `primaryKey`.  Note: This should never be used unless [autoPK]() is set to false.

```javascript
attributes: {
  uuid: {
    type: 'string',
    primaryKey: true,
    required: true
  }
}
```

###### enum

A special validation property which only saves data which matches a whitelisted set of values.

```javascript
attributes: {
  state: {
    type: 'string',
    enum: ['pending', 'approved', 'denied']
  }
}
```

###### size

If supported in the adapter, can be used to define the size of the attribute. For example in MySQL, `size` can be specified as a number (`n`) to create a column with the SQL data type: `varchar(n)`.

```javascript
attributes: {
  name: {
    type: 'string',
    size: 24
  }
}
```

###### columnName


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
    name: 'string',
    password: 'string',
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

| the_primary_key | email_address | full_name | seriously_encrypted_password |
|------|---|----|---|
7 | mike@sameness.foo | Mike McNeil | ranchdressing |
14 | nick@sameness.foo | Nick Crumrine | thousandisland |


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
      primaryKey: true,
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

> You might have noticed that we also used the [`tableName`]() property in this example.  This allows us to control the name of the table that will be used to house our data.







# Model configuration

The following properties can be specified at the top level of your model definition to override the defaults for that particular model.  To override the configuration of all models, edit [`config/models.js`]().

##### migrate
> TODO

##### schema
> TODO

##### connection
The configured database [connection]() where this model will fetch and save its data.  Defaults to `localDiskDb`, the default connection that uses the `sails-disk` adapter.

##### identity
The lowercase unique key for this model, e.g. `user`.  By default, a model's `identity` is inferred automatically by lowercasing its filename.

##### globalId
> TODO

##### autoPK
>TODO 

##### autoCreatedAt
> TODO

##### autoUpdatedAt
> TODO

##### tableName

You can define a custom table name on your adapter by adding a `tableName` attribute. By default, the adapter will use the model's `identity` as its `tableName`.

```javascript
// api/models/Automobile.js
module.exports = {
  attributes: {
    make: { type: 'string' },
    model: { type: 'string' },
    year: { type: 'string' }
  },
  tableName: 'some_legacy_table'
});
```







# Validations
### Overview

Sails bundles support for automatic validations of your models' attributes. Any time a record is updated, or a new record is created, the data for each attribute will be checked against all of your predefined validation rules. This provides a convenient failsafe to ensure that invalid entries don't make their way into your app's database(s).

### Validation Rules

Validations are handled by [Anchor](https://github.com/balderdashy/anchor) a thin layer on top of [Validator](https://github.com/chriso/validator.js), one of the most robust validation libraries for Node.js.  Sails supports most of the validations available in Validator, as well as a few extras that require database integration, like `unique`.


| Name of validator | What does it check? | Notes on usage |
|-------------------|---------------------|----------------|
|after| check if `string` date in this record is after the specified `Date` | must be valid javascript `Date` |
|alpha| check if `string` in this record contains only letters (a-zA-Z) | |
|alphadashed|| does this `string` contain only numbers and/or dashes? |
|alphanumeric| check if `string` in this record contains only letters and numbers. | |
|alphanumericdashed| does this `string` contain only numbers and/or letters and/or dashes? | |
|array| is this a valid javascript `array` object? | strings formatted as arrays won't pass |
|before| check if `string` in this record is a date that's before the specified date | |
|binary| is this binary data? | If it's a string, it will always pass |
|boolean| is this a valid javascript `boolean` ? | `string`s will fail |
|contains| check if `string` in this record contains the seed | |
|creditcard| check if `string` in this record is a credit card | |
|date| check if `string` in this record is a date | takes both strings and javascript |
|datetime| check if `string` in this record looks like a javascript `datetime`| |
|decimal| | contains a decimal or is less than 1?|
|email| check if `string` in this record looks like an email address | |
|empty| Arrays, strings, or arguments objects with a length of 0 and objects with no own enumerable properties are considered "empty" | lo-dash _.isEmpty() |
|equals| check if `string` in this record is equal to the specified value | `===` ! They must match in both value and type |
|falsey| Would a Javascript engine register a value of `false` on this? | |
|finite| Checks if given value is, or can be coerced to, a finite number | This is not the same as native isFinite which will return true for booleans and empty strings |
|float| check if `string` in this record is of the number type float | |
|hexadecimal| check if `string` in this record is a hexadecimal number | |
|hexColor| check if `string` in this record is a hexadecimal color | |
|in| check if `string` in this record is in the specified array of allowed `string` values | |
|int|check if `string` in this record is an integer | |
|integer| same as above | Im not sure why there are two of these. |
|ip| check if `string` in this record is a valid IP (v4 or v6) | |
|ipv4| check if `string` in this record is a valid IP v4 | |
|ipv6| check if `string` in this record is aa valid IP v6 | |
|is| | something to do with REGEX|
|json| does a try&catch to check for valid JSON. | |
|len| is `integer` > param1 && < param2 | Where are params defined? |
|lowercase| is this string in all lowercase? | |
|max| | |
|maxLength| is `integer` > 0 && < param2 |  |
|min| | |
|minLength| | |
|not| | Something about regexes |
|notContains| | |
|notEmpty| |  |
|notIn| does the value of this model attribute exist inside of the defined validator value (of the same type) | Takes strings and arrays |
|notNull| does this not have a value of `null` ? | |
|notRegex| | |
|null| check if `string` in this record is null | |
|number| is this a number? | NaN is considered a number |
|numeric| checks if `string` in this record contains only numbers | |
|object| checks if this attribute is the language type of Object | Passes for arrays, functions, objects, regexes, new Number(0), and new String('') ! |
|regex| | |
|required| Must this model attribute contain valid data before a new record can be created? | |
|string| is this a `string` ?| |
|text| okay, well is <i>this</i> a `string` ?| |
|truthy| Would a Javascript engine register a value of `false` on this? | |
|undefined| Would a javascript engine register this thing as have the value 'undefined' ? | |
|uppercase| checks if `string` in this record is uppercase | |
|url| checks if `string` in this record is a URL | |
|urlish| Does the `string` in this record contain something that looks like a route, ending with a file extension? | /^\s([^\/]+\.)+.+\s*$/g |
|uuid| checks if `string` in this record is a UUID (v3, v4, or v5) | |
|uuidv3| checks if `string` in this record is a UUID (v3) | |
|uuidv4| checks if `string` in this record is a UUID (v4) | |


<!--

  This needs to be reworked - we shouldn't name the property for defining custom validations `types` if the resulting custom validations can't actually be used in the `type` field!


### Custom Validation Rules

You can define your own types and their validation by defining a `types` property. A `type` It's possible to access and compare values to other attributes.

#### Example Model


```javascript
// api/models/foo
module.exports = {

  types: {
    point: function(geoLocation){
        return geoLocation.x && geoLocation.y
      }
    },
  attributes: {
    firstName: {
      type: 'string',
      required: true,
      minLength: 5,
      maxLength: 15
    },
    location: {
      //note, that the base type (json) still has to be defined
      type: 'json',
      point: true
    }
  }
}

 ```
-->




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
