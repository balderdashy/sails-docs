# One Way Association

**AKA "Belongs To"**

### Overview

A one way association is where a model is associated with another model.  You could query that model and populate to get the associated model.  You can't however query the associated model and populate to get the associating model.

### One Way Example

In this example, we are associating a `User` with a `Pet` but not a `Pet` with a `User`.

```javascript
// myApp/api/models/Pet.js
module.exports = {
  attributes: {
    name: {
      type: 'string'
    },
    color: {
      type: 'string'
    }
  }
}
```

```javascript
// myApp/api/models/User.js
module.exports = {
  attributes: {
    name: {
      type: 'string'
    },
    age: {
      type: 'integer'
    },
    pony:{
      model: 'pet'
    }
  }
}
```

Now that the association is setup, you can populate the pony association.

```javascript
User.find({ name:'Mike' })
.populate('pony')
.exec(function(err, users) {

  // The users object would look something like:
  // [{ 
  //  name: 'Mike',
  //  age: 21,
  //  pony: { 
  //    name: 'Pinkie Pie',
  //    color: 'pink',
  //    id: 5,
  //    createdAt: Tue Feb 11 2014 15:45:33 GMT-0600 (CST),
  //    updatedAt: Tue Feb 11 2014 15:45:33 GMT-0600 (CST) 
  //  },
  //  createdAt: Tue Feb 11 2014 15:48:53 GMT-0600 (CST),
  //  updatedAt: Tue Feb 11 2014 15:48:53 GMT-0600 (CST),
  //  id: 1 
  // }]
```
### Notes
> For a more detailed description of this type of association, see the [Waterline Docs](https://github.com/balderdashy/waterline-docs/blob/master/models/associations/associations.md)


> Because we have only formed an association on one of the models, a `Pet` has no restrictions on the number of `User` models it can belong to. If we wanted to, we could change this and associate the `Pet` with exactly one `User` and the `User` with exactly one `Pet`.
> In the example above we showed how to connect to a single model using `model` key, if you would like to connect many object's to one, you could use the `collection` key instead, and not specify `via` key.


<docmeta name="displayName" value="One Way Association">

