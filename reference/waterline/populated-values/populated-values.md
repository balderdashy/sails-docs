# Populated Values

In addition to basic attribute data like email addresses, phone numbers, and birthdates, Waterline can dynamically store and retrieve linked sets of records using associations.  When [`.populate()`](/#/documentation/reference/waterline/queries/populate.html) is called on a query, each of the resulting records will contain one or more **populated values**.  Each one of those **populated values** is a snapshot of the record(s) linked to that particular association at the time of the query.

The type of a populated value is either:

+ `null`, or a plain old JavaScript object (POJO), or  _(if it corresponds to a "model" association)_
+ an empty array, or an array of plain old JavaScript objects _(if it corresonds to a "collection" association)_



For example, assuming we're dealing with orders of adorable wolf puppies:

```js
Order.find()
.populate('buyers')  // a "collection" association
.populate('seller')  // a "model" association
.exec(function (err, orders){

  // this array is a snapshot of the Customers who are associated with the first Order as "buyers"
  orders[0].buyers;
  // => [ {id: 1, name: 'Rob Stark'}, {id: 6, name: 'Arya Stark'} ]

  // this object is a snapshot of the Company that is associated with the first Order as the "seller"
  orders[0].seller;
  // => { id: 42941, corporateName: 'WolvesRUs Inc.' }

  // this array is empty because the second Order doesn't have any "buyers"
  orders[1].buyers;
  // => []

  // this is `null` because there is no "seller" associated with the second Order
  orders[1].seller;
  // => null
});
```



### Modifying populated values

Changes to populated values are persisted (i.e. saved to the database) by calling `.save()` on the record they are attached to.  You cannot call `.save()` directly on a populated value.

Changing or remove the linked record of a "model" association can be accomplished by simply setting the property directly on the original record:

```js
orders[1].seller = { corporateName: 'Wolf Orphanage' };
```

"collection" associations, on the other hand, _do_ have a couple of special (non-enumerable) methods for associating and disassociating linked records.  However, `.save()` must still be called on the original record in order for changes to be persisted to the database.

```js
orders[1].buyers.add({ name: 'Jon Snow' });
orders[1].save(function (err) { ... });
```


### Example

Finally, to put it all together:

```js
Order.find()
.populate('buyers')
.exec(function (err, orders){

  orders[1].buyers.add({ name: 'Jon Snow' });
  orders[1].seller = { corporateName: 'Wolf Orphanage' };
  orders[1].save(function (err) {
    // We successfully created a new Customer named Jon and added
    // him to `order[1]` as one of its "buyers".
    // We also created a new company and set it as `order[1]`'s "seller".
    //
    // If we had provided only a primary key value instead of an object,
    // in both cases Waterline would have tried to associate existing
    // Customer and Company records rather than creating new ones.
  });

});
```





<docmeta name="uniqueID" value="populatedvalues790682">
<docmeta name="displayName" value="Populated Values">

