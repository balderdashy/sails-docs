# Create (Blueprint)

Create a new record in your database.

```
POST /:model
```

Responds with a JSON dictionary representing the newly created instance.  If a validation error occurred, a JSON response with the invalid attributes and a `400` status code will be returned instead.

Additionally, a `create` event will be published to all listening sockets (see the docs for [.watch()](https://github.com/balderdashy/sails-docs/blob/master/reference/websockets/resourceful-pubsub/watch.md) for more info).

If the action is triggered via a socket request, the requesting socket will ALSO be subscribed to the newly created model instance. If the record is subsequently updated or deleted, a message will be sent to that socket's client informing them of the change. See the docs for .subscribe() for more info.

### Parameters

Parameters should be sent in the [request body](https://www.getpostman.com/docs/requests#body).  By default, Sails understands most common types of encodings for body parameters, including url-encoding, form-encoding, and JSON.

 Parameter      | Type                                                      | Details
 -------------- | --------------------------------------------------------- |:---------------------------------
 _*_            | ((json))                                                  | Send [body parameters](https://www.getpostman.com/docs/requests#body) with the same names as the attribute defined on your model to set those values on your new record.  <br/> <br/>These values are handled the same way as if they were passed into the model's <a href="http://sailsjs.org/documentation/reference/waterline-orm/models/create">.create()</a> method.
 _callback_     | ((string))                                                | If specified, a JSONP response will be sent (instead of JSON).  This is the name of the client-side javascript function to call, passing results as the first (and only) argument<br/> <br/> e.g. `?callback=myJSONPHandlerFn`

### Example

Create a new pony named "AppleJack" with a hobby of "pickin":

```
POST /pony
```

```json
{
  "name": "AppleJack",
  "hobby": "pickin"
}
```

##### Example Response
```json
{
  "name": "AppleJack",
  "hobby": "pickin",
  "id": 47,
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```


<docmeta name="displayName" value="create">

### Examples with Many-to-Many Associations

Suppose we have a many-to-many association set up with Ponies and Pets using the following API model defintions:

```javascript
/**
 * Pony.js
 */

module.exports = {

    attributes: {
        name: 'string',
        hobby: 'string',
        pets: {
            collection: "pet",
            via: "ponies"
        },
    }
};
```

```javascript

```javascript
/**
 * Pet.js 
 */

module.exports = {

    attributes: {
        ponies: {
            collection: "pony",
            via: "pets"
        },
        name: 'string',
        species: 'string',
    }
};
```

###Create a record while associating w/ more than one other new record

Create a new pony named "Pinkie Pie", an "ice skating" hobby, and two **new** pets named "Gummy" & "Winona".

#### Route
`POST /pony`


#### JSON Request Body
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pets" : [
    {
      "name":"Gummy",
      "species": "crocodile"
    },
    {
      "name":"Winona",
      "species":"Dog"
    }]
}
```

#### Expected Response
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "createdAt": "2015-09-12T18:23:33.392Z",
  "updatedAt": "2015-09-12T18:23:33.392Z",
  "id": 9
}
```

Note that the pets attribute is not returned. However, a call to `GET /pony/9` with `populate:true` set in your config would return the following response.

```json
{
    "pets": [
        {
            "name": "Gummy",
            "species": "crocodile",
            "createdAt": "2015-09-12T18:23:33.401Z",
            "updatedAt": "2015-09-12T18:23:33.401Z",
            "id": 5
        },
        {
            "name": "Winona",
            "species": "Dog",
            "createdAt": "2015-09-12T18:23:33.402Z",
            "updatedAt": "2015-09-12T18:23:33.402Z",
            "id": 6
        }
    ],
    "name": "Pinkie Pie",
    "hobby": "ice skating",
    "createdAt": "2015-09-12T18:23:33.392Z",
    "updatedAt": "2015-09-12T18:23:33.395Z",
    "id": 9
}
```

###Create a record while associating w/ more than one other existing record

Using the pets created above, we can create a new pony that is associated with more than one existing pet with the following:

#### Route
`POST /pony`


#### JSON Request Body
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pets" : [5,6]
}
```
OR

```json
{
  "name": "Fluttershy",
  "hobby": "Animal caretaker",
  "pets" : [
        {
            "name": "Gummy",
            "species": "crocodile",
            "createdAt": "2015-09-12T18:23:33.401Z",
            "updatedAt": "2015-09-12T18:23:33.401Z",
            "id": 5
        },
        {
            "name": "Winona",
            "species": "Dog",
            "createdAt": "2015-09-12T18:23:33.402Z",
            "updatedAt": "2015-09-12T18:23:33.402Z",
            "id": 6
        }
    ]
}
```

**So long as the ID is present in the pet JSON objects**


#### Expected Response
```json
{
    "name": "Fluttershy",
    "hobby": "Animal caretaker",
    "createdAt": "2015-09-12T18:30:19.798Z",
    "updatedAt": "2015-09-12T18:30:19.798Z",
    "id": 10
}
```

Again, note  that the pets attribute is not returned. However, a call to `GET /pony/10` with `populate:true` set in your config would return the following response.

```json
{
    "pets": [
        {
            "name": "Gummy",
            "species": "crocodile",
            "createdAt": "2015-09-12T18:23:33.401Z",
            "updatedAt": "2015-09-12T18:23:33.401Z",
            "id": 5
        },
        {
            "name": "Winona",
            "species": "Dog",
            "createdAt": "2015-09-12T18:23:33.402Z",
            "updatedAt": "2015-09-12T18:23:33.402Z",
            "id": 6
        }
    ],
    "name": "Fluttershy",
    "hobby": "Animal caretaker",
    "createdAt": "2015-09-12T18:27:44.811Z",
    "updatedAt": "2015-09-12T18:29:50.125Z",
    "id": 10
}
```