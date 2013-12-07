# Blueprints

### Overview

By default, Sails inspects your controllers, models, and configuration and binds certain routes automatically. These dynamically generated routes are called blueprints, and allow you to access a JSON API for your models without writing any code.

The blueprint API is accessible when you have both an empty controller and model in Sails.  Behind the scenes, the various HTTP 'request methods' are being mapped to dynamically generated controller actions that perform CRUD operations on the model of the same name.  The default setting is on but can be disabled in '/config/controllers.js' .


# Find Records

`GET http://localhost:1337/modelName`

### Purpose
Find and return model instances from the database.

### Example Usage

From a web browser
```javascript
GET 'http://localhost:1337/pony/1'
```

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
 }
 ]

```


### Notes

> Assumes the existance of both `PonyController` and a model called 'Pony'.

> For advanced filtering, you can send a `where` query parameter with a stringified JSON object.  This object will be passed directly to Waterline as a criteria for a find, i.e. `Pony.find().where(req.param('where'))`  This allows you to use `contains`, `>`, `<`, `!`, `startsWith`, `endsWith`, and more.  For more on query operators, check out [the Model documentation](https://github.com/balderdashy/sails-docs/edit/0.9/reference/Blueprints.md)






# Find One Record

`GET http://localhost:1337/modelName/id`

### Purpose
Find and return a single model instance from the database.

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

> Assumes the existance of both `PonyController` and a model called 'Pony'.




# Create Records

### Purpose
Create new model instances in the database.

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

> JSON keys and values must be wrapped in double quotes.  Single quotes won't work.

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



