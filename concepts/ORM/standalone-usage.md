# Standalone Waterline Usage

In addition to built-in usage with the Sails framework, Waterline can be used as a standalone module.  If you aren't planning to use Waterline outside of your Sails app, you might want to skip this page and head back to [Models and ORM](http://sailsjs.org/documentation/concepts/models-and-orm) instead.

### Installation

Waterline is available via NPM.

```sh
$ npm install --save waterline
```
Waterline ships without any adapters, so you will need to install these separately. For example:

```sh
$ npm install --save sails-mysql
$ npm install --save-dev sails-memory
```

You can install any number of adapters into your application.

The `sails-disk` and `sails-memory` adapters are common choices for development and testing.

If you are new to Node, hop on over to the [Downloads](https://nodejs.org/en/download/) section of [nodejs.org](https://nodejs.org/) to learn about installing Node on your preferred platform.


### Getting Started

To get started with Waterline, we need main two ingredients - adapters and models.

The simplest adapter to use is the `sails-memory` adapter, so let's install it and Waterline in an empty directory.

```sh
mkdir my-tool
cd my-tool
npm init
# ...
npm install waterline sails-memory
```

Now we want some sample code. Copy the code from the [`getting-started`](../examples/src/getting-started.js) into a file in the same directory where you installed the `waterline` and `sails-memory` packages.

Before we run it, let's unpack how it works.

```js
var Waterline = require('waterline');
var sailsMemoryAdapter = require('sails-memory');
var waterline = new Waterline();
```

Here we are simply bootstrapping our main objects. We are setting up the `Waterline` factory object, an instance of an adapter and an instance of `waterline` itself.

Next, we define the specification for the user model, like so:

```js
var userCollection = Waterline.Collection.extend({
  identity: 'user',
  connection: 'default',
  attributes: {
    firstName: 'string',
    lastName: 'string',

    // Add a reference to Pets
    pets: {
      collection: 'pet',
      via: 'owner'
    }
  }
});
```

What's important here is the object that we are passing into that factory method.

We need to give our model an `identity` that we can refer to later, and also declare which connection we are going to use.

> A connection is an instance of an adapter. For example, you could have one connection for each type of storage you are using (file, MySQL, etc), or you might even have more than one connection for the same type of adapter.

The `attributes` define the properties of the model. In a traditional database, these attributes would align with columns in a table. But `pets` is a little different because it is defining an association that allows a user to own a number of pets.

> In a relational database, the `pets` attribute won't appear as a column. Rather it establishes a virtual one-to-many association with the pets model that we are about to define.

Obviously we now need to define what a pet is.

```js
var petCollection = Waterline.Collection.extend({
  identity: 'pet',
  connection: 'default',
  attributes: {
    breed: 'string',
    type: 'string',
    name: 'string',

    // Add a reference to User
    owner: {
      model: 'user'
    }
  }
});
```

Most of the structure is the same as for the user. However, the `owner` field specifies the owner of this pet.

> In this case, a pet can only have one owner, so we define which model it is associated with. The name of the model needs to marry to the `identity` you give the model. Also, in this case, in a relational database this will create a column called `owner` that will contain a foreign key back to the `user` table.

Next we have some more boring setup chores.

```js
waterline.loadCollection(userCollection);
waterline.loadCollection(petCollection);
```

Here we are adding the model specifications into the `waterline` instance itself.

And last, but not least, we have to configure the storage connections.

```js
var config = {
  adapters: {
    'memory': sailsMemoryAdapter
  },

  connections: {
    default: {
      adapter: 'memory'
    }
  }
};
```

So here we specify the `adapters` we are going to use (one for each type of storage we are going to use), and the `connections` which will usually contain connection details for the target storage system (login details, file paths, etc). Each connection can be named, and in this case we've simply settled on "default" to name the connection.

Ok, it's time to actually crank things up and work with the datastore. First we need to initialize the `waterline` instance, and then we can go to work.

```js
waterline.initialize(config, function (err, ontology) {
  if (err) {
    return console.error(err);
  }

  // Tease out fully initialized models.
  var User = ontology.collections.user;
  var Pet = ontology.collections.pet;

    User.create({ // First we create a user.
            firstName: 'Neil',
            lastName: 'Armstrong'
        }).then(function (user) { // Then we create the pet
            return Pet.create({
                breed: 'beagle',
                type: 'dog',
                name: 'Astro',
                owner: user.id
            });

        }).then(function (pet) { // Then we grab all users and their pets
            return User.find().populate('pets');

        }).then(function(users){ // Results of the previous then clause are passed to the next
             console.dir(users);

        }).catch(function(err){ // If any errors occur execution jumps to the catch block.
      console.error(err);
    });
});
```

That's a fair chunk of code so let's unpack it slower.

First we need to `initialize` the waterline instance. This wires up the connections (maybe logs into a database server or two) and parses all the models looking for associations as well as a heap of other whizbangery. When that is done, it defers to the callback we passed in the second argument.

After checking for an error, the `ontology` variable contains the collection objects for our users and our pets, so we add some shortcuts to them in the form of `User` and `Pet`.

> We usually name models in the singular form. That is, what is the _type_ of _object_ that you'd get back from a query.

We will use some Promise goodness to create a user and a pet and see what we can get back out of the datastore.

First, we use the `create` method to create a new user. We just need to supply the attibutes for our user, and we'll get back a copy of the record that was created.

> Note that by default, Waterline adds an `id` primary key for you, unless you specifically tell it not to.

Next we create a new pet, but we can use the `id` of the user that was created in the previous step to associate with the pet. We do this by setting the `owner` field directly.

Once the pet is created we have both sides of the association ready. To join them together, we can simply add the pet to a `pets` array in our new user. Then all we need to do is save the record using the `save` method on the model.

> Note that `save` is only available on the model objects returned by the query. Our `User` collection object does not have access to this.

Finally, we want to see what actually got stuffed into the database, so we use `User.find` to get all the `User` records out of the datastore. We also want the query to resolve the pet association, so we add the `populate` method to tell the query to go find the pet records for each user.

Running that simple application gives us:

```sh
$ node getting-started.js
[ { pets:
     [ { breed: 'beagle',
         type: 'dog',
         name: 'Astro',
         owner: 1,
         createdAt: Thu May 07 2015 20:44:37 GMT+1000 (AEST),
         updatedAt: Thu May 07 2015 20:44:37 GMT+1000 (AEST),
         id: 1 } ],
    firstName: 'Neil',
    lastName: 'Armstrong',
    createdAt: Thu May 07 2015 20:44:37 GMT+1000 (AEST),
    updatedAt: Thu May 07 2015 20:44:37 GMT+1000 (AEST),
    id: 1 } ]
```

Interesting. There are the attributes we gave the models, and we can also see the primary keys that were automatically generated for us. We can also see that waterline has thrown in some default `createdAt` and `updatedAt` timestamps too. Cool!

> You can turn off the timestamps with other global or per-model configuration options.



<docmeta name="displayName" value="Standalone Waterline Usage">
