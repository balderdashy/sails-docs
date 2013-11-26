# Blueprints
### Overview
The blueprint API is accessible when you have both an empty controller and model in Sails.  Behind the scenes, the various HTTP 'request methods' are being mapped to dynamically generated controller actions that perform CRUD operations on the model of the same name.  The default setting is on but can be disabled in '/config/controllers.js'.


		// 'post /:controller'
		// 'put /:controller/:id'
		// 'delete /:controller/:id'

# Find Records
### Purpose
Find and return model instances.

### Example Usage
From a web browser
```javascript

// httpMethod http://localhost:port/:controllerName/:RecordID'

GET 'http://localhost:1337/pony/1'

```

will yield

```json
 {
   "name": "Rainbow Dash",
   "id": 1,
   "createdAt": "2013-10-18T01:22:56.000Z",
   "updatedAt": "2013-10-18T01:22:56.000Z"
 }

```

### Notes
> Assumes the existance of both a controller and model called 'pony'

> JSON keys and values must be wrapped in double quotes.  Singles won't work.



# Create Records
### Purpose
Create new model instances.

### Example Usage
via Postman `POST` `'http://localhost:1337/pony'`
```javascript

I CANT GET THIS SHIT TO WORK

```

will yield

```json

```

### Notes
> Assumes the existance of both a controller and model called 'pony'

> JSON keys and values must be wrapped in double quotes.  Singles won't work.


# Update Records
### Purpose
Update existing model instances.

### Example Usage
via Postman `PUT` `'http://localhost:1337/pony/1'`
```javascript

// RAW JSON
{"name":"Pinkie Pie"}

```

will yield

```json

 {
   "name": "Pinkie Pie",
   "id": 1,
   "createdAt": "2013-10-18T01:22:56.000Z",
   "updatedAt": "2013-11-26T22:54:19.951Z"
 }


```

### Notes
> Assumes the existance of both a controller and model called 'pony'

> JSON keys and values must be wrapped in double quotes.  Singles won't work.


# Delete Records
### Purpose
Delete existing model instances.

### Example Usage
via Postman `DELETE` `'http://localhost:1337/pony/1'`

```javascript

// HTTP Method and Action
DELETE http://localhost:1337/pony

```

will yield

```json

 {
   "name": "Pinkie Pie",
   "id": 1,
   "createdAt": "2013-10-18T01:22:56.000Z",
   "updatedAt": "2013-11-26T22:54:19.951Z"
 }

```

### Notes
> Assumes the existance of both a controller and model called 'pony'

> JSON keys and values must be wrapped in double quotes.  Singles won't work.



# Query Params
### Overview

Any attributes that you defined on your model as well as a few special attributes supplied by Sails can all be used to filter query results.

For instance, if our ponies have names, `GET http://localhost:1337/pony?name=Rainbow Dash` would return an array of ponies with the name "Rainbow Dash".

+ where
+ limit
+ skip
+ sort

