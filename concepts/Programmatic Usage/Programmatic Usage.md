# Using Sails Programmatically

### Overview

The majority of the time, you will interact with Sails through its [command-line interface](http://sailsjs.org/documentation/reference/command-line-interface), starting servers with [`sails lift`](http://sailsjs.org/documentation/reference/command-line-interface/sails-lift).  However, Sails apps can also be started and manipulated from within other Node apps, using the [programmatic interface](http://sailsjs.org/documentation/reference/application).  One of the main uses for this interface is to run Sails apps inside of automated test suites.

### Creating a Sails app programmatically

To create a new Sails app from within a Node.js script, use the Sails _constructor_.  You can use the same constructor to create as many distinct Sails apps as you like:

```javascript
var Sails = require('sails').constructor;
var mySailsApp = new Sails();
var myOtherSailsApp = new Sails();
```

### Configuring, starting and stopping Sails apps programmatically

Once you have a reference to a new Sails app, you can use [`.load()`](http://sailsjs.org/documentation/reference/application/sails-load) or [`.lift()`](http://sailsjs.org/documentation/reference/application/sails-lift) to start it.  Both methods take two arguments: a dictionary of configuration options, and a callback function that will be run after the Sails app starts.

> When Sails is started programmatically, it will still use the `api`, `config` and other folders underneath the current working directory to load controllers, models, and configuration options.  One notable exception is that `.sailsrc` files will _not_ be loaded when starting apps this way.

> Any configuration options sent as arguments to `.load()` or `.lift()` will take precedence over options loaded from anywhere else.

The difference between `.load()` and `.lift()` is that `.lift()` takes the additional steps of (1) running the app's [bootstrap](http://sailsjs.org/documentation/reference/configuration/sails-config-bootstrap), if any, and (2) starting an HTTP server on the port configured via `sails.config.port` (1337 by default).  This allows you to make HTTP requests to the lifted app.  To make requests to an app started with `.load()`, you can use the [`.request()`](http://sailsjs.org/documentation/reference/application/sails-request) method of the loaded app.

```javascript
// Starting an app with .lift() on port 1338 and making a POST request
mySailsApp.lift({port: 1338}, function(err, theApp) {
  // If an error occurred lifting the app, exit
  if (err) {
    return console.error("An error occurred: ", err);
  }
  // Make a request using the "request" library and display the response.
  // Note that you still must have an `api/controllers/FooController.js` file
  // under the current working directory, or a `/foo` or `POST /foo` route
  // set up in `config/routes.js`.
  require('request').post("/foo", console.log);
});

// Starting an app with .load() and making the same POST request
mySailsApp.load({}, function(err, theApp) {
  // If an error occurred lifting the app, exit
  if (err) {
    return console.error("An error occurred: ", err);
  }
  // Make a request using the "request" method and display the response.
  // Note that you still must have an `api/controllers/FooController.js` file
  // under the current working directory, or a `/foo` or `POST /foo` route
  // set up in `config/routes.js`.
  theApp.request({url:"/foo", method: "post"}, console.log);
});
```

To stop an app programmatically, use `.lower()`:

```javascript
mySailsApp.lower(function(err) {
  if (err) {
     console.log("An error occured while stopping app: ", err);
  }
});
```

### Grunt, globals and other considerations in programmatic usage

When loading a Sails app programmatically, you will usually want to turn off certain hooks that are not being actively used, both for reasons of optimization and to ensure minimal interference between the Sails app and the Node script enclosing it.  To turn off a hook, set it to `false` in a `hooks` dictionary that you send as part of the first argument to `.load()` or `.lift()`.

Additionally, you will often want to turn off Sails [globals](http://sailsjs.org/documentation/concepts/globals), _especially when loading more than one Sails app simultaneously_.  Since all Node apps in the same process share the same globals, starting more than one Sails app with globals turned on is a surefire way to end up with collisions between models, controllers and other app-wide entities.


```javascript
// Turn off globala and commonly unused hooks in programmatic apps
mySailsApp.load({
  hooks: {
     grunt: false,
     sockets: false,
     pubsub: false
  },
  globals: false
})
```

Finally, note that while you can use the Sails constructor to create and start as many Sails apps programmtically as you like, each app can only be started once.  Once you call `.lower()` on an app, it cannot be started again.

### Reference

The full reference for Sails' programmatic interface is available in the [Application reference section](http://sailsjs.org/documentation/reference/application)

<docmeta name="displayName" value="Programmatic Usage">
