# One-to-Many (Has Many)

### Overview

A one-to-many association states that a model can be associated with many other models. To build this
association a virtual attribute is added to a model using the `collection` property. In a one-to-many
association one side must have a `collection` attribute and the other side must contain a `model`
attribute. This allows the many side to know which records it needs to get when a `populate` is used.

Because you may want a model to have multiple one-to-many associations on another model a `via` key
is needed on the `collection` attribute. This states which `model` attribute on the one side of the
association is used to populate the records.

```javascript
// myApp/api/models/user.js
// A user may have many pets
module.exports = {
  attributes: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },

    // Add a reference to Pets
    pets: {
      collection: 'pet',
      via: 'owner'
    }
  }
};
```
```javascript
// myApp/api/models/pet.js
// A pet may only belong to a single user
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
    owner: {
      model: 'user'
    }
  }
};
```

Now that the pets and users know about each other, they can be associated. To do this we can create
or update a pet with the user's primary key for the `owner` value.

```javascript
Pet.create({
  breed: 'labrador',
  type: 'dog',
  name: 'fido',

  // Set the User's Primary Key to associate the Pet with the User.
  owner: 123
})
.exec(function(err, pet) {});
```

Now that the `Pet` is associated with the `User`, all the pets belonging to a specific user can
be populated by using the `populate` method.

```javascript
User.find()
.populate('pets')
.exec(function(err, users) {
  if(err) // handle error

  // The users object would look something like the following
  // [{
  //   id: 123,
  //   firstName: 'Foo',
  //   lastName: 'Bar',
  //   pets: [{
  //     id: 1,
  //     breed: 'labrador',
  //     type: 'dog',
  //     name: 'fido',
  //     user: 123
  //   }]
  // }]
});
```

### Notes
> For a more detailed description of this type of association, see the [Waterline Docs](https://github.com/balderdashy/waterline-docs/blob/master/models/associations/associations.md)



<docmeta name="displayName" value="One-to-Many">

