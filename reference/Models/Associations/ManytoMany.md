# Many-to-Many
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


### Many-to-Many Example

In this example, we will start with an array of users and an array of pets.  We will create records for each element in each array then associate all of the `Pets` with all of the `Users`.  If everything worked properly, we should be able to query any `User` and see that they 'own' all of the `Pets`.  Furthermore, we should be able to query any `Pet` and see that it is 'owned' by every `User`.


`myApp/api/models/pet.js`


```javascript

module.exports = {

	attributes: {
		name:'STRING',
		color:'STRING',

		// Add a reference to User
		owners: {
			collection: 'user',
			via: 'pets',
			dominant:true
		}
	}
}

```

`myApp/api/models/user.js`

```javascript

module.exports = {

	attributes: {
		name:'STRING',
		age:'INTEGER',

		// Add a reference to Pet
		pets:{
			collection: 'pet',
			via: 'owners'
		}
	}

}

```


`myApp/config/bootstrap.js`

```javascript

module.exports.bootstrap = function (cb) {

// After we create our users, we will store them here to associate with our pets
var storeUsers = []; 

var users = [{name:'Mike',age:'16'},{name:'Cody',age:'25'},{name:'Gabe',age:'107'}];
var ponys = [{ name: 'Pinkie Pie', color: 'pink'},{ name: 'Rainbow Dash',color: 'blue'},{ name: 'Applejack', color: 'orange'}]

// This does the actual associating.
// It takes one Pet then iterates through the array of newly created Users, adding each one to it's join table
var associate = function(onePony,cb){
  var thisPony = onePony;
  var callback = cb;

  storeUsers.forEach(function(thisUser,index){
    console.log('Associating ',thisPony.name,'with',thisUser.name);
    thisUser.pets.add(thisPony.id);
    thisUser.save(console.log);

    if (index === storeUsers.length-1)
      return callback(thisPony.name);
  })
};


// This callback is run after all of the Pets are created.
// It sends each new pet to 'associate' with our Users  
var afterPony = function(err,newPonys){
  while (newPonys.length){
    var thisPony = newPonys.pop();
    var callback = function(ponyID){
      console.log('Done with pony ',ponyID)
    }
    associate(thisPony,callback)
  }
  console.log('Everyone belongs to everyone!! Exiting.');

  // This callback lets us leave bootstrap.js and continue lifting our app!
  return cb()
};

// This callback is run after all of our Users are created.
// It takes the returned User and stores it in our storeUsers array for later.
var afterUser = function(err,newUsers){
  while (newUsers.length)
    storeUsers.push(newUsers.pop())

  Pet.create(ponys).exec(afterPony)
};


User.create(users).exec(afterUser)

};
```

Lifting our app with `sails console`

```sh

dude@littleDude:~/node/myApp$ sails console

info: Starting app in interactive mode...

Associating  Applejack with Gabe
Associating  Applejack with Cody
Associating  Applejack with Mike
Done with pony  Applejack
Associating  Rainbow Dash with Gabe
Associating  Rainbow Dash with Cody
Associating  Rainbow Dash with Mike
Done with pony  Rainbow Dash
Associating  Pinkie Pie with Gabe
Associating  Pinkie Pie with Cody
Associating  Pinkie Pie with Mike
Done with pony  Pinkie Pie
Everyone belongs to everyone!! Exiting.
info: Welcome to the Sails console.
info: ( to exit, type <CTRL>+<C> )

sails> null { name: 'Gabe',
  age: 107,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 9 }
null { name: 'Cody',
  age: 25,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 8 }
null { name: 'Mike',
  age: 16,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 7 }
null { name: 'Gabe',
  age: 107,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 9 }
null { name: 'Cody',
  age: 25,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 8 }
null { name: 'Mike',
  age: 16,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 7 }
null { name: 'Gabe',
  age: 107,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 9 }
null { name: 'Cody',
  age: 25,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 8 }
null { name: 'Mike',
  age: 16,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 7 }
sails> Pet.find().populate('owners').exec(function(e,r){while(r.length){var thisPet=r.pop();console.log(thisPet.toJSON())}});
{ owners: 
   [ { name: 'Mike',
       age: 16,
       id: 7,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) },
     { name: 'Cody',
       age: 25,
       id: 8,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) },
     { name: 'Gabe',
       age: 107,
       id: 9,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) } ],
  name: 'Applejack',
  color: 'orange',
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 9 }
{ owners: 
   [ { name: 'Mike',
       age: 16,
       id: 7,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) },
     { name: 'Cody',
       age: 25,
       id: 8,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) },
     { name: 'Gabe',
       age: 107,
       id: 9,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) } ],
  name: 'Rainbow Dash',
  color: 'blue',
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 8 }
{ owners: 
   [ { name: 'Mike',
       age: 16,
       id: 7,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) },
     { name: 'Cody',
       age: 25,
       id: 8,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) },
     { name: 'Gabe',
       age: 107,
       id: 9,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) } ],
  name: 'Pinkie Pie',
  color: 'pink',
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 7 }
sails> User.find().populate('pets').exec(function(e,r){while(r.length){var thisUser=r.pop();console.log(thisUser.toJSON())}});
{ pets: 
   [ { name: 'Pinkie Pie',
       color: 'pink',
       id: 7,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) },
     { name: 'Rainbow Dash',
       color: 'blue',
       id: 8,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) },
     { name: 'Applejack',
       color: 'orange',
       id: 9,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) } ],
  name: 'Gabe',
  age: 107,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 9 }
{ pets: 
   [ { name: 'Pinkie Pie',
       color: 'pink',
       id: 7,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) },
     { name: 'Rainbow Dash',
       color: 'blue',
       id: 8,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) },
     { name: 'Applejack',
       color: 'orange',
       id: 9,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) } ],
  name: 'Cody',
  age: 25,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 8 }
{ pets: 
   [ { name: 'Pinkie Pie',
       color: 'pink',
       id: 7,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) },
     { name: 'Rainbow Dash',
       color: 'blue',
       id: 8,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) },
     { name: 'Applejack',
       color: 'orange',
       id: 9,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) } ],
  name: 'Mike',
  age: 16,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 7 }


```
### Notes
> For a more detailed description of this type of association, see the [Waterline Docs](https://github.com/balderdashy/waterline-docs/blob/master/associations.md)

<docmeta name="uniqueID" value="ManytoMany276455">
<docmeta name="displayName" value="Many-to-Many">

