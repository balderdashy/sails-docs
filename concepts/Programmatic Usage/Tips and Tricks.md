# Tips and Tricks for Programmatic Usage

When loading a Sails app programmatically, you will usually want to turn off certain hooks that are not being actively used, both for reasons of optimization and to ensure minimal interference between the Sails app and the Node script enclosing it.  To turn off a hook, set it to `false` in a `hooks` dictionary that you send as part of the first argument to `.load()` or `.lift()`.

Additionally, you will often want to turn off Sails [globals](http://sailsjs.org/documentation/concepts/globals), _especially when loading more than one Sails app simultaneously_.  Since all Node apps in the same process share the same globals, starting more than one Sails app with globals turned on is a surefire way to end up with collisions between models, controllers and other app-wide entities.


```javascript
// Turn off globala and commonly unused hooks in programmatic apps
mySailsApp.load({
  hooks: {
     grunt: false,
     sockets: false,
     pubsub: false
  },
  globals: false
})
```

Finally, note that while you can use the Sails constructor to create and start as many Sails apps programmtically as you like, each app can only be started once.  Once you call `.lower()` on an app, it cannot be started again.

<docmeta name="displayName" value="Tips and Tricks">