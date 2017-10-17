# .meta()

Provide additional options to Waterline when executing a [query instance](http://sailsjs.com/documentation/reference/waterline-orm/queries).

```javascript
query.meta(options);
```

### Usage
|   |     Argument    | Type                | Details    |
|---|-----------------|---------------------|:-----------|
| 1 |  options        |      ((dictionary))       | A dictionary (plain JS object) of options.  See all supported options (aka &ldquo;meta keys&rdquo;) in the table below.         |

##### Supported options

Option                                | Type        | Default  | Details
:------------------------------------ |-------------|:---------| :------------------------------
fetch                                 | ((boolean)) | false    | When performing [`.update()`](http://sailsjs.com/documentation/reference/waterline-orm/models/update), [`.create()`](http://sailsjs.com/documentation/reference/waterline-orm/models/create), [`.createEach()`](http://sailsjs.com/documentation/reference/waterline-orm/models/create-each) or [`.destroy()`](http://sailsjs.com/documentation/reference/waterline-orm/models/destroy) queries, set this to `true` to tell the database adapter to send back all records that were updated/destroyed.  Otherwise, the second argument to the `.exec()` callback is `undefined`.  Warning: Enabling this key may cause performance issues for update/destroy queries that affect large numbers of records.
cascade                               | ((boolean)) | false    | If set to `true` on a [`.destroy()`](http://sailsjs.com/documentation/reference/waterline-orm/models/destroy), this tells Waterline to perform a _"virtual cascade"_ for every deleted record.  Thus deleting a record with a 2-way, _plural association_ ([one-to-many](http://sailsjs.com/documentation/concepts/models-and-orm/associations/one-to-many) or [many-to-many](http://sailsjs.com/documentation/concepts/models-and-orm/associations/many-to-many)) will also cleanly remove all links to other records (by removing join table rows or setting foreign key values to `null`).<br/><br/>This may be desirable if database size is a concern, or if primary keys may be re-used for records, but it can negatively impact performance on `.destroy()` calls since it involves executing more queries.<br/><br/>**The `cascade` meta key should only be used with databases like MongoDB** that [don't support](http://stackoverflow.com/questions/20370791/what-is-the-recommended-equivalent-of-cascaded-delete-in-mongodb-for-nm-relatio) cascading delete as a native feature.  If you need cascading delete, and your database supports it natively (e.g. MySQL or PostgreSQL), you'll enjoy improved performance by simply adding a [CASCADE constraint](https://dev.mysql.com/doc/refman/5.7/en/create-table-foreign-keys.html) at the physical layer (e.g. phpMyAdmin, Sequel Pro, mySQL prompt, etc.) rather than relying on Waterline's virtual cascade to take effect at runtime.
skipAllLifecycleCallbacks             | ((boolean)) | false    | Set to `true` to prevent [lifecycle callbacks](http://sailsjs.com/documentation/concepts/models-and-orm/lifecycle-callbacks) from running during the execution of the query.
skipRecordDecryption             | ((boolean)) | false    | Set to `true` to fetch records with data that is still encrypted by Sails' built-in [at-rest encryption](https://github.com/balderdashy/sails-docs/blob/fb6acb9558124d2f37ef258b0a9e2c497d32837b/PAGE_NEEDED.md)-- _without_ automatically decrypting it.  Useful for debugging issues with key rotation, performing ad hoc audits, and securely transferring still-encrypted values to another server or database.
skipRecordVerification                | ((boolean)) | false    | Set to `true` to skip Waterline's post-query verification pass of any records returned from the adapter(s).  Useful for tools like sails-hook-orm's automigrations, or to disable warnings for use cases where you know that pre-existing records in the database do not match your model definitions.
skipExpandingDefaultSelectClause      | ((boolean)) | false    | Set to `true` to force Waterline to skip expanding the `select` clause in criteria when it forges stage 3 queries (i.e. the queries that get passed in to adapter methods).  Normally, if a model declares `schema: true`, then the S3Q `select` clause is expanded to an array of column names, even if the S2Q had factory default `select`/`omit` clauses (which is also what it would have if no explicit `select` or `omit` clauses were included in the original query.) Useful for tools like sails-hook-orm's automigrations, where you want temporary access to properties that aren\'t necessarily in the current set of attribute definitions.  **Warning: Do not use this flag in your web application backend-- or at least [ask for help](https://sailsjs.com/support) first.**

### Example

```javascript
User.create({name: 'alice'})
.meta({fetch: true})
.exec(function (err, newUser){
  if (err) { return res.serverError(err); }
  return res.json(newUser);
});
```


### Notes
> * The [`.fetch()` method](https://sailsjs.com/documentation/reference/waterline-orm/queries/fetch) is a shorthand for `.meta({fetch: true})`.
> * In order for `cascade` to work when the `fetch` meta key is _not_ also `true`, Waterline must do an extra `.find().select('id')` before actually performing the `.destroy()` in order to get the IDs of the records that would be destroyed.
> * Rather than using the `.meta()` query method, you can also set meta keys for a query by passing in a dictionary after the explicit callback.  For example: `User.create({name: 'alice'}, function(err, newUser){/*...*/}, { fetch: true })`.

<docmeta name="displayName" value=".meta()">
<docmeta name="pageType" value="method">
