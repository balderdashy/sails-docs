# Update a Record

### `PUT /:model/:record`

Update an existing record.
Attributes to change should be sent in the HTTP body as form-encoded values or JSON.

### Description
Updates the model instance which matches the **id** parameter.  Responds with a JSON object representing the newly updated instance.  If a validation error occurred, a JSON response with the invalid attributes and a `400` status code will be returned instead.  If no model instance exists matching the specified **id**, a `404` is returned.

### Parameters

 Parameter                          | Type                                                    | Details
 ---------------------------------- | ------------------------------------------------------- |:---------------------------------
 id<br/>*(required)*                | ((number))<br/>*-or-*<br/>((string))                    | The primary key value of the record to update.<br/><br/>e.g. `PUT /product/5`
 *                                  | ((string))<br/>((number))<br/>((object))<br/>((array))  | For `POST` (RESTful) requests, pass in body parameters with the same name as the attributes defined on your model to set those values on the desired record.  For `GET` (shortcut) requests, add the parameters to the query string.
 callback                           | ((string))                                              | If specified, a JSONP response will be sent (instead of JSON).  This is the name of the client-side javascript function to call, passing results as the first (and only) argument<br/> <br/> e.g. `?callback=myJSONPHandlerFn`

### Examples

### Update Record (REST)

Change AppleJack's hobby to "kickin".

#### Route
`PUT /pony/47`

#### JSON Request Body
```json
{
  "hobby": "kickin"
}
```

### Expected Response
```json
{
  "name": "AppleJack",
  "hobby": "kickin",
  "id": 47,
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```

### Update Record (Shortcuts)

`GET /pony/update/47?hobby=kickin`

#### Expected Response

Same as above.

### Add association between two existing records (REST)

Give Pinkie Pie the pre-existing pet named "Bubbles" who has ID 15.

#### Route
`POST /pony/4/pets`

#### JSON Request Body
```json
{
  "id": 15
}
```

#### Expected Response
```json
{
  "name": "Pinkie Pie",
  "hobby": "kickin",
  "id": 4,
  "pets": [{
      "name": "Gummy",
      "species": "crocodile"
      "id": 10,
      "createdAt": "2014-02-13T00:06:50.603Z",
      "updatedAt": "2014-02-13T00:06:50.603Z"
    },{
      "name": "Bubbles",
      "species": "wiggleworm"
      "id": 15,
      "createdAt": "2014-02-13T00:06:50.603Z",
      "updatedAt": "2014-02-13T00:06:50.603Z"
    }],
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```

### Add association between two existing records (Shortcuts)
`GET /pony/4/pets/add/15`

### Remove Association (Many-To-Many) (REST)

Remove Pinkie Pie's pet, "Gummy" (ID 12)

#### Route
`DELETE /pony/4/pets`

#### JSON Request Body
```json
{
  "id": 12
}
```

#### Expected Response
```json

{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pets": [{
      "name": "Bubbles",
      "species": "crackhead"
      "id": 15,
      "createdAt": "2014-02-13T00:06:50.603Z",
      "updatedAt": "2014-02-13T00:06:50.603Z"
    }],
  "id": 4,
  "createdAt": "2013-10-18T01:22:56.000Z",
  "updatedAt": "2013-11-26T22:54:19.951Z"
}

```

#### Remove Association (Many-To-Many) (Shortcuts)

#### Route

`GET /pony/4/pets/remove/12`

#### Expected Response

Same as above.

<docmeta name="uniqueID" value="UpdateARecord421031">
<docmeta name="displayName" value="update">

