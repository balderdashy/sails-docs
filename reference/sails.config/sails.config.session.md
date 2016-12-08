# sails.config.session

Configuration for Sails's built-in session support.

Sails's default session integration leans heavily on the great work already done by Express and Connect, but also adds
a bit of its own special sauce by hooking into the request interpreter.  This allows Sails to access and auto-save any changes your code makes to `req.session` when handling a virtual request from Socket.io.  Most importantly, it means you can just write code that uses `req.session` in the way you might be used to from Express or Connect; whether your controller actions are designed to handle HTTP requests, WebSocket messages, or both.



### Properties

| Property    | Type       | Default   | Details |
|:------------|:----------:|:----------|:--------|
| `adapter`   | ((ref))    | `undefined` | If left unspecified, Sails will use the default memory store bundled in the underlying session middleware.  This is fine for development, but in production, you _must_ pass in a scalable session store module instead (e.g. `require('connect-redis')`).  See [Production config](http://sailsjs.com/documentation/reference/configuration/sails-config-session#?production-config) below for details.
| `name`        | ((string))       | `sails.sid`      | The name of the session ID cookie to set in the response (and read from in the request) when sessions are enabled (which is the case by default for Sails apps). If you are running multiple different Sails apps from the same shared cookie namespace (i.e. the top-level DNS domain, like `frog-enthusiasts.net`), you must be especially careful to configure separate unique keys for each separate app, otherwise the wrong cookie could be used.
| `secret` | ((string))| _n/a_     | This session secret is automatically generated when your new app is created. Care should be taken any time this secret is changed in production-- doing so will invalidate the sesssion cookies of your users, forcing them to log in again.  Note that this is also used as the "cookie secret" for signed cookies.
| `cookie` | ((dictionary)) | _see [below](http://sailsjs.com/documentation/reference/configuration/sails-config-session#?the-session-id-cookie)_ | Configuration for the session ID cookie, including `maxAge`, `secure`, and more.  See [below](http://sailsjs.com/documentation/reference/configuration/sails-config-session#?the-session-id-cookie) for more info.
| `routesDisabled` | ((array)) | `[]` | An array of [route address strings](http://sailsjs.com/documentation/concepts/routes) for which built-in session support will be skipped.  Useful for performance tuning; particularly preventing the unnecessary creation of sessions in requests for assets (e.g. `['GET /js/*', 'GET /styles/*', 'GET /images/*']`).



### Production config

In production, you should configure a stateless session adapter which uses a store that can be [shared across multiple servers](http://sailsjs.org/documentation/concepts/deployment/scaling).  To do so, you will need to set `sails.config.session.adapter`, set up your session store, and then add any other configuration specific to the Express/Connect session adapter you are using.  Fortunately, this is easier than it sounds.


##### Configuring Redis as your session store

The most popular session store for production Sails applications is Redis.  It works great as a session database since it is inherently good at ephemeral storage, but Redis' popularity probably has more to do with the fact that, if you are using sockets and plan to scale your app to multiple servers, you will [need a Redis instance](http://sailsjs.org/documentation/concepts/deployment/scaling) anyway.

The easiest way to set up Redis as your app's shared session store is to uncomment the following line in `config/session.js`:

```javascript
adapter: require('connect-redis'),
```

Then install the [connect-redis](https://github.com/tj/connect-redis) session adapter as a dependency of your app:

```bash
npm install connect-redis@~3.0.2 --save --save-exact
```

The following settings are optional, since if no redis configuration other than `adapter` is provided, Sails assumes you want it to use a redis instance running on `localhost`.


| Property      | Type       | Default  | Details |
|:--------------|------------|:---------|:--------|
| `url`          | ((string)) | `undefined` | The URL of the Redis instance to connect to.  This may include one or more of the other settings below, e.g. `redis://:mypass@myredishost.com:1234/5` would indicate a `host` of `myredishost.com`, a `port` of `1234`, a `pass` of `mypass` and a `db` of `5`.  In general, you should use either `url` _or_ a combination of the settings below, to avoid confusion.
| `host`         | ((string))  |`'127.0.0.1'` | Hostname of your redis instance.  If a `url` setting is configured, this setting will be ignored.
| `port`         | ((number)) |`6379`   | Port of your redis instance.  If a `url` setting is configured, this setting will be ignored.
| `pass`         | ((string)) | `undefined` | The password for your redis instance. Leave blank if you are not using a password.  If a `url` setting is configured that includes a password, this setting will override the password in `url`.
| `db`           | ((number))  |`undefined`   | The index of the database to use within your redis instance.  If specified, must be an integer.  _(On typical Redis setups, this will be a number between 0 and 15.)_  If a `url` setting is configured that includes a db, this setting will override the db in `url`.
| `client`       | ((ref))  | `undefined` | An already-connected Redis client to use.  If provided, any `url`, `host` and `port` settings will be ignored.  This setting is useful if you have a Redis Sentinel setup and need to connect using a module like <a href="https://www.npmjs.com/package/ioredis" target="_blank">`ioredis`</a>





##### Using other session stores

Any session adapter written for Connect/Express works in Sails, as long as you use a compatible version.

For example, to use Mongo as your session store, install [connect-mongo](https://github.com/kcbanner/connect-mongo):

```bash
npm install connect-mongo@1.1.0 --save --save-exact
```

Then require it and pass it in as your `adapter` in `config/session.js`:

```javascript
  adapter: require('connect-mongo'),
```

The following values are optional, and should only be used if relevant for your Mongo configuration. You can read more about these, and other available options, at [https://github.com/kcbanner/connect-mongo](https://github.com/kcbanner/connect-mongo):
```
// Note: in this URL, `user`, `pass` and `port` are all optional.
url: 'mongodb://user:pass@host:port/database',
//--------------------------------------------------------------------------
// The following additional options may also be used, if needed:
// (See http://bit.ly/mongooptions for more about `mongoOptions`.)
//--------------------------------------------------------------------------
// collection: 'sessions',
// stringify: true,
// auto_reconnect: false,
// mongoOptions: {
//   server: {
//     ssl: true
//   }
// }
```


> **Notes:**
> * When using Node version <= 0.12.x, install `connect-mongo` version 0.8.2.  For Node version >= 4.0, install `connect-mongo` version `1.1.0`.
> * If you run into kerberos-related issues when using the MongoDB as your session store or the database for one or more of your app's models, be sure and have a look at the relevant [troubleshooting page](http://mongodb.github.io/node-mongodb-native/2.0/getting-started/installation-guide/#troubleshooting) in the Mongo docs.  Also see [#3362](https://github.com/balderdashy/sails/issues/3362) for more diagnostic information about using Kerberos with Mongo in your Sails app.



### The session ID cookie

The built-in session integration in Sails works by using a session ID cookie.  This cookie is [HTTP-only](https://www.owasp.org/index.php/HttpOnly) (as safeguard against [XSS exploits](http://sailsjs.com/documentation/concepts/security/xss)), and by default, is set with the name "sails.sid".

##### Expiration

The maximum age / expiration of your app's session ID cookie can be set as a number of milliseconds.

For example, to log users out after 24 hours:

```js
session: {
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}
```

Otherwise, by default, this option is set as `null` -- meaning that session ID cookies will not send any kind of ["Expires" or "Max Age" header](https://en.wikipedia.org/wiki/HTTP_cookie), and will last only for as long as a user's web browser is open.


##### The "secure" flag

If you are using HTTPS, then you can use the "secure" flag (`sails.config.session.cookie.secure`) to instruct web browsers that they should refuse to send back the session ID cookie except over the secure (`https://`) protocol.

```js
session: {
  cookie: {
    secure: true
  }
}
```

If you _are not_ using HTTPS, then you should leave the `secure` flag undefined, or set it to `false`.

> **WARNING:** If you are using HTTPS, but behind a proxy/load balancer - for example, on a PaaS like Heroku - then you should still set `secure: true`.  But note that, in order for sessions to work with `secure` enabled, you will _also_ need to set another option called [`sails.config.http.trustProxy`](http://sailsjs.com/documentation/reference/configuration/sails-config-http).


##### Advanced options

For implementation details and all available options for configuring the session ID cookie in Sails, see [express-session#cookie](https://github.com/expressjs/session#cookie).



### Disabling sessions

Sessions are enabled by default in Sails.  To disable sessions in your app, disable the `session` hook by changing your `.sailsrc` file.  The process for disabling `session` is identical to the process for [disabling the Grunt hook](http://sailsjs.org/documentation/concepts/assets/disabling-grunt) (just type `session: false` instead of `grunt: false`).

> **Note:**
> If the session hook is disabled, the session secret configured as `sails.config.session.secret` will still be used to support signed cookies, if relevant.  If the session hook is disabled _AND_ no session secret configuration exists for your app (e.g. because you deleted `config/session.js`), then signed cookies will not be usable in your application.  To make more advanced changes to this behavior, you can customize any of your app's HTTP middleware manually using [`sails.config.http`](http://sailsjs.org/documentation/reference/configuration/sails-config-http).



<docmeta name="displayName" value="sails.config.session">
<docmeta name="pageType" value="property">
