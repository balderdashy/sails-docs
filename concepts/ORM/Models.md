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
    percentRealMeat: { type: 'number', defaultsTo: 20, columnType: 'FLOAT' },
    numCalories: { type: 'number' },
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

There are many built-in methods available on models, the most important of which are the query methods like [.find()](http://sailsjs.com/documentation/reference/waterline/models/find) and [.create()](http://sailsjs.com/documentation/reference/waterline/models/create).  You can find detailed usage documentation for methods like these in [Reference > Waterline (ORM) > Models](http://sailsjs.com/documentation/reference/waterline-orm/models).


### Query methods

Every model in Waterline will have a set of query methods exposed on it to allow you to interact with the database in a normalized fashion. These are known as the CRUD (Create-Read-Update-Delete) methods and is the primary way of interacting with your data.

Since they have to send a query to the database and wait for a response, query methods are **asynchronous functions**.  That is, they don't come back with an answer right away.  Like other asynchronous functions in JavaScript (`setTimeout()` for example), that means we need some other way of determining when they've finished executing, whether they were successful, and if not, what kind of error (or other exceptional circumstance) occurred.

As of Sails 1.0 the recommended way to handle this is by using `async/await`, which is built on top of promises.

In order to be able to `await` a `promise`, said `promise` needs to be within an `async` function, which is declared with `async function`, instead of the traditional `function`. More info on this [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).

##### Async/Await

```javascript
async function findRose() {
	try {
		const user = await User.findOne({ name: 'Rose' });
		if (!user) { return res.notFound(); }
		return res.json(rose);
	} catch (err) {
		return res.serverError(err);
	}
}
```
> Note: It is highly advisable that you understand `promises` too, as `async/await` is built on top of them. 
 
It is **very important** that you handle your errors, as a `promise` rejection will throw an error which will "bubble up" until it gets caught or ends the process. This is why we wrapped our code in a `try/catch` block.

Although `async/await` is recommended you can still use JavaScript's classic _callbacks_.

##### Callbacks

For convenience, built-in model methods return a _deferred object_ known as a "query":

```javascript
var query = User.findOne({ name: 'Rose' });
```

After running [the code above](https://gist.github.com/mikermcneil/c6a033d56497e9930a363a2949284fd3), our app has not _actually_ talked to the database yet.  To actually execute this query, `.exec(cb)` must be called on this deferred object, where `cb` is a callback function to run after the query is complete:

```javascript
query.exec(function (err, rose) {
  if (err) { return res.serverError(err); }
  if (!rose) { return res.notFound(); }
  return res.json(rose);
});
```

> In addition to `.exec()`, many Sails apps benefit from using the [async](https://www.npmjs.com/package/async) library.  In fact, to facilitate this, Sails provides an [easy way](http://sailsjs.com/documentation/reference/configuration/sails-config-globals) to access `async` throughout your app.


##### Promises

As an in-between alternative to callbacks and `async/await`, promises are also a valid approach.  Instead of `await` a promise or calling `.exec()` on a query, you can choose to call `.then()`, `.spread()`, or `.catch()`, which will begin executing the query and return a [Bluebird promise](https://github.com/petkaantonov/bluebird).

### Resourceful pubsub methods

Sails also provides a few other "resourceful pubsub" (or "RPS") methods, specifically designed for performing simple realtime operations using dynamic rooms.  For more information about those methods, see [Reference > WebSockets > Resourceful PubSub](http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub).


### Custom model methods

In addition to the built-in functionality provided by Sails, you can also define your own custom model methods.  Custom model methods are most useful for extrapolating controller code that relates to a particular model; i.e. this allows you to pull code out of your controllers and into reusuable functions that can be called from anywhere (i.e. don't depend on `req` or `res`.)

> This feature takes advantage of the fact that models ignore unrecognized settings, so you do need to be careful about inadvertently overriding built-in methods (don't define methods named "create", etc.)

Model methods can be synchronous or asynchronous functions, but more often than not, they're _asynchronous_.  By convention, asynchronous model methods should be 2-ary functions, which accept `options` as their first argument, and a Node-style callback as the second argument.  Alternatively, instead of a callback, you might choose to return a promise (both strategies work just fine- it's a matter of preference.  If you don't have a preference, stick with Node callbacks.)

##### Best practices

One best practice is to write your static model method so that it can accept either a record OR its primary key value.  For model methods that operate on/from _multiple_ records at once, you should allow an array of records OR an array of primary key values to be passed in.  This takes more time to write, but makes your method much more powerful.  And since you're doing this to extrapolate commonly-used logic anyway, it's usually worth the extra effort.

For example:

```js
// in api/models/Monkey.js...

// Find monkeys with the same name as the specified person
findWithSameNameAsPerson: async function (opts) {
	var person = opts.person;
	if (typeof person !== 'object') {
		person = await Person.findOne(person);
	}
	
	if (!person) {
		let err = new Error();
		err.message = require('util').format('Cannot find monkeys with the same name as the person w/ id=%s because that person does not exist.', person);
		err.status = 404;
		throw err;
	}
	
	return Monkey.find({ name: person.name });
}
```
> Notice we didn't `await` the final `find`. This is because `findWithSameNameAsPerson`, by being `async`, always returns a `promise`, so it needs to be `await`ed (or `.then`ed) when you use it.
> 
> Also on that point, we didn't `try/catch` any of the code within that function, that's because we intend to leave that responsibility to whoever calls our function (possibly a controller of some sort).

Then you can do:

```js
const monkeys = await Monkey.findWithSameNameAsPerson(albus);
// -or-
const monkeys = await Monkey.findWithSameNameAsPerson(37);
```

> For more tips, read about the incident involving [Timothy the Monkey]().

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

### Case Sensitivity

Queries in Sails 1.0 are no longer forced to be case *insensitive* regardless of how the database processes the query. This leads to much improved query performance and better index utilization. Most databases are case *sensitive* by default but in the rare cases where they aren't and you would like to change that behavior you must modify the database to do so.

For example by default MySQL will use a database collation that is case *insensitive* which is different from sails-disk so you may experience different results from development to production. In order to fix this you can set the tables in your MySQL database to a case *sensitive* collation such as `utf8_bin`.


<!--
commented-out content at: https://gist.github.com/rachaelshaw/1d7a989f6685f11134de3a5c47b2ebb8#3


commented-out content at: https://gist.github.com/rachaelshaw/1d7a989f6685f11134de3a5c47b2ebb8#4

commented-out content at: https://gist.github.com/rachaelshaw/1d7a989f6685f11134de3a5c47b2ebb8#5

commented-out content at: https://gist.github.com/rachaelshaw/1d7a989f6685f11134de3a5c47b2ebb8#6
-->

<docmeta name="displayName" value="Models">
