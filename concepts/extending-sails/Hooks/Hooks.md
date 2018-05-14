# Hooks

### What is a hook?

A hook is a Node module that adds functionality to the Sails core.  The [hook specification](https://sailsjs.com/documentation/concepts/extending-sails/hooks/hook-specification) defines the requirements a module must meet for Sails to be able to import its code and make the new functionality available.  Because they can be saved separately from the core, hooks allow Sails code to be shared between apps and developers without having to modify the framework.

### Types of hooks

There are three types of hooks available in Sails:

1. **Core hooks**.  These built-in hooks provide many of the common features essential to a Sails app, such as request handling, blueprint route creation, and database integration via [Waterline](https://sailsjs.com/documentation/concepts/models-and-orm).  Core hooks are bundled with the Sails core and are thus available to every app.  You will rarely have a need to call core hook methods in your code.
2. **App-level hooks**.  These are hooks that live in the `api/hooks/` folder of a Sails app.  Project hooks provide a way to take advantage of the features of the hook system for code that doesn&rsquo;t need to be shared between apps.
3. **Installable hooks**.  These hooks are plugins, installed into an app&rsquo;s `node_modules` folder using `npm install`.  Installable hooks allow developers in the Sails community to create &ldquo;plug-in&rdquo;-like modules for use in Sails apps.

### Read more

* [Using hooks in your app](https://sailsjs.com/documentation/concepts/extending-sails/Hooks/using-hooks)
* [The hook specification](https://sailsjs.com/documentation/concepts/extending-sails/hooks/hook-specification)
* [Creating a project hook](https://sailsjs.com/documentation/concepts/extending-sails/hooks/project-hooks)
* [Creating an installable hook](https://sailsjs.com/documentation/concepts/extending-sails/Hooks/installable-hooks)



<docmeta name="displayName" value="Hooks">
<docmeta name="stabilityIndex" value="3">
