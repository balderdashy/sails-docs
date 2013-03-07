Like most MVC frameworks, Sails provides an ORM (Object Relational Mapping) for normalizing
interactions with models, no matter what data source you're using.  It also defines an interface
for mapping your own custom models from external APIs, not-yet-supported databases, or in-memory
state (i.e. Session storage.)

# Supported Databases:
* mySQL
* In-memory development: Dirty db;
* Coming soon: SQLite
* Coming soon: Postgres
* Coming soon: MongoDB

# What is a Model?
A model is a persistent data type: a representation of data stored in a database. If you're using
mySQL, a model might correspond to a table. If you're using MongoDB, it might correspond to a
collection. In either case, our goal is to provide a simple, modular way of managing data without
relying on any one type of database.

# How do I define a Model?
Model definitions contain attributes and associations.

### Attributes
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

Validation rules

defaultValue

### Adapters
If for some reason you need to override the app default adapter, you can do it here in models.  This will override the default _**ONLY**_ for this model.  

Here is an example in _api/models/User.js_
```javascript
module.exports = {
 adapter: 'sails-mysql',
 attributes: {

    // Simple attribute:
    name: 'STRING',
    email: 'STRING',
    phoneNumber: {
      type: 'STRING',
      defaultValue: '555-555-5555'
    }
 }
 
};
```
Our global is set to _disk_, however, since we overridded the adapter for our user model, our user model will now be stored in the sails-mysql connection.  This conneciton is still configured at _/config/adapters.js_.  More on configuration at [Guide: Configuration](/balderdashy/sails/wiki/Guide:-Configuration)

<!-- ### Associations -->

<!-- Associations describe how models are connected to each other.  The concept originates from SQL databases, but it has analogues in noSQL databases as well (links and embeds).  NoSQL support for Sails' ORM is currently under development. -->

<!---
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
You'll want to create, access, modify, and destroy models from controllers, views, services, and policies, and so you'll need a way to deal with them. Sails uses Waterline as its ORM. To learn more about it visit the 
<a href="https://github.com/balderdashy/waterline">Waterline github repo</a>.


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
`sort`. Find all will always retun an array even if only one model fits the criteria.

```
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

### dynamic finders
With Sails built in ORM , Waterline, you can use a very helpful tool called dynamic finders. You can
query your models with automatically genereated methods that depend on the attributes you define for
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

# What About Migrations?

Migrations happen automatically. Data migrations do not exist at this time but you can contact us
if this is a feature that you are interested in.