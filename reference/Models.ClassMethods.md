# CRUD Methods
The methods below are the basic crud methods availebl in sails.  Here is a very quick reference for each method. More detailed information can be found below.  All Methods are asyncronous.

For every class method, the callback parameter is optional.  If one is not supplied, it will return a chainable object.


# .create()
### Purpose
Creates a new instance of this model in the database.

### Overview
#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Records to Create  |      `{}`, `[{}]`   | Yes	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

```javascript 

// create a new record with name 'Walter Jr'

User.create({name:'Walter Jr'}).exec(function createCB(err,created){
	console.log('Created user with name '+created.name);
	});

// Created user with name Walter Jr
// Don't forget to handle your errors and abide by the rules you defined in your model
```
### Notes
>



# .update()
### Purpose
Updates existing record in the database that match the given criterea.

### Overview
#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |   Find Criterea     |   `{}`,`[{}]`,'string'  | 	Yes     |
| 2 |   Updated Records   |   `{}`,`[{}]`       | 	Yes     |
| 3 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Sucessfully Updated Records    | `[{}]`        |

### Example Usage

```javascript 
User.update({name:'Walter Jr'},{name:'Flynn'}).exec(function updateCB(err,updated){
	console.log('Updated user to have name '+updated[0].name);
	});
	
// Updated user to have name Flynn
// Don't forget to handle your errors and abide by the rules you defined in your model

```
### Notes
> Although you may pass .update() an object or an array of objects, it will always return an array of objects.
> Any string arguments passed must be the ID of the record.




# .destroy()
### Purpose
Destroys all record in your database that matches the given criterea.

### Overview
#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criterea    | `{}`,`[{}]`,'string'  | Yes |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |


### Example Usage

```javascript 
User.destroy({name:'Flynn'}).exec(function deleteCB(err){
	console.log('The record has been deleted');
	});
	
// If the record existed, then it has been deleted
// Don't forget to handle your errors

```
### Notes
> If you want to confirm the record exists before you delete it, you must first perform a find()
> Any string arguments passed must be the ID of the record.


# .findOrCreate()
### Purpose
Checks for the existence of the record in the first parameter.  If it can't be found, the record in the second parameter is created.

### Overview
#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criterea    | `{}`,`[{}]`,'string'  | Yes |
| 2 |  Records to Create  | `{}`,`[{}]`          | 	Yes  |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

```javascript 

User.findOrCreate({name:'Walter'},{name:'Jessie'}).exec(function createFindCB(err,record){
	console.log('What\'s cookin\' '+record.name+'?');
	});
	
// What's cookin' Jessie?
// Don't forget to handle your errors and abide by the rules you defined in your model

```
### Notes
> Any string arguments passed must be the ID of the record.



# .findOne()
### Purpose
This finds and returns a single record that meets the criterea.

### Overview
#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criterea    | `{}`,'string'  | Yes |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Found Record       | `{}`                |


### Example Usage

```javascript 
User.findOne({name:'Jessie'}).exec(function findOneCB(err,found){
	console.log('We found '+found.name);
	});
	
// We found Jessie
// Don't forget to handle your errors

```
### Notes
> Any string arguments passed must be the ID of the record.



# .find()
### Purpose
Finds and returns all records that meet the criterea object(s) that you pass it.

### Overview
#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criterea    | `{}`,`[{}]`,'string'| Yes |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Found Records      | `{}`, `[{}]`        |

### Example Usage

```javascript 
User.find({}).exec(function findCB(err,found){
	while (found.length)
		console.log('Found User with name '+found.pop().name)
	});

// Found User with name Flynn
// Found User with name Jessie

// Don't forget to handle your errors

```
### Notes
> Any string arguments passed must be the ID of the record.


# .startsWith()
### Purpose
This is shorthand for a .find() query that uses the startsWith query modifier.

### Overview
#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criterea    | `{}`,`[{}]`,'string'| Yes |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Found Records      | `[{}]`              |

### Example Usage

```javascript 
User.startsWith({name:'Fl'},function swCB(err,found){
	console.log('User  '+found[0].name+' starts with \'Fl\'');
	});
	
// User  Flynn starts with 'Fl'
// Don't forget to handle your errors

```
### Notes
> Although you may pass .startsWith an object or an array of objects, it will always return an array.
> Warning! This method does not support .exec() !  You MUST supply a callback.  
> Any string arguments passed must be the ID of the record.

# .endsWith()
### Purpose
This method performs a query on the model and returns those ...
### Overview
#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criterea    | `{}`,`[{}]`,'string'| Yes |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Found Records      | `[{}]`              |

### Example Usage

```javascript 
User.endsWith({name:'ie'},function ewCB(err,found){
	console.log('User '+found[0].name+' ends with \'ie\'');
	});
	
// User Jessie ends with 'ie'
// Don't forget to handle your errors

```
### Notes
> Although you may pass .endsWith an object or an array of objects, it will always return an array of objects.
> Warning! This method does not support .exec() !  You MUST supply a callback.  
> Any string arguments passed must be the ID of the record.


# .validate()
### Purpose
This method ensures that the current attributes on your model instance meet the criteria you defined in your model.

### Overview
#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criterea    | `{}`,`[{}]`,'string'| Yes        |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |


### Example Usage

```javascript 

User.findOne(1).exec(function(err,myRecord){

	// petName is defined as a 'string'.  Let's give it an array and see what happens.

	myRecord.petName = [1,2];
	
	User.validate(myRecord,function(err){
		sails.log('Error:'+JSON.stringify(err));
	});
});

// Error:{"ValidationError":{"petName":[{"data":[1,2],"message":"Validation error: \"1,2\" is not of type \"string\"","rule":"string"}]}}

```

### Notes
> Any string arguments passed must be the ID of the record.



# .count()
### Purpose
This method returns the number of records in your database that meet the given search criterea

### Overview
#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criterea    | `{}`,`[{}]`,'string'  | Yes |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Number of Records  | 'int'               |

### Example Usage

```javascript 
User.count({name:'Flynn'}).exec(function countCB(err,found){
	console.log('There are '+found+' users called \'Flynn\'');
	});
	
// There are 1 users called 'Flynn'
// Don't forget to handle your errors

```
### Notes
> Any string arguments passed must be the ID of the record.



# .stream()
### Purpose
This method uses a <a href="http://nodejs.org/api/stream.html#stream_class_stream_writable">node write stream</a> to pipe model data as it is retrieved without first having to buffer all of the results to memory.  

### Overview
#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criterea    | `{}`,`[{}]`,'string' | Yes |
| 2 | Custom Write/End Methods | `{}`          | No        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Stream of Records  | `stream`  |

### Example Usage

UsersController.js
```javascript
module.exports = {
    
  testStream: function(req,res){

    if (req.param('startStream') && req.isSocket){

        var getSocket = req.socket;
        
        // Start the stream.  Pipe it to sockets.
        User.stream({name:'Walter'}).pipe(getSocket.emit);
        
    } else {

      res.view();
    
    }


  }
}
````

views/users/testSocket.ejs
```javascript
<style>.addButton{display:inline-block;line-height:100px;width:400px;height:100px;border:1px solid black;cursor:pointer;}</style>

<script>
window.onload = function startListening(){
    socket.on('gotUser',function(data){
    	console.log(data.name+' number '+data.id+' has joined the party');
    });
};

</script>
<center>
<div class="addButton" onClick="socket.get('/users/testStream/',{startStream:true})">
Stream all the Users ! </div>

```

### Notes
> This method is useful for piping data from VERY large models straight to res.  You can also pipe it other places.  See the node stream docs for more info.
> Only the mongo, mysql, and posgresql adapters support this method.  This won't work with the disk adapter.
> Any string arguments passed must be the ID of the record.


# Dynamic Finders
These methods are automatically generated for each attribute in each model of your sails app.  This includes the id, CreatedAt, and UpdatedAt attributes that exist in every record.

# .findBy`<attribute>`()
### Purpose
Find and return records by a specific model attribute.

### Overview
#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criterea    | `{}`,`[{}]`,'string'  | Yes |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Found Records      | `[{}]`              |

### Example Usage

```javascript 
User.findByName(['Flynn','Walter','craig']).exec(function findCB(err,found){
	while (found.length)
		console.log('Found User with name '+found.pop().name);
	});
	
// Found User with name Walter
// Found User with name Flynn
// Don't forget to handle your errors

```
### Notes
> Any string arguments passed must be the ID of the record.


# .findOneBy`<attribute>`()
### Purpose
Find and return one record by a specific model attribute.

### Overview
#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criterea    | `{}`,`[{}]`,'string'  | Yes |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Found Record    | `{}`        |

### Example Usage

```javascript 
User.findOneByName('Walter').exec(function findCB(err,found){
	console.log('Found User with name '+found.name);
	});
	
// Found User with name Walter
// Don't forget to handle your errors

```
### Notes
> This will always return a single object.
> Any string arguments passed must be the ID of the record.



# .countBy`<attribute>`()
### Purpose
Count the number of records in a model with a particular model attribute. 

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criterea    | `{}`,`[{}]`,'string'  | Yes |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Number of Records  | `int`        |

### Example Usage

```javascript 
User.countByName('Walter').exec(function countCB(err,found){
	console.log('There are '+found+' users called \'Walter\'');
	});
	
// There are 1 users called 'Walter'
// Don't forget to handle your errors
```
### Notes
> The value returned will be equal to the sum of the products of all matched criterea objects and the number of records that particular object matched. 
> SUM [ matchedObjects * RecordsMatchedByObject ]
> Any string arguments passed must be the ID of the record.

# .`<attribute>`StartsWith()
### Purpose
Find records based on the starting letters of one of its attributes value.

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criterea    | `{}`,`[{}]`,'string'  | Yes |
| 2 |     Callback        | `function`          | Yes      |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Found Records      | `{}`, `[{}]`        |


### Example Usage

```javascript 
User.nameStartsWith('W', function startsWithCB(err,found){
	while (found.length)
		console.log('User '+found.pop().name+' has name that starts with \'W\'');
	});

// User Walter has name that starts with 'W'
// Don't forget to handle your errors

```
### Notes
> Warning! Your attribute in the method name must be lowerCase!
> Warning! .exec() DOES NOT work on this method.  You MUST supply a callback.
> Any string arguments passed must be the ID of the record.



# .`<attribute>`EndsWith
### Purpose
Find records based on the last letters of one of its attributes value.

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criterea    | `{}`,`[{}]`,'string'  | Yes |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Found Records    | `{}`, `[{}]`        |


### Example Usage

```javascript 
User.nameEndsWith('sie', function endsWithCB(err,found){
	console.log('User '+found[0].name+' has name that ends with \'sie\'');
	});
	
// User Jessie has name that ends with 'sie'
// Don't forget to handle your errors

```
### Notes
> Warning! Your attribute in the method name must be lowerCase!
> Warning! .exec() DOES NOT work on this method.  You MUST supply a callback.
> Any string arguments passed must be the ID of the record.


Pub-Sub Methods
----------------


# .publishCreate()
### Purpose
PublishCreate doesn't actually create anything.  It simply publishes information about the creation of a model instance via websockets.

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | Data to Send        |   {}                |   No  |


#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
|   |  NO CALLBACK        |                     |


### Example Usage
UsersController.js
```javascript
module.exports = {
    
  testSocket: function(req,res){

        var nameSent = req.param('name');
    
        if (nameSent && req.isSocket){
    
          User.create({name:nameSent}).exec(function created(err,newGuy){
            User.publishCreate({id:newGuy.id,name:newGuy.name});
            console.log('A new user called '+newGuy.name+' has been created');
          });
    
        } else if (req.isSocket){
    
          User.subscribe(req.socket);
          console.log('User with socket id '+req.socket.id+' is now subscribed to the model class \'users\'.');
        
        } else {
    
          res.view();
        
        }
    }
}

    // Don't forget to handle your errors
 
```

views/users/testSocket.ejs
```html
<style>.addButton{display:inline-block;line-height:100px;width:400px;height:100px;border:1px solid black;cursor:pointer;}</style>

<script>
window.onload = function subscribeAndListen(){
    // When the document loads, send a request to users.testSocket
    // The controller code will subscribe you to the model 'users'
    socket.get('/users/testSocket/');

    // Listen for the event called 'message' emited by the publishCreate() method.
    socket.on('message',function(obj){
    	data = obj.data;
    	console.log('User '+data.name+' has been created.');
    });
};

function makeNew(){

    // Send the new users name to the 'testSocket' action on the 'users' contoller

    socket.get('/users/testSocket/',{name:'Walter'});
}

</script>
<center>
<div class="addButton" onClick="makeNew()">
Click Me to add a new 'Walter' ! </div>
```

### Notes
> The client's socket must have first been subscribed using the .subscribe({}) method. 


# .publishUpdate()
### Purpose
PublishUpdate updates nothing.  It publishes information about the update of a model instance via websockets.

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | ID of Updated Record|   'int','string'    |   Yes      |
| 1 | Data to Send        |   `{}`              |   No      |



#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
|   |  NO CALLBACK        |                     |


### Example Usage

UsersController.js
```javascript
module.exports = {
    
  testSocket: function(req,res){

        var nameSent = req.param('name');
    
        if (nameSent && req.isSocket){
    
          User.update({name:nameSent},{name:'Heisenberg'}).exec(function update(err,updated){
            User.publishUpdate(updated[0].id,{ name:updated[0].name });
          });
    
        } else if (req.isSocket){
    
        User.find({}).exec(function(e,listOfUsers){
          User.subscribe(req.socket,listOfUsers);
        console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'users\'.');
        });
        
        } else {
    
          res.view();
        
        }
    }
}

    // Don't forget to handle your errors
 
```

views/users/testSocket.ejs
```html
<style>.addButton{display:inline-block;line-height:100px;width:400px;height:100px;border:1px solid black;cursor:pointer;}</style>

<script>
window.onload = function subscribeAndListen(){
    // When the document loads, send a request to users.testSocket
    // The controller code will subscribe you to all of the 'users' model instances (records)
    socket.get('/users/testSocket/');

    // Listen for the event called 'message' emited by the publishUpdate() method.
    socket.on('message',function(obj){
    	data = obj.data;
    	console.log('User '+data.name+' has been '+obj.verb+'ed .');
    });
};

function doEdit(){

    // Send the name to the testSocket action on the 'Users' contoller

    socket.get('/users/testSocket/',{name:'Walter'});
}

</script>
<center>
<div class="addButton" onClick="doEdit()">
Click Me to add a new User! </div>

```

### Notes
> The client's socket must have first been subscribed using the .subscribe({},[]) method. 
> Any string arguments passed must be the ID of the record.

# .publishDestroy()
### Purpose
Publish the destruction of a model

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | ID of Destroyed Record |'int','string'  |   Yes  |


#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
|   |  NO CALLBACK        |                     |
### Example Usage

UsersController.js
```javascript
module.exports = {
    
  testSocket: function(req,res){

        var nameSent = req.param('name');
    
        if (nameSent && req.isSocket){
    
          User.findOne({name:nameSent}).exec(function findIt(err,foundHim){
            User.destroy({id:foundHim.id}).exec(function destroy(err){
              User.publishDestroy(foundHim.id);
            });
          });
    
        } else if (req.isSocket){
    
        User.find({}).exec(function(e,listOfUsers){
          User.subscribe(req.socket,listOfUsers);
        console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'users\'.');
        });
    
        } else {
    
          res.view();
        
        }

  }
}

    // Don't forget to handle your errors
 
```

views/users/testSocket.ejs
```html

<style>.addButton{display:inline-block;line-height:100px;width:400px;height:100px;border:1px solid black;cursor:pointer;}</style>

<script>
window.onload = function subscribeAndListen(){
    // When the document loads, send a request to users.testSocket
    // The controller code will subscribe you to all of the 'users' model instances (records)
    socket.get('/users/testSocket/');

    // Listen for the event called 'message' emited by the publishDestroy() method.
    socket.on('message',function(obj){
    	console.log('User with ID '+obj.id+' has been '+obj.verb+'ed .');
    });
};

function destroy(){

    // Send the name to the testSocket action on the 'Users' contoller
    socket.get('/users/testSocket/',{name:'Walter'});
}

</script>
<center>
<div class="addButton" onClick="destroy()">
Click Me to destroy user 'Walter' ! </div>


```

### Notes
> Any string arguments passed must be the ID of the record.

# .subscribe(`{}`)
### Purpose
1 of 2 subscribe methods.  This one will subscribe clients to the model class.  They allows clients to see message emitted by .publishCreate() only.

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | Requesting Socket   | `Socket.IO socket`  | Yes        |


#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
|   |  NO CALLBACK        |                     |

### Example Usage
Controller Code
```javascript
    User.subscribe(req.socket);
    console.log('User with socket id '+req.socket.id+' is now subscribed to the model class \'users\'.');
  
```

### Notes
- This is equivelent to blah blah in socket.io

# .subscribe(`{}`,`[]`)

### Purpose
This one will subscribe clients to model instances (records).  They allows clients to see message emitted by .publishUpdate() and .publishDestroy() only.

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | Requesting Socket   | `Socket.IO socket`  | Yes        |
| 2 | Record IDs          | `[]`,'string','int' | No        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
|   |  NO CALLBACK        |                     |

### Example Usage
Controller Code
```javascript

    User.find({}).exec(function(e,listOfUsers){
        User.subscribe(req.socket,listOfUsers);
        console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'users\'.');
    });
    
    // Don't forget to handle your errors
    
```


### Notes
> The record IDs are not required but do not pass an empty array or the method will fail.
> This method will be deprecated in an upcoming release. Subscriptions should be called from the request object or socket themselves, not from the model.
> Any string arguments passed must be the ID of the record.

# .unsubscribe(`{}`)
### Purpose
1 of 2 unsubscribe methods. This will ONLY unsubscribe a socket from a particular model class.

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | Requesting Socket   | `Socket.IO socket`  | Yes        |


#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
|   |  NO CALLBACK        |                     |


### Example Usage
Controller Code
```javascript

User.unsubscribe(req.socket);

```

### Notes
> Most of the time you shouldn't use this since sessions are destroyed when the client closes their tab
> Any string arguments passed must be the ID of the record.
# .unsubscribe({},[])
### Purpose
This method will unsubscribe a socket from the model instances (records) who's IDs are supplied in the array.

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | Requesting Socket   | `Socket.IO socket`  | Yes        |
| 2 | Record IDs          | `[]`,'string','int' | No         |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
|   |  NO CALLBACK        |                     |

### Example Usage
Controller Code
```javascript

User.unsubscribe(req.socket,[1,2,3,4,5,6]);

```

### Notes
> Most of the time you shouldn't use this since sessions are destroyed when the client closes their tab
> The record IDs are not required but do not pass an empty array or the method will fail.
> Any string arguments passed must be the ID of the record.
