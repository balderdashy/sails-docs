# The `io.sails` object

### Overview

The `io.sails` object exposes global configuration options for the `sails.io.js` library.  Most of the options are used as settings when connecting a client socket to the server.  `io.sails` also provides a `.connect()` method used for creating new socket connections.

### The `.connect()` method

If [`io.sails.autoconnect`]() is `false`, or if you need to create more than one socket connection with the `sails.io.js` library, you do so via `io.sails.connect([url], [options])`.  Both arguments are optional, and the value of the `io.sails` properties (like `url`, `transports`, etc.) are used as defaults.  See the [SailsSocket proprties reference]() for options.

### `autoconnect`

When the `io.sails.autoconnect` is set to `true` (the default), the library will wait one cycle of the event loop after loading and then attempt to create a new [`SailsSocket`]() and connect it to the URL specified by `io.sails.url`.  When used in the browser, the new socket will be exposed as `io.socket`.  When used in a Node.js script, the new socket will be attached as the `socket` property of the variable used to initialize the `sails.io.js` library.

### `environment`

Use `io.sails.environment` to set an environment for `sails.io.js`, which affects how much information is logged to the console.  Valid values are `development` (full logs) and `production` (minimal logs).

### Other properties and defaults

The other properties of `io.sails` are used as defaults when creating new sockets (either via autoconnect or `io.sails.connect()).  See the [SailsSocket proprties reference]() for a full list, as well as a table of the default `io.sails` values.

