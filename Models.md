# Supported Databases

* mySQL
* MongoDB
* Postgres
* SQLite

# Associations
Since Sails supports both relational and non-relational databases, we must support both standard SQL associations (links) and bundled JSON, Mongo-style associations (embeds)

## Embedding

## Linking


# Using Models in Controllers and Views
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

# Validation

# What About Migrations?

Migrations are possible using our ORM (Sequelize).  However, we've found for most basic use cases, the built-in, configurable DB synchronization is sufficient.