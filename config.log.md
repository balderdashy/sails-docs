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

+ **'error'** : sails.log.error('');
+ **'warn'** : sails.log.warn('');
+ **'debug'** : sails.log.debug('');
+ **'info'** : sails.log.info('');
+ **'verbose'** : sails.log.verbose('');

##Setting up Transports

Sails supports logging to multiple transports. Beneath the covers Silas uses Winston and all the available transport goodness is also available to Sails

####Example: Set up a transport to log to a file

In your Sails application, edit `config/log.js`: 

Find the object: 

`
log: {
  level: 'info',
}
`

and modify to: 

```
log: {
  level: 'info',
  filePath: 'application.log'
}
```

Sails will now log to both the console and the file `application.log`