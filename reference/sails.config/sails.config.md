# Configuration (`sails.config`)

The `sails.config` object contains the runtime values of your app's configuration. It is assembled automatically when Sails loads your app; merging together command-line arguments, environment variables, your `.sailsrc` file, and the configuration objects exported from any and all modules in your app's [`config/`](http://sailsjs.org/documentation/anatomy/myApp/config) directory.

More specifically, when you load your app, whether that's using `node app`, [programmatic usage inside of a script](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md), or [`sails lift`](http://sailsjs.org/documentation/reference/cli/sailslift.html), Sails will look in a [few different places](https://github.com/dominictarr/rc#standards) for configuration.  Here they are listed in order of descending priority:

+ an optional object of configuration overrides passed-in programmatically
+ a local `.sailsrc` file in your app's directory, or the first found looking in `../`, `../../` etc.
+ a global `.sailsrc` file in your home folder (e.g. `~/.sailsrc`)
+ command-line arguments (parsed by minimist)
+ environment variables (prefixed with `sails_`, using double underlines to indicate dots: e.g. `sails_port=1492`, `sails_models__connection=somePostgresqlServer`, and/or `sails_connections__somePostgresqlServer__password=l0lguyz`)
+ files in your app's `config/` directory (if one exists), with `config/local.js` taking priority.  Remember that, other than `local.js` (which takes priority), the file names are just for convention: the configuration you export from each file gets deep-merged together with everything else into one big dictionary (`sails.config`).

> #### The recommended solution for production
> Environment variables are one of the most powerful ways to configure your Sails app.  Since you can customize just about any setting (as long as it's JSON-serializable), this approach solves a number of problems, and is our core team's recommended strategy for production deployments.  Here are a few:
> + Using environment variables means you don't have to worry about checking in your production database credentials, API tokens, etc.
> + This makes changing Postgresql hosts, Mailgun accounts, S3 credentials, and other maintenance straightforward, fast, and easy; plus you don't need to change any code or worry about merging in downstream commits from other people on your team
> + Depending on your hosting situation, you may be able to manage your production configuration through a UI (most PaaS providers like [Heroku](http://heroku.com) or [Modulus](https://modulus.io) support this, as does [Azure Cloud](https://azure.microsoft.com/en-us/).)




<docmeta name="displayName" value="Configuration">
<docmeta name="stabilityIndex" value="3">
