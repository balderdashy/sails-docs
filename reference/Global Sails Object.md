The Sails Object
================

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
The config object allows you to see your apps configuration settings. 

- sails.config.log.level
- sails.config.port
- sails.config.environment
- sails.config.host
- sails.config.adapters.default
- sails.config.controllers.blueprints.actions
- sails.config.controllers.blueprints.shortcuts
- sails.config.controllers.blueprints.rest
- sails.config.views.engine.ext
- sails.config.csrf

### Example Usage
```javascript

// Make sure csrf is enabled if we are in production mode.  Throw an error otherwise.

if (sails.config.environment && !sails.config.csrf)
    throw new Error('STOP IMMEDIATELY ! CSRF should always be enabled in production mode!');

```

### Notes



<code><help>


# sails.io.sockets()
This is the raw reference to socket.io .  Use it when you want low level access to socket.io . 

- io.sockets.in('roomname').emit('msg')
- io.sockets.emit('roomname')
- io.sockets.clients('roomname')

# sails.io()
These is where you can find the custom websockets functionality sails provides through socket.io

</help></code>




# sails.model.user()

### Purpose
This is the same as User.<modelName>().  If you disable globals, you can use sails.model.user in place of User[model] . 

### Example Usage

```javascript

// lolwut

```
### Notes

Keep in mind that this method will convert your entire model name to lowercase.
