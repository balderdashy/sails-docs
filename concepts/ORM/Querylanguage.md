# Waterline Query Language

The Waterline Query language is an object-based syntax used to retrieve the records from any supported database.  Under the covers, Waterline uses the database adapter(s) installed in your project to translates this language into native queries, and then to send those queries to the appropriate database.  This means that you can use the same query with MySQL as you do with Redis, or MongoDb. And it allows you to change your database with minimal (if any) changes to your application code.

> All queries inside of Waterline are case-insensitive. While this allows for more consistent querying across databases, depending on the database you're using, it can make indexing strings tough.  This is something to be aware of if you plan to create indexes in your database to optimize the performance of searching on string fields.

### Query Language Basics

The criteria objects are formed using one of four types of object keys. These are the top level
keys used in a query object. It is loosely based on the criteria used in MongoDB with a few slight variations.

Queries can be built using either a `where` key to specify attributes, which will allow you to also use query options such as `limit` and `skip` or, if `where` is excluded, the entire object will be treated as a `where` criteria.

```javascript

Model.find({
  name: 'mary'
}).exec(function (err, peopleNamedMary){

});


// OR


Model.find({
  where: { name: 'mary' },
  skip: 20,
  limit: 10,
  sort: 'createdAt DESC'
}).exec(function(err, thirdPageOfRecentPeopleNamedMary){

});
```

#### Key Pairs

A key pair can be used to search records for values matching exactly what is specified. This is the base of a criteria object where the key represents an attribute on a model and the value is a strict equality check of the records for matching values.

```javascript
Model.find({
  name: 'lyra'
}).exec(function (err, peopleNamedLyra) {

});
```

They can be used together to search multiple attributes.

```javascript
Model.find({
  name: 'walter',
  state: 'new mexico'
}).exec(function (err, waltersFromNewMexico) {
  
});
```

#### Modified Pairs

Modified pairs also have model attributes for keys but they also use any of the supported criteria modifiers to perform queries where a strict equality check wouldn't work.

```javascript
Model.find({
  name : {
    'contains' : 'yra'
  }
})
```

#### In Pairs

Provide an array to find records whose value for this attribute exactly matches (case-insensitive) _any_ of the specified search terms.

> This is more or less equivalent to "IN" queries in SQL, and the `$in` operator in MongoDB.

```javascript
Model.find({
  name : ['walter', 'skyler']
}).exec(function (err, waltersAndSkylers){

});
```

#### Not-In Pairs

Provide an array wrapped in a dictionary under a `!` key (like `{ '!': [...] }`) to find records whose value for this attribute _ARE NOT_ exact matches (case-insensitive) for any of the specified search terms.

> This is more or less equivalent to "NOT IN" queries in SQL, and the `$nin` operator in MongoDB.

```javascript
Model.find({
  name: { '!' : ['walter', 'skyler'] }
}).exec(function (err, everyoneExceptWaltersAndSkylers){

});
```

#### Or Pairs

Use the `or` modifier to match _any_ of the nested rulesets you specify as an array of query pairs.  For records to match an `or` query, they must match at least one of the specified query pairs in the `or` array.

```javascript
Model.find({
  or : [
    { name: 'walter' },
    { occupation: 'teacher' }
  ]
}).exec(function(waltersAndTeachers){

});
```

### Criteria Modifiers

The following modifiers are available to use when building queries.

* `'<'` / `'lessThan'`
* `'<='` / `'lessThanOrEqual'`
* `'>'` / `'greaterThan'`
* `'>='` / `'greaterThanOrEqual'`
* `'!'` / `'not'`
* `'like'`
* `'contains'`
* `'startsWith'`
* `'endsWith'`


#### '<' / 'lessThan'

Searches for records where the value is less than the value specified.

```javascript
Model.find({ age: { '<': 30 }})
```

#### '<=' / 'lessThanOrEqual'

Searches for records where the value is less or equal to the value specified.

```javascript
Model.find({ age: { '<=': 21 }})
```

#### '>' / 'greaterThan'

Searches for records where the value is more than the value specified.

```javascript
Model.find({ age: { '>': 18 }})
```

#### '>=' / 'greaterThanOrEqual'

Searches for records where the value is more or equal to the value specified.

```javascript
Model.find({ age: { '>=': 21 }})
```

#### '!' / 'not'

Searches for records where the value is not equal to the value specified.

```javascript
Model.find({
  name: { '!': 'foo' }
})
```

#### 'contains'

Searches for records where the value for this attribute _contains_ the given string. (Case insensitive.)

```javascript
Model.find({
  subject: { contains: 'music' }
}).exec(function (err, musicCourses){
  
});
```

#### 'startsWith'

Searches for records where the value for this attribute _starts with_ the given string. (Case insensitive.)

```javascript
Model.find({
  subject: { startsWith: 'american' }
}).exec(function (err, coursesAboutAmerica){

});
```

#### 'endsWith'

Searches for records where the value for this attribute _ends with_ the given string. (Case insensitive.)

```javascript
Model.find({
  subject: { endsWith: 'history' }
}).exec(function (err, historyCourses) {

})
```

#### 'like'

Searches for records using pattern matching with the `%` sign. (Case insensitive.)

```javascript
Model.find({ food: { 'like': '%beans' }})
```

#### 'Date Ranges'

You can do date range queries using the comparison operators.

```javascript
Model.find({ date: { '>': new Date('2/4/2014'), '<': new Date('2/7/2014') } })
```

### Query Options

Query options allow you refine the results that are returned from a query. The current options
available are:

* `limit`
* `skip`
* `sort`

#### Limit

Limits the number of results returned from a query.

```javascript
Model.find({ where: { name: 'foo' }, limit: 20 })
```

#### Skip

Returns all the results excluding the number of items to skip.

```javascript
Model.find({ where: { name: 'foo' }, skip: 10 });
```

##### Pagination

`skip` and `limit` can be used together to build up a pagination system.

```javascript
Model.find({ where: { name: 'foo' }, limit: 10, skip: 10 });
```

`paginate` is a  Waterline helper method which can accomplish the same as `skip` and `limit`.

``` javascript
Model.find().paginate({page: 2, limit: 10});
```

> **Waterline**
>
> You can find out more about the Waterline API below:
> * [Sails.js Documentation](http://sailsjs.org/documentation/reference/waterline/queries)
> * [Waterline README](https://github.com/balderdashy/waterline/blob/master/README.md)
> * [Waterline Documentation](https://github.com/balderdashy/waterline-docs)
> * [Waterline Github Repository](https://github.com/balderdashy/waterline)


#### Sort

Results can be sorted by attribute name. Simply specify an attribute name for natural (ascending)
sort, or specify an `asc` or `desc` flag for ascending or descending orders respectively.

```javascript
// Sort by name in ascending order
Model.find({ where: { name: 'foo' }, sort: 'name' });

// Sort by name in descending order
Model.find({ where: { name: 'foo' }, sort: 'name DESC' });

// Sort by name in ascending order
Model.find({ where: { name: 'foo' }, sort: 'name ASC' });

// Sort by binary notation
Model.find({ where: { name: 'foo' }, sort: { 'name': 1 }});

// Sort by multiple attributes
Model.find({ where: { name: 'foo' }, sort: { name:  1, age: 0 });
```

> **Case-sensitivity**
>
> All queries inside of Waterline are **case-insensitive**. This allows for easier querying but makes indexing strings tough. This is something to be aware of if you are indexing and searching on string fields.
>
> Currently, the best way to execute **case-sensitive** queries is using the [`.native()`](http://sailsjs.org/documentation/reference/waterline/models/native.html) or [`.query()`](http://sailsjs.org/documentation/reference/waterline/models/query.html) method.


<docmeta name="displayName" value="Query Language">
