# Many-to-many

**AKA "Has and Belongs To Many"**

### Overview

A many-to-many association states that a model can be associated with many other models and vice-versa.
Because both models can have many related models a new join table will need to be created to keep track
of these relations.

Waterline will look at your models and if it finds that two models both have collection attributes that
point to each other, it will automatically build up a join table for you.

Because you may want a model to have multiple many-to-many associations on another model a `via` key
is needed on the `collection` attribute. This states which `model` attribute on the one side of the
association is used to populate the records.

Using the `User` and `Pet` example lets look at how to build a schema where a `User` may have many
`Pet` records and a `Pet` may have multiple owners.

```javascript
// myApp/api/models/User.js
// A user may have many pets
module.exports = {
  attributes: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },

    // Add a reference to Pet
    pets: {
      collection: 'pet',
      via: 'owners',
      dominant: true
    }
  }
};
```
```javascript
// myApp/api/models/Pet.js
// A pet may have many owners
module.exports = {
  attributes: {
    breed: {
      type: 'string'
    },
    type: {
      type: 'string'
    },
    name: {
      type: 'string'
    },

    // Add a reference to User
    owners: {
      collection: 'user',
      via: 'pets'
    }
  }
};
```

Now that the `User` and `Pet` models have been created and the join table has been setup
automatically, we can start associating records and querying the join table. To do this lets add a
`User` and `Pet` and then associate them together.

To associate records together, the Model method [.addToCollection()](http://sailsjs.com/documentation/reference/waterline-orm/models/add-to-collection) is used. This allows you to set the primary keys of the records that will be associated.

```javascript
// To add a Pet to a user's collection of adoptedPets where the User has an id of
// 10 and the adoptedPet has an id of 300.
User.addToCollection(10, 'adoptedPets', [300]).exec(function(err) {
  if (err) {
    // handle error
  }
});
```

You can also add multiple pets at once:

```javascript
User.addToCollection(10, 'adoptedPets', [300, 301]).exec(function(err) {
  if (err) {
    // handle error
  }
});
```

Removing associations is just as easy using the [.removeFromCollection()](http://sailsjs.com/documentation/reference/waterline-orm/models/remove-from-collection) method. It works the same as the `addToCollection`.

```javascript
// To remove a Pet from a user's collection of adoptedPets where the User has an id of
// 10 and the adoptedPet has an id of 300.
User.removeFromCollection(10, 'adoptedPets', [300]).exec(function(err) {
  if (err) {
    // handle error
  }
});
```

And you can remove multiple pets at once:

```javascript
User.removeFromCollection(10, 'adoptedPets', [300, 301]).exec(function(err) {
  if (err) {
    // handle error
  }
});
```


### Notes
> For a more detailed description of this type of association, see the [Waterline Docs](https://github.com/balderdashy/waterline-docs/blob/master/models/associations/associations.md)


<docmeta name="displayName" value="Many-to-many">

