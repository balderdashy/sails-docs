# .publishCreate( `data`,[`request`] )
### Purpose
PublishCreate doesn't actually create anything.  It simply publishes information about the creation of a model instance via websockets.  PublishCreate is called automatically by the [blueprint `create` action](https://github.com/balderdashy/sails-docs/blob/0.10/reference/Blueprints.md#create-a-record).

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | Data to Send        |   `object`              |   Yes       |
| 2 | Request      |   `Request object` |   No       |

The default implementation of publishCreate only publishes messages to the firehose, and to sockets subscribed to the model class using the `watch` method.  It also subscribes all sockets "watching" the model class to the new instance.  The socket message to subscribers will include the following properties:

+ **id** - the `id` attribute of the new model instance
+ **verb**  - `"created"` (a string)
+ **data** - an object-- the attributes and values of the new model instance

#### `data`
An object containing the attributes and values of the new model instance.

#### `request`
If this argument is included then the socket attached to that request will *not* receive the notification.

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
    
          User.watch(req);
          console.log('User with socket id '+sails.sockets.id(req)+' is now subscribed to the model class \'users\'.');
        
        } else {
    
          res.view();
        
        }
    }
}

    // Don't forget to handle your errors
 
```

views/users/testSocket.ejs
```html

<script type="text/javascript">
window.onload = function subscribeAndListen(){
    // When the document loads, send a request to users.testSocket
    // The controller code will subscribe you to the model 'users'
    socket.get('/users/testSocket/');

    // Listen for the event called 'user' emited by the publishCreate() method.
    socket.on('user',function(obj){
      if (obj.verb == 'created') {
         var data = obj.data;
         console.log('User '+data.name+' has been created.');
      }
    });
};

function makeNew(){

    // Send the new users name to the 'testSocket' action on the 'users' contoller

    socket.get('/users/testSocket/',{name:'Walter'});
}

</script>
<div class="addButton" onClick="makeNew()">Click Me to add a new 'Walter' ! </div>
```



<docmeta name="uniqueID" value="publishCreate671839">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".publishCreate()">

