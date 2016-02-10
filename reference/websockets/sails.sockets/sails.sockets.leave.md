# .leave()

Unsubscribe a socket from a room.


```js
sails.sockets.leave(socket, roomName);
```

_Or:_
+ `sails.sockets.leave(socket, roomName, cb);`


### Usage

|   | Argument   | Type        | Details |
|---|------------|:-----------:|:--------|
| 1 | `socket`   | ((string)), ((req)) | The socket to be unsubscribed.  May be specified by the socket's id or a socket request (`req`).
| 2 | `roomName` | ((string))  | The name of the room to which the socket will be subscribed.  If the room does not exist yet, it will be created.
| 3 | _`cb`_       | ((function?))| An optional callback which will be called when the operation is complete on the current server (see notes below for more information), or if fatal errors were encountered.  In the case of errors, it will be called with a single argument (`err`).


### Example

In a controller action:

```javascript
leaveFunRoom: function(req, res) {
  if ( _.isUndefined(req.param('roomName')) ) {
    return res.badRequest('`roomName` is required.');
  }

  if (!req.isSocket) {
    return res.badRequest('This endpoints only supports socket requests.');
  }

  var roomName = req.param('roomName');
  sails.sockets.leave(req, roomName, function(err) {
    if (err) {return res.serverError(err);}
    return res.json({
      message: 'Left a fun room called '+roomName+'!'
    });
  });
}
```


You can also use a socket id.  For example, in a service:

```javascript
/**
 * @required {Number} userId  [the user to ban]
 */
banUser: function(options, cb) {
  options = options || {};
  
  if ( _.isUndefined(options.userId) ) {
    return cb(new Error('`userId` is required.'));
  }

  User.findOne({id: options.userId}).exec(function (err, user) {
    if (err) { return cb(err); }
    if (!user) { return cb(new Error('Failed to ban user-- no such user (`'+options.userId+'`) exists!'); }
    
    User.update({id: options.userId}, {
      banned: true
    }).exec(function (err) {
      if (err) { return cb(err); }
      
      async.each(user.connectedSocketIds, function eachSocketId (socketId, next) {
      
        // Note that `req` is not passed in-- instead we use a string socket id.
        // Since this is using a socket id explicitly, instead of inferring one from `req`,
        // we obviously don't have to check `isSocket`.
        sails.sockets.leave(socketId, 'privateAdminRoom', function(err) {
          if (err) {
            // If a socket cannot be unsubscribed, ignore it and continue on (but log a warning)
            sails.log.warn('Could not unsubscribe socket `'+socketId+'`.  Error:',err);
            return next();
          }
          
          return next();
        });
      }, function afterwards(err) {
        if (err) { return cb(err); }
        
        sails.log.info(
        'Sockets:`'user.connectedSocketIds+'` (probably open browser tabs) were kicked ',
        'from "privateAdminRoom" as a result of banning user (`'+options.userId+'`). '+
        'No more fun, ever!');
        
        return cb();
      });//</async.each>
    });//</User.update>
  });//</User.find>
}
```

### Notes
> + `sails.sockets.leave()` is more or less equivalent to the functionality of `.leave()` in Socket.io, but with additional built-in support for multi-server deployments.  With [recommended production settings](http://sailsjs.org/documentation/concepts/deployment/scaling), `sails.sockets.leave()` works as documented no matter what server the code happens to be running on, or the server the target socket is connected to.
> + In a multi-server environment, when calling `.leave()` with a socket ID argument, the callback function (`cb`) will be executed when the `.leave()` call completes _on the current server_.  This does not guarantee that other servers in the cluster have already finished running the operation.
> + Be sure and check `req.isSocket === true` before passing in `req` as the socket to be unsubscribed.  For that to work, the provided `req` must be from a socket request, not just any old HTTP request.



<docmeta name="displayName" value=".leave()">
<docmeta name="pageType" value="method">
