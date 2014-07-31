
# Models

A model represents a collection of structured data, usually corresponding to a single table or collection in a database.  Models are defined by creating a file in an app's `api/models/` folder.

```javascript
// api/models/Product.js
module.exports = {
  attributes: {
    nameOnMenu: { type: 'string' },
    price: { type: 'string' },
    percentRealMeat: { type: 'float' },
    numCalories: { type: 'integer' }
  }
}
```

### Using models

Models may be accessed from our controllers, policies, services, responses, tests, and in custom model methods.  There are many built-in methods available on models, the most important of which are the query methods: [find](http://beta.sailsjs.org/#/documentation/reference/waterline/models/find.html), [create](http://beta.sailsjs.org/#/documentation/reference/waterline/models/create.html), [update](http://beta.sailsjs.org/#/documentation/reference/waterline/models/update.html), and [destroy](http://beta.sailsjs.org/#/documentation/reference/waterline/models/destroy.html).  These methods are [asynchronous](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) - under the covers, Waterline has to send a query to the database and wait for a response.

Consequently, query methods return a deferred query object.  To actually execute a query, `.exec(cb)` must be called on this deferred object, where `cb` is a callback function to run after the query is complete.

Waterline also includes opt-in support for promises.  Instead of calling `.exec()` on a query object, we can call `.then()`, `.spread()`, or `.fail()`, which will return a [Q promise](https://github.com/kriskowal/q).



### Class methods

Besides data, models may also have **class methods**: functions built into the model itself that perform some task. **Class methods** are functions available at the top level of a model.  These are useful for pulling code out of our controllers and into reusuable functions that can be called from anywhere (i.e. don't depend on `req` or `res`.)

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

<docmeta name="uniqueID" value="Models413907">
<docmeta name="displayName" value="Models">
