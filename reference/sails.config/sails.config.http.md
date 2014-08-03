# sails.config.http

Configuration for your app's underlying HTTP server.  These properties are conventionally specified in the [`config/http.js`](/#/documentation/anatomy/myApp/config/http.js.html) configuration file.


### Properties

  Property          | Type       | Default   | Details
 ------------------ |:----------:| --------- | -------
 `middleware`       | ((object)) | See [conventional defaults for HTTP middleware](http://beta.sailsjs.org/#/documentation/concepts/Middleware?q=conventional-defaults) | A configuration object of all HTTP middleware functions your app will run on every incoming HTTP request.  All [Express](https://github.com/expressjs/) or Connect middleware is supported.<br/>[Example](https://gist.github.com/mikermcneil/9cbd68c95839da480e97)
 `middleware.order` | ((array))  | See [conventional defaults for HTTP middleware order](https://github.com/balderdashy/sails/blob/master/lib/hooks/http/index.js#l51-66) | The order in which middleware should be run for HTTP request (the Sails router, which runs the appropriate explicit routes, policies, controllers, etc. from your app is invoked by the "router" middleware).
 `cache`            | ((number)) | `cache: 31557600000` | The number of seconds to cache flat files on disk being served by Express static middleware (by default, these files are in `.tmp/public`)<br/>The HTTP static cache is only active in a 'production' environment (default 1 year), since that's the only time Express will cache flat-files.
 `serverOptions`    | ((object)) | TODO      | TODO



### Notes

> + Note that this HTTP middleware stack configured in `sails.config.http.middleware` is only applied to true HTTP requests-- it is ignored when handling virtual requests (e.g. sockets)
>
> + You cannot define a custom middleware function with the key `order` (since `sails.config.http.middleware.order` has special meaning)



<docmeta name="uniqueID" value="sailsconfighttp178274">
<docmeta name="displayName" value="sails.config.http">






<!--
# Express
### What is this?
If you want to use custom middleware or add local variables and helpers to templates you can do so by configuring express in this config file.

### Description


This configuration file lets you easily add [Express](https://github.com/expressjs/) middleware, local variables and helpers for templates and directly access the application instance before it starts.

```javascript
module.exports.express = {

  // customMiddleware allows you to inject a piece of middleware before each requeset
  // Worth noting that this **only applies to HTTP requests**- while most parts of Sails work for both
  // HTTP and sockets, and most Express/Connect middleware should work without a problem for both using
  // Sails' built-in interpreter, this configuration exists mainly to allow direct access to the Express
  // middleware chain.
  //
  // For example, if  you want to use the `connect-flash` middleware:
  /*
  customMiddleware: function (app) {
    var flash = require('connect-flash');
    app.use(flash());
  }
  */
  //
  // Defaults to `false`
  // Disable by setting to `false`
  //
  // customMiddleware: false


  // Configures the middleware function used for parsing the HTTP request body
  // Defaults to the Formidable-based version built-in to Express/Connect
  //
  // To enable streaming file uploads (to disk or somewhere else)
  // you'll want to set this to `false` to disable it.
  // Alternatively, if you're comfortable with the bleeding edge,
  // check out: https://github.com/mikermcneil/stream-debug
  //
  // Defaults to `false`
  // Disable by seting to `false`
  //
  // bodyParser: false,



  // If bodyParser doesn't understand the HTTP body request data,
  // run it again with an artificial header, forcing it to try and parse
  // the request body as JSON
  // (this allows you to use JSON as your request body and have it parsed as parameters
  // without the need to specify a 'Content-type: application/json' header)
  //
  // Defaults to `true`
  // Disable by seting to `false`
  //
  // retryBodyParserWithJSON: true,



  // Cookie parser middleware
  //
  // Defaults to Connect/Express standard
  // Disable by seting to `false`
  //
  // cookieParser: false,



  // HTTP method override middleware
  //
  // This option allows artificial query params to be passed to trick
  // Express into thinking a different HTTP verb was used.
  // Useful when supporting an API for user-agents which don't allow
  // PUT or DELETE requests
  //
  // Defaults to Connect/Express standard
  // Disable by seting to `false`
  //
  // methodOverride: false

};
```







 -->

