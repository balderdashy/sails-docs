# Application (`sails`)

The `sails` application object contains all relevant runtime state for a Sails application.
By default it is exposed globally, but this behavior [can be disabled](), e.g. for
use cases where multiple Sails app instances need to exist at once, or where globals
are not an option. The application object can also always be accessed on an incoming
request (`req._sails`), and inside of [model]() and [service]() modules via `this.sails`.



### Properties

The application object has a number of methods and properties which are useful.
The officially supported methods on the `sails` object are covered by the other
pages in this section.  Here are a few of its most useful properties:

##### sails.models

A dictionary of all loaded [Sails models](), indexed by their _identity_.

By default, a model's identity is the lowercased version of its filename, without the **.js** extension.  For example, the default identity for a model loaded from `api/models/PowerPuff.js` would be `powerpuff`, and the model would be accessible via `sails.models.powerpuff`.  A model's identity can be customized by setting an `identity` property in its module file.

##### sails.config

The full set of configuration options for the Sails instance, loaded from a combination of environment variables, `.sailsrc` files, user-configuration files and defaults.  See the [configuration concepts section]() for a full overview of configuring Sails, and the [configuration reference]() for details on individual options.

##### sails.sockets

A set of convenience methods for low-level interaction with connected websockets.  See the [`sails.sockets.*` reference section]() for details.

##### sails.hooks

A dictionary of all loaded [Sails hooks](), indexed by their _identity_.  Use `sails.hooks` to access properties and methods of hooks you've installed to extend Sails; for example, by calling `sails.hooks.email.send()`.  You can also use this dictionary to access the Sails [core hooks](), for advanced usage.

By default, a hook's identity is the lowercased version of its folder name, with any `sails-hook-` prefix removed.  For example, the default identity for a hook loaded from `node_modules/sails-hook-email` would be `email`, and the hook hook would be accessible via `sails.hooks.email`.  An installed hook's identity can be changed via the [`installedHooks` config property](http://sailsjs-website.herokuapp.com/documentation/concepts/extending-sails/hooks/using-hooks#?changing-the-way-sails-loads-an-installable-hook).

See the [hooks concept documentation]() for more info about hooks.


<docmeta name="displayName" value="Application">
