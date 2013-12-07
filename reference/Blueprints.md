# Blueprints

### Overview

By default, Sails inspects your controllers, models, and configuration and binds certain routes automatically. These dynamically generated routes are called blueprints, and allow you to access a JSON API for your models without writing any code.

The blueprint API is accessible when you have both an empty controller and model in Sails.  Behind the scenes, the various HTTP 'request methods' are being mapped to dynamically generated controller actions that perform CRUD operations on the model of the same name.  The default setting is on but can be disabled in '/config/controllers.js'.

While the following documentation focuses on HTTP, you can also use Sails' built-in socket.io emulation layer to talk to the blueprint API (or any of your Sails routes / custom controllers) via Socket.io.


# Find Records

`GET http://localhost:1337/:model`

### Purpose
Find and return model instances from the database.

### Description
Responds with a JSON array of objects.

If request is sent using socket.io, the socket will be subscribed to both "creates" of new models (class room) and "updates"+"destroys" for all model instances returned (instance rooms).

(this is equivalent to running `Pony.subscribe(req.socket)` and `Pony.subscribe(req.socket, anArrayOfPonies)` in a custom controller)

### Example Usage

Get all ponies in the database:

_via the URL bar in your web browser_
`http://localhost:1337/pony/1`

### Query Parameters

Any attributes that you defined on your model can all be used to filter results.

For instance, if our `Pony` model has a **name** attribute: `GET http://localhost:1337/pony?name=Rainbow Dash` would return an array of ponies with the name "Rainbow Dash".

You can also paginate and sort results using the `limit`, `skip`, and `sort` parameters.

+ **limit** - the maximum number of records to send back-- useful for pagination.
+ **skip** - the number of records to skip-- useful for pagination. e.g. the following would return the second page of 30 results `http://localhost:1337/pony?skip=30&limit=30`
+ **sort** - the order in which to sort results, e.g. `http://localhost:1337/pony?sort=name DESC` or `http://localhost:1337/pony?sort=createdAt ASC`


### Example Response

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


### Notes

> Assumes the existence of both `PonyController` and a model called 'Pony'.

> For advanced filtering, you can send a `where` query parameter with a stringified JSON object.  This object will be passed directly to Waterline as a criteria for a find, i.e. `Pony.find().where(req.param('where'))`  This allows you to use `contains`, `>`, `<`, `!`, `startsWith`, `endsWith`, and more.  For more on query operators, check out [the Model documentation](https://github.com/balderdashy/sails-docs/edit/0.9/reference/Blueprints.md)






# Find One Record

`GET http://localhost:1337/:model/:id`

### Purpose
Find and return a single model instance from the database.


### Description
Responds with a JSON object (or `404`) if no matching record was found.

If request is sent using socket.io, the socket will be subscribed to "updates"+"destroys" for the model instance returned (instance room).

(this is equivalent to running `Pony.subscribe(req.socket, onePony)` in a custom controller)


### Query parameters
_N/A_

### Example Response

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




# Create A Record

`POST http://localhost:1337/:model`

### Purpose
Create a new model instance in the database.
Attributes can be sent in the HTTP body as form-encoded values or JSON.

### Description
Responds with a JSON object representing the newly created instance.  If a validation error occurred, a JSON response with the invalid attributes and a `400` status code will be returned instead.

Additionally, a `create` event will be published to all listening sockets.
(this is equivalent to running `Pony.publishCreate( theNewlyCreatedPony.toJSON() )` in a custom controller)

If the request is sent using socket.io, the requesting socket will ALSO be subscribed to "updates"+"destroys" on the newly created model instance returned (instance room).
(this is equivalent to running `Pony.subscribe(req.socket, theNewlyCreatedPony)` in a custom controller)


### Example Usage

Create a new pony named "Pinkie Pie", a "snowboarding" hobby, and a pet named "Gummy".

_via Postman_
`POST` `'http://localhost:1337/pony'`


### JSON Request Body
```json
{
  "name": "Pinkie Pie",
  "hobby": "snowboarding",
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
  "hobby": "snowboarding",
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

`PUT http://localhost:1337/:model/:id`


### Purpose
Update an existing model instance.
Attributes to change should be sent in the HTTP body as form-encoded values or JSON.

### Description
Updates the model instance which matches the **id** parameter.  Responds with a JSON object representing the newly updated instance.  If a validation error occurred, a JSON response with the invalid attributes and a `400` status code will be returned instead.  If no model instance exists matching the specified **id**, a `404` is returned.

Additionally, an `update` event will be published to all sockets subscribed to the instance room.
(this is equivalent to running `Pony.publishUpdate( pinkiesId, changedAttributes.toJSON() )` in a custom controller)


### Example Usage

Change Pinkie Pie's hobby to "running".

_via Postman_
`PUT` `'http://localhost:1337/pony/4'`

### JSON Request Body
```json
{
  "hobby": "running"
}
```

### Example Response
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
> Assumes the existence of both a controller and model called 'pony'

> JSON keys and values must be wrapped in double quotes.  Single quotes won't work.





# Delete A Record
`DELETE http://localhost:1337/:model/:id`

### Purpose
Delete an existing model instance from the database.

### Description
Deletes the model instance which matches the **id** parameter.  Responds with a JSON object representing the newly destroyed instance.  If no model instance exists matching the specified **id**, a `404` is returned.

Additionally, a `destroy` event will be published to all sockets subscribed to the instance room.
(this is equivalent to running `Pony.publishDestroy( pinkiesId )` in a custom controller)
Consequently, all sockets currently subscribed to the instance room will be unsubscribed from it.


### Example Usage

Delete Pinkie Pie.

_via Postman_
`DELETE http://localhost:1337/pony/4`


### Example Response

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
> Assumes the existance of both a controller and model called 'pony'

> JSON keys and values must be wrapped in double quotes.  Singles won't work.



