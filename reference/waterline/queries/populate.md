# .populate()

Modify a [query instance](http://sailsjs.com/documentation/reference/waterline-orm/queries) so that, when executed, it will return associated record(s) belonging to the specified association, and optionally according to the specified `subcriteria`.  Populate may be called more than once on the same query, as long as each call is for a different association.


```usage
Something.find()
.populate(association, subcriteria)
.exec(function afterwards(err, populatedRecords){

});
```


### Usage

|   |     Argument           | Type                                         | Details                            |
|---|:-----------------------|----------------------------------------------|:-----------------------------------|
| 1 |    association         | ((string))                                   | The name of the association to populate.  e.g. `snacks`
| 2 |    _subcriteria_       | ((dictionary?))                              | Optional.  When populating `collection` associations between two models which reside in the same database, a [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) may be specified as a second argument to populate.  This will be used for filtering, sorting, and limiting the array of associated records (e.g. snacks) associated with each primary record.

> **Important:** Both the basic join polyfill (cross-datastore populate, or populate between models whose configured adapter does not provide a `.join()` implementation) and the subcriteria argument to `.populate()` are fully supported in Sails **individually**. But using the subcriteria argument to `.populate()` at the same time as the join polyfill is experimental. That means that, if an association spans multiple datastores, or if its datastore's configured adapter does not support a physical layer join, then you should not rely on the subcriteria argument to `.populate()`. If you try that in production, you will see a warning logged to the console. SQL adapters such as [sails-postgresql](https://github.com/balderdashy/sails-postgresql) and [sails-mysql](https://github.com/balderdashy/sails-mysql) support native joins and should be ok to use the subcriteria argument.


### Example

##### Populating a model association

To find any users named Finn in the database and, for each one, also populate their dad:
```javascript
User.find({name:'Finn'}).populate('dad').exec(function (err, usersNamedFinn){
  if (err) {
    return res.serverError(err);
  }

  sails.log('Wow, there are %d users named Finn.', usersNamedFinn.length);
  sails.log('Check it out, some of them probably have a dad named Joshua or Martin:', usersNamedFinn);

  return res.json(usersNamedFinn);
});
```


Might yield:

```javascript
[
  {
    id: 7392,
    age: 13,
    name: 'Finn',
    createdAt: '2003-12-26T00:00:00.000Z',
    updatedAt: '2012-12-26T00:00:00.000Z',
    dad: {
      id: 108,
      age: 47,
      name: 'Joshua',
      createdAt: Wed Dec 25 1969 00:00:00 GMT-0600 (CST),
      updatedAt: Wed Jan 10 2015 12:00:00 GMT-0600 (CST),
      dad: null
    }
  },
  // ...more users
]
```


##### Populating a collection association

> This example uses the optional subcriteria argument.

To find any users named Finn in the database and, for each one, also populate their 3 hippest purple swords, sorted most hip to least hip:

```javascript
// Warning: This is only safe to use on large datasets if both models are in the same database,
// and the adapter supports optimized populates.
// (e.g. cannot do this with the `User` model in PostgreSQL and the `Sword` model in MongoDB)
User.find({
  name:'Finn'
}).populate('currentSwords', {
  where: {
    color: 'purple'
  },
  limit: 3,
  sort: 'hipness DESC'
}).exec(function (err, usersNamedFinn){
  if (err) {
    return res.serverError(err);
  }

  // Note that Finns without any swords are still included-- their `currentSwords` arrays will just be empty.
  sails.log('Wow, there are %d users named Finn.', usersNamedFinn.length);
  sails.log('Check it out, some of them probably have non-empty arrays of purple swords:', usersNamedFinn);

  return res.json(usersNamedFinn);
});
```

Might yield:

```javascript
[
  {
    id: 7392,
    age: 13,
    name: 'Finn',
    createdAt: '2003-12-26T00:00:00.000Z',
    updatedAt: '2017-02-13T00:06:50.000Z',
    dad: 108,//<< not populated
    swords: [//<< populated
      {
        id: 9,
        title: 'Grape Soda Sword',
        color: 'purple',
        createdAt: '2014-03-20T00:06:50.000Z',
        updatedAt: '2016-02-12T00:06:50.000Z'
      },
      // ...more swords
    ]
  },
  // ...more users
]
```



<docmeta name="displayName" value=".populate()">
<docmeta name="pageType" value="method">

