# Disabling Globals

Sails determines which globals to expose by looking at [`sails.config.globals`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.globals.html), which is conventionallly configured in [`config/globals.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/globals.js.html).

To disable all global variables, just set the setting to `false`:

```js
// config/globals.js
module.exports.globals = false;
```

To disable _some_ global variables, specify an object instead, e.g.:

```js
// config/globals.js
module.exports.globals = {
  _: false,
  async: false,
  models: false,
  services: false
};
```

### Notes

> + Bear in mind that none of the globals, including `sails`, are accessible until _after_ sails has loaded.  In other words, you won't be able to use `sails.models.user` or `User` outside of a function (since `sails` will not have finished loading yet.)

<!-- not true anymore:
Most of this section of the docs focuses on the methods and properties of `sails`, the singleton object representing your app.  
-->

<docmeta name="displayName" value="Disabling Globals">
