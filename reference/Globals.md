# Globals
### Overview

The global Sails object is used internally by your app.  Most of it's methods and attributes shouldn't be referenced directly but here are a few things that you might find useful.  

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
// Logs using the log level currently set in config.
sails.log('There',{sure:'are'},['a','lot'],'of',[{log:'levels'}, 'huh'],'?',true);

// There { sure: 'are' } [ 'a', 'lot' ] of [ { log: 'levels' }, 'huh' ] ? true

```

### Notes
> These will accept an infinite number of arguments of any data type, seperated by commas.


# sails.config
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
> These settings are only read upon lifting your app.  Changing them will do nothing.

# sails.models

### Purpose
If you disable globals, you can use sails.models.`<model name>` to access your models.  This is useful when you need to access models from inside '/config/bootstrap.js' which is run before your app lifts.

### Example Usage

```javascript
sails.models.pet.find().limit(1).exec(function(err,record){
	console.log('My Pet is called '+record[0].name);
});
```
### Notes

> Keep in mind that this method will convert your entire model name to lowercase.

# sails.sockets

### Purpose

Provide low-level access to socket methods for real-time client communications.  See the [full reference](https://github.com/balderdashy/sails-docs/blob/0.10/reference/SocketsLowLevel.md) for more info, and use [PubSub methods of models](https://github.com/balderdashy/sails-docs/blob/0.10/reference/ModelMethods.md#publishcreate-datasocket-) whenever low-level access is not needed.

# sails.io

### Purpose

Provides raw access to [socket.io](http://socket.io/).  Starting with v0.10, you should use [`sails.sockets`](https://github.com/balderdashy/sails-docs/blob/0.10/reference/SocketsLowLevel.md) instead when low-level socket access is needed, and use the [PubSub methods of models](https://github.com/balderdashy/sails-docs/blob/0.10/reference/ModelMethods.md#publishcreate-datasocket-) for everything else.
