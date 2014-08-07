# Configuration (`sails.config`)

The `sails.config` object contains the runtime values of your app's configuration. It is assembled automatically when Sails loads your app; merging together command-line arguments, environment variables, your `.sailsrc` file, and the configuration objects exported from any and all modules in your app's [`config/`](/#/documentation/anatomy/myApp/config) directory.

More specifically, when you load your app, whether that's using `node app`, [programmatic usage inside of a script](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md), or [`sails lift`](/#/documentation/reference/cli/sailslift.html), Sails will look in a [few different places](https://github.com/dominictarr/rc#standards) for configuration.  Here they are listed in order of descending priority:

+ an optional object of configuration overrides passed-in programmatically
+ a local `.sailsrc` file in your app's directory, or the first found looking in `../`, `../../` etc.
+ a global `.sailsrc` file in your home folder (e.g. `~/.sailsrc`)
+ command-line arguments (parsed by minimist)
+ environment variables (prefixed with `SAILS_`, e.g. `SAILS_PORT=1492`)
+ files in your app's `config/` directory (if one exists)

<docmeta name="uniqueID" value="sailsconfig238825">
<docmeta name="displayName" value="Configuration">
<docmeta name="stabilityIndex" value="3">
