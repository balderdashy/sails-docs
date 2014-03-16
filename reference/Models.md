# Models

### Overview

A model represents a collection of structured data, usually corresponding to a single table in a database.  Models are defined by creating a file in an app's `api/models/` folder.


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


### Attributes


> TODO: address sql vs. no sql and stuff like:
> """
> In most cases, this data is _homogenous_, meaning each record has the same attributes, 
> """


### Adapters

Like most MVC frameworks, Sails supports [multiple databases]().  That means the syntax to query and manipulate our data is always the same, whether we're using MongoDB, MySQL, or any other supported database.

Waterline builds on this flexibility with its concept of adapters.  An adapter is a bit of code that maps methods like `find()` and `create()` to a lower-level syntax like `SELECT * FROM` and `INSERT INTO`.  The Sails core team maintains open-source adapters for a handful of the [most popular databases](), and a wealth of [community adapters]() are also available.

Custom Waterline adapters are actually [pretty simple to build](), and can make for more maintainable integrations; anything from a proprietary enterprise system, to an open API like LinkedIn, to a cache or traditional database.


### Connections

A **connection** represents a particular database configuration.  It includes an adapter, as well as information like the host, port, username, password, and so forth.  Connections are defined in [`config/connections.js`]().

```javascript
// in config/connections.js
// ...
{
	adapter: 'sails-mysql',
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'g3tInCr4zee&stUfF'
}
// ...
```

### Class methods

Besides data, models may also have class methods: functions built into the model itself that perform some task.

```javascript
// api/models/User.js
module.exports = {

  attributes: {

  	name: { 
  		type: 'string'
  	},
  	enrolledIn: {
  		collection: 'Course.students', via: 'students'
  	}
	},

	/**
	 * Enrolls a user in one or more courses.
	 * @param  {Object}   options
	 * 						=> courses {Array} list of course ids
	 * 						=> id {Integer} id of the enrolling user
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



#### Lifecycle Callbacks

Sails exposes a number of functions that can be called at various times during your query.  Look here for information on how to use custom logic at a specific time relative to your query. 

#### Validations

> TODO

#### Associations Between Models

> TODO










### Object Relational Mapping (ORM)

Sails comes installed with its default ORM called Waterline, a datastore-agnostic tool that dramatically simplifies interaction with one or more databases.  It provides an abstraction layer on top of the underlying database, allowing you to easily query and manipulate your data without writing nasty integration code.

For instance, in schemaful databases like Postgres, Oracle, and MySQL, models are represented by tables.  In MongoDB, they're represented by Mongo "collections".  In Redis, they're represented using key/value pairs.

But in each case, the code you write to create new records, fetch/search for existing records, update records, or destroy records is _exactly the same_. This means that you can switch some or all of your app's models from Mongo, to Postgres, to MySQL, to Redis, and back again - without changing any code.

> Yet sometimes, we still want database-specific functionality.  Luckily, Waterline provides a query interface that allows us to talk directly to the our models' underlying database driver.  See [.query()]() and [.native()]().


### Analogy

Imagine a file cabinet full of completed pen-and-ink forms. All of the forms have the same fields (e.g. "name", "birthdate", "maritalStatus"), but for each form, the _values_ written in the fields vary.  For example, one form might contain "Lara", "2000-03-16T21:16:15.127Z", "single", while another form contains "Larry", "1974-01-16T21:16:15.127Z", "married".

Now imagine you're running a hotdog business.  If you were _very_ organized, you might set up your file cabinets as follows:

+ **Employee** (contains your employee records)
  + `fullName`
  + `hourlyWage`
  + `phoneNumber`
+ **Location** (contains a record for each location you operate)
  + `streetAddress`
  + `city`
  + `state`
  + `zipcode`
  + `purchases`
    + a list of all the purchases made at this location
  + `manager`
    + the employee who manages this location
+ **Purchase** (contains a record for each purchase made by one of your customers)
  + `madeAtLocation`
  + `productsPurchased`
  + `createdAt`
+ **Product** (contains a record for each of your various product offerings)
  + `nameOnMenu`
  + `price`
  + `numCalories`
  + `percentRealMeat`
  + `availableAt`
    + a list of the locations where this product offering is available.


In your Sails app, a **model** is like one of the file cabinets.  It contains **records**, which are like the forms.  `Attributes` are like the fields in each form.



