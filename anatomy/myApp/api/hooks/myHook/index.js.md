# myApp/api/hooks/myHook/index.js
### 目的

これは[プロジェクトフック](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/projecthooks.html)の例であり、`myApp`のSailsアプリケーションに機能を加えるものです。詳しくは[フック](http://sailsjs.org/documentation/concepts/extending-sails/Hooks)のコンセプトのの項目をご覧ください。

```js

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
      // This will be available in app code as sails.hooks.myhook.numRequestsSeen
      this.numRequestsSeen = 0;
      // This will be available in app code as sails.hooks.myhook.numUnhandledRequestsSeen
      this.numUnhandledRequestsSeen = 0;
      return done();
    },

    routes: {
      before: {
        // This route will be matched before any routes in config/routes.js
        'GET /*': function (req, res, next) {
           this.numRequestsSeen++;
           return next();
        }
      },
      after: {
        // This route will be matched after any routes in config/routes.js
        'GET /*': function (req, res, next) {
           this.numUnhandledRequestsSeen++;
           return next();
        }
      }
    }

  };
};
```

<docmeta name="displayName" value="index.js">
