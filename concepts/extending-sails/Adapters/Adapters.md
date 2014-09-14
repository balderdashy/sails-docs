# Adapters
### Status

##### Stability: [3](http://nodejs.org/api/documentation.html#documentation_stability_index) - Stable

The API has proven satisfactory, but cleanup in the underlying code may cause minor changes.  Backwards-compatibility is guaranteed.

### What is an adapter?

 Adapters expose **interfaces**, which imply a contract to implement certain functionality.  This allows us to guarantee conventional usage patterns across multiple models, developers, apps, and even companies, making app code more maintainable, efficient, and reliable.  Adapters are useful for integrating with databases, open APIs, internal/proprietary web services, or even hardware.


### What kind of things can I do in an adapter?

Adapters are mainly focused on providing model-contextualized CRUD methods.  CRUD stands for create, read, update, and delete.  In Sails/Waterline, we call these methods `create()`, `find()`, `update()`, and `destroy()`.

For example, a `MySQLAdapter` implements a `create()` method which, internally, calls out to a MySQL database using the specified table name and connection informtion and runs an `INSERT ...` SQL query.

In practice, your adapter can really do anything it likes-- any method you write will be exposed on the raw connection objects and any models which use them.


##### Class methods
Below, `class methods` refer to the static, or collection-oriented, functions available on the model itself, e.g. `User.create()` or `Menu.update()`.  To add custom class methods to your model (beyond what is provided in the adapters it implements), define them as top-level key/function pairs in the model object.

##### Instance methods
`instance methods` on the other hand, (also known as object, or model, methods) refer to methods available on the individual result models themselves, e.g. `User.findOne(7).done(function (err, user) { user.someInstanceMethod(); });`.  To add custom instance methods to your model (beyond what is provided in the adapters it implements), define them as key/function pairs in the `attributes` object of the model's definition.

##### DDL and auto-migrations
`DDL` stands for data-definition language, and is a common fixture of schema-oriented databases.  In Sails, auto-migrations are supported out of the box.  Since adapters for the most common SQL databases support `alter()`, they also support automatic schema migration!  In your own adapter, if you write the `alter()` method, the same behavior will take effect.  The feature is configurable using the `migrate` property, which can be set to `safe` (don't touch the schema, period), `drop` (recreate the tables every time the app starts), or `alter` (the default-- merge the schema in the apps' models with what is currently in the database).


<docmeta name="uniqueID" value="Adapters83669">
<docmeta name="displayName" value="Adapters">
<docmeta name="stabilityIndex" value="3">
