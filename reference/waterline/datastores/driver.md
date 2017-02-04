# .driver

The generic, stateless, low-level driver for this datastore (if the adapter supports it).

```
datastore.driver;
```

> This property is not guaranteed to exist for all database adapters.  If the datastore's underlying adapter does not support the [standardized driver interface](https://github.com/node-machine/driver-interface), then `driver` will not exist.


### Example

Imagine you're building your own structured data visualizer (e.g. phpMyAdmin).  You might want to connect to any number of different databases dynamically.

```javascript
// Get the generic, stateless driver for our database (e.g. MySQL).
var Driver = sails.getDatastore().driver;

// Create our own dynamic connection manager (e.g. connection pool)
Driver.createManager({
  connectionString: req.param('connectionUrl')
}).exec(function(err, managerReport){
  if (err) { return res.serverError(err); }
  
  Driver.getConnection({ manager: managerReport.manager }).exec(function(err, connectionReport) {
    if (err) {
      Driver.destroyManager({ manager: managerReport.manager }).exec(function (secondaryErr) {
        if (secondaryErr) { return res.serverError(secondaryErr); }
        return res.serverError(err);
      });//_∏_
      return;
    }//-•
    
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // Do some stuff here...
    // e.g.
    //     Driver.sendNativeQuery({
    //       connection: connectionReport.connection,
    //       nativeQuery: '...'
    //     }).exec(...)
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    
    // Finally, before we continue, tear down the dynamic connection manager.
    // (this also takes care of releasing the active connection we acquired above)
    Driver.destroyManager({ manager: managerReport.manager }).exec(function (err) {
      if (err) { return res.serverError(err); }

      return res.ok();
    });
    
  });
});
```

<docmeta name="displayName" value=".driver">
<docmeta name="pageType" value="property">
