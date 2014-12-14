# The Hook Specification

## Overview

Each Sails hook is implemeted as a Javascript function that takes a single argument&mdash;a reference to the running `sails` instance&mdash;and returns an object with one or more of the keys described later in this document.  So, the most basic hook would look like this:

```
module.exports = function myBasicHook(sails) {
   return {};
}
```

It wouldn't do much, but it would work!  

Each hook should be saved in its own folder with the filename `index.js`.  The folder name should uniquely identify the hook, and the folder can contain any number of additional files and subfolders.  Extending the previous example, if you saved the file containing `myBasicHook` in a Sails project as `index.js` in the folder `api/hooks/my-basic-hook` and then lifted your app with `sails lift --verbose`, you would see the following in the output:

`verbose: my-basic-hook hook loaded successfully.`

## Hook features
The following features are available to implement in your hook.  All features are optional, and can be implemented by adding them to the object returned by your hook function.

### `defaults / defaults(config)`

The `defaults` feature can be implemented either as an object or a function which takes a single argument (see &ldquo;using `defaults` as a function&rdquo; below) and returns an object.  The object you specify will be used to provide default configuration values for Sails.  You should use this feature to specify default settings for your hook.  For example, if you were creating a hook that communicates with a remote service, you may want to provide a default domain and timeout length:

```
{
   myapihook: {
      timeout: 5000,
      domain: "www.myapi.com"
   }
}
```

If a `myapihook.timeout` value is provided via a Sails configuration file, that value will be used; otherwise it will default to `5000`.  

##### Namespacing your hook configuration
For [user hooks](/#/documentation/concepts/extending-sails/Hooks?q=types-of-hooks), you should namespace your hook&rsquo;s configuration under a key that uniquely identifies that hook (e.g. `myapihook` above).  For [installable hooks](/#/documentation/concepts/extending-sails/Hooks?q=types-of-hooks), you should use the special `__configKey__` key to allow end-users of your hook to [change the configuration key](/#/documentation/concepts/extending-sails/Hooks/usinghooks.html?q=changing-the-way-sails-loads-an-installable-hook) if necessary.  The default key for a hook using `__configKey__` is the hook name.  For example, if you create a hook called `sails-hooks-myawesomehook` which includes the following `defaults` object:
s
```
{
   __configKey__: {
      name: "Super Bob"
   }
}
```

then it will, by default, provide default settings for the `sails.config.myawesomehook.name` value.  If the end-user of the hook overrides the hook name to be `foo`, then the `defaults` object will provide a default value for `sails.config.foo.name`.

##### Using `defaults` as a function

If you specify a function for the `defaults` feature instead of a plain object, it takes a single argument (`config`) which receives any Sails configuration overrides.  Configuration overrides can be made by passing settings to the command line when lifting Sails (e.g. `sails lift --prod`), by passing an object as the first argument when programmatically lifting or loading Sails (e.g. `Sails.lift({port: 1338}, ...)`) or by using a [`.sailsrc`](/#/documentation/anatomy/myApp/sailsrc.html) file.  The `defaults` function should return a plain object representing configuration defaults for your hook.

### `configure()`

The `configure` feature provides a way to configure a hook after the `defaults` objects have been applied to all hooks.  By the time a custom hook&rsquo;s `configure()` function runs, all user-level configuration and core hook settings will have been merged into `sails.config`.  However, you should *not* depend on other custom hooks&rsquo; configuration at this point, as the load order of custom hooks is not guaranteed.

`configure` should be implemented as a function with no arguments, and should not return any value.  For example, the following `configure` function could be used for a hook that communicates with a remote API, to change the API endpoint based on whether the user set the hook&rsquo;s `ssl` property to `true`.  Note that the hook&rsquo;s configuration key is available in `configure` as `this.configKey`:

```
configure: function() {

   // If SSL is on, use the HTTPS endpoint
   if (sails.config[this.configKey].ssl == true) {
      sails.config[this.configKey].url = "https://" + sails.config[this.configKey].domain;
   } 
   // Otherwise use HTTP
   else {
      sails.config[this.configKey].url = "http://" + sails.config[this.configKey].domain;
   }
}
```

The main benefit of `configure` is that all hook `configure` functions are guaranteed to run before any `initialize` functions (see below) run; therefore a hook&rsquo;s `initialize` function can examine the configuration settings of other hooks.

### `initialize(cb)`

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

By default, hooks have ten seconds to complete their `initialize` function and call `cb` before Sails throws an error.  That timeout can be configured by setting the `_hookTimeout` key to the number of milliseconds that Sails should wait.  This can be done in the hook&rsquo;s `defaults`:

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

## Read more
* [Hooks overview](#/documentation/concepts/extending-sails/Hooks)
* [Using hooks in your app](#/documentation/concepts/extending-sails/Hooks/usinghooks.html)
* [Creating a user hook](#/documentation/concepts/extending-sails/Hooks/userhooks.html)
* [Creating an installable hook](#/documentation/concepts/extending-sails/Hooks/installablehooks.html)

