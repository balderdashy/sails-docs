# Working with Queries

Chainable deferred objects returned from Waterline model methods like `.find()` and `.create()`.

```js
var query = Stuff.find();
```

You have likely already interacted with query objects in your Sails app. Most of the time, you probably won't think about them as objects _per se_, rather just another part of the syntax for communicating with the database.

The primary purpose of Waterline query instances is to provide a convenient, chainable syntax for working with your models.  Methods like `.populate()`, `.where()`, and `.sort()` allow you to refine database calls _before_ they're sent down the wire.  When you're ready to fire the query off to the database, you can just call [`.exec()`](/#/documentation/reference/waterline/queries/exec.html).


### Promises

In addition to the `.exec()` method, Waterline queries implement a partial integration with the [q](https://github.com/kriskowal/q) promise library, exposing `.then()` and `.catch()` methods.

```js
Stuff.find()
.then(function (allTheStuff) {...})
.catch(function (err) {...});
```


If you are a fan of promises, and have a reasonable amount of experience with them, you should have no problem working with this interface.  However if you are not very familiar with promises, or don't care one way or another, you will probably have an easier time working with `.exec()`, which uses standard Node.js callback conventions.

```js
Stuff.find()
.exec(function (err, allTheStuff) {...})
```


### Query Execution

When you **execute** a query, a lot happens:

```js
Zookeeper.find().exec(function (err, zookeepers){
  // would you look at all those zookeepers?
});
```

First, it is "shaken out" by Waterline core into a normalized [criteria object](/#/documentation/concepts/ORM/Querylanguage.html?q=query-language-basics).  Then it passes through the relevant Waterline adapter(s) for translation to the raw query syntax of your database(s) (e.g. Redis or Mongo commands, various SQL dialects, etc.)  Finally, each involved adapter uses its native Node.js database driver to send the query out over the network to the corresponding physical database.

When the adapter receives a response, it is marshalled to the Waterline interface spec and passed back up to Waterine core, where it is integrated with any other raw adapter responses into a coherent result set.  At that point, it undergoes one last normalization before being passed back to your callback for consumption by your app.


### Notes

> + Waterline model methods will **NOT** return a query instance if an optional callback is directly passed as the final argument.  Instead, that callback will be triggered when the query is complete.


<docmeta name="uniqueID" value="query820682">
<docmeta name="displayName" value="Queries">

