## log.js
This file contains the configuration of the log levels for your app.

```javascript
    module.exports = {

    // Valid `level` configs:
    // i.e. the minimum log level to capture with sails.log.*()
    //
    // 'error' : Display calls to `.error()`
    // 'warn'	: Display calls from `.error()` to `.warn()`
    // 'debug'	: Display calls from `.error()`, `.warn()` to `.debug()`
    // 'info'	: Display calls from `.error()`, `.warn()`, `.debug()` to `.info()`
    // 'verbose': Display calls from `.error()`, `.warn()`, `.debug()`, `.info()` to `.verbose()`
    //
    log: {
       level: 'info'
    }

};
```
