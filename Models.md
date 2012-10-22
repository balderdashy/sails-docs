_TODO_

# What is a Model?
_TODO_

# Where do I define Models?
_TODO_

# Overview
Like most MVC frameworks, Sails provides an ORM (Object Relational Mapping) for normalizing interactions with models, no matter what data source you're using.  It also defines an interface for mapping your own custom models from external APIs, not-yet-supported databases, or in-memory state (i.e. Session storage.)

# Supported Database
* mySQL
* MongoDB
* Postgres
* SQLite

# Associations
Since Sails supports both relational and non-relational databases, we must support both standard SQL associations (links) and bundled JSON, Mongo-style associations (embeds)

## Embedding
_TODO_

## Linking
_TODO_

# Querying Models
You'll want to create, access, modify, and destroy models from controllers, views, services, and policies, and so you'll need a way to deal with them.  Sails supports two different ways of interacting with models: Promises and asynchronous callbacks.

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

## Create
_TODO_

## Read
_TODO_

## Update
_TODO_

## Destroy
_TODO_

# Validation
_TODO_

# What About Migrations?

Migrations are possible using our ORM (Sequelize).  However, we've found for most basic use cases, the built-in, configurable DB synchronization is sufficient.