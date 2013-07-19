# Models
> _Note: These docs are now for version 0.9.0 of Sails.  Please visit [here](http://08x.sailsjs.org) for 0.8.x documentation._

Like most MVC frameworks, Sails provides an ORM (Object Relational Mapping) called
[Waterline](https://github.com/balderdashy/waterline) for normalizing interactions with models,
no matter what data source you're using. It also defines an interface for mapping your own custom
models from external APIs, not-yet-supported databases, or in-memory state (i.e. Session storage.)

## What is a Model?

A model is a persistent data type: a representation of data stored in a database. If you're using
MySQL, a model might correspond to a table. If you're using MongoDB, it might correspond to a
collection. In either case, our goal is to provide a simple, modular way of managing data without
relying on any one type of database.

# How do I define a Model?

Model definitions contain attributes, validations, instance methods, lifecycle callbacks and
class methods.

## Attributes

Attributes are basic pieces of information about a model. For instance, a model called `Person`
might have attributes called `firstName`, `lastName`, `phoneNumber`, `age`, `birthDate` and `emailAddress`.
The model definition for `Person` might look like this:

```javascript
// Person.js
var Person = {
  firstName: 'STRING',
  lastName: 'STRING',
  age: {
    type: 'INTEGER',
    max: 150,
    required: true
  }
  birthDate: 'DATE',
  phoneNumber: {
    type: 'STRING',
    defaultsTo: '111-222-3333'
  }
  emailAddress: {
    type: 'email', // Email type will get validated by the ORM
    required: true
  },
  
};

exports = Person;
```

#### Available Attribute Types:

The following attribute types are currently available:

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

To learn more about what methods are available to you, check out the [waterline documentation](https://github.com/balderdashy/waterline).

## Validations

Validations are defined on you attributes when defining a model. It uses
[Anchor](https://github.com/balderdashy/anchor) behind the scenes to run validations whenever you
create or update a record.

```javascript
attributes: {
  name: {
    type: 'string',
    maxLength: 20,
    minLength: 5
  },

  email: {
    type: 'email',
    required: true
  }
}
```

Available validations are:

  - empty
  - required
  - notEmpty
  - undefined
  - string
  - alpha
  - numeric
  - alphanumeric
  - email
  - url
  - urlish
  - ip
  - ipv4
  - ipv6
  - creditcard
  - uuid
  - uuidv3
  - uuidv4
  - int
  - integer
  - number
  - finite
  - decimal
  - float
  - falsey
  - truthy
  - null
  - notNull
  - boolean
  - array
  - date
  - hexadecimal
  - hexColor
  - lowercase
  - uppercase
  - after
  - before
  - is
  - regex
  - not
  - notRegex
  - equals
  - contains
  - notContains
  - len
  - in
  - notIn
  - max
  - min
  - minLength
  - maxLength

## Instance Methods

You can attach instance methods to a model which will be available on any record returned from
a query. There are also a few helper instance methods that get attached to allow you to perform
operations on a model instance without having to build the lookup criteria.

Helper Instance Methods:

  - save
  - destroy
  - toObject
  - toJSON


### Save Instance Method

The save instance method will write the current values of the model instance to the datastore.
It only takes a callback as it's argument.

```javascript
// Lookup a user
User.findOne(1).done(function(err, user) {

  // we now have a model with instance methods attached
  // update an attribute value
  user.email = 'foo.bar@gmail.com';

  // save the updated value
  user.save(function(err) {
    // value has been saved
  });

});
```

### Destroy Instance Method

The destroy instance method allows you to delete a single record from the datastore without having
to build up a criteria search.

```javascript
// Lookup a user
User.findOne(1).done(function(err, user) {

  // we now have a model with instance methods attached

  // destroy the record
  user.destroy(function(err) {
    // record has been removed
  });

});
```

### toObject/toJSON Instance Methods

The `toObject()` method will return the currently set model values only, without any of the instance
methods attached. Useful if you want to change or remove values before sending to the client.

However we provide an even easier way to filter values before returning to the client when using
the blueprints by allowing you to override the `toJSON()` method in your model. This function will
automatically be called when using the blueprints so you don't need to write custom controllers in
order to filter values.

Example of filtering a password in your model definition:

```javascript
module.exports = {
  attributes: {
    name: 'string',
    password: 'string',

    // Override toJSON instance method
    // to remove password value
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  }
}

// Then later when you query it:

User.findOne(1).done(function(err, user) {
  // user.password doesn't exist
});
```

### Custom Defined Instance Methods

You may define custom instance methods that are available after querying a model. These are defined
as functions in your model attributes.

```javascript
module.exports = {

  attributes: {
    firstName: 'string',
    lastName: 'string',

    // Define a custom instance method
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    }
  }
}

// Then use it in your query results like:
User.findOne(1).done(function(err, user) {
  // use the instance method
  var name = user.fullName();
});
```

## Lifecycle Callbacks

Lifecycle callbacks are functions you can define to run at certain times in a query. They are hooks
that you can tap into in order to change data. An example use case would be automatically
encrypting a password before creating or automatically generating a slugified url attribute.

_Callbacks run on Create:_

    - beforeValidation / *fn(values, cb)*
    - beforeCreate / *fn(values, cb)*
    - afterCreate / *fn(newlyInsertedRecord, cb)*

_Callbacks run on Update:_

    - beforeValidation / *fn(valuesToUpdate, cb)*
    - beforeUpdate / *fn(valuesToUpdate, cb)*
    - afterUpdate / *fn(updatedRecord, cb)*

_Callbacks run on Destroy:_

    - beforeDestroy / *fn(criteria, cb)*
    - afterDestroy / *fn(cb)*

**Examples**

Encrypt a password before saving to the database.

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
  beforeCreate: function(values, next) {
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return next(err);
      values.password = hash;
      next();
    });
  }
};
```

## Custom Table Names

You can define a custom table name on your adapter by adding a `tableName` attribute. If no table
name is supplied it will use the filename as the table name when passing it to an adapter. So if
you model is name UserModel the table name will be set to user by default.

```javascript
// api/models/User.js
module.exports = {
  tableName: 'sails_user',
  attributes: {
    // attributes here
  }
};
```

## Adapters

Adapters can be included from npm, or defined locally in the `api/adapters` directory of your
project.

You can override the adapter globally for your application, or you can configure different models
to point to different adapters. To see how to change your default application adapter config,
check out the Configuration section of this documentation at
[Configuration](/balderdashy/sails/wiki/configuration)

To override the adapter of a single model, you specify the adapter module's name and any extra
configuration information necessary to make it work.

For example:

```javascript
// api/models/User.js
module.exports = {

  adapter: 'mysql',

  config: {
    user: 'root',
    password: 'thePassword',
    database: 'testdb',
    host: '127.0.0.1'
  },

  attributes: {
    name: 'string',
    email: 'string',
    phoneNumber: {
      type: 'string',
      defaultsTo: '555-555-5555'
    }
  }

};
```

Our global is set to `disk`, however since we overrode the adapter our User models will now be
stored in MySQL using the sails-mysql adapter.

### Schemaless Mode

For adapters that don't require a schema such as Mongo or Redis the default setting is to be schemaless. This means
that you don't need to specify attributes on your model in order to persist them. For some cases this may be fine but
in other cases you would like to specify that all data sticks to a schema.

You can toggle the `schema` flag on models on or off. However note that if you are using a schema database such as MySQL
or PostgreSQL you will not be able to use the model if `schema` is set to false.

```javascript
module.exports = {
 
 adapter: 'mongo',
 schema: true,
 
 attributes: {
   // some attributes
 }
};
```

You may also set the `schema` flag globally in your `config/adapters.js` for a datastore. This will enable/disable a schema
on all your models.

```javascript
module.exports.adapters = {
  mongo: {
    module: 'sails-mongo',
    schema: true
  }
};
```


## Associations

Associations are not yet available for Sails.JS, however are on the immediate todo list.
Please check out issue [#124](https://github.com/balderdashy/sails/issues/124) for more
information regarding the proposed changes for associations.

<!-- Associations describe how models are connected to each other.  The concept originates from SQL databases, but it has analogues in noSQL databases as well (links and embeds).  NoSQL support for Sails' ORM is currently under development. -->

<!--
Since Sails supports both relational and non-relational databases, we must support both standard SQL associations (links) and bundled JSON, Mongo-style associations (embeds)

## Embedding
_TODO_

## Linking
_TODO_
-->

<!-- #### One-To-One
_TODO_

#### One-To-Many
_TODO_

#### Many-To-Many
_TODO_ -->

# Where do I define Models?
Models are defined in the **api/models/** directory in your Sails application.
<!-- You can create them with their attributes using.   name:string age:int email:string -->

You can generate a model with the command line tool:
```
sails generate model Person
```

# Automatic schema creation
Depending on your configuration, the database tables will be recreated automatically.

# Querying Models
You'll want to create, access, modify, and destroy models from controllers, views, services, and
policies, and so you'll need a way to deal with them.

Queries can be run with either a callback interface or with a deferred object. For building
complicated queries the deferred object method is the best choice.

### Callback Method
```javascript
User.findOne({ id: 1 }, function(err, user) {
  // Do stuff here
});
```

### Deferred Object Method
```javascript
User.find()
.where({ id: { '>': 100 }})
.where({ age: 21 })
.limit(100)
.sort('name')
.exec(function(err, users) {
  // Do stuff here
});
```

## create
To create a new record in the database, use `create()`.

```javascript
// For example
User.create({
  name: 'Mike',
  age: 13,
  phoneNumber: '(512)-555-5555'
}).done(function(err, user) {

  // Error handling
  if (err) {
    return console.log(err);

  // The User was created successfully!
  }else {
    console.log("User created:", user);
  }
});
```

## findOne
To lookup a model by id, use `findOne(id)`. You can call also look for a model by passing in an
object composed of the desired matching criteria.

```javascript
// For example to find by id
User.findOne(123).done(function(err, user) {

  // Error handling
  if (err) {
    return console.log(err);

  // The User was found successfully!
  } else {
    console.log("User found:", user);
  }
});


// To find by a criteria
User.findOne({
  name: 'Steven',
  age: 32,
  phone:'(210)-555-1234'
}).done(function(err, user) {

  // Error handling
  if (err) {
    return console.log(err);

  // The User was found successfully!
  } else {
    console.log("User found:", user);
  }
});
```

## find
`find()` lets you search for one or more models which meet the criteria you specify. You can also
include a `limit` (max number of models to return), `skip` (useful for pagination), and sort
`sort`. Find all will always return an array even if only one model fits the criteria.

```javascript
// For example, this query returns the first ten 18 year olds, sorted alphabetically
User.find({
  age: 18
}).limit(10).sort('name ASC').done(function(err, users) {

  // Error handling
  if (err) {
    return console.log(err);

  // Found multiple users!
  } else {
    console.log("Users found:", users);
  }
});
```

Below are some more examples.  Some of these examples include query modifiers.
You can view more about query modifiers
<a href="https://github.com/balderdashy/sails/wiki/Models#query-modifiers">here</a>.

```javascript
// Search-as-you-type input field
User.find({
  name: {
    startsWith: 'thelas'
  }
}, cb);

// Search-as-you-type input field which checks multiple attributes
User.find({
  or: [
    name: { startsWith: 'thelas' },
    email: { startsWith: 'thelas' }
  ]
}, cb);

// Keyword search
User.find({
  description: {
    contains: 'roller coaster'
  }
}, cb);

// Alphabetical search
User.find({
  name: {
    '>=': 'a'
  }
}, cb);
// you can also do <=, <, >, and ! See query modifiers

// Alphabetical search.. but paginated:
// (here's page 2)
User.find({
  where: {
    name: {
      '>=': 'a'
    }
  },
  limit: 15,
  skip: 15,
  sort: 'name ASC'
}, cb);
```

## dynamic finders
With Sails built in ORM, [Waterline](https://github.com/balderdashy/waterline), you can use a very
helpful tool called dynamic finders. You can query your models with automatically genereated methods
that depend on the attributes you define for the model. For example, if you had a book model that
looks like this.

```javascript
var Book = {
  title: 'STRING',
  author: 'STRING',
  publisher: 'STRING',
}

module.exports = Book;
```

You can query the db using methods such as these

```javascript

// Query by author
Book.findOneByTitle('50 Shades of Grey').done(function(err, book) {

  // Error handling
  if (err) {
    return console.log(err);

  // The Book was found successfully!
  } else {
    console.log("Book found:", book);
  }
});

// Query by Author
Book.findByAuthor('John R. Erickson').done(function(err, books) {

  // Error handling
  if (err) {
    return console.log(err);

  // The Books were found successfully!
  } else {
    console.log("Books found:", books);
  }
});
```

## update
`update()` allows you to update an instance of a model from the database. It will always return
an array of records that have been updated.

```javascript
// For example, to update a user's name,
// .update(query, params to change, callback)
User.update({
  name: 'sally'
},{
  phone: '555-555-5555'
}, function(err, users) {
  // Error handling
  if (err) {
    return console.log(err);
  // Updated users successfully!
  } else {
    console.log("Users updated:", users);
  }
});
```

## destroy
`destroy()` allows you to delete models from the database. It will work on all matching criteria.

```javascript
// For example, to delete a user named Johnny,
User.destroy({
  name: 'Johnny',
  age: 22
}).done(function(err) {

  // Error handling
  if (err) {
    return console.log(err);

  // Johnny was deleted!
  } else {
    console.log("User deleted");
  }
});
```

## Query Modifiers
Modifiers can be used in your database queries.  These make it easier to get information from your
database without having to write a bunch of code. Currently supported modifiers are _contains_,
_or_, _startsWith_, _endsWith_, _greaterThan_, _lessThan_, _>=_, and _<=_.
Each of these are shown in examples below.

## Modifier: _contains_
In order to use a _contains_ modifier, you would do the following.

```javascript
where: {
  name: {
    contains: 'James'
  }
}
```

## Modifier: _or_
In order to use an _or_ modifier, you would do the following.

```javascript
where: {
  or: [{name: 'James'}, {name: 'Mike'}]
}
```

name: {
 '>': 'a'
}

# What About Migrations?

In schemaful databases (like MySQL) schema migrations occur automatically.  Models default to
`migrate:alter`, which tells Sails to attempt to auto-migrate the schema.

Explicit production data migrations, like in Rails, do not exist at this time-- production data is
precious, and manual migrations can be dangerous.  However, if this is a feature that you are
interested in, please submit an issue, or better yet, a pull-request!

## More Information

For more information on using Models you can visit the
[Waterline](https://github.com/balderdashy/waterline) documentation which goes more in depth on how
the internals work.
