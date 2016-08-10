# Plugins

### What are plugins?
Sometimes, when building a web app, you might find yourself wanting either to divide your code into several useful units or separate some logic you could reuse in another app. This is what Sails' plugin system allows you to do.

Let's say, for instance, that you built some Sails models, controllers and policies that enable you to use passport sessions to log your users. This is only logical that you would like to want to use this part again in another applications. And why not build a Sails plugin to do so and publish it so the community could use it too?

Plugins are therefore mere npm packages loaded by your application and embarking some logic such as models, controllers etc. This is the simplest way to integrate some modularity to your applications.

### What can a plugin load?
For the time being, a plugin can load the following things:

* Adapters
* Blueprints
* Controllers
* Hooks
* Models
* Policies
* Responses
* Services

A plugin should, in a near future, be able to load client assets, views and some routes.

### Plug a npm package into your Sails app
A Sails plugin is a npm package that has to be registered in the Sails config to be loaded by your application.

#### .sailsrc
The simplest way to register plugins for your app is to declare them into the `.sailsrc` file this way.

```json
{
  "generators": {
    "modules": {}
  },
  "plugins": [
    "sails-plugin-first",
    "sails-plugin-second"
  ]
}
```
#### Sails configuration
You can also register your plugins by adding them directly into Sails config before the `moduleloader` hooks starts to perform its job.

```js
sails.config.plugins = [
	'sails-plugin-first',
	'sails-plugin-second'
];
```

It simply takes an array of npm packages' names.

### Anatomy of a plugin
By convention, a plugin must have the following architecture. The files you'll put in the different folders follow the same naming rules as for the `api` folder of any Sails application.

```
node_modules/
--sails-plugin-first/
----adapters/
----blueprints/
----controllers/
----hooks/
----models/
----policies/
----responses/
----services/
```

Obviously, do not include a `services` folder, for instance, if you don't want your plugin to embark services.

### Loading order
By default, the plugins' files will be overriden by any api file having the same name.

### Naming convention
By convention, a Sails plugin should be named thusly:

`sails-plugin-<name-of-your-plugin>`
