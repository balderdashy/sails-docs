# CRUD Methods
The methods below are the basic crud methods availebl in sails.  Here is a very quick reference for each method. More detailed information can be found below.  All Methods are asyncronous.

For every class method, the callback parameter is optional.  If one is not supplied, it will return a chainable object.

# Overview
| Method Name  |       Parameters     | Callback Parameters 
| ------------ | -------------------  | --------------------
| .create() | - newRecords ```{}``` or ```[{}]```<br>- callback ``` function ``` | ```function ( Error , newRecords)```
| .update() | - findCriterea ```{}``` or ```[{}]```<br>-updatedRecord ```{}``` or ```[{}]```<br>- callback ``` function ``` | ```function ( Error , [updatedRecords] )```
| .destroy() | - findCriterea ```{}``` or ```[{}]```<br>- callback ``` function ```  | ```function ( Error )```
| .findOrCreate() | - findCriterea ```{}``` or ```[{}]```<br>-recordsToCreate ```{}``` or ```[{}]```<br>- callback ``` function ``` | ```function ( Error , foundOrCreated)```
| .findOne() | - findCriterea ```{}```<br>- callback ``` function ``` | ```function ( Error , foundRecord)```
| .find() | - findCriterea ```{}``` or ```[{}]```<br>- callback ``` function ``` | ```function ( Error , foundRecords)```
| .startsWith() | - findCriterea ```{}``` or ```[{}]```<br>- callback ``` function ``` | ```function ( Error , [foundRecords])```
| .endsWith() | - findCriterea ```{}``` or ```[{}]```<br>- callback ``` function ``` | ```function ( Error , [foundRecords])```
|.validate()|- findCriterea ```{}``` or ```[{}]```<br>- callback ``` function ``` | `Error`|
| .count() | - findCriterea ```{}``` or ```[{}]```<br>- callback ``` function ``` | ```function ( Error, integer )```|
| .stream() | - findCriterea ```{}```<br> - ```{customMethods}``` | No callback! A node stream object is returned |


# .create()
### Purpose
Creates a new record.

#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

```javascript 

// create a new record with no attributes

Users.create({name:'Walter Jr'}).exec(function createCB(err,created){
	console.log('Created user with name '+created.name);
	});

// Created user with name Walter Jr
// Don't forget to handle your errors and abide by the rules you defined in your model
```
### Notes
>



# .update()
### Purpose
Updates an existing record.

#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

```javascript 
Users.update({name:'Walter Jr'},{name:'Flynn'}).exec(function updateCB(err,updated){
	console.log('Updated user to have name '+updated[0].name);
	});
	
// Updated user to have name Flynn
// Don't forget to handle your errors and abide by the rules you defined in your model

```
### Notes
>Although you may pass .update() an object or an array of objects, it will always return an array.





# .destroy()
### Purpose
Destroys a record that may or may not exist.

#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

```javascript 
Users.destroy({name:'Flynn'}).exec(function deleteCB(err){
	console.log('The record has been deleted');
	});
	
// The record has been deleted
// Don't forget to handle your errors

```
### Notes
>



# .findOrCreate()
### Purpose
This checks for the existence of the record in the first parameter.  If it can't be found, the record in the second parameter is created.

#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

```javascript 

Users.findOrCreate({name:'Walter'},{name:'Jessie'}).exec(function createFindCB(err,record){
	console.log('What\'s cookin\' '+record.name+'?');
	});
	
// What's cookin' Jessie?
// Don't forget to handle your errors and abide by the rules you defined in your model

```
### Notes
>



# .findOne()
### Purpose
This finds and returns a single record that meets the criterea.

#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |


### Example Usage

```javascript 
Users.findOne({name:'Jessie'}).exec(function findOneCB(err,found){
	console.log('We found '+found.name);
	});
	
//We found Jessie
// Don't forget to handle your errors

```
### Notes
>



# .find()
### Purpose
Finds and returns all records that meet the criterea object(s) that you pass it.

#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

```javascript 
Users.find({}).exec(function findCB(err,found){
	while (found.length)
		console.log('Found User with name '+found.pop().name)
	});

// Found User with name Flynn
// Found User with name Jessie
// Don't forget to handle your errors

```
### Notes
>


# .startsWith()
### Purpose
This is shorthand for a .find() query that uses the startsWith query modifier.

#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

```javascript 
Users.startsWith({name:'Fl'},function swCB(err,found){
	console.log('User  '+found[0].name+' starts with \'Fl\'');
	});
	
// User  Flynn starts with 'Fl'
// Don't forget to handle your errors

```
### Notes
>Although you may pass .startsWith an object or an array of objects, it will always return an array.
>Warning! This method does not support .exec() !  You MUST supply a callback.  


# .endsWith()
### Purpose
This method performs a query on the model and returns those ...
#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

```javascript 
Users.endsWith({name:'ie'},function ewCB(err,found){
	console.log('User '+found[0].name+' ends with \'ie\'');
	});
	
// User Jessie ends with 'ie'
// Don't forget to handle your errors

```
### Notes
> Although you may pass .endsWith an object or an array of objects, it will always return an array.
> Warning! This method does not support .exec() !  You MUST supply a callback.  



# .validate()
### Purpose
This method ensures that the current attributes on your model instance meet the criteria you defined in your model.

#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

```javascript 

Users.findOne(1).exec(function(err,mI){

	// petName is defined as a 'string'.  Let's give it an array and see what happens.

	mI.petName = [1,2];
	
	Users.validate(mI,function(err){
		sails.log('Error:'+JSON.stringify(err));
	});
});

// Error:{"ValidationError":{"petName":[{"data":[1,2],"message":"Validation error: \"1,2\" is not of type \"string\"","rule":"string"}]}}

```

### Notes
>



# .count()
### Purpose

#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

```javascript 
Users.count({name:'Flynn'}).exec(function countCB(err,found){
	console.log('There are '+found+' users called \'Flynn\'');
	});
	
// There are 1 users called 'Flynn'
// Don't forget to handle your errors

```
### Notes
>



# .stream()
### Purpose
This method uses a <a href="http://nodejs.org/api/stream.html#stream_class_stream_writable">node write stream</a> to pipe model data as it is retrieved without first having to buffer the entire thing to memory.  

#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

UsersController.js
```javascript
module.exports = {
    
  testStream: function(req,res){

    if (req.param('startStream') && req.isSocket){

        var getSocket = req.socket;
        
        // Start the stream.  Pipe it to sockets.
        Users.stream({name:'Walter'}).pipe(getSocket.emit);
        
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
>This method is useful for piping data from VERY large models straight to res.  You can also pipe it other places.  See the node stream docs for more info.
>Only the mongo, mysql, and posgresql adapters support this method.  This won't work with the disk adapter.



# Dynamic Finders
These methods are automatically generated for each attribute in each model of your sails app.  This includes the id, CreatedAt, and UpdatedAt attributes that exist in every record.

> Warning!  The first parameter of every dynamic finder MUST HAVE THE SAME DATA TYPE that you declared for the model attribute by which you are searching. The only exception to this is when you wish to return multiple records.  In this case, the first parameter must be an array containing data of the type specified in your controller for that attribute.

# Overview

| Method Name  |       Parameters     | Callback Parameters |
| ------------ | -------------------  | ------------------- |
|.findBy`<attribute>`()|-findCriterea ```{}``` or ```[{}]```<br>- callback ```function``` | ```function ( Error , [foundRecords])```|
|.findOneBy`<attribute>`()|-findCriterea ```{}``` or ```[{}]```<br>- callback ```function``` | ```function ( Error , foundRecord)```|
|.countBy`<attribute>`()|-findCriterea ```{}``` or ```[{}]```<br>- callback ```function``` | ```function ( Error , integer )```|
|.`<attribute>`StartsWith()|-findCriterea ```{}``` or ```[{}]```<br>- callback ```function``` | ```function ( Error , foundRecords)```|
|.`<attribute>`EndsWith()|-findCriterea ```{}``` or ```[{}]```<br>- callback ```function``` | ```function ( Error , foundRecords)```|


# .findBy`<attribute>`()
### Purpose
Find and return records by a specific model attribute.

#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

```javascript 
Users.findByName(['Flynn','Walter','craig']).exec(function findCB(err,found){
	while (found.length)
		console.log('Found User with name '+found.pop().name);
	});
	
// Found User with name Walter
// Found User with name Flynn
// Don't forget to handle your errors

```
### Notes
>


# .findOneBy`<attribute>`()
### Purpose
Find and return one record by a specific model attribute.

#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

```javascript 
Users.findOneByName('Walter').exec(function findCB(err,found){
	console.log('Found User with name '+found.name);
	});
	
// Found User with name Walter
// Don't forget to handle your errors

```
### Notes
>This will always return a single object.




# .countBy`<attribute>`()
### Purpose
Count the number of records in a model with a particular model attribute. 

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

```javascript 
Users.countByName('Walter').exec(function countCB(err,found){
	console.log('There are '+found+' users called \'Walter\'');
	});
	
// There are 1 users called 'Walter'
// Don't forget to handle your errors
```
### Notes
>The value returned will be equal to the sum of the products of all matched criterea objects and the number of records that particular object matched. 

SUM [ matchedObjects * RecordsMatchedByObject ]

// how the hell do I say this?

# .`<attribute>`StartsWith()
### Purpose

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |


### Example Usage

```javascript 
Users.nameStartsWith('W', function startsWithCB(err,found){
	while (found.length)
		console.log('User '+found.pop().name+' has name that starts with \'W\'');
	});

// User Walter has name that starts with 'W'
// Don't forget to handle your errors

```
### Notes
>Warning! Your attribute in the method name must be lowerCase!
>Warning! .exec() DOES NOT work on this method.  You MUST supply a callback.




# .`<attribute>`EndsWith
### Purpose

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |


### Example Usage

```javascript 
Users.nameEndsWith('sie', function endsWithCB(err,found){
	console.log('User '+found[0].name+' has name that ends with \'sie\'');
	});
	
// User Jessie has name that ends with 'sie'
// Don't forget to handle your errors

```
### Notes
>Warning! Your attribute in the method name must be lowerCase!
>Warning! .exec() DOES NOT work on this method.  You MUST supply a callback.



Pub-Sub Methods
================

# Overview
| Method Name  |       Parameters     |
| ------------ | -------------------  |
| .publishCreate() | ``` recordID ``` and ``` { dataToPublish } ``` | 
| .publishUpdate() | ``` recordID ``` and ``` { dataToPublish } ``` |
| .publishDestroy() | ``` recordID ``` |
| .subscribe() | ``` { req.socket } ``` |
| .subscribe() | ``` { req.socket } ``` and ``` [ recordIDs ] ``` |
| .unsubscribe() | ``` { req.socket } ``` |
| .unsubscribe() | ``` { req.socket } ``` and ``` [ recordIDs ] ``` |


# .publishCreate()
### Purpose
PublishCreate doesn't actually create anything.  It simply publishes information about the creation of a model instance via websockets.

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage
UsersController.js
```javascript
module.exports = {
    
  testSocket: function(req,res){

        var nameSent = req.param('name');
    
        if (nameSent && req.isSocket){
    
          Users.create({name:nameSent}).exec(function created(err,newGuy){
            Users.publishCreate({id:newGuy.id,name:newGuy.name});
            console.log('A new user called '+newGuy.name+' has been created');
          });
    
        } else if (req.isSocket){
    
          Users.subscribe(req.socket);
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
The client's socket must have first been subscribed using the .subscribe({}) method. 


# .publishUpdate()
### Purpose
PublishUpdate updates nothing.  It publishes information about the update of a model instance via websockets.

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

UsersController.js
```javascript
module.exports = {
    
  testSocket: function(req,res){

        var nameSent = req.param('name');
    
        if (nameSent && req.isSocket){
    
          Users.update({name:nameSent},{name:'Heisenberg'}).exec(function update(err,updated){
            Users.publishUpdate(updated[0].id,{ name:updated[0].name });
          });
    
        } else if (req.isSocket){
    
        Users.find({}).exec(function(e,listOfUsers){
          Users.subscribe(req.socket,listOfUsers);
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
<div id="newGuy" class="addButton" onClick="doEdit()">
Click Me to add a new User! </div>

```

### Notes
The client's socket must have first been subscribed using the .subscribe({},[]) method. 


# .publishDestroy()
### Purpose
Publish the destruction of a model

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

UsersController.js
```javascript
module.exports = {
    
  testSocket: function(req,res){

        var nameSent = req.param('name');
    
        if (nameSent && req.isSocket){
    
          Users.findOne({name:nameSent}).exec(function findIt(err,foundHim){
            Users.destroy({id:foundHim.id}).exec(function destroy(err){
              Users.publishDestroy(foundHim.id);
            });
          });
    
        } else if (req.isSocket){
    
        Users.find({}).exec(function(e,listOfUsers){
          Users.subscribe(req.socket,listOfUsers);
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
<div id="newGuy" class="addButton" onClick="destroy()">
Click Me to destroy user 'Walter' ! </div>


```

### Notes


# .subscribe({})
### Purpose
1 of 2 subscribe methods.  This one will subscribe clients to the model class.  They allows clients to see message emitted by .publishCreate() only.

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage
Controller Code
```javascript
    Users.subscribe(req.socket);
    console.log('User with socket id '+req.socket.id+' is now subscribed to the model class \'users\'.');
  
```

### Notes
- This is equivelent to blah blah in socket.io

# .subscribe({},[])

### Purpose
This one will subscribe clients to model instances (records).  They allows clients to see message emitted by .publishUpdate() and .publishDestroy() only.

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |


### Example Usage
Controller Code
```javascript

    Users.find({}).exec(function(e,listOfUsers){
        Users.subscribe(req.socket,listOfUsers);
        console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'users\'.');
    });
    
    // Don't forget to handle your errors
    
```


### Notes
- This is equivelent to blah blah in socket.io 
- This method will be deprecated in an upcoming release. Subscriptions should be called from the request object or socket themselves, not from the model.


# .unsubscribe({})
### Purpose
1 of 2 unsubscribe methods. This will ONLY unsubscribe a socket from a particular model class.

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage
Controller Code
```javascript

Users.unsubscribe(req.socket);

```

### Notes
Most of the time you shouldn't use this since sessions are destroyed when the client closes their tab

# .unsubscribe({},[])
### Purpose
This method will unsubscribe a socket from the model instances (records) who's IDs are supplied in the array.

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    |         | 	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage
Controller Code
```javascript

Users.unsubscribe(req.socket,[1,2,3,4,5,6]);

```

### Notes
Most of the time you shouldn't use this since sessions are destroyed when the client closes their tab
