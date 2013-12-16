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

####Example: Set up a transport to log to a file

Having Sails log to a file is easy-peasy. In your Sails application, edit file `config/log.js`: 

Find the object: 

`
log: {
  level: 'info',
}
`

and modify it accordingly: 

```
log: {
  level: 'info',
  filePath: 'application.log'
}
```

Restart Sails and now Sails will log methods `sails.log.info('My Message')` messages to both the console and to the file. 

**Note**: Take note of the different log levels. In `config/log.js` we set our `level` to `info`. So `sails.log.info` would log to the console and the file. `sails.log.warn` would also work becuase `.warn` is below `.info` as described above under __There are 5 different levels ot the log__. But `sails.log.verbose` wouldn't log to the file, because it is above the log.level we set in `config/log.js`.