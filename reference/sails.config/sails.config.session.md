# sails.config.session

Configuration for Sails built-in session store.

Sails session integration leans heavily on the great work already done by Express and Connect, but also adds
a bit of its own special sauce to unify Socket.io with the Connect session store. It uses Connect&rsquo;s
cookie parser to normalize configuration differences between Express and Socket.io and hooks into Sails&rsquo;
request interpreter to allow Sails to automatically access and auto-save changes your code makes to `req.session`
when handling a virtual request from Socket.io. That means that you can just write code that uses `req.session`
in the way you might be used to from Express or Connect.



### Properties

| Property    | Type       | Default   | Details |
|-------------|:----------:|-----------|---------|
| `adapter` | ((string)) | `undefined` | If left unspecified, Sails will use the default memory store bundled in the underlying session middleware.   In production, you should specify the package name of a scalable session store instead (e.g. `connect-redis`).  See below for details. 
| `key`        | ((string))       | `sails.sid`      | Session key is set as `sails.sid` by default. This is the name of the key which is added to the cookie of visitors to your site when sessions are enabled (which is the case by default for Sails apps). If you are running multiple different Sails apps from the same shared cookie namespace (i.e. the top-level DNS domain, like `frog-enthusiasts.net`), you must be especially careful to configure separate unique keys for each separate app, otherwise the wrong cookie could be used (like crossing streams)
| `secret` | ((string))| _n/a_     | This session secret is automatically generated when your new app is created. Care should be taken any time this secret is changed in production-- doing so will invalidate the sesssion cookies of your users, forcing them to log in again.  Note that this is also used as the "cookie secret" for signed cookies.



### Production Config

In production, you should configure a session store that can be [shared across multiple servers](http://sailsjs.org/documentation/concepts/deployment/scaling).  To do so, you will need to set `sails.config.session.adapter`, set up your session database, and then add any other configuration specific to the Connect session adapter you are using.


##### Configuring Redis as Your Session Store

The most popular session store for production Sails applications is Redis.  It works great as a session database since it is inherently good at ephemeral storage, but Redis' popularity probably has more to do with the fact that, if you are using sockets and plan to scale your app to multiple servers, you will [need a Redis instance](http://sailsjs.org/documentation/concepts/deployment/scaling) anyway.

The easiest way to set up Redis as your app's shared session store is to uncomment the following line in `config/session.js`:

```javascript
adapter: 'connect-redis',
```

Then install the [connect-redis](https://github.com/tj/connect-redis) session adapter as a dependency of your app:

```bash
npm install connect-redis@~3.0.2 --save --save-exact
```

The following settings are optional, since if no redis configuration other than `adapter` is provided, Sails assumes you want it to use a redis instance running on `localhost`.

```javascript
  host: 'localhost',
  port: 6379,
  ttl: <redis session TTL in seconds>,
  db: 0,
  pass: <redis auth password>
  prefix: 'sess:'
```


| Property      | Type       | Default  | Details |
|:--------------|------------|----------|:--------|
| `db`           | ((number))  |`undefined`   | The index of the database to use within your redis instance.
| `host`         | ((string))  |`'127.0.0.1'` | Hostname of your redis instance.
| `pass`         | ((string)) | `undefined` | The password for your redis instance. Leave blank if you are not using a password.
| `port`         | ((number)) |`6379`   | Port of your redis instance.





##### Using Other Connect-Compatible Session Stores

Any session adapter written for Connect/Express works in Sails, as long as you use a compatible version.

For example, to use Mongo as your session store, install [connect-mongo](https://github.com/kcbanner/connect-mongo):

```bash
npm install connect-mongo@0.8.4 --save --save-exact
```

Then set the your `adapter` in `config/session.js`:

```javascript
  adapter: 'connect-mongo',
```

The following values are optional, and should only be used if relevant for your Mongo configuration. You can read more about these, and other available options, at [https://github.com/kcbanner/connect-mongo](https://github.com/kcbanner/connect-mongo):
```
  // Note: if provided, `url` will override other connection settings.
  // url: 'mongodb://user:pass@host:port/database/collection',
  host: 'localhost',
  port: 27017,
  db: 'sails',
  collection: 'sessions',
  username: '',
  password: '',
  auto_reconnect: false,
  ssl: false,
  stringify: true
```


> **Note:**
> If you run into kerberos-related issues when using the MongoDB as your session store or the database for one or more of your app's models, be sure and have a look at the relevant [troubleshooting page](http://mongodb.github.io/node-mongodb-native/2.0/getting-started/installation-guide/#troubleshooting) in the Mongo docs.  Also see [#3362](https://github.com/balderdashy/sails/issues/3362) for more diagnostic information about using Kerberos with Mongo in your Sails app.



### Disabling sessions

Sessions are enabled by default in Sails.  To disable sessions in your app, disable the `session` hook by changing your `.sailsrc` file.  The process for disabling `session` is identical to the process for [disabling the Grunt hook](http://sailsjs.org/documentation/concepts/assets/disabling-grunt) (just type `session: false` instead of `grunt: false`).

> **Note:**
> If the session hook is disabled, the session secret configured as `sails.config.session.secret` will still be used to support signed cookies, if relevant.  If the session hook is disabled _AND_ no session secret configuration exists for your app (e.g. because you deleted `config/session.js`), then signed cookies will not be usable in your application.  To make more advanced changes to this behavior, you can customize any of your app's HTTP middleware manually using [`sails.config.http`](http://sailsjs.org/documentation/reference/configuration/sails-config-http).



<docmeta name="displayName" value="sails.config.session">
<docmeta name="pageType" value="property">
