# Understanding Hooks
### Why 



### What

### Where

### How



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
