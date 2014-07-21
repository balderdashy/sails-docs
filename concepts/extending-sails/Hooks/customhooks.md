# Understanding Hooks
### Why Should I Use Hooks? 
Hooks exist to provide a way for you to execute custom code as your app is lifted.  This is one of the better places to build lower level functionality that might need direct interaction with sails core. 

### What Are They?
On a base level, a hook is just a function that gets imported and immediately executed when you lift your app.  This function is called with the `sails global` object as an argument and returns a `definition` object with various methods and properties that provide structure.

### How Do They Work?
Sails uses hooks to provide most of it's core functionality.  Sails has a hook for it's http server, pubsub functionality, interfacing with an ORM (waterline by default), managing Grunt tasks, etc.  Sails even uses a hook for loading your custom hooks.  It's called `userhooks` and it runs after the http server but before the logger.  It's one of the last things that happens as you lift your app.

### Where Are They?
Like we said before, Sails relies on hooks internally.  If you want to take a look at them, they can be found in `myApp/node_modules/sails/lib/hooks`.  While these are a great resource when writing your own custom hooks, I would be careful not to change them unless you know what you're doing.  Eventually it will become easier to use drop-in replacements to the hooks in sails-core.

User defined hooks are located in `myApp/api/hooks`.  This folder isn't created when you create a new project.  Should it be?  Who knows.  Either way, if you're making your own hook, you'll start off by creating a folder called `hooks` in `myApp/api`.


## The Simplest User Hook

myApp/api/hooks/simple/index.js

```javascript

module.exports = function mySimpleHook(sails) {

    return {
        talkAboutCats: function(adjective){
            console.log('Cats are',adjective,'!')
        },

        // Runs automatically when the hook initializes
        initialize: function (cb) {

            var hook = this;

            // You must trigger `cb` so sails can continue loading.
            // If you pass in an error, sails will fail to load, and display your error on the console.

            hook.talkAboutCats('great');

        return cb();
        }
    }
};


```

While this isnt a very useful hook, it demonstrates how simple hooks really are.  When your sails app lifts, Sails imports the file `myApp/api/hooks/simple/index.js`, then executes the function with the `sails global` object as a parameter.  It then executes the `initialize` method on the object returned.  If that isn't found, Sails quietly gives up and moves on.   Otherwise, the hook registers sucesfully and can later be accessed on the `sails global` object with `sails.hooks.talkAboutCats('cruel')`. 



## What Else Can I Do?

To answer that, let's look at one of the hooks that `sails core` uses internally.  Below is the CSRF hook.  Sails uses it to validate CSRF tokens.

myApp/api/hooks/cathook/index.js

```javascript
module.exports = function(sails) {

  // This hooks dependencies

  var _ = require('lodash'),
  util = require('sails-util'),
  Hook = require('../../index');

  // Returning the hooks definition object

  return {

    defaults: {
      csrf: false
    },


    // See `configure` notes below

    configure: function () {
      if (sails.config.csrf === true) {
        sails.config.csrf = {
          grantTokenViaAjax: true,
          protectionEnabled: true,
          origin: ''
        };
      }
      else if (sails.config.csrf === false) {
        sails.config.csrf = {
          grantTokenViaAjax: false,
          protectionEnabled: false,
          origin: ''
        };
      }
      else {
        _.defaults(typeof sails.config.csrf === 'object' ? sails.config.csrf : {}, {
          grantTokenViaAjax: true,
          protectionEnabled: true,
          origin: ''
        });
      }
    },

    // See `defaults` notes below

    defaults: {

    },

    // See `routes` notes below

    routes: {

      // In this hook, both the `before` and `after` objects
      // use a wildcard to match EVERY request sent to your app.

      before: {
        '/*': function(req, res, next) {
          var allowCrossOriginCSRF = sails.config.csrf.origin.split(',').indexOf(req.headers.origin) > -1;

          if (sails.config.csrf.protectionEnabled && (!req.headers.origin || util.isSameOrigin(req) || allowCrossOriginCSRF)) {
            var connect = require('express/node_modules/connect');

            return connect.csrf()(req, res, function(err) {
              res.locals._csrf = req.csrfToken();
              if (err) {
                return res.forbidden();
              } else {
                return next();
              }
            });
          }

          // Always ok
          res.locals._csrf = null;

          next();
        }
      },

      after: {
        'get /csrfToken': function(req, res, next) {

          // Allow this endpoint to be disabled by setting:
          // sails.config.csrf = { grantTokenViaAjax: false }
          if (!sails.config.csrf.grantTokenViaAjax) {
            return next();
          }

          return res.json({
            _csrf: res.locals._csrf
          });
        }
      }
    }

  };
};


```

### Definition Object

The definition object may contain as many key/values as you want as long as it also includes the initialize function on the top level.  If if does not include this function, the hook will fail to load and your app will throw an error.

### Configure

The configure function is a special function in `hooks` that runs before `initialize()`.  It is most often used to read the values of the config settings for the files in `myApp/config/`

See the section called 'Defaults' to learn more about hook configuration.

### Initialize
If you include the `initialize()` function on your definition object, the callback MUST be returned.

This function is most often used to register `listeners` on event emitters and prepare the hook for success.

See the `timing` section below for more info about `initialize()`

### Routes
`Routes` is a special object with keys `before` and `after`. It is used to bind custom functions to routes. Behind the scenes, the functions defined here are added to the stack of Express style middleware functions that an http request goes through before it makes it to your controller logic.

### Defaults
While the `Defaults` object isn't used in this hook, its purpose is to set implicit default config values. Those values will be automatically merged with `sails.config`.

There is a convention of hooks namespacing config options under their hook identity. If our hook was called `simpleHook`, we would set our defaults like you see below.

```javascript

  defaults: {

    simpleHook:{

      defaultOptionOne: true,
      defaultOptionTwo: 'foo',
      anotherOption: {
        evenMore: 'options'
      } 

    }

  }

```

The defaults are merged recursively so you can have complex config if you need it.

> Remember, these are only defaults.  Any app-level configuration in the `myApp/config/` files will override this.

### Timing
Sometimes it's important that your custom hook loads at a particular time.  The sails object which is passed as an argument to the `initialize()` function is a [node event emitter](http://nodejs.org/api/events.html#events_class_events_eventemitter).

While your app is lifting, it emits events that give information about what stage of the loading process it is in.  You can use this to make sure your hook loads at the correct time by registering a `listener` in the `initialize()` function.  Check out the example below.

```javascript

// definition object
module.exports = function mySimpleHook(sails) {

    return {
        talkAboutCats: function(adjective){
            console.log('Cats are',adjective,'!')
        },
        initialize: function(callback){

          // Lets wait on some of the sails core hooks to
          // finish loading before we load our hook
          // that talks about cats. 

            var eventsToWaitFor = [];

            if (sails.hooks.policies)
                eventsToWaitFor.push('hook:policies:bound');

            if (sails.hooks.orm)
                eventsToWaitFor.push('hook:orm:loaded');

            if (sails.hooks.http)
                eventsToWaitFor.push('hook:http:loaded');

            if (sails.hooks.sockets)
                eventsToWaitFor.push('hook:sockets:loaded');

            if (sails.hooks.pubsub)
                eventsToWaitFor.push('hook:pubsub:loaded');

            if (sails.hooks.controllers)
                eventsToWaitFor.push('hook:controllers:loaded');

            sails.after(eventsToWaitFor, function(){
                // Now we will return the callback and our hook
                // will be usable.

                return callback();

            });



        }
  }

```

<docmeta name="uniqueID" value="customhooks65532">
<docmeta name="displayName" value="Custom Hooks">
