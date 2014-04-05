# Globals
### Overview

Sails exposes a handful of global variables by default.  Nothing in Sails core relies on this fact - these variables are exposed for your convenience during development.  Each and every global variable exposed in Sails may be disabled in [`config/globals.js`]().

### App
Most of this section of the docs focuses on the methods and properties of `sails`, the singleton object representing your app.  In most cases, you will want to keep the `sails` object globally accessible- it makes your app code much cleaner.  However, if you _do_ need to disable _all_ globals, including `sails`, you can get access to `sails` on the request object (`req`).

### Models and Services
Your app's [models]() and [services]() are exposed as globals using their `globalId`.  For instance, the model defined in the file `api/models/Foo.js` will be globally accessible as `Foo`, and the service defined in `api/services/Baz.js` will be available as `Baz`.

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


# sails.config
### Purpose
The `sails.config` object is built automatically from the settings exported from the modules in your app's `config/` directory.  Sails recognizes many different settings, namespaced under different top level keys (e.g. `sails.config.sockets` and `sails.config.blueprints`), but you can also use `sails.config` for your own custom app-level configuration (e.g. `sails.config.someProprietaryAPI.secret`).

For a complete reference of the configuration settings understood by Sails, check out the [configuration reference](), as well as the [anatomy pages]() on the relevant configuration modules which are included in new Sails apps by default.


### Example
```javascript
// Make sure csrf is enabled if we are in production mode.
// Throw an error and crash the app otherwise.
if (sails.config.environment === 'production' && !sails.config.csrf) {
  throw new Error('STOP IMMEDIATELY ! CSRF should always be enabled in a production deployment!');
}
```

### Notes
> The built-in meaning of the settings in `sails.config` are, for the most part, only interpreted by Sails during lift.  In most cases, changing them at runtime will have no effect.  For example, to change the port your app is running on, you'll need to change or override the setting in a configuration file, then restart the server.


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

