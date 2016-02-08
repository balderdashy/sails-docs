# Configuration

### Overview

While Sails dutifully adheres to the philosophy of [convention-over-configuration](http://en.wikipedia.org/wiki/Convention_over_configuration), it is important to understand how to customize those handy defaults from time to time.  For almost every convention in Sails, there is an accompanying set of configuration options that allow you to adjust or override things to fit your needs.  This section of the docs includes a complete reference of the configuration options available in Sails.

Sails apps can be [configured programmatically](https://github.com/mikermcneil/sails-generate-new-but-like-express/blob/master/templates/app.js#L15), by specifying [environment variables](http://en.wikipedia.org/wiki/Environment_variable) or command-line arguments, by changing the local or global [`.sailsrc` files](http://sailsjs.org/documentation/anatomy/myApp/sailsrc.html), or (most commonly) using the boilerplate configuration files conventionally located in the [`config/`](http://sailsjs.org/documentation/anatomy/myApp/config) folder of new projects. The authoritative, merged-together configuration used in your app is available at runtime on the `sails` global as `sails.config`.


### Standard configuration files (`config/*`)

A number of configuration files are included in new Sails apps by default.  These boilerplate files include a number of inline comments, which are designed to provide a quick, on-the-fly reference without having to jump back and forth between the docs and your text editor.

In most cases, the top-level keys on the `sails.config` object (e.g. `sails.config.views`) correspond to a particular configuration file (e.g. `config/views.js`) in your app; however configuration settings may be arranged however you like across the files in your `config/` directory.  The important part is the name (i.e. key) of the setting- not the file it came from.

For instance, let's say you add a new file, `config/foo.js`:

```js
// config/foo.js
// The object below will be merged into `sails.config.blueprints`:
module.exports.blueprints = {
  shortcuts: false
};
```

For an exhaustive reference of individual configuration options, and the file they live in by default, check out the reference pages in this section, or take a look at ["`config/`"](http://sailsjs.org/documentation/anatomy/myApp/config) in [The Anatomy of a Sails App](http://sailsjs.org/documentation/anatomy) for a higher-level overview.

### Environment-specific files (`config/env/*`)

Settings specified in the standard configuration files will generally be available in all environments (i.e. development, production, test, etc.).  If you'd like to have some settings take effect only in certain environments, you can use the special environment-specific files and folders:

* Any files saved under the `/config/env/<environment-name>` folder will be loaded *only* when Sails is lifted in the `<environment-name>` environment.  For example, files saved under `config/env/production` will only be loaded when Sails is lifted in production mode.
* Any files saved as `config/env/<environment-name>.js` will be loaded *only* when Sails is lifted in the `<environment-name>` environment, and will be merged on top of any settings loaded from the environment-specific subfolder.  For example, settings in `config/env/production.js` will take precedence over those in the files in the  `config/env/production` folder.  

By default, your app runs in the "development" environment.  The recommended approach for changing your app's environment is by using the `NODE_ENV` environment variable:
```
NODE_ENV=production node app.js
```

> The `production` environment is special-- depending on your configuration, it enables compression, caching, minification, etc. 
>
> Also note that if you are using `config/local.js`, the configuration exported in that file takes precedence over environment-specific configuration files.


### The `config/local.js` file

You may use the `config/local.js` file to configure a Sails app for your local environment (your laptop, for example).  The settings in this file take precedence over all other config files except [.sailsrc](http://sailsjs.org/documentation/concepts/Configuration/usingsailsrcfiles.html).  Since they're intended only for local use, they should not be put under version control (and are included in the default `.gitignore` file for that reason).  Use `local.js` to store local database settings, change the port used when lifting an app on your computer, etc.

See [http://sailsjs.org/documentation/concepts/Configuration/localjsfile.html](http://sailsjs.org/documentation/concepts/Configuration/localjsfile.html) for more information.


### Accessing `sails.config` in your app

The `config` object is available on the Sails app instance (`sails`).  By default, this is exposed on the [global scope](http://sailsjs.org/documentation/concepts/Globals) during lift, and therefore available from anywhere in your app.

##### Example
```javascript
// This example checks that, if we are in production mode, csrf is enabled.
// It throws an error and crashes the app otherwise.
if (sails.config.environment === 'production' && !sails.config.csrf) {
  throw new Error('STOP IMMEDIATELY ! CSRF should always be enabled in a production deployment!');
}
```

### Setting `sails.config` values directly using environment variables

In addition to using configuration _files_, you can set individual configuration values on the command line when you lift Sails by prefixing the config key names with `sails_`, and separating nested key names with double-underscores (`__`).  For example, you could do the following to set the [CORS origin](http://sailsjs.org/documentation/concepts/security/cors) (`sails.config.cors.origin`) to "http://somedomain.com" on the command line:

```javascript
sails_cors__origin="http://somedomain.com" sails lift
```

This value will be in effect _only_ for the lifetime of this particular Sails instance, and will override any values in the configuration files.


> There are a couple of special exceptions to the rule: `NODE_ENV` and `PORT`.
> + `NODE_ENV` is a convention for any Node.js app.  When set to `'production'`, it sets [`sails.config.environment`](http://sailsjs.org/documentation/reference/configuration/sails-config#?sailsconfigenvironment). 
> + Similarly, `PORT` is just another way to set [`sails.config.port`](http://sailsjs.org/documentation/reference/configuration/sails-config#?sailsconfigport).  This is strictly for convenience and backwards compatibility.
>
> Here's a relatively common example where you might use both of these environment variables at the same time:
>
> ```bash
> PORT=443 NODE_ENV=production sails lift
> ```


### Custom Configuration
Sails recognizes many different settings, namespaced under different top level keys (e.g. `sails.config.sockets` and `sails.config.blueprints`).  However you can also use `sails.config` for your own custom configuration (e.g. `sails.config.someProprietaryAPI.secret`).

##### Example

```javascript
// config/linkedin.js
module.exports.linkedin = {
  apiKey: '...',
  apiSecret: '...'
};
```

```javascript
// In your controller/service/model/hook/whatever:
// ...
var apiKey = sails.config.linkedin.apiKey;
var apiSecret = sails.config.linkedin.apiSecret;
// ...
```




### Configuring the `sails` Command-Line Interface

When it comes to configuration, most of the time you'll be focused on managing the runtime settings for a particular app: the port, database connections, and so forth.  However it can also be useful to customize the Sails CLI itself; to simplify your workflow, reduce repetitive tasks, perform custom build automation, etc.  Thankfully, Sails v0.10 added a powerful new tool to do just that.

The [`.sailsrc` file](http://sailsjs.org/documentation/anatomy/myApp/sailsrc.html) is unique from other configuration sources in Sails in that it may also be used to configure the Sails CLI-- either system-wide, for a group of directories, or only when you are `cd`'ed into a particular folder.  The main reason to do this is to customize the [generators](http://sailsjs.org/documentation/concepts/extending-sails/Generators) that are used when `sails generate` and `sails new` are run, but it can also be useful to install your own custom generators or apply hard-coded config overrides.

And since Sails will look for the "nearest" `.sailsrc` in the ancestor directories of the current working directory, you can safely use this file to configure sensitive settings you can't check in to your cloud-hosted code repository (_like your **database password**_.)  Just include a `.sailsrc` file in your "$HOME" directory.  See [the docs on `.sailsrc`](http://sailsjs.org/documentation/anatomy/myApp/sailsrc.html) files for more information.




### Notes
> The built-in meaning of the settings in `sails.config` are, in some cases, only interpreted by Sails during the "lift" process.  In other words, changing some options at runtime will have no effect.  To change the port your app is running on, for instance, you can't just change `sails.config.port`-- you'll need to change or override the setting in a configuration file or as a command-line argument, etc., then restart the server.



<docmeta name="displayName" value="Configuration">
