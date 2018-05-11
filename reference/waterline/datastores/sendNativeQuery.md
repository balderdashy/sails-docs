# .sendNativeQuery()

Execute a raw SQL query using this datastore.

```usage
var rawResult = await datastore.sendNativeQuery(sql, valuesToEscape);
```

> `.sendNativeQuery()` is only available on Sails/Waterline [datastores](https://sailsjs.com/documentation/reference/waterline-orm/datastores) that are configured to use a SQL database (e.g. PostgreSQL or MySQL). Note that exact SQL and result format varies between databases, so you'll need to refer to the documentation for your underlying database adapter. (See below for a simple example to help get you started.)

### Usage
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | sql                 | ((string))          | A SQL string written in the appropriate dialect for this database.  Allows template syntax like `$1`, `$2`, etc. (See example below.)  If you are using custom table names or column names, be sure to reference those directly (rather than model identities and attribute names).  |
| 2 | valuesToEscape     | ((array?))           | An array of dynamic, untrusted strings to SQL-escape and inject within `sql`.  _(If you have no dynamic values to inject, then just omit this argument or pass in an empty array here.)_

##### Result

| Type                | Details |
|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| ((Ref?))            | The raw result from the database adapter, if any. _(The exact format of this raw result data varies depending on the SQL query you passed in, as well as the adapter you're using. See example below for links to relevant documentation.)_ |

##### Errors

|     Name        | Type                | When? |
|:----------------|---------------------|:---------------------------------------------------------------------------------|
| UsageError      | ((Error))           | Thrown if something invalid was passed in.
| AdapterError    | ((Error))           | Thrown if something went wrong in the database adapter.
| Error           | ((Error))           | Thrown if anything else unexpected happens.

See [Concepts > Models and ORM > Errors](https://sailsjs.com/documentation/concepts/models-and-orm/errors) for examples of negotiating errors in Sails and Waterline.

### Example

> Below, you'll find a generic example that works with just about any relational database.  **But remember**: Usage and result data vary depending on the SQL query you send, as well as the adapter you're using.  The standard [MySQL adapter](https://sailsjs.com/documentation/concepts/extending-sails/adapters/available-adapters#?sailsmysql) for Sails and Waterline uses the [`mysql`](http://npmjs.com/package/mysql) NPM package.  The [PostgreSQL adapter](https://sailsjs.com/documentation/concepts/extending-sails/adapters/available-adapters#?sailspostgresql) uses [`pg`](http://npmjs.com/package/pg).


```js
// Build our SQL query template.
var NAMES_OF_PETS_SQL = `
SELECT pet.name
FROM pet
WHERE pet.species_label = $1 OR pet.species_label = $2`;

// Send it to the database.
var rawResult = await sails.sendNativeQuery(NAMES_OF_PETS_SQL, [ 'dog', 'cat' ]);

sails.log(rawResult);
// (result format depends on the SQL query that was passed in, and the adapter you're using)

// Then parse the raw result and do whatever you like with it.

return exits.success();
```


### Custom table/column names

The SQL query you write should refer to table names and column names, not model identities and attribute names.  If your models are defined with custom table names, or if their attributes are defined with custom column names, you'll want to be sure you're using those custom names in your native SQL queries.

Are you using custom table/column names and concerned about scattering them throughout your code, because they might change?  Fortunately, there's a way to work around this.  There's another way you can build your SQL query templates without referencing column name and table names directly: using the underlying references to `tableName` and `columnName` available on your Waterline model.

For example:

```js
var NAMES_OF_PETS_SQL = `
SELECT ${Pet.tableName}.${Pet.schema.name.columnName}
FROM ${Pet.tableName}
WHERE
  ${Pet.tableName}.${Pet.schema.speciesLabel.columnName} = $1
  OR
  ${Pet.tableName}.${Pet.schema.speciesLabel.columnName} = $2
`;
```

But be aware that you still have to deal with custom column names on the way out!  The `rawResult` you get back from `.sendNativeQuery()` is inherently database-specific and tied to the physical layer, thus it will inherit any complexity you've set up there (including custom table/column names from your model definitions).


### Notes
> + This method only works with SQL databases.  If you are using another database like MongoDB, use [`.manager`](https://sailsjs.com/documentation/reference/waterline-orm/datastores/manager) to get access to the raw MongoDB client, or [`.driver`](https://sailsjs.com/documentation/reference/waterline-orm/datastores/driver) to get access to the static, underlying db library (e.g. `mysql`, `pg`, etc.)

<docmeta name="displayName" value=".sendNativeQuery()">
<docmeta name="pageType" value="method">
