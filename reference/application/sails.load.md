# sails.load()

Load a Sails app into memory.  This involves loading configuration and initializing hooks and the router.



```javascript
sails.load([options], [callback]);
```


### Usage

|   |          Argument           | Type                | Details
|---| --------------------------- | ------------------- | -----------
| 1 |        options              | ((object))          | (optional) A dictionary of configuration options that will override all options present on the command line or in config files
| 2 |        callback             | ((function))        | (optional) A function to call when loading is complete (or if an error occurs)

##### Callback

|   | Argument  | Type         | Details |
|---|-----------|:------------:|---------|
| 1 | `err`     | ((object))   | An error object, if any errors occurred while loading
| 2 | `sails`   | ((object))   | A reference to the loaded Sails instance


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
  function (err, loadedApp) {
    if (err) {
      return console.log("Error occurred loading Sails app: ", err);
    }
    // Note that loadedApp === sailsApp
    console.log("Sails app loaded successfully!");
  }
)
```

### Notes
> - The difference between `.lift()` and [`.load()`]() is that `.lift()` takes the additional steps of (1) running the app's [bootstrap]() (if any), and (2) emitting the `ready` event.  The core `http` hook will typically respond to the `ready` event by starting an HTTP server on the port configured via `sails.config.port` (1337 by default).
> - Even though a Sails app does not listen for requests on an HTTP port, you can make "virtual" requests to it using [`sails.emit`]()

<docmeta name="displayName" value="sails.load()">
