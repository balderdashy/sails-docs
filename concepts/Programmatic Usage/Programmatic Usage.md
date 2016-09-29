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


#### .lift()

Starting an app with .lift() on port 1338 and sending a POST request via HTTP:

```javascript
var request = require('request');
var Sails = require('sails').constructor;

var mySailsApp = new Sails();
mySailsApp.lift({
  port: 1338
  // Optionally pass in any other programmatic config overrides you like here.
}, function(err) {
  if (err) {
    console.error('Failed to lift app.  Details:', err);
    return;
  }
  
  // --•
  // Make a request using the "request" library and display the response.
  // Note that you still must have an `api/controllers/FooController.js` file
  // under the current working directory, or a `/foo` or `POST /foo` route
  // set up in `config/routes.js`.
  request.post("/foo", function (err, response) {
    if (err) {
      console.log('Could not send HTTP request.  Details:', err);
    }
    else {
      console.log('Got response:', response);
    }

    // >--
    // In any case, whether the request worked or not, now we need to call `.lower()`.
    mySailsApp.lower(function (err) {
      if (err) {
        console.log('Could not lower Sails app.  Details:',err);
        return;
      }

      // --•
      console.log('Successfully lowered Sails app.');
      
    });//</lower sails app>
  });//</request.post() :: send http request>
});//</lift sails app>
```

#### .load()

Here's an alternative to the previous example:  Starting a Sails app with `.load()` and making the same POST request-- but this time as a virtual request:

```javascript
mySailsApp.load({
  // Optionally pass in any programmatic config overrides you like here.
}, function(err) {
  if (err) {
    console.error('Failed to load app.  Details:', err);
    return;
  }
  
  // --•
  // Make a request using the "request" method and display the response.
  // Note that you still must have an `api/controllers/FooController.js` file
  // under the current working directory, or a `/foo` or `POST /foo` route
  // set up in `config/routes.js`.
  mySailsApp.request({url:"/foo", method: "post"}, function (err, response) {
    if (err) {
      console.log('Could not send virtual request.  Details:', err);
    }
    else {
      console.log('Got response:', response);
    }

    // >--
    // In any case, whether the request worked or not, now we need to call `.lower()`.
    mySailsApp.lower(function (err) {
      if (err) {
        console.log('Could not lower Sails app.  Details:',err);
        return;
      }

      // --•
      console.log('Successfully lowered Sails app.');
      
    });//</lower sails app>
  });//</send virtual request to sails app>
});//</load sails app (but not lift!)>
```

#### .lower()

To stop an app programmatically, use `.lower()`:

```javascript
mySailsApp.lower(function(err) {
  if (err) {
     console.log('An error occured when attempting to stop app:', err);
     return;
  }
  
  // --•
  console.log('Lowered app successfully.');
  
});
```

### Reference

The full reference for Sails' programmatic interface is available in [**Reference > Application**](http://sailsjs.org/documentation/reference/application).

<docmeta name="displayName" value="Programmatic Usage">
