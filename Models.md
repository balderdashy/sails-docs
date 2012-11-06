Like most MVC frameworks, Sails provides an ORM (Object Relational Mapping) for normalizing interactions with models, no matter what data source you're using.  It also defines an interface for mapping your own custom models from external APIs, not-yet-supported databases, or in-memory state (i.e. Session storage.)

# Supported Databases
* mySQL
* Postgres
* SQLite
* Coming soon: MongoDB
* Coming soon: In-memory development db

# What is a Model?
A model is a persistent data type: a representation of data stored in a database.  If you're using mySQL, a model might correspond to a table.  If you're using MongoDB, it might correspond to a collection.  In either case, our goal is to provide a simple, modular way of managing data without relying on any one type of database.

# How do I define a Model?
Model definitions contain attributes and associations.

### Attributes
Attributes are basic pieces of information about a model.  For instance, a model called `Person` might have an attributes called `name`, `phoneNumber`, `age`, `birthDate` and `emailAddress`.  The model definition for `Person` might look like this:

```
// Person.js
Person = Model.extend({
  name: STRING,
  age: INTEGER,
  birthDate: DATE,
  phoneNumber: STRING,
  emailAddress: STRING
});
```

Data types (type)
updatedAt
createdAt
Validation rules
defaultValue


### Associations

Associations describe how models are connected to each other.  The concept originates from SQL databases, but it has analogues in noSQL databases as well (links and embeds).  NoSQL support for Sails' ORM is currently under development.

<!---
Since Sails supports both relational and non-relational databases, we must support both standard SQL associations (links) and bundled JSON, Mongo-style associations (embeds)

## Embedding
_TODO_

## Linking
_TODO_
-->

#### One-To-One
_TODO_

#### One-To-Many
_TODO_

#### Many-To-Many
_TODO_

# Where do I define Models?
Models are defined in the `models` directory in the root of your Sails application.


# Querying Models
You'll want to create, access, modify, and destroy models from controllers, views, services, and policies, and so you'll need a way to deal with them.  


<!---
Sails supports two different ways of interacting with models: Promises and asynchronous callbacks.

### Promises
```
Rabbit.create({
  name: 'Roger',
  age: 4
});
```

### Async Callbacks
```
Rabbit.create({
  name: 'Roger',
  age: 4
}).done(function (err,resultSet) { /* ... */ });
```
-->

## create
To create a new instance of a model in the database, use `create()`.

```
// For example
User.create({
  name: 'Mike',
  age: 13,
  phoneNumber: '(512)-555-5555'
}).done(function (err,user) {
  // 
  if (err) {
    // An error occurred (err)
  }
  else {
    // The User was created successfully!
    console.log("User created:", user);
  }
});
```

## find
To lookup a model by id, use `find(id)`.

```
// For example
User.find(123).done(function (err,user) {
  if (err) {
    // An error occurred (err)
  }
  else {
    // User 123 was found
    console.log("User found:", user);
  }
});
```

## findAll
`findAll()` lets you search for one or more models which meet the criteria you specify (using `where`).  You can also include a `limit` (max number of models to return), `offset` (useful for pagination), and sort `order`.

```
// For example, this query returns the first ten 18 year olds, sorted alphabetically
User.findAll({
  where: {
    age: 18
  },
  limit: 10,
  order: "name ASC"
}).done(function (err,users) {
  if (err) {
    // An error occurred (err)
  }
  else {
    console.log("Users found:", users);
  }
});
```

## updateAttributes
```
`updateAttributes()` allows you to update an instance of a model from the database.

// For example, to update a user's name, 
// first we find the user
User.find({ where: { name: 'Johnny' } }).done(function (err,someUser) {
  // Then we update its name
  someUser.updateAttributes({
    name: 'Anonymous'
  }).done(function (err,user) {
    if (err) {
      // An error occurred (err)
    }
    else {
      // The User was updated successfully!
      console.log("User updated:", user);
    }
  });
});
```

## destroy
`destroy()` allows you to delete an instance of a model from the database.

```
// For example, to delete a user named Johnny,
// first find the user
User.find({ where: { name: 'Johnny' } }).done(function (err,someUser) {
  // Then we delete it
  someUser.destroy().done(function (err,user) {
    if (err) {
      // An error occurred (err)
    }
    else {
      // Johnny was deleted!
      console.log("User deleted:", user);
    }
  });
});
```


# What About Migrations?

Migrations are possible using Sequelize: http://www.sequelizejs.com/#migrations