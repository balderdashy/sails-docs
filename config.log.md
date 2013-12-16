# Logger configuration

The logger file configures the log level for your app, as well as the transport.

*(Underneath the covers, Sails uses Winston for logging, which allows for some pretty neat custom transports/adapters for log messages)*

##There are 5 different levels to the log:

+ **'error'** : Display calls to `.error()`
+ **'warn'**    : Display calls from `.error()` to `.warn()`
+ **'debug'**	: Display calls from `.error()`, `.warn()` to `.debug()`
+ **'info'**	: Display calls from `.error()`, `.warn()`, `.debug()` to `.info()`
+ **'verbose'**: Display calls from `.error()`, `.warn()`, `.debug()`, `.info()` to `.verbose()`


By default, the level is set to `info`.

##Logging at Runtime

To log the levels during during runtime, use the appropriate methods during runtime

+ **error**: sails.log.error('');
+ **warn**: sails.log.warn('');
+ **debug**: sails.log.debug('');
+ **info**: sails.log.info('');
+ **verbose**: sails.log.verbose('');

##Setting up Transports

Sails supports logging to multiple transports. Beneath the covers, Sails uses Winston (https://github.com/flatiron/winston) and all the available transport goodness Winston has to offer, is also available to Sails.

####Example: Set up Sails to log to a file

Having Sails log to a file is easy-peasy. In your Sails application, edit file `config/log.js`: 

Find the object: 

```
log: {
  level: 'info'
}
```

and add `filePath`:

```
log: {
  level: 'info',
  filePath: 'application.log'
}
```

Once you restart the server, Sails will log messages to both the console and to the file. In the example `sails.log.info('Sails ist wunderbar')` the string `Sails ist wunderbar` would be logged to the console and to the file `application.log`.

**Note**: Take note of the different log levels and how they are working together. In `config/log.js` we set our `level` to `info`. Meaning logs level `info` or below, will bel logged to the file and to the console. The only method above level `info`, is `verbose`. So in this example `sails.log.verbose('...')` would not log to the console or file, because its log level is above the `level` we set in `config/log.js`.