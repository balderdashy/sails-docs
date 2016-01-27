# Application (`sails`)

The `sails` application object contains all relevant runtime state for a Sails application.
By default it is exposed globally, but this behavior [can be disabled](), e.g. for
use cases where multiple Sails app instances need to exist at once, or where globals
are not an option. The application object can also always be accessed on an incoming
request (`req._sails`), and inside of [model]() and [service]() modules via `this.sails`.

### How does it work?

An application instance is automatically created the first time you `require('sails')`.
This is what is happening in the generated `app.js` file:

```javascript
var sails = require('sails');
```

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

By default, a hook's identity is the lowercased version of its folder name, with any `sails-hook-` prefix removed.  For example, the default identity for a hook loaded from `node_modules/sails-hook-email` would be `email`, and the hook hook would be accessible via `sails.hooks.email`.  An installed hook's identity can be changed via the [`installedHooks` config property](http://sailsjs.org/documentation/concepts/extending-sails/hooks/using-hooks#?changing-the-way-sails-loads-an-installable-hook).

See the [hooks concept documentation]() for more info about hooks.

### Events

Sails instances inherit Node's [`EventEmitter` interface](), and emits several useful events that you can listen for in app code.

| Event name | Emitted when... |
| `ready`    | The app had been loaded and the bootstrap has run, but it is not yet listening for requests |
| `lifted`   | The app has been lifted and is listening for requests. |
| `lowered`  | The app has been lowered and is no longer listening for requests. |
| `hook:<hook identity>:loaded` | The hook with the specified identity loaded and ran its `initialize()` method successfully.  |

To listen for one of these events, use `sails.on(eventName, eventHandler)`.

You can also _emit_ events from the Sails instance.  While not recommended for use in app-level code, `sails.emit()` is particularly useful in testing scenarios, to [make virtual requests]() to a loaded (but not [lifted]()) Sails app.


### Creating a new application object (advanced)

If you are implementing something unconventional (e.g. writing tests for Sails core)
where you need to create more than one Sails application instance in a process, you _should not_ use
the instance returned by `require('sails')`, as this can cause unexpected behavior.  Instead, you should
obtain application instances by using the Sails constructor:

```
var Sails = require('sails').constructor;
var sails0 = new Sails();
var sails1 = new Sails();
var sails2 = new Sails();
```

Each app instance (`sails0`, `sails1`, `sails2`) can be loaded/lifted separately,
using different configuration.

For more on using Sails programatically, see the conceptual overview on [programatic usage in Sails]().


<docmeta name="displayName" value="Application">
