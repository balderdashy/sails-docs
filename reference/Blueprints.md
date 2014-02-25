# Blueprints

> **Associations and Blueprints**
>Sails v0.10 introduced model associations!  We've also extended the functionality of blueprint routing so you can make associations between models as painlessly as you created them!

> **WARNING**
> Association blueprints (v0.10) are currently experimental!
> This API is likely to change.

### Overview

By default, Sails inspects your controllers, models, and configuration and binds certain routes automatically. These dynamically generated routes are called blueprints and they allow you to access a JSON API for your models without writing any code.

The blueprint API is accessible when you have both an empty controller and model in Sails.  This can be done easily using the command line tool.  Behind the scenes, the various HTTP 'request methods' are being mapped to dynamically generated controller actions that perform CRUD operations on the model of the same name.  The default setting is on but can be disabled in '/config/controllers.js'.

While the following documentation focuses on HTTP, you can also use Sails' built-in socket.io emulation layer to talk to the blueprint API (or any of your Sails routes / custom controllers) via Socket.io.

For a ridiculously in-depth look into how blueprints work and why they are so useful, [check out this awesome video](http://www.youtube.com/watch?v=EnKRrdTi_gk)

### Notes

> Absolutely all of these Blueprint Methods can be used with Socket.IO. Check out the [Socket-Client](./#!documentation/reference/SocketClient/SocketClient.html) section of reference for example usage.

# Find Records

### Purpose
Find and return model instances from the database.

### Description
Responds with a JSON array of objects.

If request is sent using Socket.IO, the socket will be subscribed to both "creates" of new models (class room) and "updates"+"destroys" for all model instances returned (instance rooms). 

This is equivalent to running `Pony.subscribe(req.socket)` and `Pony.subscribe(req.socket, anArrayOfPonies)` in a custom controller.

### Examples

#### Find All (REST)

`GET http://localhost:1337/:model`

Get all ponies in the database:

_via the URL bar in your web browser_
`http://localhost:1337/pony`

#### Expected Response

```json
 [{
   "name": "Rainbow Dash",
   "id": 1,
   "createdAt": "2013-10-18T01:22:56.000Z",
   "updatedAt": "2013-10-18T01:22:56.000Z"
 },
 {
   "name": "Twilight Sparkle",
   "id": 47,
   "createdAt": "2013-10-14T01:22:00.000Z",
   "updatedAt": "2013-10-15T01:20:54.000Z"
 }]

```

#### Find One (REST)

`GET http://localhost:1337/:model/:id`

#### Expected Response

```json
 {
   "name": "Rainbow Dash",
   "id": 1,
   "createdAt": "2013-10-18T01:22:56.000Z",
   "updatedAt": "2013-10-18T01:22:56.000Z"
 }

```

#### Find All (Shortcuts)

`http://localhost:1337/:model/find/`

Like before, we will get all the ponies in the database.  This time, using the `Blueprint Shortcut` routes.

via web browser 'http://localhost:1337/pony/find/'

#### Expected Response

```json
 [{
   "name": "Rainbow Dash",
   "id": 1,
   "createdAt": "2013-10-18T01:22:56.000Z",
   "updatedAt": "2013-10-18T01:22:56.000Z"
 },
 {
   "name": "Twilight Sparkle",
   "id": 47,
   "createdAt": "2013-10-14T01:22:00.000Z",
   "updatedAt": "2013-10-15T01:20:54.000Z"
 }]

```

#### Find One (Shortcuts)

`http://localhost:1337/:model/find/:recordID`

Like before, we will just one Pony.  This time, using the `Blueprint Shortcut` routes.

via web browser 'http://localhost:1337/pony/find/47'

#### Expected Response

```json
 {
   "name": "Twilight Sparkle",
   "id": 47,
   "createdAt": "2013-10-14T01:22:00.000Z",
   "updatedAt": "2013-10-15T01:20:54.000Z"
 }

```


### Query Parameters

Any and all attributes that you defined on your model can be used to filter results.

For instance, if our `Pony` model has a **name** attribute: `GET http://localhost:1337/pony?name=Rainbow Dash` would return an array of ponies with the name "Rainbow Dash".

You can also paginate and sort results using the `limit`, `skip`, and `sort` parameters.

+ **limit** - the maximum number of records to send back-- useful for pagination.
+ **skip** - the number of records to skip-- useful for pagination. e.g. the following would return the second page of 30 results `http://localhost:1337/pony?skip=30&limit=30`
+ **sort** - the order in which to sort results, e.g. `http://localhost:1337/pony?sort=name DESC` or `http://localhost:1337/pony?sort=createdAt ASC`


### Notes

> Assumes the existence of both `PonyController` and a model called 'Pony'.
> The 'Find One' method does not accept query parameters. 
> For advanced filtering, you can send a `where` query parameter with a stringified JSON object.  This object will be passed directly to Waterline as a criteria for a find, i.e. `Pony.find().where(req.param('where'))`  This allows you to use `contains`, `>`, `<`, `!`, `startsWith`, `endsWith`, and more.  For more on query operators, check out [the Model documentation](https://github.com/balderdashy/sails-docs/edit/0.9/reference/Blueprints.md)


# Create A Record

### Purpose
Create a new model instance in the database.
Attributes can be sent in the HTTP body as form-encoded values or JSON.

### Description
Responds with a JSON object representing the newly created instance.  If a validation error occurred, a JSON response with the invalid attributes and a `400` status code will be returned instead.

Additionally, a `create` event will be published to all listening sockets. 

This is equivalent to running `Pony.publishCreate( theNewlyCreatedPony.toJSON() )` in a custom controller.

If the request is sent using socket.io, the requesting socket will ALSO be subscribed to "updates"+"destroys" on the newly created model instance returned (instance room). 

This is equivalent to running `Pony.subscribe(req.socket, theNewlyCreatedPony)` in a custom controller.

### Examples

#### Create (REST)

`POST http://localhost:1337/:model`

Create a new pony named "AppleJack" with a hobby of "pickin".

_via Postman_
`POST` `'http://localhost:1337/pony'`


#### JSON Request Body
```json
{
  "name": "AppleJack",
  "hobby": "pickin",
}
```

#### Example Response
```json
{
  "name": "AppleJack",
  "hobby": "pickin",
  "id": 47,
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```

#### Create (shortcuts)

`http://localhost:1337/:model/create?`

via web browser

`http://localhost:1337/pony/create?name=Shutterfly&&best_pony=yep`

#### Expected Response

```javascript
{
 "name": "Shutterfly",
 "best_pony": "yep",
 "createdAt": "2014-02-24T21:02:16.068Z",
 "updatedAt": "2014-02-24T21:02:16.068Z",
 "id": 5
}

```

### Notes

> Assumes the existence of both `PonyController` and a model called 'Pony'.

> JSON keys and values must be wrapped in double quotes.  Singles won't work.


# Update A Record

### Purpose
Update an existing model instance.
Attributes to change should be sent in the HTTP body as form-encoded values or JSON.

### Description
Updates the model instance which matches the **id** parameter.  Responds with a JSON object representing the newly updated instance.  If a validation error occurred, a JSON response with the invalid attributes and a `400` status code will be returned instead.  If no model instance exists matching the specified **id**, a `404` is returned.

Additionally, a comet message will be published to all sockets subscribed to the instance room, e.g.:
```javascript

//
// New usage:
//

// On the client

// You can still do `message`, but you'll get the 0.9-style comet messages (see below).

// New comet events you can subscribe to (for each model):
socket.on('user', console.log);
socket.on('pet', console.log);
socket.on('chair', console.log);

// -> Later, one of these might log something like:
/*
{
 verb: 'created',
 data: { name: 'Scott' },
 id: 15
}

{
 verb: 'updated'
 data: { name: 'Ricky' },
 id: 15
}

{
 verb: 'destroyed'
 data: { },
 id: 15
}

{
 verb: 'removedFrom',
 association: { alias: 'petHorses', model: 'Horse' },
 message: 'Removed a Horse from User\'s `petHorses`',
 data: { id: 'b728a8efcd2941313043' },
 id: 7
}

{
 verb: 'addedTo',
 association: { alias: 'petHorses', model: 'Horse' },
 message: 'Added a Horse to User\'s `petHorses`',
 data: { id: 'b728a8efcd2941313043;, name: 'Sea Biscuit' },
 id: 7
}
*/



//
// 0.9-style usage:
//

// On the client
socket.on('message', console.log);

// -> Later, this might log something like:
/*
{
 model: 'user',
 verb: 'update',
 data: { name: 'Scott' },
 id: 8
}
*/

```


This is equivalent to running `Pony.publishUpdate( pinkiesId, changedAttributes.toJSON() )` in a custom controller.

### Examples

#### Update (REST)

`PUT http://localhost:1337/:model/:id`

Change AppleJack's hobby to "kickin".

_via Postman_
`PUT http://localhost:1337/pony/47?hobby=kickin`

#### Expected Response
```json
{
  "name": "Pinkie Pie",
  "hobby": "kickin",
  "id": 47,
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```

#### Update (shortcuts)

`http://localhost:1337/:model/update?`

via web browser

`http://localhost:1337/pony/update/5?name=Shutterfly_myLove`

#### Expected Response

```javascript
{
  "name": "Shutterfly_myLove",
  "best_pony": "yep",
  "createdAt": "2014-02-24T21:02:16.068Z",
  "updatedAt": "2014-02-24T21:07:41.695Z",
  "id": 5
}
```



### Notes

> Assumes the existence of both `PonyController` and a model called 'Pony'.

> JSON keys and values must be wrapped in double quotes.  Single quotes won't work.


# Destroy A Record

### Purpose
Destroys an existing model instance from the database.

### Description
Destroys the model instance which matches the **id** parameter.  Responds with a JSON object representing the newly destroyed instance.  If no model instance exists matching the specified **id**, a `404` is returned.

Additionally, a `destroy` event will be published to all sockets subscribed to the instance room. 

This is equivalent to running `Pony.publishDestroy( pinkiesId )` in a custom controller.

Consequently, all sockets currently subscribed to the instance room will be unsubscribed from it.

### Examples

#### Destroy (REST)

`DELETE http://localhost:1337/:model/:id`

Delete Pinkie Pie.

via web browser

`DELETE http://localhost:1337/pony/47`

#### Expected Response

```json
{
  "name": "Pinkie Pie",
  "hobby": "kickin",
  "id": 47,
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```

#### Destroy (Shortcuts)

`http://localhost:1337/:model/destroy/:recordID`

via web browser

`http://localhost:1337/pony/destroy/5`

#### Expected Response

```json
{
  "name": "Shutterfly_myLove",
  "best_pony": "yep",
  "createdAt": "2014-02-24T21:02:16.068Z",
  "updatedAt": "2014-02-24T21:07:41.695Z",
  "id": 5
}
```


### Notes

> Assumes the existence of both `PonyController` and a model called 'Pony'.

> JSON keys and values must be wrapped in double quotes.  Singles won't work.


# Associations Create

### Purpose
Use these automatically generated routes in order to create associations between models.  This assumes you've [configured them for associations](/#!documentation/reference/ModelAssociations/ModelAssociations.html).  

### Description
You can create associations between models in 2 different ways.  You can either make the association with a record that already exists OR you can create the associated record as you associate.  Check out the examples to see how. 

### One-To-* Examples

These examples assume the existence of `Pet` and `User` APIs which can be created using the [Sails CLI Tool](/#!documentation/reference/CommandLine/CommandLine.html).  A One-To-One or a One Way association must have been configured for your models.  See [Model Association Docs](http://omfgdogs.com) for info on how to do this.

#### w/ an existing record (REST)

`POST http://localhost:1337/:model`

Create a new pony named "Pinkie Pie" and associate it with an existing pet named "Gummy" which has an `id` of 10.  

_via Postman_
`POST` `'http://localhost:1337/pony'`

#### JSON Request Body
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pet": 10
}
```

#### Example Response
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pet": {
    "name": "Gummy",
    "species": "crocodile",
    "id": 10
  },
  "id": 4,
  "createdAt": "2013-10-18T01:22:56.000Z",
  "updatedAt": "2013-11-26T22:54:19.951Z"
}
```


#### w/ new associated record (REST)

`POST http://localhost:1337/:model`

Create a new pony named "Pinkie Pie", a "snowboarding" hobby, and a pet named "Gummy".

_via Postman_
`POST` `'http://localhost:1337/pony'`


#### JSON Request Body
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pet": {
    "name": "Gummy",
    "species": "crocodile"
  }
}
```

#### Example Response
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pet": {
    "name": "Gummy",
    "species": "crocodile"
  },
  "id": 4,
  "createdAt": "2013-10-18T01:22:56.000Z",
  "updatedAt": "2013-11-26T22:54:19.951Z"
}
```

### Many-To-Many Examples

These examples assume the existence of `Pet` and `User` APIs which can be created using the [Sails CLI Tool](/#!documentation/reference/CommandLine/CommandLine.html).  Also, a Many-To-Many association must have been configured for your models.  See [Model Association Docs](http://omfgdogs.com) for info on how to do this.

#### w/ pre existing record (REST)
_via Postman_
`POST http://localhost:1337/pony`

#### JSON Request Body
```json

```

#### w/ new associated record (REST)
_via Postman_
`POST http://localhost:1337/pony`

#### JSON Request Body
```json

```



### Notes

> Assumes the existence of both `PonyController` and a model called 'Pony'.

# Associations Remove

### Purpose


### Description


### One-To-* Examples

#### w/ pre existing record (REST)
_via Postman_
`POST http://localhost:1337/pony`

#### JSON Request Body
```json

```

#### w/ new associated record (REST)
_via Postman_
`POST http://localhost:1337/pony`

#### JSON Request Body
```json

```

### Many-To-Many Examples

#### w/ pre existing record (REST)
_via Postman_
`POST http://localhost:1337/pony`

#### JSON Request Body
```json

```

#### w/ new associated record (REST)
_via Postman_
`POST http://localhost:1337/pony`

#### JSON Request Body
```json
Uncle T is the man!
```


### Notes

> Assumes the existence of both `PonyController` and a model called 'Pony'.
