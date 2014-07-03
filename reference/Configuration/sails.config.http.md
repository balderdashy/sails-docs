# sails.config.http

Configuration for your app's underlying HTTP server.  These properties are conventionally specified in the [`config/http.js`]() configuration file.


### Properties

  Property    | Type       | Default   | Details
 ------------ |:----------:| --------- | -------
 `middleware` | ((object)) | `{}`      | See **[sails.config.http.middleware]()** below for a complete description of all sub-properties of this configuration object.
 `middleware` | ((object)) | `{}`      | 
 `cache`

##### `sails.config.http.middleware`





| `layout`  | ((string)) -or- ((boolean))     | `"layout"`  | Set the default [layout](./#!documentation/reference/Views/Layouts.html) for your app by specifying the relative path to the desired layout file from your views folder (i.e. `views/`.)  Or disable layout support altogether with `false`.
| `engine`  | ((string)) | `"ejs"` | The [view engine](./#!documentation/reference/Views/ViewEngines.html) your app will use to compile server-side markup into HTML.
| `locals` | ((object)) | `{}` | Default data to be included as [view locals](./#!documentation/reference/Views/Locals.html) every time a server-side view is compiled anywhere in this app. |

### Notes



<docmeta name="uniqueID" value="sailsconfighttp178274">
<docmeta name="displayName" value="sails.config.http">




# Express
### What is this?
If you want to use custom middleware or add local variables and helpers to templates you can do so by configuring express in this config file.

### Description


This configuration file lets you easily add [Express](http://expressjs.com/) middleware, local variables and helpers for templates and directly access the application instance before it starts. 

```javascript
module.exports.express = {

  // customMiddleware allows you to inject a piece of middleware before each requeset
  // Worth noting that this **only applies to HTTP requests**-- while most parts of Sails work for both
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








<docmeta name="uniqueID" value="Express178274">
<docmeta name="displayName" value="Express">

