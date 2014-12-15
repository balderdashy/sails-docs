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

* [.defaults](/#/documentation/concepts/extending-sails/Hooks/hookspec/defaults.html)
* [.configure()](/#/documentation/concepts/extending-sails/Hooks/hookspec/configure.html)
* [.initialize()](/#/documentation/concepts/extending-sails/Hooks/hookspec/initialize.html)
* [.routes](/#/documentation/concepts/extending-sails/Hooks/hookspec/routes.html)

## Custom hook data and functions

Any other keys added to the object returned from the main hook function will be provided in the `sails.hooks[<hook name>]` object.  This is how custom hook functionality is provided to end-users.  Any data and functions that you wish to remain private to the hook can be added *outside* the returned object:

```
// File api/hooks/myhook/index.js
module.exports = function myHook(sails) {

   // This var will be private
   var foo = 'bar';
   
   // This var will be public
   this.abc = 123;
   
   return {
   
      // This function will be public
      sayHi: function (name) {
         console.log(greet(name));
      }
   
   };
   
   // This function will be private
   function greet (name) {
      return "Hi, " + name + "!";
   }
   
};
```

The public var and function above would be available as `sails.config.myhook.abc` and `sails.config.myhook.sayHi`, respectively.

<docmeta name="uniqueID" value="Hooks75002">
<docmeta name="displayName" value="Hook Specification">
<docmeta name="stabilityIndex" value="3">
