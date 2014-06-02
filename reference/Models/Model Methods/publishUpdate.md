# .publishUpdate( `{id}`,[`changes`],[`request`],[`options`] )
### Purpose
PublishUpdate updates nothing.  It publishes information about the update of a model instance via websockets.

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | ID of Updated Record|   `int`, `string`    |   Yes      |
| 2 | Updated values        |   `{}`              |   No      |
| 3 | Request      |   `request object` |   No       |
| 4 | Additional Options | `object` | No |

`publishUpdate()` emits a socket message using the model identity as the event name.  The message is broadcast to all sockets subscribed to the model instance via the `.subscribe` model method.

The socket message is an object with the following properties:

+ **id** - the `id` attribute of the model instance
+ **verb**  - `"updated"` (a string)
+ **data** - an object-- the attributes that were updated
+ **previous** - an object--if present, the previous values of the updated attributes

#### `changes`
This should be an object containing any changed attributes and their new values.  

#### `request`
If this argument is included then the socket attached to that request will *not* receive the notification.

#### `options.previous`
If the `options` object contains a `previous` property, it is expected to be a representation of the model instance's attributes *before* they were updated.  This may be used to determine whether or not to publish additional messages (see the `options.noReverse` flag below for more info).

#### `options.noReverse`

The default implementation of `publishUpdate` will, if `options.previous` is present, check whether any associated records were affected by the update, and possibly send out additional notifications.  For example, if a `Pet` model has an `owner` attribute that is associated with the `User` model so that a user may own several pets, and the data sent with the call to `publishUpdate` indicates that the value of a pet's `owner` changed, then an additional `publishAdd` or `publishRemove` call may be made.  To suppress these notifications, set the `options.noReverse` flag to `true`.  In general, you should not have to set this flag unless you are writing your own implementation of `publishUpdate` for a model.


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
<script type="text/javascript">
window.onload = function subscribeAndListen(){
    // When the document loads, send a request to users.testSocket
    // The controller code will subscribe you to all of the 'users' model instances (records)
    socket.get('/users/testSocket/');

    // Listen for the event called 'user'
    socket.on('user',function(obj){
      if (obj.verb == 'updated') {
        var previous = obj.previous;
        var data = obj.data;
        console.log('User '+previous.name+' has been updated to '+data.name);
      }
    });
};

function doEdit(){

    // Send the name to the testSocket action on the 'Users' contoller

    socket.get('/users/testSocket/',{name:'Walter'});
}

</script>
<div class="addButton" onClick="doEdit()">Click Me to add a new User! </div>

```

<docmeta name="uniqueID" value="publishUpdate712330">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".publishUpdate()">

