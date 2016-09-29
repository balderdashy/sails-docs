# sails.load()

Load a Sails app into memory-- but without lifting an HTTP server.

```javascript
sailsApp.load(configOverrides, function (err) {
  
});
```

> This takes care of loading configuration files, initializing hooks (including the ORM), and binding routes.  It **does not** run the bootstrap, and it **does not** start listening for HTTP requests and WebSocket connections.

#### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |    configOverrides  | ((dictionary?))                              | A dictionary of config that will override any conflicting options present on the command line, in environment variables, or in configuration files.  If provided, this will be merged on top of [`sails.config`](http://sailsjs.org/documentation/reference/configuration).

##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    err              | ((Error?))          | An error encountered while loading, or `undefined` if there were no errors.




### Example

```javascript
var Sails = require('sails').constructor;
var sailsApp = new Sails();

sailsApp.load(
  {
    log: {
      level: 'error'
    }
  },
  function onLoad(err) {
    if (err) {
      console.log('Error occurred loading Sails app:', err);
      return;
    }
    
    // --•
    console.log('Sails app loaded successfully!');
    
  }
)
```

### Notes
> - The difference between [`.lift()`](http://sailsjs.org/documentation/reference/application/sails-lift) and [`.load()`](http://sailsjs.org/documentation/reference/application/sails-load) is that `.lift()` takes the additional steps of (1) running the app's [bootstrap](http://sailsjs.org/documentation/reference/configuration/sails-config-bootstrap) (if any), and (2) emitting the `ready` event.  The core `http` hook will typically respond to the `ready` event by starting an HTTP server on the port configured via `sails.config.port` (1337 by default).
> - Even though a "loaded-but-not-lifted" Sails app does not listen for requests on an HTTP port, you can make "virtual" requests to it using [`sails.request`](http://sailsjs.org/documentation/reference/application/sails-request)


<docmeta name="displayName" value="sails.load()">
<docmeta name="pageType" value="method">
