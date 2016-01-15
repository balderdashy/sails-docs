# sails.config.log


Configuration for the instance of the [Sails logger](http://sailsjs.org/documentation/concepts/logging) (`sails.log`) used in your Sails app. The options are conventionally specified in the [config/log.js](http://sailsjs.org/documentation/anatomy/myApp/config/log.js.html) configuration file.


### Properties

| Property  | Type        | Default     | Details                                                                                                                  |
|-----------|-------------|-------------|--------------------------------------------------------------------------------------------------------------------------|
| `level`   | ((string))  | `'info'`    | Set the level of detail to be shown in your app's log                                                                    |
| `inspect` | ((boolean)) | `true`      | Set to false to disable captain's log's handling of logging, logs will instead be passed to the configured custom logger |
| `custom`  | ((object))  | `undefined` | Set to the instance of a custom logger (such as [winston](https://github.com/winstonjs/winston)) logs will be passed through to the custom logger

### Using a Custom Logger

You can use a custom logger by disabling captain's log and providing a logger with similar methods that logs can be passed to. An example using [winston](https://github.com/winstonjs/winston) defining both a console transport and file transport is below.

```javascript
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
