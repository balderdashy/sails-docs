# Blueprints

> **WARNING**
> Association blueprints (v0.10) are currently experimental!
> This API is likely to change.  Beware!

### Overview

By default, Sails inspects your controllers, models, and configuration and binds certain routes automatically. These dynamically generated routes are called blueprints, and allow you to access a JSON API for your models without writing any code.

The blueprint API is accessible when you have both an empty controller and model in Sails.  Behind the scenes, the various HTTP 'request methods' are being mapped to dynamically generated controller actions that perform CRUD operations on the model of the same name.  The default setting is on but can be disabled in '/config/controllers.js'.

While the following documentation focuses on HTTP, you can also use Sails' built-in socket.io emulation layer to talk to the blueprint API (or any of your Sails routes / custom controllers) via Socket.io.


### Notes

> Absolutely all of these Blueprint Methods can be used with Socket.IO. Check out the [Socket-Client](./#!documentation/reference/SocketClient/SocketClient.html) section of reference for example usage.

# Find Records

### Purpose
Find and return model instances from the database.

### Description
Responds with a JSON array of objects.

If request is sent using Socket.IO, the socket will be subscribed to both "creates" of new models (class room) and "updates"+"destroys" for all model instances returned (instance rooms). 

This is equivalent to running `Pony.subscribe(req.socket)` and `Pony.subscribe(req.socket, anArrayOfPonies)` in a custom controller.

### Example Usage

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

### Query Parameters

Any and all attributes that you defined on your model can be used to filter results.

For instance, if our `Pony` model has a **name** attribute: `GET http://localhost:1337/pony?name=Rainbow Dash` would return an array of ponies with the name "Rainbow Dash".

You can also paginate and sort results using the `limit`, `skip`, and `sort` parameters.

+ **limit** - the maximum number of records to send back-- useful for pagination.
+ **skip** - the number of records to skip-- useful for pagination. e.g. the following would return the second page of 30 results `http://localhost:1337/pony?skip=30&limit=30`
+ **sort** - the order in which to sort results, e.g. `http://localhost:1337/pony?sort=name DESC` or `http://localhost:1337/pony?sort=createdAt ASC`


### Notes

> Assumes the existence of both `PonyController` and a model called 'Pony'.

> For advanced filtering, you can send a `where` query parameter with a stringified JSON object.  This object will be passed directly to Waterline as a criteria for a find, i.e. `Pony.find().where(req.param('where'))`  This allows you to use `contains`, `>`, `<`, `!`, `startsWith`, `endsWith`, and more.  For more on query operators, check out [the Model documentation](https://github.com/balderdashy/sails-docs/edit/0.9/reference/Blueprints.md)



# Find One Record

### Purpose
Find and return a single model instance from the database.

### Description
Responds with a JSON object (or `404`) if no matching record was found.

If request is sent using socket.io, the socket will be subscribed to "updates"+"destroys" for the model instance returned (instance room).

This is equivalent to running `Pony.subscribe(req.socket, onePony)` in a custom controller.

### Example Usage

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

### Notes

> Assumes the existence of both `PonyController` and a model called 'Pony'.
> This method does not accept query parameters. 



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


### Example Usage

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


### Example Response
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


### Example Usage

`PUT http://localhost:1337/:model/:id`

Change Pinkie Pie's hobby to "running".

_via Postman_
`PUT` `'http://localhost:1337/pony/4'`

#### JSON Request Body
```json
{
  "hobby": "running"
}
```

#### Expected Response
```json
{
  "name": "Pinkie Pie",
  "hobby": "running",
  "pet": {
    "name": "Gummy",
    "species": "crocodile"
  },
  "id": 4,
  "createdAt": "2013-10-18T01:22:56.000Z",
  "updatedAt": "2013-11-26T22:54:19.951Z"
}
```

### Notes

> Assumes the existence of both `PonyController` and a model called 'Pony'.

> JSON keys and values must be wrapped in double quotes.  Single quotes won't work.





# Delete A Record

### Purpose
Delete an existing model instance from the database.

### Description
Deletes the model instance which matches the **id** parameter.  Responds with a JSON object representing the newly destroyed instance.  If no model instance exists matching the specified **id**, a `404` is returned.

Additionally, a `destroy` event will be published to all sockets subscribed to the instance room. 

This is equivalent to running `Pony.publishDestroy( pinkiesId )` in a custom controller.

Consequently, all sockets currently subscribed to the instance room will be unsubscribed from it.

### Example Usage

`DELETE http://localhost:1337/:model/:id`

Delete Pinkie Pie.

_via Postman_
`DELETE http://localhost:1337/pony/4`


#### Expected Response

```json
{
  "name": "Pinkie Pie",
  "hobby": "running",
  "pet": {
    "name": "Gummy",
    "species": "crocodile"
  },
  "id": 4,
  "createdAt": "2013-10-18T01:22:56.000Z",
  "updatedAt": "2013-11-26T22:54:19.951Z"
}
```

### Notes

> Assumes the existence of both `PonyController` and a model called 'Pony'.

> JSON keys and values must be wrapped in double quotes.  Singles won't work.



