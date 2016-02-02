# sails.lift()

Load a Sails app, run its bootstrap and have it start listening for requests.

```javascript
sails.lift([options], [callback]);
```


### Usage

|   |          Argument           | Type                | Details
|---| --------------------------- | ------------------- | -----------
| 1 |        options              | ((object))          | (optional) A dictionary of configuration options that will override all options present on the command line or in config files
| 2 |        callback             | ((function))        | (optional) A function to call when lifting is complete (or if an error occurs)

##### Callback

|   | Argument  | Type         | Details |
|---|-----------|:------------:|---------|
| 1 | `err`     | ((object))   | An error object, if any errors occurred while lifting
| 2 | `sails`   | ((object))   | A reference to the lifted Sails instance


### Example

```javascript
var Sails = require('sails').constructor;
var sailsApp = new Sails();
sailsApp.lift(
  {
    log: {
      level: 'error'
    }
  },
  function (err, liftedApp) {
    if (err) {
      return console.log("Error occurred lifting Sails app: ", err);
    }
    // Note that liftedApp === sailsApp
    console.log("Sails app lifted successfully in port", sailsApp.config.port);
  }
)
```

### Notes
> - The difference between `.lift()` and [`.load()`](http://sailsjs.org/documentation/reference/application/sails-load) is that `.lift()` takes the additional steps of (1) running the app's [bootstrap](http://sailsjs.org/documentation/reference/configuration/sails-config-bootstrap) (if any), and (2) emitting the `ready` event.  The core `http` hook will typically respond to the `ready` event by starting an HTTP server on the port configured via `sails.config.port` (1337 by default).
> - When a Sails app is fully lifted, it also emits the `lifted` event.

<docmeta name="displayName" value="sails.lift()">
<docmeta name="pageType" value="method">

