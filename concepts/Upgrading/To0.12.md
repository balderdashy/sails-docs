# Upgrading to Sails v0.12

> Note: If you are reading this, note that it is a _very early_ draft of the migration guide which is currently under construction.

Sails v0.12 comes with an upgrade to Socket.io v1.4.5, Express 3.21.2, as well as many bug fixes and performance enhancements. v0.12 is mostly backwards compatible with Sails v0.11, however there are some major changes to `sails.sockets.*` methods. Most of the migration guide below deals with those changes, so if you are upgrading an existing app from v0.11 and are using `sails.sockets` methods, please be sure and carefully read the information below in case it affects your app.  Other than that, running `sails lift` in an existing project should just work.

The sections below provide a high level overview of what's changed, major bug fixes, enhancements and new features, as well as a basic tutorial on how to upgrade your v0.11.x Sails app to v0.12.



## Socket Methods

Without question, the biggest change in Sails v0.12 is to the API of the low-level `sails.sockets` methods exposed by the `sockets` hook.

> TODO finish intro

```
 + Sockets hook
   + Clean up the API for `sails.socket.*` methods, normalizing overloaded functions and deprecating methods which cause problems in a multi-node setting.
   + Generally improve multi-node support (and therefore scalability) of low-level `sails.socket.*` methods, and make additional adjustments and improvements related to latest sio upgrade.  Add additional custom logic for when socket.io-redis is being used, using a redis client to implement the admin bus, instead of an additional socket client.
   + Add a few brand new sails.sockets methods: `.leaveAllRooms()`, `.union()`, and `.difference()`
   + `id()` -> `parseSocketId()` (backwards compatible w/ deprecation message)
 + Generators
   + Upgrade sails.io.js dependency in new generators (includes sio upgrades and the ability to specify common headers for socket requests from `sails.io.js`)
   + Deal with copying vs. symlinking dependencies in new projects for NPM 3
   + Upgrade to latest trusted versions of `grunt-contrib-*` dependencies (eliminates many NPM deprecation warnings and provides better error messages from NPM)
 + Waterline improvements (see https://github.com/balderdashy/waterline)
 + Skipper improvements (see https://github.com/balderdashy/skipper)
 + Captains Log improvements (see https://github.com/balderdashy/captains-log)
 + See also https://github.com/balderdashy/sails/blob/master/CHANGELOG.md#master
```

> TODO: expand


## SQL Adapter Performance

> TODO: add summary of improvements to sails-mysql and sails-postgresql



## Contributing

While not technically part of the release, Sails v0.12 is accompanied with some major cleanup of the official reference documentation. The entire Sails website is now available in [Japanese](http://sailsjs.jp/), and four other [translation projects](https://github.com/balderdashy/sails-docs#in-other-languages) are underway for Korean, Brazillian Portugese, Taiwanese Mandarin, and Spanish.

There were also some major improvements to the tools and resources available to contributors.  More core hooks are now fully documented ([controllers](https://github.com/balderdashy/sails/tree/master/lib/hooks/controllers)|[grunt](https://github.com/balderdashy/sails/tree/master/lib/hooks/grunt)|[logger](https://github.com/balderdashy/sails/tree/master/lib/hooks/logger)|[cors](https://github.com/balderdashy/sails/tree/master/lib/hooks/cors)|[responses](https://github.com/balderdashy/sails/tree/master/lib/hooks/responses)|[orm](https://github.com/balderdashy/sails/tree/master/lib/hooks/orm)), and the team has put together a [Code of Conduct](https://github.com/balderdashy/sails/blob/master/CODE-OF-CONDUCT.md) for contributing to the Sails project.  The biggest change for contributors is the [updated contribution guide](https://github.com/balderdashy/sails/blob/master/CONTRIBUTING.md), which contains the new, streamlined process for feature/enhancement proposals and for merging features, enhancements, and patches into core.  As the Sails framework has grown (both the code base and the user base), it's become necessary to establish clearer processes for how issue contributions, code contributions, and contributions to the documentation are reviewed and merged.


```text
 + New guide for contributing to Sails docs, as well as a few tweaks to the process for starting or contributing to translation projects (see http://blog.sailsjs.org/post/137189916152/updates-to-how-we-contribute-to-the-sails-docs)
 + [Improved docs](https://github.com/balderdashy/sails-docs/pull/615) for log configuration (thanks @kevinob11 and @felixmc)
 + Contributor documentation for more of Sails' core hooks
   + [Grunt hook](https://github.com/balderdashy/sails/tree/master/lib/hooks/grunt)
   + [Responses hook](https://github.com/balderdashy/sails/tree/master/lib/hooks/responses)
   + ORM hook _(esp. example documentation for implementing a custom override)_
 + Added [Code of Conduct](https://github.com/balderdashy/sails/blob/master/CODE-OF-CONDUCT.md)
 + Created updated contribution guide with a streamlined process for feature/enhancement proposals (also added much more extensive guide to issue and code contributions)
 + Set up http://blog.sailsjs.org
```

> TODO: expand


<docmeta name="displayName" value="To v0.12">
