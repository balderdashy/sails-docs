# Working with Queries

**Queries** (aka _query instances_) are the chainable deferred objects returned from model methods like `.find()` and `.create()`.  They represent a not-quite-yet-fulfilled intent to fetch or modify records from the database.


```usage
var query = Zookeeper.find();
```

The purpose of query instances is to provide a convenient, chainable syntax for working with your models.  Methods like `.populate()`, `.where()`, and `.sort()` allow you to refine database calls _before_ they're sent down the wire. Then, when you're ready to fire the query off to the database, you can just `await` it.

> If you are using an older version of Node.js, that does not support JavaScript's `await` keyword, you can use `.exec()`, or `.then()`+`.catch()`.  See the section on "Promises and Callbacks" below for more information.

Most of the time, you won't think about query instances as objects _per se_, rather as just another part of the syntax for communicating with the database.  In fact, you may already be using these objects in your Sails app! If so, the following syntax should look familiar:

```js
var zookeepers = await Zookeeper.find();
```

In this example, the call to `Zookeeper.find()` returns a query instance, but _doesn't actually do anything_ until it is executed using the `await` keyword, and then the result is assigned to the `zookeepers` variable.


### How It Works

When you **execute** a query using `await`, a lot happens:

```js
await query;
```

First, it is "shaken out" by Waterline core into a [normalized query](http://sailsjs.com/documentation/concepts/models-and-orm/query-language).  Then it passes through the relevant Waterline adapter(s) for translation to the raw query syntax of your database(s) (e.g. Redis or Mongo commands, various SQL dialects, etc.)  Next, each involved adapter uses its native Node.js database driver to send the query out over the network to the corresponding physical database.

When the adapter receives a response, it is marshalled to the Waterline interface spec and passed back up to Waterine core, where it is integrated with any other raw adapter responses into a coherent result set.  At that point, it undergoes one last normalization before being passed back to "userland" (i.e. your code) for consumption by your app.


### Error handling

You can use a try/catch to handle specific errors, if desired.

```js
var zookeepersAtThisZoo;
try {
  zookeepersAtThisZoo = await Zookeeper.find({
    zoo: req.param('zoo')
  }).limit(30);
} catch (err) {
  switch (err.name) {
    case 'UsageError': return res.badRequest(err);
    default: throw err;
  }
}

return res.json(zookeepersAtThisZoo);
```

The specific kinds of errors you could receive vary based on what kind of query you are executing.  See the reference docs for the various query methods for more specific information.


### Promises and Callbacks

As an alternative to `await`, Sails and Waterline provide support for callbacks and promise-chaining.  In general, you should **use `await` whenever possible**-- it leads to simpler, easier-to-understand code, and helps prevent DDoS vulnerabilities and stability issues which can arise from throwing uncaught exceptions in asynchronous callbacks.  That said, sometimes it is necessary to maintain backwards compatibility with an older version of Node.js.  For this reason, all queries in Sails and Waterline expose an [`.exec()`](https://sailsjs.com/documentation/reference/waterline/queries/exec) method.


```js
Zookeeper.find().exec(function afterFind(err, zookeepers) {

  // Careful!  Do not throw an error in here without a `try` block!
  // (Even a simple typo or null pointer exception could crash the process!)

  if (err) {
    // uh oh
    // (handle error; e.g. `return res.serverError(err)`)
    return;
  }

  // would you look at all those zookeepers?
  // (now let's do the next thing;
  //  e.g. `_.reduce(zookeepers, ...)` and/or `return res.json(zookeepers)`)
  // …
});
//
// (don't put code out here)
```


Similar to the example above, the query is not actually executed right away.  But in this example, instead of using `await` to execute the query and wait for its result, we use the traditional `.exec()` method with a callback function.  Note that, with this usage, we _cannot rely on try/catch and normal error handling in JavaScript_ to take care of our errors!  Instead, we have to manually handle that in our callback to .exec().  This style of error handling is the traditional approach in Node.js apps prior to ~Summer 2017.


Under the covers, Sails and Waterline also provide a minimalist integration with the [Bluebird](https://github.com/petkaantonov/bluebird) promise library, exposing `.then()` and `.catch()` methods.


```js
Zookeeper.find()
.then(function (zookeepers) {...})
.catch(function (err) {...});
//
// (don't put code out here)
```

In this example, the callback passed in to `.catch()` is equivalent to the contents of the `if(err) {}` block from the `.exec()` example above (e.g. `res.serverError()`).  Similarly, the `.then()` callback is equivalent to the code below the `if(err) {}` and early `return`.

If you are a fan of promises, and have a reasonable amount of experience with them, you should have no problem working with this interface.  However if you are not very familiar with promises, or don't care one way or another, you will probably have an easier time working with `.exec()`, since it uses standard Node.js callback conventions.

> If you decide to use traditional promise chaining for a particular query in your app, please make sure that you provide callbacks for both `.then()` _and_ `.catch()`.  Otherwise, errors could go unhandled, and unpleasant race conditions and memory leaks could ensue. This is not just a Sails or Waterline concept-- it is something to be aware of when using this type of usage in JavaScript in general; and particularly in Node.js, since undhandled errors in server-side code tend to be more problematic than their client-side counterparts.   Omitting `.catch()` is equivalent to ignoring the `err` argument in a conventional Node callback...and it is similarly insidious.  In fact, this is hands down one of the most common sources of bugs for Node.js developers of all skill and experience levels.
>
> It is easy to forget to do this, especially if you are new to asynchronous code.  But fortunately if you get in a habit of always handling your asynchronous errors directly after (or better yet _right before_) you write "normal" code to handle the sucessful case, you will quickly develop good habits that will make your apps immune to these sorts of bugs.
>
> Better yet- just use `await`!




### Notes

> + A query instance is _not exactly the same thing as a Promise_.  But it's close enough.  (The difference is that a query instance in Sails and Waterline is actually a Deferred, as implemented by the [parley](https://npmjs.com/package/parley) library.  That means it doesn't start executing immediately.  Instead, it only begins executing when you kick it off with either `await`, `.exec()`, `.then()`, or `.toPromise()`.)
> + A Node-style callback can be passed directly as an additional, final argument to model methods (e.g. `.find()`).  In this case, the query will be executed immediately, and model methods _will not_ return a query instance (instead, the Node-style callback you provided will be triggered when the query is complete).  But unless you are doing something very advanced, you are generally better off sticking to standard usage; i.e. calling `.exec()` or calling `.then()` and `.catch()`.



<docmeta name="displayName" value="Queries">
