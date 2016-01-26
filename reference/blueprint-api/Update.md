# Update (Blueprint)

Updates an existing record.
Attributes to change should be sent in the HTTP body as form-encoded values or JSON.

```
PUT /:model/:id
```

Updates the model instance which matches the **id** parameter. Responds with a JSON object representing the newly updated instance.  If a validation error occurred, a JSON response with the invalid attributes and a `400` status code will be returned instead.  If no model instance exists matching the specified **id**, a `404` is returned.

### Parameters

 Parameter                          | Type                                                    | Details
 ---------------------------------- | ------------------------------------------------------- |:---------------------------------
 id<br/>*(required)*                | ((number))<br/>*-or-*<br/>((string))                    | The primary key value of the record to update.<br/><br/>e.g. `PUT /product/5`
 *                                  | ((string))<br/>((number))<br/>((object))<br/>((array))  | For `POST` (RESTful) requests, pass in body parameters with the same name as the attributes defined on your model to set those values on the desired record. For `GET` (shortcut) requests, add the parameters to the query string.
 _callback_                         | ((string))                                              | If specified, a JSONP response will be sent (instead of JSON). This is the name of the client-side javascript function to call, passing results as the first (and only) argument<br/> <br/> e.g. `?callback=myJSONPHandlerFn`

### Examples

##### Update Record (REST)

Change Applejack's hobby to "kickin":

`PUT /pony/47`

##### JSON Request Body
```json
{
  "hobby": "kickin"
}
```

##### Expected Response
```json
{
  "hobby": "kickin",
  "id": 47,
  "name": "AppleJack",
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```



<docmeta name="displayName" value="update">
