# Instance Methods

Instance methods brooowwww

# .save()

### Purpose
The `save` method updates your record in the database using the current attributes.  It then returns the newly saved object in the callback. 

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |     Callback        | `function`          | Yes        |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Saved Record       | `{ }`               |


### Example Usage

```javascript

User.find().exec(
	function(err,myRecord){

		// Grab a record off the top of the returned array and save a new attribute to it
		myRecord.pop().name = 'Hank';
		myRecord.pop().save(
			function(err,s){
				console.log('User with ID '+s.id+' now has name '+s.name);
			});
	});

// User with ID 1 now has name Hank

// Don't forget to handle your errors.
// Don't forget to abide by the rules you set in your model

```
### Notes


# .destroy()

### Purpose
Destroys the your record in the database. It returns an error in the callback if it has trouble. 

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |     Callback        | `function`          | Yes        |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |


### Example Usage

```javascript

User.find().exec(
	function(err,myRecord){

		// Grab a record off the top of the returned array then destroy it
		myRecord.pop().destroy(
			function(err){
				console.log('User with ID '+myRecord.pop().id+' was destroyed');
			});
	});

// User with ID 1 was destroyed

// Don't forget to handle your errors.


```

### Notes


# .validate()

### Purpose
Checks the current keys/values on the record against the validations specified in the attributes object of your model. 

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |     Callback        | `function`          | Yes        |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |


### Example Usage

```javascript

User.find().exec(
	function(err,myRecord){

		// Grab a record off the top, change it to the wrong data type, then try to validate
		myRecord.pop().name = ['Marie','Hank'];
		myRecord.pop().validate(
			function(err){
				if (err)
					console.log(JSON.stringify(err));
			});
	});
	
// {"ValidationError":{"name":[{"data":["Marie","Hank"],"message":"Validation error: \"Marie,Hank\" is not of type \"string\"","rule":"string"}]}}

```

For model

```javascript
module.exports = {

  attributes: {
  	name: 'string'

  }

};
```

### Notes
> This is shorthand for Model.validate({ attributes }, cb)
> If you .save() without first validating, waterline tries to convert.  If it cant, it will throw an error.
> In this case, it would have converted the array to the string 'Marie,Hank'

> There will be no parameters in the callback unless there is an error.  No news is good news.

> Note, This method is not asynchronous


# .toObject()

### Purpose
The toObject method returns a cloned model instance (record) but stripped of all instance methods.

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
|   |    NO PARAMS        |                     |            |


#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
|   |    NO CALLBACK      |                     |


#### Return Value

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
|   |   Cloned Record     |        `{ }`        |

### Example Usage

```javascript

// See usage in .toJSON()

```

### Notes
> You will only want to use .toObject when overriding the default .toJSON instance method.



# .toJSON()

### Purpose
This method also returns a cloned model instance.  This one however includes all instance methods.  Be sure to read the notes on this one.

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
|   |    NO PARAMS        |                     |            |


#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
|   |    NO CALLBACK      |                     |


#### Return Value

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
|   |   Cloned Record     |        `{ }`        |


### Example Usage

```javascript

User.find().exec(
	function(err,myRecord){
		var datUser = myRecord.pop().toObject();
		console.log(datUser);
	});

/* { id: 2,
  createdAt: '2013-10-31T22:42:25.459Z',
  updatedAt: '2013-11-01T20:12:55.534Z',
  name: 'Hank',
  phoneNumber: '101-150-1337' } */

User.find().exec(
	function(err,myRecord){
		var datUser = myRecord.pop().toJSON();
		console.log(datUser);
	});

/* { id: 2,
  createdAt: '2013-10-31T22:42:25.459Z',
  updatedAt: '2013-11-01T20:12:55.534Z',
  name: 'Hank' } */



// Don't forget to handle your errors

```

For model

```javascript

module.exports = {
  attributes: {
    name: 'string',
    phoneNumber: 'string',

    // Override the default toJSON method

    toJSON: function() {
      var obj = this.toObject();
      delete obj.phoneNumber;
      return obj;
    }
  }
}

```
### Notes
> The real power of toJSON relies on the fact every model instance sent out via res.json is first passed through toJSON.
> Instead of writing custom code for every controller action that uses a particular model (including the "out of the box" blueprints), you can manipulate outgoing records by simply overriding the default toJSON function in your model.  
> You would use this to keep private data like email addresses and passwords from being sent back to every client.

> Note, This method is not asynchronous

# Custom Instance Methods

If you would like to write your own instance methods, you will declare them inside of your model.  For more information, see the guide on models at http://omfgdogs.com
