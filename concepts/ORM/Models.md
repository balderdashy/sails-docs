# Models

A model represents a set of structured data, called records.  Models usually correspond to a table/collection in a database, attributes correspond to columns/fields, and records correspond to rows/documents.

### Defining models

By convention, models are defined by creating a file in a Sails app's `api/models/` folder:

```javascript
// api/models/Product.js
module.exports = {
  attributes: {
    nameOnMenu: { type: 'string', required: true },
    price: { type: 'string', required: true },
    percentRealMeat: { type: 'float', defaultsTo: 20 },
    numCalories: { type: 'integer' },
  },
};
```

For a complete walkthrough of available options when setting up a model definition, see [Model Settings](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings), [Attributes](http://sailsjs.com/documentation/concepts/models-and-orm/attributes), and [Associations](http://sailsjs.com/documentation/concepts/models-and-orm/associations).

<!--
commented-out content at: https://gist.github.com/rachaelshaw/1d7a989f6685f11134de3a5c47b2ebb8#1


commented-out content at: https://gist.github.com/rachaelshaw/1d7a989f6685f11134de3a5c47b2ebb8#2
-->



### Using models

Once a Sails app is running, its models may be accessed from within controller actions, helpers, tests, and just about anywhere else you normally write code.  This lets your code call model methods to communicate with your database (or even with multiple databases).

There are many built-in methods available on models, the most important of which are the query methods like [.find()](http://sailsjs.org/documentation/reference/waterline/models/find) and [.create()](http://sailsjs.org/documentation/reference/waterline/models/create).  You can find detailed usage documentation for methods like these in [Reference > Waterline (ORM) > Models](http://sailsjs.com/documentation/reference/waterline-orm/models).


### Query methods

Every model in Waterline will have a set of query methods exposed on it to allow you to interact with the database in a normalized fashion. These are known as the CRUD (Create-Read-Update-Delete) methods and is the primary way of interacting with your data.

There are also a special set of queries known as dynamic queries. These are special class methods that are dynamically generated when you initialize Waterline. We call them dynamic finders. They perform many of the same functions as the other class methods but you can call them directly on an attribute in your model.

Since they have to send a query to the database and wait for a response, query methods are **asynchronous functions**.  That is, they don't come back with an answer right away.  Like other asynchronous functions in JavaScript (`setTimeout()` for example), that means we need some other way of determining when they've finished executing, whether they were successful, and if not, what kind of error (or other exceptional circumstance) occurred.

In Node.js, Sails, and JavaScript in general, the classic way to support this paradigm is by using _callbacks_.

##### Callbacks

For convenience, built-in model methods return a _deferred object_ known as a "query":

```javascript
var query = User.findOne({ name: 'Rose' });
```

After running [the code above](https://gist.github.com/mikermcneil/c6a033d56497e9930a363a2949284fd3), our app has not _actually_ talked to the database yet.  To actually execute a query, `.exec(cb)` must be called on this deferred object, where `cb` is a callback function to run after the query is complete:

```javascript
query.exec(function (err, rose) {
  if (err) { return res.serverError(err); }
  if (!rose) { return res.notFound(); }
  return res.json(rose);
});
```

> In addition to `.exec()`, many Sails apps benefit from using the [async](https://www.npmjs.com/package/async) library.  In fact, to facilitate this, Sails provides an [easy way](http://sailsjs.com/documentation/reference/configuration/sails-config-globals) to access `async` throughout your app.


##### Promises

As an alternative to callbacks, Waterline also includes opt-in support for promises.  Instead of calling `.exec()` on a query, you can choose to call `.then()`, `.spread()`, or `.catch()`, which will begin executing the query and return a [Bluebird promise](https://github.com/petkaantonov/bluebird).

> If you are not already an avid user of promises, don't worry-- [just stick with `.exec()`](https://github.com/balderdashy/sails/issues/3459#issuecomment-171039631).  The decision of whether to use callbacks or promises is a question of style, so don't feel pressured one way or the other.

### Resourceful pubsub methods

Sails also provides a few other "resourceful pubsub" (or "RPS") methods, specifically designed for performing simple realtime operations using dynamic rooms.  For more information about those methods, see [Reference > WebSockets > Resourceful PubSub](http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub).


### Custom model methods

In addition to the built-in functionality provided by Sails, you can also define your own custom model methods.  Custom model methods are most useful for extrapolating controller code that relates to a particular model; i.e. this allows you to pull code out of your controllers and into reusuable functions that can be called from anywhere (i.e. don't depend on `req` or `res`.)

> This feature takes advantage of the fact that models ignore unrecognized settings, so you do need to be careful about inadvertently overriding built-in methods and dynamic finders (don't define methods named "create", etc.)

Model methods can be synchronous or asynchronous functions, but more often than not, they're _asynchronous_.  By convention, asynchronous model methods should be 2-ary functions, which accept `options` as their first argument, and a Node-style callback as the second argument.  Alternatively, instead of a callback, you might choose to return a promise (both strategies work just fine- it's a matter of preference.  If you don't have a preference, stick with Node callbacks.)

##### Best practices

One best practice is to write your static model method so that it can accept either a record OR its primary key value.  For model methods that operate on/from _multiple_ records at once, you should allow an array of records OR an array of primary key values to be passed in.  This takes more time to write, but makes your method much more powerful.  And since you're doing this to extrapolate commonly-used logic anyway, it's usually worth the extra effort.

For example:

```js
// in api/models/Monkey.js...

// Find monkeys with the same name as the specified person
findWithSameNameAsPerson: function (opts, cb) {

  var person = opts.person;

  // Before doing anything else, check if a primary key value
  // was passed in instead of a record, and if so, lookup which
  // person we're even talking about:
  (function _lookupPersonIfNecessary(afterLookup){
    // (this self-calling function is just for concise-ness)
    if (typeof person === 'object')) return afterLookup(null, person);
    Person.findOne(person).exec(afterLookup);
  })(function (err, person){
    if (err) return cb(err);
    if (!person) {
      err = new Error();
      err.message = require('util').format('Cannot find monkeys with the same name as the person w/ id=%s because that person does not exist.', person);
      err.status = 404;
      return cb(err);
    }

    Monkey.findByName(person.name)
    .exec(function (err, monkeys){
      if (err) return cb(err);
      cb(null, monkeys);
    })
  });

}
```

Then you can do:

```js
Monkey.findWithSameNameAsPerson(albus, function (err, monkeys) { ... });
// -or-
Monkey.findWithSameNameAsPerson(37, function (err, monkeys) { ... });
```

> For more tips, read about the incident involving [Timothy the Monkey]().

Another example:

```javascript
// api/models/User.js
module.exports = {

  attributes: {

    name: {
      type: 'string'
    },
    enrolledIn: {
      collection: 'Course', via: 'students'
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




##### What about instance methods?

As of Sails v1.0, instance methods have been removed from Sails and Waterline.  While instance methods like `.save()` and `.destroy()` were sometimes convenient in app code, in Node.js at least, many users found that they led to unintended consequences and design pitfalls.

For example, consider an app that manages wedding records.  It might seem like a good idea to write an instance method on the Person model to update the `spouse` attribute on both individuals in the database.  This would allow you to write controller code like:

```js
personA.marry(personB, function (err) {
  if (err) { return res.serverError(err); }
  return res.ok();
})
```

Which looks great...until it comes time to implement a slightly different action with roughly the same logic, but where the only available data is the id of "personA" (not the entire record.)  In that case, you're stuck rewriting your instance method as a static method anyway!

A better strategy is to write a custom (static) model method from the get-go.  This makes your function more reusable/versatile, since it will be accessible whether or not you have an actual record instance on hand.  You might refactor the code from the previous example to look like:

```js
Person.marry(personA.id, personB.id, function (err) {
  if (err) { return res.serverError(err); }
  return res.ok();
})
```


<!--
commented-out content at: https://gist.github.com/rachaelshaw/1d7a989f6685f11134de3a5c47b2ebb8#3


commented-out content at: https://gist.github.com/rachaelshaw/1d7a989f6685f11134de3a5c47b2ebb8#4

commented-out content at: https://gist.github.com/rachaelshaw/1d7a989f6685f11134de3a5c47b2ebb8#5

commented-out content at: https://gist.github.com/rachaelshaw/1d7a989f6685f11134de3a5c47b2ebb8#6
-->

<docmeta name="displayName" value="Models">
