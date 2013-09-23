# Express
This configuration file lets you easily add [Express](http://expressjs.com/) middleware, local variables and helpers for templates and directly access the application instance before it starts. 

```javascript
module.exports.express = {

  // customMiddleware allows you to inject a piece of middleware before each requeset
  // Worth nothing that this **only applies to HTTP requests**-- while most parts of Sails work for both
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
  // Disable by seting to `false`
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
