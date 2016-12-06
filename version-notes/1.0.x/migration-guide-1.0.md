# Migration guide:

To get started upgrading your existing Sails app to version 1.0, follow the checklist below, which covers the changes most likely to affect the majority of apps.  If your app still has errors or warnings on startup after following the checklist, come back to this document and follow the applicable guides to upgrading various app components.

## tl;dr checklist -- things you simply _must_ do when upgrading to version 1.0

* Install the `sails-hook-orm` module into your app with `npm install --save sails-hook-orm`, unless your app has the ORM hook disabled.
* Install the `sails-hook-sockets` module into your app with `npm install --save sails-hook-sockets`, unless your app has the sockets hook disabled.
* Install the `sails-hook-grunt` module into your app with `npm install --save sails-hook-grunt`, unless your app has the Grunt hook disabled.
* If your app doesn't have `sails.config.globals` set to `false`, update your `config/globals.js` file so that `models` and `sails` have boolean values (`true` or `false`), and `async` and `lodash` either have `require('async')` and `require('lodash')` respectively, or else `false`.  You may need to `npm install --save lodash` and `npm install --save async` as well.
* If your app uses CoffeeScript or TypeScript see the [CoffeeScript](http://sailsjs.com/documentation/tutorials/using-coffee-script) and [TypeScript](http://sailsjs.com/documentation/tutorials/using-type-script) tutorials for info on how to update it.
* If your app uses a view engine other than EJS, you&rsquo;ll need to configure it yourself in the `config/views.js` file, and will likely need to run `npm install --save consolidate` for your project.  See the "Views" section below for more details.

## Breaking changes to lesser-used functionality

* `sails.getBaseUrl`, deprecated in v0.12.x, has been removed.  See the [v0.12 docs for `getBaseUrl`](http://0.12.sailsjs.com/documentation/reference/application/sails-get-base-url) for more info and why it was removed and how you should replace it.
* `req.params.all()`, deprecated in v0.12.x, has been removed.  Use `req.allParams()` instead.
* `req.validate()` has been removed.  Use [`actions2`](http://sailsjs.com/documentation/concepts/actions-and-controllers#?actions-2-aka-machine-actions) instead.


## Security

New apps created with Sails 1.0 will contain a **config/security.js** file instead of individual **config/cors.js** and **config/csrf.js** files, but apps migrating from earlier versions don&rsquo;t can keep their existing files as long as they perform the following upgrades:

* Change `module.exports.cors` to `module.exports.security.cors` in `config/cors.js`
* Change CORS config settings names to match the newly documented names in http://sailsjs.com/documentation/reference/configuration/sails-config-security-cors
* Change `module.exports.csrf` to `module.exports.security.csrf` in `config/csrf.js`
* `sails.config.csrf.routesDisabled` is no longer supported -- instead, add `csrf: false` to any route in `config/routes.js` that you wish to be unprotected by CSRF, for example:

```
'POST /some-thing': { action: 'do-a-thing', csrf: false },
```

## Views

For maximum flexibility, Consolidate is no longer bundled within Sails.  If you are using a view engine besides EJS, you'll probably want to install Consolidate as a direct dependency of your app.  Then you can configure the view engine in `config/views.js` like so:

```javascript
'extension': 'swig',
'getRenderFn': function() {
  // Import `consolidate`.
  var cons = require('consolidate');
  // Return the rendering function for Swig.
  return cons.swig;
}
```

Adding custom configuration to your view engine is a lot easier in Sails 1.0:

```javascript
'extension': 'swig',
'getRenderFn': function() {
  // Import `consolidate`.
  var cons = require('consolidate');
  // Import `swig`.
  var swig = require('swig');
  // Configure `swig`.
  swig.setDefaults({tagControls: ['{?', '?}']});
  // Set the module that Consolidate uses for Swig.
  cons.requires.swig = swig;
  // Return the rendering function for Swig.
  return cons.swig;
}
```

## Pubsub

* Removed deprecated `backwardsCompatibilityFor0.9SocketClients` setting.
* Removed deprecated `.subscribers()` method.
* Removed deprecated "firehose" functionality.
* Removed support for 0.9.x socket client API.
* The following resourceful pubsub methods have been removed:
  * `.publishAdd()`
  * `.publishCreate()`
  * `.publishDestroy()`
  * `.publishRemove()`
  * `.publishUpdate()`
  * `.watch()`
  * `.unwatch()`
  * `.message()`
  In their place, you should use the new `.publish()` method, or the low-level [sails.sockets](http://sailsjs.com/documentation/reference/web-sockets/sails-sockets) methods.  Keep in mind that unlike `.message()`, `.publish()` does _not_ wrap your data in an envelope containing the record ID, so you'll need to include that as part of the data if it's important.

## Blueprints


## Express 4
 ### Middleware changes

## Policies

## Miscellaneous deprecated features removed in 1.0

* `req.params.all()`

## Globals

## Responses
 * `.jsonx()` is deprecated -- if you haven't customized a response, just delete it.  Otherwise, replace `res.jsonx()` with `res.json()`.
