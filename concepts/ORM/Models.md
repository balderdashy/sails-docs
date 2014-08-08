# Models

A model represents a collection of structured data, usually corresponding to a single table or collection in a database.  Models are usually defined by creating a file in an app's `api/models/` folder.

![screenshot of a Waterline/Sails model in Sublime Text 2](http://i.imgur.com/8uRlFi8.png)


<!--

// api/models/Product.js
module.exports = {
  attributes: {
    nameOnMenu: { type: 'string' },
    price: { type: 'string' },
    percentRealMeat: { type: 'float' },
    numCalories: { type: 'integer' }
  }
}
-->


### Using models

Models may be accessed from our controllers, policies, services, responses, tests, and in custom model methods.  There are many built-in methods available on models, the most important of which are the query methods: [find](http://beta.sailsjs.org/#/documentation/reference/waterline/models/find.html), [create](http://beta.sailsjs.org/#/documentation/reference/waterline/models/create.html), [update](http://beta.sailsjs.org/#/documentation/reference/waterline/models/update.html), and [destroy](http://beta.sailsjs.org/#/documentation/reference/waterline/models/destroy.html).  These methods are [asynchronous](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) - under the covers, Waterline has to send a query to the database and wait for a response.

Consequently, query methods return a deferred query object.  To actually execute a query, `.exec(cb)` must be called on this deferred object, where `cb` is a callback function to run after the query is complete.

Waterline also includes opt-in support for promises.  Instead of calling `.exec()` on a query object, we can call `.then()`, `.spread()`, or `.fail()`, which will return a [Q promise](https://github.com/kriskowal/q).





### Model Methods (aka "static" or "class" methods)

Model class methods are functions built into the model itself that perform a particular task on its instances (records).  This is where you will find the familiar CRUD methods for performing database operations like `.create()`, `.update()`, `.destroy()`, `.find()`, etc.


###### Custom model methods

Waterline allows you to define custom methods on your models.  This feature takes advantage of the fact that Waterline models ignore unrecognized keys, so you do need to be careful about inadvertently overriding built-in methods and dynamic finders (don't define methods named "create", etc.)  Custom model methods are most useful for extrapolating controller code that relates to a particular model; i.e. this allows you to pull code your controllers and into reusuable functions that can be called from anywhere (i.e. don't depend on `req` or `res`.)

Model methods are generally asynchronous functions.  By convention, asynchronous model methods should be 2-ary functions, which accept an object of inputs as their first argument (usually called `opts` or `options`) and a Node callback as the second argument.  Alternatively, you might opt to return a promise (both strategies work just fine- it's a matter of preference.  If you don't have a preference, stick with Node callbacks.)

A best practice is to write your static model method so that it can accept either a record OR its primary key value.  For model records that operate on/from _multiple_ records at once, you should allow an array of records OR an array of primary key values to be passed in.  This takes more time to write, but makes your method much more powerful.  And since you're doing this to extrapolate commonly-used logic anyway, it's usually worth the extra effort.

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


#### Dynamic Finders

These are special static methods that are dynamically generated by Sails when you lift your app.  For instance, if your Person model has a "firstName", you might run:

```js
Person.findByFirstName('emma').exec(function(err,people){ ... });
```


#### Resourceful Pubsub Methods

A special type of model methods which are attached by the pubsub hook.  More on that in the [section of the docs on resourceful pubsub](http://sailsjs.org/#/documentation/reference/websockets/resourceful-pubsub).


<!--
another special type of class method.  It stands for 'Publish, Subscribe' and that's just what they do. These methods play a big role in how Sails integrates and utilizes Socket.IO.  They are used to subscribe clients to and publish messages about the creation, update, and destruction of models.  If you want to build real-time functionality in Sails, these will come in handy.
-->

#### Attribute Methods (i.e. record/instance methods)

Attribute methods are functions available on records (i.e. model instances) returned from Waterline queries.  For example, if you find the ten students with the highest GPA from the Student model, each of those student records will have access to all the built-in attribute methods, as well as any custom attribute methods defined on the Student model.

###### Built-in attribute methods
Every Waterline model includes some attribute methods automatically, including:

+ [`.toJSON()`]()
+ [`.save()`]()
+ [`.destroy()`]()
+ [`.validate()`]()


<!-- note to self- we should bundle a getPrimaryKeyValue() attribute method on every model in waterline core (or maybe just getId() since "id" is simpler to understand) ~mike - aug2,2014 -->


###### Custom attribute methods

Waterline models also allow you to define your own custom attribute methods.  Define them like any other attribute, but instead of an attribute definition object, write a function on the right-hand-side.


```js
// From api/models/Person.js...

module.exports = {
  attributes: {
    // Primitive attributes
    firstName: {
      type: 'string',
      defaultsTo: ''
    },
    lastName: {
      type: 'string',
      defaultsTo: ''
    },

    // Associations (aka relational attributes)
    spouse: { model: 'Person' },
    pets: { collection: 'Pet' },

    // Attribute methods
    getFullName: function (){
      return this.firstName + ' ' + this.lastName;
    },
    isMarried: function () {
      return !!this.spouse;
    },
    isEligibleForSocialSecurity: function (){
      return this.age >= 65;
    },
    encryptPassword: function () {

    }
  }
};
```

> Note that with the notable exception of the built-in `.save()` and `.destroy()` attribute methods, attribute methods are almost always _synchronous_ by convention.


###### When to write a custom attribute method

Custom attribute methods are particularly useful for extracting some information out of a record.  I.e. you might want to reduce some information from one or more attributes (i.e. "is this person married?"")

```js
if ( rick.isMarried() ) {
  // ...
}
```



###### When NOT to write a custom attribute method

You should **avoid writing your own _asynchronous_ attribute methods**.  While built-in asynchronous attribute methods like `.save()` and `.destroy()` can be convenient from your app code, writing your _own_ asynchronous attribute methods can sometimes have unintended consequences, and is not the most efficient way to build your app.

For instance, consider an app that manages wedding records.  You might think to write an attribute method on the Person model that updates the `spouse` attribute on both individuals in the database.  This would allow you to write controller code like:

```js
personA.marry(personB, function (err) {
  if (err) return res.negotiate(err);
  return res.ok();
})
```

Which looks great...until you need to write a different action where you don't have an actual record for "personA".

A better strategy is to write a custom (static) model method instead.  This makes your function more reusable/versatile, since it will be accessible whether or not you have an actual record instance on hand.  You might refactor the code from the previous example to look like:

```js
Person.marry([joe,raquel], function (err) {
  if (err) return res.negotiate(err);
  return res.ok();
})
```



###### Naming your attribute methods
Make sure you use a naming convention that helps you avoid confusing **attribute methods** from _attribute values_ when you're working with records in your app.  A good best practice is to use "get*" (e.g. `getFullName()`) prefix and avoid writing attribute methods that change records in-place.

<!--

Imagine you have a small monkey named Timothy that rides on your shoulders and styles your hair when you are scheduled to speak at a conference.  In this scenario, you are a record of the `Person` model and Timothy is a record of the `Monkey` model. The `Person` model has primitive attributes like "name", "email", and "phoneNumber", and relational attributes like "petMonkey" (points to an individual `Monkey`) and "mom" (points to an individual `Person`).  Meanwhile the `Monkey` model has primitive attributes "name", "age", and "demeanor", as well as an relational attribute: "petOfPerson" (which points to an individual person).


Everyone knows that a person can style her own hair, but it is more efficient if her pet monkey does it.  We can represent this by definining `styleHair: function (cb){ return cb(); }` as an attribute method on Person and `styleOwnersHair: function (cb){ return cb();}` as an attribute method on Monkey.


If your app involves multigenerational hair-styling, you might think it would make sense to write an attribute method on the Monkey model called "getOwnersGrandma()" which would call a callback with the monkey's owner's mom's mom.
-->

<!--

###### an aside about promises

Promises are most effective when used to handle asynchronous, but referentially transparent ("nullipotent") operations; i.e. logic without any side-effects.
-->




<docmeta name="uniqueID" value="Models413907">
<docmeta name="displayName" value="Models">
