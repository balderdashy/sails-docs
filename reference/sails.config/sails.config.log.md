# sails.config.log

Configuration for the [logger](http://sailsjs.org/documentation/concepts/logging) in your Sails app.  These settings apply whenever you call functions like `sails.log.debug()` or `sails.log.error()` in your app code, as well as when Sails logs a message to the console automatically.  The options here are conventionally specified in the [config/log.js](http://sailsjs.org/documentation/anatomy/myApp/config/log.js.html) configuration file.


### Properties

| Property  | Type        | Default     | Details                                                                             |
|:----------|-------------|:------------|:------------------------------------------------------------------------------------|
| `level`   | ((string))  | `'info'`    | Set the level of detail to be shown in your app's log
| `inspect` | ((boolean)) | `true`      | Set to false to disable captain's log's handling of logging, logs will instead be passed to the configured custom logger  |
| `custom`  | ((ref))     | `undefined` | Specify a reference to an instance of a custom logger (such as [winston](https://github.com/winstonjs/winston)).  If provided, instead of logging directly to the console, the functions exposed by the custom logger will be called, and log messages from Sails will be passed through.  For more information, see [captains-log](https://github.com/balderdashy/captains-log/blob/master/README.md#why-use-a-custom-logger).

### Using a Custom Logger

It can sometimes be useful to configure a custom logger-- particularly for regulatory compliance and organizational requirements (i.e. if your company is using a particular logger in other apps.)  In the context of Sails, configuring a custom logger also allows you to intercept all log messages automatically created by the framework, which is handy for setting up email notifications about errors and warnings.

> But don't feel like you _have_ to use a custom logger if you want these sorts of notifications!  In fact, there are usually more straightforward ways to implement features like automated Slack, SMS, or email notifications whenever errors occur.  For example, one approach is to customize your app's default server error response ([`responses/serverError.js`](http://sailsjs.org/documentation/anatomy/my-app/api/responses/server-error-js)).  Another popular option is using a monitoring service like [AppDynamics](https://www.appdynamics.com/nodejs/sails/) or [NewRelic](https://discuss.newrelic.com/t/using-newrelic-with-sails-js/3338/8).


Here's an example of configuring [winston](https://github.com/winstonjs/winston) as a custom logger, defining both a console transport and file transport:

```javascript
// config/log.js

var winston = require('winston');
var customLogger = new winston.Logger();

// A console transport logging debug and above.
customLogger.add(winston.transports.Console, {
  level: 'debug',
  colorize: true
});

// A file based transport logging only errors formatted as json.
customLogger.add(winston.transports.File, {
  level: 'error',
  filename: 'filename.log',
  json: true
});

module.exports.log = {
  // Pass in our custom logger, and pass all log levels through.
  custom: customLogger,
  level: 'silly',

  // Disable captain's log so it doesn't prefix or stringify our meta data.
  inspect: false
};
```



<docmeta name="displayName" value="sails.config.log">
<docmeta name="pageType" value="property">

