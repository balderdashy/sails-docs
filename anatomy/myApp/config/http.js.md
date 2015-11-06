# myApp/config/http.js

このファイルは通常、プロジェクトの基礎部分にあるHTTPサーバ(`sails.config.http`オブジェクト)を設定するのに使われます。

ここにはフラットなファイルを受け取りする、HTTPに特化したミドルウエアが含まれています。

<docmeta name="uniqueID" value="httpjs768553">
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
 * http://links.sailsjs.org/docs/config/http
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

  // The number of seconds to cache flat files on disk being served by
  // Express static middleware (by default, these files are in `.tmp/public`)
  //
  // The HTTP static cache is only active in a 'production' environment,
  // since that's the only time Express will cache flat-files.
  cache: 31557600000
};

```
