# Configuration

### Overview

While Sails dutifully adheres to the philosophy of [convention-over-configuration](), it is important to understand how to customize those handy defaults from time to time.  For almost every convention in Sails, there is an accompanying set of configuration options that allow you to adjust or override things to fit your needs.  This section of the docs includes a complete reference of the configuration options available in Sails.



### .sailsrc

In addition to the other methods of configuring your app, as of version 0.10, you can now specify configuration for one or more apps in `.sailsrc` file(s) (thanks to Dominic Tarr's excellent [`rc` module](https://github.com/dominictarr/rc)).  `rc` files are most useful for configuring the command-line and/or applying configuration settings to ALL of the Sails apps you run on your computer.  

When the Sails CLI runs a command, it first looks for  `.sailsrc` files (in either JSON or [.ini]() format) in the current directory and in your home folder (i.e. `~/.sailsrc`) (every newly generated Sails app comes with a boilerplate `.sailsrc` file).  Then it merges them in to its existing configuration.

> Actually, Sails looks for `.sailsrc` files in a few other places (following [rc conventions](https://github.com/dominictarr/rc#standards)).  You can put a `.sailsrc` file at any of those paths.  That said, stick to convention when you can- the best place to put a global `.sailsrc` file is in your home directory (i.e. `~/.sailsrc`).



### Configuration files (`config/*`)

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

For an exhaustive reference of individual configuration options, and the file they live in by default, check out the reference pages in this section, or take a look at ["`config/`"](./#!documentation/anatomy/config) in [The Anatomy of a Sails App](./#!documentation/anatomy) for a higher-level overview.




### Accessing `sails.config` in your app

The `config` object is available on the Sails app instance (`sails`).  By default, this is exposed on the [global scope](./#!documentation/reference/Globals.md) during lift, and therefore available from anywhere in your app.

##### Example
```javascript
// This example checks that, if we are in production mode, csrf is enabled.
// It throws an error and crashes the app otherwise.
if (sails.config.environment === 'production' && !sails.config.csrf) {
  throw new Error('STOP IMMEDIATELY ! CSRF should always be enabled in a production deployment!');
}
```



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



### Notes
> The built-in meaning of the settings in `sails.config` are, in some cases, only interpreted by Sails during the "lift" process.  In other words, changing some options at runtime will have no effect.  To change the port your app is running on, for instance, you can't just change `sails.config.port`-- you'll need to change or override the setting in a configuration file or as a command-line argument, etc., then restart the server.



<docmeta name="uniqueID" value="Configuration615655">
<docmeta name="displayName" value="Configuration">

