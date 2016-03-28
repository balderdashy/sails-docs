# .populate()

Modify a [query instance](http://sailsjs.org/documentation/reference/waterline-orm/queries) so that, when executed, it will return associated record(s) belonging to the specified association, and optionally according to the specified `subcriteria`.  Populate may be called more than once on the same query, as long as each call is for a different association.


```javascript
Something.find()
.populate(association, subcriteria)
.exec(function afterwards(err, populatedRecords){

});
```


### Usage

|   |     Argument           | Type                                         | Details                            |
|---|:-----------------------|----------------------------------------------|:-----------------------------------|
| 1 |    association         | ((string))                                   | The name of the association to populate.  e.g. `snacks`
| 2 |    _subcriteria_       | ((dictionary?))                              | Optional.  When populating `collection` associations between two models which reside in the same database, a [Waterline criteria](https://github.com/balderdashy/waterline-docs/blob/master/queries/query-language.md) may be specified as a second argument to populate.  This will be used for filtering, sorting, and limiting the array of associated records (e.g. snacks) associated with each primary record.

> **Important:** While experimental support exists, the `subcriteria` argument should only be used in production on queries involving a single database.  Do not use the `subcriteria` argument when performing cross-adapter queries involving multiple databases.


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
    createdAt: Wed Dec 25 2003 18:00:00 GMT-0600 (CST),
    updatedAt: Wed Feb 12 2016 18:06:50 GMT-0600 (CST),
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
// Warning: This only works if both models are in the same database.
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
    createdAt: Wed Dec 25 2003 18:00:00 GMT-0600 (CST),
    updatedAt: Wed Feb 12 2016 18:06:50 GMT-0600 (CST),
    dad: 108,//<< not populated
    swords: [//<< populated
      {
        id: 9,
        title: 'Grape Soda Sword',
        color: 'purple',
        createdAt: Wed Mar 19 2014 18:06:50 GMT-0600 (CST),
        updatedAt: Wed Feb 11 2016 18:06:50 GMT-0600 (CST)
      },
      // ...more swords
    ]
  },
  // ...more users
]
```



<docmeta name="displayName" value=".populate()">
<docmeta name="pageType" value="method">

