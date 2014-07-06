# .publishDestroy( `{id}`, [`request`], [`options`] )
### Purpose
Publish the destruction of a model

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | ID of Destroyed Record |`int`, `string`  |   Yes  |
| 2 | Request      |   `request object` |   No       |
| 3 | Additional options | `object` | No |

`publishDestroy()` emits a socket message using the model identity as the event name.  The message is broadcast to all sockets subscribed to the model instance via the `.subscribe` model method.

The socket message is an object with the following properties:

+ **id** - the `id` attribute of the model instance
+ **verb**  - `"destroyed"` (a string)
+ **previous** - an object--if present, contains the attributes and values of the object that was destroyed.

#### `request`
If this argument is included then the socket attached to that request will *not* receive the notification.

#### `options.previous` 
If this is set, it is expected to be a representation of the model before it was destroyed.  This may be used to send out additional notifications to associated records.

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

<script type="text/javascript">
window.onload = function subscribeAndListen(){
    // When the document loads, send a request to users.testSocket
    // The controller code will subscribe you to all of the 'users' model instances (records)
    socket.get('/users/testSocket/');

    // Listen for the event called 'message' emited by the publishDestroy() method.
    socket.on('message',function(obj){
      if (obj.verb == 'destroyed') {
        console.log('User '+obj.previous.name+' has been destroyed .');
      }
    });
};

function destroy(){

    // Send the name to the testSocket action on the 'Users' contoller
    socket.get('/users/testSocket/',{name:'Walter'});
}

</script>
<div class="addButton" onClick="destroy()">Click Me to destroy user 'Walter' ! </div>


```

### Notes
> Any string arguments passed must be the ID of the record.

<docmeta name="uniqueID" value="publishDestroy732227">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".publishDestroy()">

