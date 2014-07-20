# Active Collection

An array of objects representing the contents of a [plural, or "collection" association]().  Attached to a key in a populated [record]() corresponding with the attribute name of the relevant collection association.


```js
Order.find()
.populate('buyers')
.exec(function (err, orders){
  var population = orders[0].buyers;
});
```

##### api/models/Order.js

```js
{
  attributes: {
    buyer: { collection: 'Customer' }
  }
}
```

Basically, a population is just an array of associated records.  It may or may not be in sorted order, depending on how [`.populate()`]() was used.  For example, assuming the order in the code snippet above was for an adorable box of dire wolf puppies, `orders[0].buyers` might look something like this:

```json
[
  {
    "id": 2,
    "name": "Rob Stark"
  },
  {
    "id": 6,
    "name": "Arya Stark"
  }
]
```





### Modifying populations

For the most part, populations are just normal JavaScript arrays.  However they do have a few prototypal, non-enumerable (i.e. protected) methods for adding (associating) and removing (dissociating) referenced records.  Changes to populations are persisted (i.e. saved to the database) by calling `.save()` on the record where the population came from.  To extend our previous example:

```js
Order.find()
.populate('buyers')
.exec(function (err, orders){

  orders[0].buyers.add({ name: 'John Snow' });
  orders[0].save(function (err) {
    // We successfully created a new Customer named John,
    // and associated him as one of the "buyers" on `order[0]`
    // in our result set (we happen to know it was for puppies)
  });

});
```





<docmeta name="uniqueID" value="associatedcollection790682">
<docmeta name="displayName" value="Active Collection">

