```js
'use strict';

module.exports = function(sails) {

  // This var will be private
  // var foo = 'bar';

  // This var will be public
  // this.abc = 123;

  return {

    // Pause sails lifting until this hook has completed initializing
    // ready: false,

    // set up the options of your hook
    defaults:{
    },

    // do stuff before intialize the hook
    configure: function(done){
      return done();
    },

    // the logic of your hook
    initialize: function(done){
      return done();
    },

    routes: {
      before: {
        // example of a route
        'GET /*': function (req, res, next) {
           this.numRequestsSeen++;
           return next();
        }
      },
      after: {
        // example of a route
        'GET /*': function (req, res, next) {
           this.numUnhandledRequestsSeen++;
           return next();
        }
      }
    }

  };
};
```