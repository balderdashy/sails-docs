# Hooks

## Status

> ##### Stability: [3](http://nodejs.org/api/documentation.html#documentation_stability_index) - Stable

## What is a hook?

A hook is a Node module that adds functionality to the Sails core.  The [hook specification](http://sailsjs.org/documentation/concepts/extending-sails/hooks/hook-specification) defines the requirements a module must meet for Sails to be able to import its code and make the new functionality available.  Because they can be saved separately from the core, hooks allow Sails code to be shared between apps and developers without having to modify the framework.

## Hooks vs. Services

Hooks share some common features with Sails [services](http://sailsjs.org/documentation/concepts/Services).  They both allow developers to store commonly used code in one location, and they both make new methods available globally to a Sails app.  However, there are some key differences between the two concepts:

* Services cannot be saved independently of an app.  While some types of hooks may be tied to a single app (see [Project Hooks](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/projecthooks.html)), other types can be developed independently of a Sails app and installed using `npm install`.
* Hooks have their own initialization system.  This allows them to be more dynamic and configure themselves when Sails lifts.
* Hooks can add new [routes](http://sailsjs.org/documentation/concepts/Routes) to a Sails app before it lifts.

Services are still a good choice for code that is shared between multiple [controllers](http://sailsjs.org/documentation/concepts/Controllers) or [models](http://sailsjs.org/documentation/concepts/models-and-orm/models) in an app, but
* is unlikely to be reused in another app
* won't need to behave differently in different environments (e.g. development vs. production)

For all other reusable code, hooks are the way to go!

## Types of hooks

There are three types of hooks available in Sails:

1. **Core hooks**.  These hooks provide many of the common features essential to a Sails app, such as request handling, blueprint route creation, and database integration via [Waterline](http://sailsjs.org/documentation/concepts/models-and-orm).  Core hooks are bundled with the Sails core and are thus available to every app.  You will rarely have a need to call core hook methods in your code.
2. **Project hooks**.  These are hooks that live in the `api/hooks` folder of a Sails app.  Project hooks provide a way to take advantage of the features of the hook system for code that doesn&rsquo;t need to be shared between apps.
3. **Installable hooks**.  These hooks are installed into an app&rsquo;s `node_modules` folder using `npm install`.  Installable hooks allow developers in the Sails community to create and  &ldquo;plug-in&rdquo;-like modules for use in Sails apps.

## Read more

* [Using hooks in your app](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/usinghooks.html)
* [The hook specification](http://sailsjs.org/documentation/concepts/extending-sails/hooks/hook-specification)
* [Creating a project hook](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/projecthooks.html)
* [Creating an installable hook](http://sailsjs.org/documentation/concepts/extending-sails/Hooks/installablehooks.html)


<docmeta name="uniqueID" value="Hooks74998">
<docmeta name="displayName" value="Hooks">
<docmeta name="stabilityIndex" value="3">
