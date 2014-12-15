# Creating a User Hook

User hooks are custom Sails hooks that reside in an application&rsquo;s `api/hooks` folder.  They are typically useful when you want to take advantage of hook features like [configuration](/#/documentation/concepts/extending-sails/Hooks/hookspec/configuration.html) and [routes](/#/documentation/concepts/extending-sails/Hooks/hookspec/routes.html) for code that is used by multiple components in a single app.  If you wish to re-use a hook in *more than one* Sails app, see [creating an installable hook](/#/documentation/concepts/extending-sails/Hooks/hookspec/installablehooks.html) instead.

To create a new user hook:

1. Choose a name for your new hook.  It must not conflict with any of the [core hook names](https://github.com/balderdashy/sails/blob/master/lib/app/configuration/defaultHooks.js).
2. Create a folder with that name in your app&rsquo;s `api/hooks` folder.
3. Add an `index.js` file to that folder.
4. Write your hook code in `index.js` in accordance with the [hook specification](/#/documentation/concepts/extending-sails/Hooks/hookspec)

Your new folder can contain other files as well, which can be loaded in your hook via `require`; only `index.js` will be read automatically by Sails.

#### Testing that your hook loads properly

To test that your hook is being loaded by Sails, lift your app with `sails lift --verbose`.  If your hook is loaded, you will see a message like:

`verbose: your-hook-name hook loaded successfully.`

in the logs.

* [Hooks overview](#/documentation/concepts/extending-sails/Hooks)
* [Using hooks in your app](#/documentation/concepts/extending-sails/Hooks/usinghooks.html)
* [The hook specification](#/documentation/concepts/extending-sails/Hooks/hookspec)
* [Creating an installable hook](#/documentation/concepts/extending-sails/Hooks/installablehooks.html)

<docmeta name="uniqueID" value="Hooks75000">
<docmeta name="displayName" value="User Hooks">
<docmeta name="stabilityIndex" value="3">
