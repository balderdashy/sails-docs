# Understanding Hooks
### Why Should I Use Hooks? 
Hooks exist to provide structure and reusability to your custom code.  We hope you'll use to keep your controllers and models nice and skinny.  Fat controllers are cool too...until you're waist deep in `UserController.js`, trying to find all the pieces of that thing you made that one time.

### What Are They?
On a base level, a hook is just a function that gets imported and immediately executed when you lift your app.  This function is called with the `sails global` object as an argument and returns a `definition` object with various methods and properties that provide the structure.

### How Do They Work?
Sails uses hooks to provide most of it's core functionality.  Sails has a hook for it's http server, pubsub functionality, interfacing with an ORM (waterline by default), managing Grunt tasks, etc.  Sails even uses a hook for loading your custom hooks.  It's called `userhooks` and it runs after the http server but before the logger.  It's one of the last things that happens as you lift your app.

### Where Are They?
Like we said before, Sails relies on hooks internally.  If you want to take a look at them, they can be found in `myApp/node_modules/sails/lib/hooks`.  While these are a great resource when writing your own custom hooks, I would be careful not to change them unless you know what you're doing.  Eventually the api will move towards making it easier to use drop-in replacements to the hooks in sails-core.

User defined hooks are located in `myApp/api/hooks`.  This folder isn't created when you create a new project.  Should it be?  Who knows.  Either way, if youre making your own hook, youll start off by creating a folder called `hooks` in `myApp/api`.


## The Simplest User Hook

myApp/api/hooks/simple/index.js

```javascript

module.exports = function mySimpleHook(sails) {

    return {
        talkAboutCats: function(adjective){
            console.log('Cats are',adjective,'!')
        },

        // Run automatically when the hook initializes
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

myApp/api/hooks/cathook/index.js

```javascript

module.exports = function myHookAboutCats(sails) {

    return {
        talkAboutCats: function(adjective){
            var hook = this;
            console.log('Cats are',adjective.toUpperCase(),'!')
        },
        initialize: function (cb) {

            var hook = this;


            return cb();
        },
        defaults: {
            // These properties will be overridden by the properties in myApp/config/cathook.js
            cathook: {
                volume: 'loud',
                catFunctions: {
                    loud: function(){

                  },
                    quiet: function(){

                  },
                }
            },
        },
        routes: {        
            // Functions to bind BEFORE the app's explicit routes are bound (i.e.. config/routes.js)
            before: {
                '/*': function (req, res, next) {
                    next();
                }
            },
            // Functions to bind AFTER the app's explicit routes are bound (i.e. config/routes.js)
            after: {
                '/*': function (req, res, next) {
                  next();
                }
            }
        }
    }
};


```

### Initialize

### Defaults

### Routes





<!--             var eventsToWaitFor = [];
            eventsToWaitFor.push('router:after');
            if (sails.hooks.policies) {
                eventsToWaitFor.push('hook:policies:bound');
            }
            if (sails.hooks.orm) {
                eventsToWaitFor.push('hook:orm:loaded');
            }
            if (sails.hooks.http) {
                eventsToWaitFor.push('hook:http:loaded');
            }
            if (sails.hooks.sockets) {
                eventsToWaitFor.push('hook:sockets:loaded');
            }
            if (sails.hooks.pubsub) {
                eventsToWaitFor.push('hook:pubsub:loaded');
            }
            if (sails.hooks.controllers) {
                eventsToWaitFor.push('hook:controllers:loaded');
            }
            sails.after(['hook:orm:loaded'], function(){
                Image.destroy().exec(function(){
                    Guest.destroy().exec(function(){
                        console.log('Images and Guests Destroyed')
                    })
                })
            });
 -->


```javascript

// api/hooks/Foo.js


// So you start by exporting a function.
// This gives you access to the `sails` object (normally it's global anyways but hooks are a reflectin of how core works, and this is how core works so you can disable sails if you want  anyways)
module.exports = function (sails) {
  
  // This is the important bit.
  // You return a definition object.
  return {
    
    listed
    // First thing- anything you put in here, methods, state, whatever, is accessible (just like in a service), but on `sails.hooks.foo`
    isTooMuch: function (someNumber, cb) {
      if (someNumber > 100) {
        return cb(new Error('You suck!'));
      }
      else return cb();
    },
    
    
    
    // Now the special things


    // Run automatically when the hook initializes
    initialize: function (cb) {
      
      
      
      // You must trigger `cb` so sails can continue loading.  If you pass in an error, sails will fail to load, and display your error on the console.
      cb();
    },
    
    
    
    // Implicit default config values which
    // will be automatically merged with
    // `sails.config`.  There is a convention
    // of hooks namespacing config options under
    // their hook identity.  So we'd do:
    defaults: {
      foo: {
        something: true,
        // Keep in mind any stuff in the app-level config files overrides this- these are just implicit defaults
        heylook: {
          you_can_do_these_things: {
            recursivelydeep: true
          }
        }
      },
      
      // but if we wanted to get naughty, we might
      // do something like this:
      // (note: don't do things like this-- dont' show them how- bad idea)
      port: 1393,
      blueprints: {
        shortcuts: false
      }
    },
    
    
    // Ok so thre's also this (but I woudln't even mention it in docs yet)
    configure: function () {
      // i don't remember how it works, it's used in core in certain hooks I guess- it's to get stuff in your config before running initialize.  Most important 
    },
    
    // Last thing:
      routes: {
        
        // Functions to bind BEFORE the app's explicit routes are bound (i.e.. config/routes.js)
        before: {
          // For example- this is how CSRF and stuff works (things that run beforehand)
          
          // Example: every route
          '/*': function (req, res, next) {
            // do stuff
            next();
          }
        },

        // Functions to bind AFTER the app's explicit routes are bound (i.e. config/routes.js)
        after: {
          // For example- this is where blueprint routes live
          
          // Example: every route
          '/*': function (req, res, next) {
            // Do stuff (this will only be run if no other routes or hooks pick up the request and stop it)
            // Calling next carries on to other hooks and things, and eventually will end up at the 404 handler
            next();
          }
          
        }
      }
    
    
  };
}



// Usage:
// sails.hooks.foo.isTooMuch(2, function (err) {
// 
// };
```

<docmeta name="uniqueID" value="howtheywork65532">
<docmeta name="displayName" value="How they work">
