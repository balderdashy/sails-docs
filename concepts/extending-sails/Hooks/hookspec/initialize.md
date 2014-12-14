# `.initialize(cb)`

The `initialize` feature allows a hook to perform startup tasks that may be asynchronous or rely on other hooks.  All Sails configuration is guaranteed to be completed before a hook&rsquo;s `initialize` function runs.  Examples of tasks that you may want to put in `initialize` are:

* Logging in to a remote API
* Reading from a database that will be used by hook methods
* Loading support files from a user-configured directory

Like all hook features, `initialize` is optional and can be left out of your hook definition.  If implemented, `initialize` takes one argument: a callback function which must be called in order for Sails to finish loading:

```
initialize: function(cb) {

   // Do some stuff here to initialize hook
   // And then call `cb` to continue
   return cb();

}
```

##### Hook timeout settings

By default, hooks have ten seconds to complete their `initialize` function and call `cb` before Sails throws an error.  That timeout can be configured by setting the `_hookTimeout` key to the number of milliseconds that Sails should wait.  This can be done in the hook&rsquo;s [`defaults`](/#/documentation/concepts/extending-sails/Hooks/hookspec/defaults.html):

```
defaults: {
   __configKey__: {
      _hookTimeout: 20000 // wait 20 seconds before timing out
   }
}
```

##### Hook events and dependencies

When a hook successfully initializes, it emits an event with the following name:

`hook:<hook name>:loaded`

For example:

* The core `orm` hook emits `hook:orm:loaded` after its initialization is complete.
* A hook installed into `node_modules/sails-hook-foo` emits `hook:foo:loaded` by default
* The same `sails-hook-foo` hook, with `sails.config.installedHooks['sails-hook-foo'].name` set to `bar` would emit `hook:bar:loaded`
* A hook installed into `node_modules/mygreathook` would emit `hook:mygreathook:loaded`
* A hook installed into `api/hooks/mygreathook` would also emit `hook:mygreathook:loaded`

You can use the "hook loaded" events to make one hook dependent on another.  To do so, simply wrap your hook&rsquo;s `initialize` logic in a call to `sails.on()`.  For example, to make your hook wait for the `orm` hook to load, you could make your `initialize` similar to the following:

```
initialize: function(cb) {

   sails.on('hook:orm:loaded', function() {
   
      // Finish initializing custom hook
      // Then call cb()
      return cb();
      
   }
}
```

To make a hook dependent on several others, gather the event names to wait for into an array and call `sails.after`:

```
initialize: function(cb) {

   var eventsToWaitFor = ['hook:orm:loaded', 'hook:mygreathook:loaded'];
   sails.after(eventsToWaitFor, function() {
   
      // Finish initializing custom hook
      // Then call cb()
      return cb();
      
   }
}
```
