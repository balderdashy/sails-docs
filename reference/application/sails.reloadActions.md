# sails.reloadActions()

Flush and reload all Sails [actions](http://sailsjs.com/documentation/concepts/actions-and-controllers)

```javascript
sails.reloadActions(cb);
```

_Or:_

+ `sails.reloadActions(options, cb)`

This method causes hooks to run their `registerActions()` methods if they have them.  After the hooks are finished reloading / re-registering their actions, actions in the `api/controllers` folder (including those stored in [controller files](http://next.sailsjs.com/documentation/concepts/actions-and-controllers#?controllers)) are reloaded and merged on top of those loaded via hooks.

This method is useful primarily in development scenarios.


### Usage

| &nbsp;  |       Argument             | Type                | Details
|---|--------------------------- | ------------------- |:-----------
| 1 |      _options_      | ((dictionary?))          | Currently accepts one key, `hooksToSkip`, which if given should be an array of names of hooks that should _not_ call their `reloadActions` method.
argument will override the `data` property of the `request` argument, if provided.
| 2 |      _callback_              | ((function)) | A callback to be called with the virtual response.


<docmeta name="displayName" value="sails.reloadActions()">
<docmeta name="pageType" value="method">

