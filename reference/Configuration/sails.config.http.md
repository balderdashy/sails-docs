# sails.config.http

Configuration for your app's underlying HTTP server.  These properties are conventionally specified in the [`config/http.js`]() configuration file.


### Properties

  Property          | Type       | Default   | Details
 ------------------ |:----------:| --------- | -------
 `middleware`       | ((object)) | See [conventional defaults for HTTP middleware]() | A configuration object of all HTTP middleware functions your app will run on every incoming HTTP request.  All [Express](http://expressjs.com/) or Connect middleware is supported.<br/>[Example](https://gist.github.com/mikermcneil/9cbd68c95839da480e97)
 `middleware.order` | ((array))  | See [conventional defaults for HTTP middleware]() | The order in which middleware should be run for HTTP request (the Sails router, which runs the appropriate explicit routes, policies, controllers, etc. from your app is invoked by the "router" middleware). 
 `middleware.order` | ((array))  | `{}`      | TODO
 `cache`            | ((number)) | TODO      | TODO
 `serverOptions`    | ((object)) | TODO      | TODO


### Notes

> + Note that this HTTP middleware stack configured in `sails.config.http.middleware` is only applied to true HTTP requests-- it is ignored when handling virtual requests (e.g. sockets)
>
> + You cannot define a custom middleware function with the key `order` (since `sails.config.http.middleware.order` has special meaning)


===========================================================================

>todo  move all this elsewhere \/

# Middleware

Sails is fully compatible with Express/ Connect middleware-- in fact, it's all over the place.  Much of the code you'll write in Sails is effectively middleware; most notably [controller actions]() and [policies]().


### Installing Express Middleware In Sails

One of the really nice things about Sails apps is that they can take advantage of the wealth of already-existing Express/Connect middleware out there.  But a common question that arises when people actually try to do this is: _"Where do I `app.use()` it?"_.

In most cases, the answer is to install the Express middleware as a custom HTTP middleware in [`sails.config.http.middleware`]().  This will trigger it for ALL HTTP requests to your Sails app, and allow you to configure the order in which it runs in relation to other HTTP middleware.




### HTTP Middleware

Sails also utilizes an additional [configurable middleware stack]() just for handling HTTP requests.  Each time your app receives an HTTP request, the configured HTTP middleware stack runs in order.

> Note that this HTTP middleware stack is only used for "true" HTTP requests-- it is ignored for **virtual requests** (e.g. requests from a live Socket.io connection.)



#### Conventional Defaults

Sails comes bundled with a suite of conventional HTTP middleware.  You can, of course, disable, override, rearrange, or append to it, but the pre-installed stack is perfectly acceptable for most apps in development or production.  The default HTTP middleware stack is run every time Sails receives an incoming HTTP request; in the order listed below:


 HTTP Middleware Key       | Purpose
 ------------------------- | ------------
 startRequestTimer         | todo
 cookieParser              | todo
 session                   | todo
 bodyParser                | todo
 handleBodyParserError     | todo
 compress                  | todo
 methodOverride            | todo
 poweredBy                 | todo
 $custom                   | todo
 router                    | todo
 www                       | todo
 favicon                   | todo
 404                       | todo
 500                       | Error-handling middleware <!-- todo: expand this -->




<!--

  TODO:

### Advanced Express Middleware In Sails

You can actually do this in a few different ways, depending on your needs.



Generally, the following best-practices apply:

If you want a middleware function 
 
+ If you want a piece of middleware to run only when your app's explicit or blueprint routes are matched, you should include it as a policy.
+ this will run passport for all incoming http requests, including images, css, etc.

If you want a middleware function to run for all you should include it at the top of your `config/routes.js` as a wildcard route.  for your controller (both HTTP and virtual) requests
-->



<docmeta name="uniqueID" value="sailsconfighttp178274">
<docmeta name="displayName" value="sails.config.http">






<!-- 
# Express
### What is this?
If you want to use custom middleware or add local variables and helpers to templates you can do so by configuring express in this config file.

### Description


This configuration file lets you easily add [Express](http://expressjs.com/) middleware, local variables and helpers for templates and directly access the application instance before it starts. 

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

