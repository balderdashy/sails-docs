##### API Reference

+ Sails Command-Line Tool
  + sails console
  + sails generate
  + sails lift
  + sails version
  + sails new

+ Models
  + Usage
    + class methods (e.g. `User.findOne()` )
      + ORM stuff: find, findOne, create, update, destroy()
      + Pubsub stuff: (just copy it from https://github.com/balderdashy/sails-docs/blob/0.9/sockets.md#using-built-in-pubsub-methods)
    + instance methods (e.g. `thing.save()` )

+ Controllers / Policies
  + Request (`req`)
    + All the things from Express -- if we don't support in the socket.io interpreter, say so explicitly
    + + Here's where the list of supported methods is (in sockets)
        + https://github.com/balderdashy/sails/blob/master/lib/hooks/sockets/interpreter/interpret.js#L84

      Most important ones:
      + req.param('foo') -> 
        +  (note as a subsection, lets discuss that req.params, req.query, req.body are available but suggest just using req.param())
      + req.session
        + (automatically set up to work across sockets and http-- works exactly like express)

      + Plus sails has extra methods:
        + req.params.all()
        + req.wantsJSON
          + Useful for content-negotiation
          + (a best guess at whether the requesting client would prefer a JSON response, looks at `Content-type` and `Accept` headers)
      
      + Here are the added sails methods:
        + https://github.com/balderdashy/sails/blob/master/lib/hooks/request/index.js#L132
  
      + Here's the relevant express docs:
        + http://expressjs.com/api.html#req.params
      
    + And some things that only work w/ sockets (but they're always ignored silently)
      > https://github.com/LearnBoost/socket.io/wiki/Rooms#socket-broadcast
      + req.socket
        + req.socket.id
        + req.socket.join
        + req.socket.leave
        + req.socket.broadcast (send to all other sockets in the room but me)
      + none of the other things for now-- (https://github.com/balderdashy/sails/blob/master/lib/hooks/sockets/interpreter/interpret.js#L84)
      
  + Response (`res`)
    + Intersection of the things from Express and what we support in the socket.io interpreter
    + Plus the new methods we add in Sails (`req.params.all()`)
    + Same thing as above as far as support

    + Plus sails has extra methods:
      + res.serverError()   -> do whatever is in config/500.js
      + res.badRequest()    -> do whatever is in config/400.js
      + res.forbidden()     -> do whatever is in config/403.js
      + res.notFound()      -> do whatever is in config/404.js
     

+ Global sails object (`sails`)
  + sails.io
    + io.sockets.in('roomname').emit('msg')
    + io.sockets.emit('roomname')
    + io.sockets.clients('roomname')
    + (don't worry about namespaces)
  + Setup: config files
    + all of the `config.*.md` files
  + Usage: `sails.config`
  + 
  

# .create()

### Overview

#### Parameters

|    Description     | Accepted Data Types | Required ? |
|---------------------|---------------------|------------|
|     newRecords          | String, object,int  | Yes		     |
|     callback        | function            | Yes        |

#### Callback Parameters

|     Description     | Possible Data Types |
|---------------------|---------------------|
|      Error          |     Error           |
|  RecordsFound       | Object, Object Array|

