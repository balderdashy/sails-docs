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
```

views/users/testSocket.ejs
```html
<style>
.addButton{display:inline-block;line-height:100px;width:400px;height:100px;border:1px solid black;cursor:pointer;}
</style>
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

    socket.request('/users/testSocket/',{name:'Jessie'});
}

</script>
<center>
<div class="addButton" onClick="makeNew()">
Click Me to add a new 'Jessie' ! </div>
```

### Notes


# .publishUpdate()
### Purpose
Publish an update on a particular model
### Example Usage
```javascript

```

### Notes

# .publishDestroy()
### Purpose
Publish the destruction of a model
### Example Usage
```javascript

```

### Notes


# .subscribe(req)
### Purpose
Subscribe a socket to a handful of models in this collection
### Example Usage
```javascript

```

### Notes


# .subscribe(req,id)

### Purpose
Subscribe a socket to a handful of models in this collection
### Example Usage
```javascript

```

### Notes
This method will be deprecated in an upcoming release. Subscriptions should be called from the request object or socket themselves, not from the model.

# .unsubscribe(req)
### Purpose
Subscribe a socket to a handful of models in this collection
### Example Usage
```javascript

```

### Notes


