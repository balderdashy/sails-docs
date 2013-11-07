The Sails Object
================


# sails.io.sockets()
This is the raw reference to socket.io .  Use it when you want low level access to socket.io . 

- io.sockets.in('roomname').emit('msg')
- io.sockets.emit('roomname')
- io.sockets.clients('roomname')


# sails.log
### Purpose
These methods provide different levels of logging functionality in sails.

- sails.log() 
- sails.log.verbose() 
- sails.log.info()
- sails.log.warn()
- sails.log.error()

### Example Usage
```

//Logs using the log level currently set in config.  If not specified, sails defaults to 'something'.  Note, this is equivelent to sails.log.debug() 


```

### Notes
These will accept an infinite number of arguments of any data type, seperated by commas.


# sails.config()
### Purpose

This object has all live configuration
    allows you to perform different actions based on config like production mode 


# sails.io()
These is where you can find the custom websockets functionality sails provides through socket.io

# sails.config()

# sails.model.user()

This is the same as User.<modelName>()
If you disable globals, use sails.model.user for User[model]
(lowercases the model name)

