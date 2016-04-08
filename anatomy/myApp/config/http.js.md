# myApp/config/http.js

This file is conventionally used for configuring the underlying HTTP server (the `sails.config.http` object.)

This includes all HTTP-specific middleware, including the serving/caching of flat files.


<docmeta name="displayName" value="http.js">

```
/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/documentation/reference/configuration/sails-config-http
 */

module.exports.http = {

  middleware: {

    // The order in which middleware should be run for HTTP request.
    // (the Sails router is invoked by the "router" middleware below.)
    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],

    // The body parser that will handle incoming multipart HTTP requests.
    // By default as of v0.10, Sails uses [skipper](http://github.com/balderdashy/skipper).
    // See http://www.senchalabs.org/connect/multipart.html for other options.
    // bodyParser: require('skipper')

  },

  // The number of milliseconds to cache static assets in production.
  // These are any flat files like images, scripts, styleshseets, etc.
  // that are served by the static middleware.  By default, these files
  // are served from `.tmp/public`, a hidden folder compiled by Grunt.
  cache: 31557600000
};

```
