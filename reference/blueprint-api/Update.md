# Update (Blueprint)

Update an existing record in the database.

```
PUT /:model/:id
```

This updates the record in the model which matches the **id** parameter and responds with the newly updated record as a JSON dictionary.  If a validation error occurred, a JSON response with the invalid attributes and a `400` status code will be returned instead.  If no model instance exists matching the specified **id**, a `404` is returned.


### Parameters

_Attributes to change should be sent in the HTTP body as form-encoded values or JSON._

 Parameter                          | Type                                                    | Details
 ---------------------------------- | ------------------------------------------------------- |:---------------------------------
 id<br/>*(required)*                | ((number))<br/>*-or-*<br/>((string))                    | The primary key value of the record to update.<br/><br/>e.g. `PUT /product/5`
 *                                  | ((json))                                                | For `POST` (RESTful) requests, pass in body parameters with the same name as the attributes defined on your model to set those values on the desired record. For `GET` (shortcut) requests, add the parameters to the query string.
 _callback_                         | ((string))                                              | If specified, a JSONP response will be sent (instead of JSON). This is the name of the client-side javascript function to call, passing results as the first (and only) argument<br/> <br/> e.g. `?callback=myJSONPHandlerFn`

### Example

Change Applejack's hobby to "kickin":

`PUT /pony/47`

```json
{
  "hobby": "kickin"
}
```

[![Run in Postman](https://s3.amazonaws.com/postman-static/run-button.png)](https://www.getpostman.com/run-collection/96217d0d747e536e49a4)

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
