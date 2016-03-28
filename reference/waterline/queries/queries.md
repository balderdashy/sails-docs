# Working with Queries

**Query objects** (aka _query instances_) are the chainable deferred objects returned from model methods like `.find()` and `.create()`.  They represent a not-quite-yet-fulfilled intent to fetch or modify records from the database.


```js
var query = Zookeeper.find();
```

The purpose of query instances is to provide a convenient, chainable syntax for working with your models.  Methods like `.populate()`, `.where()`, and `.sort()` allow you to refine database calls _before_ they're sent down the wire. Then, when you're ready to fire the query off to the database, you can just call [`.exec()`](http://sailsjs.org/documentation/reference/waterline/queries/exec.html) (or if you are using promises, `.then()`).

Most of the time, you won't think about query instances as objects _per se_, rather as just another part of the syntax for communicating with the database.  In fact, you may already be using these objects in your Sails app! If so, the following syntax should look familiar:

```js
Zookeeper.find().exec(function afterFind(err, zookeepers) {
  if (err) {
    // uh oh
    // (handle error; e.g. `return res.negotiate()`)
    return;
  }
  
  // would you look at all those zookeepers?
  // (now let's do the next thing;
  //  e.g. `_.reduce(zookeepers, ...)` and/or `return res.json(zookeepers)`)
});
//
// (don't put code out here)
```


In this example, the call to `Zookeeper.find()` returns a query instance, but _doesn't actually do anything yet_.  The query is not actually executed until its `.exec()` method is called.



### Promises

As an alternative to the `.exec()` method, Sails and Waterline implement a minimalist integration with the [Bluebird](https://github.com/petkaantonov/bluebird) promise library, exposing `.then()` and `.catch()` methods.

```js
Zookeeper.find()
.then(function (zookeepers) {...})
.catch(function (err) {...});
//
// (don't put code out here)
```

In this example, the callback passed in to `.catch()` is equivalent to the contents of the `if(err) {}` block from the `.exec()` example above (e.g. `res.negotiate()`).  Similarly, the `.then()` callback is equivalent to the 

If you are a fan of promises, and have a reasonable amount of experience with them, you should have no problem working with this interface.  However if you are not very familiar with promises, or don't care one way or another, you will probably have an easier time working with `.exec()`, since it uses standard Node.js callback conventions.

> If you decide to use promises for a particular query in your app, please make sure that you provide callbacks for both `.then()` _and_ `.catch()`.  Otherwise, errors could go unhandled, and unpleasant race conditions and memory leaks could ensue. This is not just a Sails or Waterline concept-- it is something to be aware of when using promises in JavaScript in general; and particularly in Node.js, since undhandled errors in server-side code tend to be more problematic than their client-side counterparts.   Omitting `.catch()` is equivalent to ignoring the `err` argument in a conventional Node callback...and it is similarly insidious.  In fact, this is hands down one of the most common sources of bugs for Node.js developers of all skill and experience levels.
>
> It is easy to forget to do this, especially if you are new to asynchronous code.  But fortunately if you get in a habit of always handling your asynchronous errors directly after (or better yet _right before_) you write "normal" code to handle the sucessful case, you will quickly develop good habits that will make your apps immune to these sorts of bugs.



### How It Works

When you **execute** a query (using `.exec()` or `.then()`), a lot happens:

```js
query.exec(function (err, zookeepers) {...});
```

First, it is "shaken out" by Waterline core into a normalized [criteria object](http://sailsjs.org/documentation/concepts/ORM/Querylanguage.html?q=query-language-basics).  Then it passes through the relevant Waterline adapter(s) for translation to the raw query syntax of your database(s) (e.g. Redis or Mongo commands, various SQL dialects, etc.)  Next, each involved adapter uses its native Node.js database driver to send the query out over the network to the corresponding physical database.

When the adapter receives a response, it is marshalled to the Waterline interface spec and passed back up to Waterine core, where it is integrated with any other raw adapter responses into a coherent result set.  At that point, it undergoes one last normalization before being passed back to the callback you provided to `.exec()` for consumption by your app.


### Notes

> + A Node-style callback can be passed directly as an additional, final argument to model methods (e.g. `.find()`).  In this case, the query will be executed immediately, and model methods _will not_ return a query instance (instead, the Node-style callback you provided will be triggered when the query is complete).  But unless you are doing something very advanced, you are generally better off sticking to standard usage; i.e. calling `.exec()` or calling `.then()` and `.catch()`.



<docmeta name="displayName" value="Queries">
