Pub-Sub Methods
================



# .publishCreate()
### Purpose
PublishCreate doesn't actually create anything.  It simply publishes information about the creation of a model instance via websockets.
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
    socket.request('/users/testSocket/');

    // Listen for the event called 'message' emited by the publishCreate() method.
    socket.on('message',function(obj){
    	data = obj.data;
    	console.log('User '+data.name+' has been created.');
    });
};

function makeNew(){

    // Send the new users name to the 'testSocket' action on the 'users' contoller

    socket.request('/users/testSocket/',{name:'Walter'});
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
    socket.request('/users/testSocket/');

    // Listen for the event called 'message' emited by the publishUpdate() method.
    socket.on('message',function(obj){
    	data = obj.data;
    	console.log('User '+data.name+' has been '+obj.verb+'ed .');
    });
};

function makeNew(){

    // Send the name to the testSocket action on the 'Users' contoller

    socket.request('/users/testSocket/',{name:'Walter'});
}

</script>
<center>
<div id="newGuy" class="addButton" onClick="makeNew()">
Click Me to add a new User! </div>

```

### Notes
The client's socket must have first been subscribed using the .subscribe({},[]) method. 


# .publishDestroy()
### Purpose
Publish the destruction of a model
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
    socket.request('/users/testSocket/');

    // Listen for the event called 'message' emited by the publishDestroy() method.
    socket.on('message',function(obj){
    	console.log('User with ID '+obj.id+' has been '+obj.verb+'ed .');
    });
};

function makeNew(){

    // Send the name to the testSocket action on the 'Users' contoller
    socket.request('/users/testSocket/',{name:'Walter'});
}

</script>
<center>
<div id="newGuy" class="addButton" onClick="makeNew()">
Click Me to destroy user 'Walter' ! </div>


```

### Notes


# .subscribe(req)
### Purpose
1 of 2 subscribe methods.  This one will subscribe clients to the model class.  They allows clients to see message emitted by .publishCreate() only.
### Example Usage
Controller Code
```javascript
    Users.subscribe(req.socket);
    console.log('User with socket id '+req.socket.id+' is now subscribed to the model class \'users\'.');
  
```

### Notes


# .subscribe(req,id)

### Purpose
This one will subscribe clients to model instances (records).  They allows clients to see message emitted by .publishUpdate() and .publishDestroy() only.

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
This method will be deprecated in an upcoming release. Subscriptions should be called from the request object or socket themselves, not from the model.

# .unsubscribe(req)
### Purpose
This method will unsubscribe a socket from particular model class and all of its instances.
### Example Usage
Controller Code
```javascript

Users.unsubscribe(req.socket);

```

### Notes
Most of the time you shouldn't use this since sessions are destroyed when the client closes their tab
