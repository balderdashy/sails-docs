# Globals
### Overview

For convenience, Sails exposes a handful of global variables.  By default, your app's [models](), [services](), and the global `sails` object are all available on the global scope; meaning you can refer to them by name anywhere in your backend code (as long as Sails [has been lifted](https://github.com/balderdashy/sails/tree/master/lib/app)).

Nothing in Sails core relies on these global variables - each and every global exposed in Sails may be disabled in `sails.config.globals` (conventionally configured in `config/globals.js`.)


### The `sails` Object
Most of this section of the docs focuses on the methods and properties of `sails`, the singleton object representing your app.  In most cases, you will want to keep the `sails` object globally accessible- it makes your app code much cleaner.  However, if you _do_ need to disable _all_ globals, including `sails`, you can get access to `sails` on the request object (`req`).

### Models and Services
Your app's [models]() and [services]() are exposed as global variables using their `globalId`.  For instance, the model defined in the file `api/models/Foo.js` will be globally accessible as `Foo`, and the service defined in `api/services/Baz.js` will be available as `Baz`.

### Async and Lodash
Sails also exposes an instance of [lodash]() as `_`, and an instance of [async]() as `async`.  These commonly-used utilities are provided by default so that you don't have to `npm install` them in every new project.  Like any of the other globals in sails, they can be disabled.


> Bear in mind that none of the globals, including `sails`, are accessible until _after_ sails has lifted.  In other words, you won't be able to use `sails.models.user` or `User` outside of a function (since `sails` will not have finished loading yet.)



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



# sails.models

### Purpose
If you need to disable the "globalization" of models, you can still use `sails.models.<model_identity>` to access your models.

A model's `identity` is different than its `globalId`.  The `globalId` is determined automatically from the name of the model, whereas the `identity` is the all-lowercased version.  For instance, you the model defined in `api/models/Kitten.js` has a globalId of `Kitten`, but its identity is `kitten`.

### Example

```javascript
// Kitten === sails.models.kitten
sails.models.kitten.find().exec(function (err, allTheKittens) {
  // We also could have just used `Kitten.find().exec(...)`
  // if we'd left the global variable exposed.
})
```


# sails.sockets

### Purpose

Provides low-level access to socket methods for real-time client communications.  See the [full reference]() for more info. Unless you know what you're doing, you should avoid resorting to low-level socket access and use the [resourceful pubsub methods]() whenever possible.

> For raw access to the underlying [socket.io](http://socket.io/) singleton, you can still access `sails.io`.  But starting with v0.10, you should use `sails.sockets` for most low-level use-cases involving sockets.

