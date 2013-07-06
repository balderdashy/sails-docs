# Models

Like most MVC frameworks, Sails provides an ORM (Object Relational Mapping) for normalizing
interactions with models, no matter what data source you're using.  It also defines an interface
for mapping your own custom models from external APIs, not-yet-supported databases, or in-memory
state (i.e. Session storage.)

## What is a Model?
A model is a persistent data type: a representation of data stored in a database. If you're using
mySQL, a model might correspond to a table. If you're using MongoDB, it might correspond to a
collection. In either case, our goal is to provide a simple, modular way of managing data without
relying on any one type of database.

# How do I define a Model?
Model definitions contain attributes and associations.

## Attributes
Attributes are basic pieces of information about a model.  For instance, a model called `Person`
might have an attributes called `name`, `phoneNumber`, `age`, `birthDate` and `emailAddress`.
The model definition for `Person` might look like this:

```javascript
// Person.js
var Person = {
  name: 'STRING',
  age: 'INTEGER',
  birthDate: 'DATE',
  phoneNumber: 'STRING',
  emailAddress: 'STRING'
};

exports = Person;
```

Data types (type)
optional
only require if db uses types.
'FLOAT'
'INT'
'STRING'


updatedAt
createdAt

<!--
## Validation rules
TODO
-->

## defaultsTo
The value this attribute should be set to if left unspecified during model creation.

## Adapters

Adapters can be included from npm, or defined locally in the `api/adapters` directory of your project.

You can override the adapter globally for your application, or you can configure different models to point to different adapters.  To see how to change your default application adapter config, check out the Configuration section of this documentation at [Configuration](/balderdashy/sails/wiki/configuration)

To override the adapter of a single model, you specify the adapter module's name and any extra configuration information necessary to make it work.

For example:

```javascript
// api/models/User.js
module.exports = {

 adapter: 'sails-mysql',
 user: 'root',
 password: 'thePassword',
 database: 'testdb',
 host: '127.0.0.1',
 

 attributes: {

    // Simple attribute:
    name: 'string',
    email: 'string',
    phoneNumber: {
      type: 'string',
      defaultsTo: '555-555-5555'
    }
 }
 
};
```

Our global is set to _disk_, however, since we overrode the adapter, our User models will now be stored in MySQL using the sails-mysql adapter. 


## Associations

Associations are not yet available for Sails.js, but are on the immediate todo list.  Please check out issue [#124](https://github.com/balderdashy/sails/issues/124) for more information regarding the proposed changes for associations.

<!-- Associations describe how models are connected to each other.  The concept originates from SQL databases, but it has analogues in noSQL databases as well (links and embeds).  NoSQL support for Sails.js's ORM is currently under development. -->

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
You'll want to create, access, modify, and destroy models from controllers, views, services, and policies, and so you'll need a way to deal with them.


<!---
Sails supports two different ways of interacting with models: Promises and asynchronous callbacks.

## Promises
```
Rabbit.create({
  name: 'Roger',
  age: 4
});
```

## Async Callbacks
```
Rabbit.create({
  name: 'Roger',
  age: 4
}).done(function (err,resultSet) { /* ... */ });
```
-->

## create
To create a new instance of a model in the database, use `create()`.

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

## find
To lookup a model by id, use `find(id)`. You can call also look for a model by passing in an object
composed of the desired matching criteria.

```javascript
// For example to find by id
User.find(123).done(function(err, user) {

  // Error handling
  if (err) {
    return console.log(err);

  // The User was found successfully! 
  } else {
    console.log("User found:", user);
  }
});


// To find by a criteria
User.find({
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

## findAll
`findAll()` lets you search for one or more models which meet the criteria you specify. You can also
include a `limit` (max number of models to return), `skip` (useful for pagination), and sort
`sort`. Find all will always return an array even if only one model fits the criteria.

```javascript
// For example, this query returns the first ten 18 year olds, sorted alphabetically
User.findAll({
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

Below are some more examples.  Some of these examples include query modifiers.  You can view more about query modifiers <a href="https://github.com/balderdashy/sails/wiki/Models#query-modifiers">here</a>.

```javascript
// Search-as-you-type input field
User.findAll({
  name: {
    startsWith: 'thelas'
  }
}, cb);

// Search-as-you-type input field which checks multiple attributes
User.findAll({
  or: [
    name: { startsWith: 'thelas' },
    email: { startsWith: 'thelas' }
  ]
}, cb);

// Keyword search
User.findAll({
  description: {
    contains: 'roller coaster'
  }
}, cb);

// Alphabetical search
User.findAll({
  name: {
    '>=': 'a'
  }
}, cb);
// you can also do <=, <, >, and ! See query modifiers

// Alphabetical search.. but paginated:
// (here's page 2)
User.findAll({
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
With Sails.js's built in ORM , Waterline, you can use a very helpful tool called dynamic finders. You can
query your models with automatically generated methods that depend on the attributes you define for
the model. For example, if you had a book model that looks like this.

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
Book.findByTitle('50 Shades of Grey').done(function(err, book) {

  // Error handling
  if (err) {
    return console.log(err);

  // The Book was found successfully!
  } else {
    console.log("Book found:", book);
  }
});

// Query by Author
Book.findAllByAuthor('John R. Erickson').done(function(err, books) {

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
`update()` allows you to update an instance of a model from the database.

```javascript
// For example, to update a user's name, 
// .update(query, params to change, callback)
User.update({
  name: 'sally'
},{
  phone: '555-555-5555'
}, function(err, user) {
  // Error handling
  if (err) {
    return console.log(err);
  // Updated user successfully!
  } else {
    console.log("User updated:", user);
  }
});
```

## destroy
`destroy()` allows you to delete an instance of a model from the database.

```javascript
// For example, to delete a user named Johnny,
// first find the user
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

# Query Modifiers
Modifiers can be used in your database queries.  These make it easier to get information from your database without having to write a bunch of code. Currently supported modifiers are _contains_, _or_, _startsWith_, _endsWith_, _greaterThan_, _lessThan_, _>=_, and _<=_.  Each of these are shown in examples below.

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

In schemaful databases (like MySQL) schema migrations occur automatically.  Models default to `migrate:alter`, which tells Sails to attempt to auto-migrate the schema.

Explicit production data migrations, like in Rails, do not exist at this time-- production data is precious, and manual migrations can be dangerous.  However, if this is a feature that you are interested in, please submit an issue, or better yet, a pull-request!