# sails.lift()

Lift a Sails app programmatically.

> This does exactly what you might be used to seeing by now when you run `sails lift`.  It [loads](http://sailsjs.com/documentation/reference/application/sails-load) the app, runs its bootstrap, then starts listening for HTTP requests and WebSocket connections.  Useful for building top-to-bottom integration tests that rely on HTTP requests, and for building higher-level tooling on top of Sails.

```usage
sailsApp.lift(configOverrides, function (err) {

});
```

_Or:_
+ `sailsApp.lift(function (err) {...});`


### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 | _configOverrides_   | ((dictionary?))                              | A dictionary of config that will override any conflicting options present on the command line, in environment variables, or in configuration files.  If provided, this will be merged on top of [`sails.config`](http://sailsjs.com/documentation/reference/configuration).

##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | An error encountered while lifting, or `undefined` if there were no errors.




### Example

```javascript
var Sails = require('sails').constructor;
var sailsApp = new Sails();

sailsApp.lift({
  log: {
    level: 'warn'
  }
}, function (err) {
  if (err) {
    console.log('Error occurred lifting Sails app:', err);
    return;
  }

  // --•
  console.log('Sails app lifted successfully!');

));
```


### Notes
> - The difference between [`.lift()`](http://sailsjs.com/documentation/reference/application/sails-lift) and [`.load()`](http://sailsjs.com/documentation/reference/application/sails-load) is that `.lift()` takes the additional steps of (1) running the app's [bootstrap](http://sailsjs.com/documentation/reference/configuration/sails-config-bootstrap) (if any), and (2) emitting the `ready` event.  The core `http` hook will typically respond to the `ready` event by starting an HTTP server on the port configured via `sails.config.port` (1337 by default).
> - When a Sails app is fully lifted, it also emits the `lifted` event.


<docmeta name="displayName" value="sails.lift()">
<docmeta name="pageType" value="method">
