# One-to-many

**AKA "Has Many"**

### Overview

A one-to-many association states that a model can be associated with many other models. To build this
association a virtual attribute is added to a model using the `collection` property. In a one-to-many
association, the "one" side must have a `collection` attribute, and the "many" side must contain a `model` attribute. This allows the "many" side to know which records it needs to get when `populate` is used.

Because you may want a model to have multiple one-to-many associations on another model a `via` key
is needed on the `collection` attribute. This states which `model` attribute on the one side of the
association is used to populate the records.

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

    // Add a reference to Pets
    pets: {
      collection: 'pet',
      via: 'owner'
    }
  }
};
```
```javascript
// myApp/api/models/Pet.js
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
await Pet.create({
  breed: 'labrador',
  type: 'dog',
  name: 'fido',

  // Set the User's Primary Key to associate the Pet with the User.
  owner: 123
});
```

Now that the `Pet` is associated with the `User`, all the pets belonging to a specific user can
be populated by using the [`.populate()`](https://sailsjs.com/documentation/reference/waterline-orm/query/populate) method.

```javascript
var users = await User.find().populate('pets');
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
```

#### Mandatory association

In the above example, the `owner` was not a mandatory association for the `Pet`. We can create a pet without an owner by omitting a user ID from the owner. To make the association mandatory add truthy `required` key to the model.

```javascript
// myApp/api/models/Pet.js
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
      model: 'user',
      // An owner is mandatory
      required: true
    }
  }
};
```

Now doing `Pet.create` without an owner, will throw a `UsageError`.

<docmeta name="displayName" value="One-to-many">

