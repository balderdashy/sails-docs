# The Sails app lifecycle

The Sails core has been iterated upon several times to make it easier to maintain and extend. As a result, it has a very particular loading order, which its hooks depend on heavily. This process is summarized below.

### (1) Load Configuration "Overrides"

Gather the set of configuration values passed in on the command line, in environment variables, and in programmatic configuration (i.e. options passed to [`sails.load`](http://sailsjs.org/documentation/reference/application/sails-load) or [`sails.lift`](http://sailsjs.org/documentation/reference/application/sails-lift).).  When an app is started via the command-line interface (i.e. by typing `sails lift` or `sails console`), the values of any `.sailsrc` files will also be merged into the config overrides.  These override values will take precedence over any user configuration encountered in the next step.

### (2) Load User Configuration

Unless the `userconfiguration` hook is explicitly disabled, Sails will next load the configuration files in the `config` folder (and subfolders) underneath the current working directory.  See the [configuration concept section](http://sailsjs.org/documentation/concepts/configuration) for more details about user configuration.  Configuration from step 1 will be merged on top of these values to form the `sails.config` object.

### (3) Load Hooks

Next, Sails will load the other hooks.  [Core hooks](http://sailsjs.org/documentation/concepts/extending-sails/hooks#?types-of-hooks) will load first, followed by user hooks and installable hooks.  Note that hooks typically include configuration of their own which will be used as _default values_ in `sails.config`.  For example, if no `port` setting is configured by this point, the `http` hook's default value of 1337 will be used.

### (4) Assemble Router

Sails prepares the core Router, then emit multiple events on the `sails` object informing hooks that they can safely bind routes.

### (5) Expose global variables
After all hooks have initialized, Sails exposes global variables (by default: `sails` object, models, services, `_`, and `async`)

### (6) Initialize App Runtime

> This step does not run when `sails.load()` is used programmatically.
> To also run the initialization step, use `sails.lift()` instead.

+ Run the bootstrap function (`sails.config.bootstrap`)
+ Start attached servers (by default: Express and Socket.io)

### FAQ


+ What is the difference between `sails.lift()` and `sails.load()`?
  + `lift()` === `load()` + `initialize()`.  It does everything `load()` does, plus it starts any attached servers (e.g. HTTP) and logs a picture of a boat.


<docmeta name="displayName" value="Lifecycle">
