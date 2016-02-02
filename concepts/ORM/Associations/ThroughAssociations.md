# Through Associations

**AKA "Has Many Through"**

### Overview

Many-to-Many through associations behave the same way as many-to-many associations with the exception
of the join table being automatically created for you. In a Many-To-Many through assocation you define a model containing two fields that correspond to the two models you will be joining together. When defining an association you will add the `through` key to show that the model should be used rather than the automatic join table.

### Has Many Through Example

```javascript
// myApp/api/models/User.js
module.exports = {
  attributes: {
    name: {
      type: 'string'
    },
    pets:{
      collection: 'pet',
      via: 'owner',
      through: 'petuser'
    }
  }
}
```

```javascript
// myApp/api/models/Pet.js
module.exports = {
  attributes: {
    name: {
      type: 'string'
    },
    color: {
      type: 'string'
    },
    owners:{
      collection: 'user',
      via: 'pet',
      through: 'petuser'
    }
  }
}
```

```javascript
// myApp/api/models/PetUser.js
module.exports = {
  attributes: {
    owner:{
      model:'user'
    },
    pet: {
      model: 'pet'
    }
  }
}
```

By using the `PetUser` model we can use `.populate()` on both the `User` model and `Pet` model just the same as a normal [Many-to-Many](http://sailsjs.org/documentation/concepts/models-and-orm/associations/many-to-many) association.

> Currently if you would like to add additional information to the `through` table it will not be available when calling `.populate`. To do this you will need to query the `through` model manually.



<docmeta name="displayName" value="Through Associations">

