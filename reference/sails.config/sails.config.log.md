# sails.config.log


Configuration for the instance of the [Sails logger](http://beta.sailsjs.org/#/documentation/reference/Logs) (`sails.log`) used in your Sails app. The options are conventionally specified in the [config/log.js](/#/documentation/anatomy/myApp/config/log.js.html) configuration file.


### Properties


| Property  | Type       | Default   | Details |
|-----------|:----------:|-----------|---------|
| `level`   | ((string)) | `'info'`  | Set the level of detail to be shown in your app's log |

<!--
### Notes

> +. ...

-->

<!--
### What is this?
The logger file configures the log level for your app, as well as the transport.

### Description

The logger file configures the log level for your app, as well as the transport.

*(Underneath the covers, Sails uses Winston for logging, which allows for some pretty neat custom transports/adapters for log messages)*

#### There are 5 different levels to the log:

+ **'error'** : Display calls to `.error()`
+ **'warn'**    : Display calls from `.error()` to `.warn()`
+ **'debug'** : Display calls from `.error()`, `.warn()` to `.debug()`
+ **'info'**  : Display calls from `.error()`, `.warn()`, `.debug()` to `.info()`
+ **'verbose'**: Display calls from `.error()`, `.warn()`, `.debug()`, `.info()` to `.verbose()`


By default, the level is set to `info`.




-->


<docmeta name="uniqueID" value="sailsconfiglog812909">
<docmeta name="displayName" value="sails.config.log">

