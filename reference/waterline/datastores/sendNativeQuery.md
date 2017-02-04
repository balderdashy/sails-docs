# .sendNativeQuery()

Execute a raw SQL query using this datastore.

```javascript
datastore.sendNativeQuery(sql, valuesToEscape)
.exec(function(err, resultMaybe) {

});
```

> `.sendNativeQuery()` is only available on Sails/Waterline [datastores](http://sailsjs.com/documentation/reference/waterline-orm/datastores) that are configured to use a SQL database (e.g. PostgreSQL or MySQL). Note that exact SQL and result format varies between databases, so you'll need to refer to the documentation for your underlying database adapter. (See below for a simple example to help get you started.)

### Usage
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | sql                 | ((string))          | A SQL string written in the appropriate dialect for this database.  Allows template syntax like `$1`, `$2`, etc. (See example below.)  If you are using custom table names or column names, be sure to reference those directly (rather than model identities and attribute names).  |
| 2 | valuesToEscape     | ((array?))           | An array of dynamic, untrusted strings to SQL-escape and inject within `sql`.  _(If you have no dynamic values to inject, then just omit this argument or pass in an empty array here.)_

##### Callback
|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | The error that occurred, or a falsy value if there were no errors.  _(Expect this to be an Error instance with a [`.footprint` property](https://github.com/treelinehq/waterline-query-docs/blob/8fc158d8460aa04ee6233fefbdf83cc17e7645df/docs/errors.md).)_
| 2 |    _rawResult_      | ((Ref?))            | The raw result from the database adapter, if any. _(The exact format of this raw result data varies depending on the SQL query you passed in, as well as the adapter you're using. See example below for links to relevant documentation.)_ |

### Example

> Below, you'll find a generic example that works with just about any relational database.  **But remember**: Usage and result data vary depending on the SQL query you send, as well as the adapter you're using.  The standard [MySQL adapter](http://sailsjs.com/documentation/concepts/extending-sails/adapters/available-adapters#?sailsmysql) for Sails and Waterline uses the [`mysql`](http://npmjs.com/package/mysql) NPM package.  The [PostgreSQL adapter](http://sailsjs.com/documentation/concepts/extending-sails/adapters/available-adapters#?sailspostgresql) uses [`pg`](http://npmjs.com/package/pg).

```js
// Build our SQL query template.
var NAMES_OF_PETS_SQL =
'SELECT pet.name '+
'FROM pet '+
'WHERE pet.species_label = $1 OR pet.species_label = $2';

// Send it to the database.
sails.getDatastore()
.sendNativeQuery(NAMES_OF_PETS_SQL, [ 'dog', 'cat' ])
.exec(function(err, rawResult) {
  if (err) { return res.serverError(err); }

  sails.log(rawResult);
  // (result format depends on the SQL query that was passed in, and the adapter you're using)

  // Then parse the raw result and do whatever you like with it.
  
  return res.ok();

});
```


### Notes
> + The SQL query you write should refer to table names and column names, not model identities and attribute names.  If your models are defined with custom table names, or if their attributes are defined with custom column names, do take care.
> + This method only works with SQL databases.  If you are using another database like MongoDB, use [`.manager`](http://sailsjs.com/documentation/reference/waterline-orm/datastores/manager) to get access to the raw MongoDB client.

<docmeta name="displayName" value=".sendNativeQuery()">
<docmeta name="pageType" value="method">
