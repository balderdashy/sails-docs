# myApp/config/http.js

This file is conventionally used for configuring the underlying HTTP server (see [`sails.config.http`](http://sailsjs.org/documentation/reference/configuration/sails-config-http) for all available options).


```javascript
/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets).
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/documentation/reference/configuration/sails-config-http
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express/Connect-compatible middleware to run for every incoming     *
  * HTTP request.  To add additional, 3rd party HTTP middleware to the mix,   *
  * add a function as a new key in the `middleware` config dictionary, then   *
  * add the name of its key to the "order" array.                             *
  *                                                                           *
  ****************************************************************************/

  middleware: {

  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

    // order: [
    //   'startRequestTimer',
    //   'cookieParser',
    //   'session',
    //   'myRequestLogger',
    //   'bodyParser',
    //   'handleBodyParserError',
    //   'compress',
    //   'methodOverride',
    //   'poweredBy',
    //   '$custom',
    //   'router',
    //   'www',
    //   'favicon',
    //   '404',
    //   '500'
    // ],

  /****************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/

    // myRequestLogger: function (req, res, next) {
    //     console.log("Requested :: ", req.method, req.url);
    //     return next();
    // }


  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests.       *
  * By default,Sails uses [skipper](http://github.com/balderdashy/skipper).  *
  * See https://github.com/expressjs/body-parser for other options.          *
  *                                                                          *
  * Note that Sails uses an internal instance of Skipper by default; to      *
  * override it and specify more options, make sure to "npm install skipper" *
  * in your project first.  You can also specify a different body parser or  *
  * a custom function with req, res and next parameters (just like any other *
  * middleware function).                                                    *
  *                                                                          *
  ***************************************************************************/

    // bodyParser: require('skipper')({strict: true})

  },


  /***************************************************************************
  *                                                                          *
  * The number of milliseconds to cache static assets in production.         *
  * These are any flat files like images, scripts, styleshseets, etc.        *
  * that are served by the static middleware.  By default, these files       *
  * are served from `.tmp/public`, a hidden folder compiled by Grunt.        *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
```


<docmeta name="displayName" value="http.js">

