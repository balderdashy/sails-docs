# Create a Record

Creates a new model instance in your database then returns it's values.

```
POST /:model
```


Attributes can be sent in the HTTP body as form-encoded values or JSON.

Responds with a JSON object representing the newly created instance.  If a validation error occurred, a JSON response with the invalid attributes and a `400` status code will be returned instead.

Additionally, a `create` event will be published to all listening sockets (see the docs for [.watch()](https://github.com/balderdashy/sails-docs/blob/master/reference/ModelMethods.md#watchrequest) for more info).

If the action is triggered via a socket request, the requesting socket will ALSO be subscribed to the newly created model instance.  If the record is subsequently updated or deleted, a message will be sent to that socket's client informing them of the change. See the docs for .subscribe() for more info.

### Parameters

 Parameter      | Type                                                      | Details
 -------------- | --------------------------------------------------------- |:---------------------------------
 *              | ((string))<br/>((number))<br/>((object))<br/>((array))    | For `POST` (RESTful) requests, pass in body parameter with the same name as the attribute defined on your model to set those values on your new record.  For `GET` (shortcut) requests, add the parameters to the query string. <br/> <br/> Nested objects and arrays passed in as parameters are handled the same way as if they were passed into the model's <a>.create()</a> method.
 callback       | ((string))                                                | If specified, a JSONP response will be sent (instead of JSON).  This is the name of the client-side javascript function to call, passing results as the first (and only) argument<br/> <br/> e.g. `?callback=myJSONPHandlerFn`

### Examples

#### Create a record (REST)

Create a new pony named "AppleJack" with a hobby of "pickin".

#### Route
`POST /pony`



#### JSON Request Body
```json
{
  "name": "AppleJack",
  "hobby": "pickin"
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

#### Create a record (shortcuts)

#### Route
`GET /pony/create?name=Shutterfly&best_pony=yep`

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


### Examples with One Way Associations

You can create associations between models in two different ways.  You can either make the association with a record that already exists OR you can create both records simultaneously.  Check out the examples to see how.

These examples assume the existence of `Pet` and `Pony` APIs which can be created by hand or using the [Sails CLI Tool](/#!documentation/reference/CommandLine/CommandLine.html).  The `Pony` model must be configured with a `pet` attribute pointing to the `Pet` model.  See [Model Association Docs](./ModelAssociations.md) for info on how to do this.

### Create record while associating w/ existing record (REST)

Create a new pony named "Pinkie Pie" and associate it with an existing pet named "Gummy" which has an `id` of 10.

#### Route
`POST /pony`

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


### Create new record while associating w/ another new record (REST)

Create a new pony named "Pinkie Pie", an "ice skating" hobby, and a new pet named "Gummy".

#### Route
`POST /pony`


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

#### Expected Response
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pet": {
    "name": "Gummy",
    "species": "crocodile"，
    "id": 10
  },
  "id": 4,
  "createdAt": "2013-10-18T01:22:56.000Z",
  "updatedAt": "2013-11-26T22:54:19.951Z"
}
```

<docmeta name="uniqueID" value="CreateARecord744986">
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
    "id": 11
}
```