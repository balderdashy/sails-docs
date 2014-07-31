# Logging

### Overview
Sails comes with a simple, built-in logger called [`captains-log`](https://github.com/balderdashy/captains-log).  It's usage is purposely very similar to Node's [`console.log`](http://nodejs.org/api/stdio.html), but with a handful of extra features; namely support for multiple log levels with colorized, prefixed console output.

### Configuration
The Sails logger's configuration is located in [`sails.config.log`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.log.html), for which a conventional configuration file ([`config/log.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/log.js.html)) is bundled in new Sails projects out of the box.

When configured at a given log level, Sails will output log messages that are output at a level at or above the currently configured level. This log level is normalized and also applied to the generated output from socket.io, Waterline, and other dependencies. The hierarchy of log levels and their relative priorities is summarized by the chart below:

| Priority | level     | Log fns visible   |
|----------|-----------|-------------------|
| 0        | silent    | N/A
| 1        | error     | `.error()`            |
| 2        | warn      | `.warn()`, `.error()` |
| 3        | debug     | `.debug()`, `.warn()`, `.error()` |
| 4        | info      | `.info()`, `.debug()`, `.warn()`, `.error()` |
| 5        | verbose   | `.verbose()`, `.info()`, `.debug()`, `.warn()`, `.error()` |
| 6        | silly     | `.silly()`, `.verbose()`, `.info()`, `.debug()`, `.warn()`, `.error()` |


#### Notes
+ The default log level is "info".  When your app's log level is set to "info", Sails logs limited information about the server/app's status.
+ When the log level is set to "silly", Sails outputs internal information on which routes are being bound and other detailed framework lifecycle information, diagnostics, and implementation details.
+ When the log level is set to "verbose", Sails logs Grunt output, as well as much more detailed information on the routes, models, hooks, etc. that were loaded.


<docmeta name="uniqueID" value="Logging277763">
<docmeta name="displayName" value="Logging">

