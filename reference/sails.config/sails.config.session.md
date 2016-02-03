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
| `secret` | ((string))| _n/a_     | This session secret is automatically generated when your new app is created. Care should be taken any time this secret is changed in production-- doing so will invalidate the cookies of your users, forcing them to log in again.
| `key`        | ((string))       | `sails.sid`      | Session key is set as `sails.sid` by default. This is the name of the key which is added to the cookie of visitors to your site when sessions are enabled (which is the case by default for Sails apps). If you are running multiple different Sails apps from the same shared cookie namespace (i.e. the top-level DNS domain, like `frog-enthusiasts.net`), you must be especially careful to configure separate unique keys for each separate app, otherwise the wrong cookie could be used (like crossing streams)
| `adapter` | ((string)) |        | If specified, the name of a Connect session adapter to use.  More details below.


### Configuring Redis as Your Session Store

In production, uncomment the following line to set up a shared redis session store
that can be shared across multiple Sails.js servers:

```javascript
adapter: 'redis',
```

The following values are optional, if no options are set a redis instance running on `localhost` is expected.  Read more about these options at: https://github.com/visionmedia/connect-redis

```javascript
  host: 'localhost',
  port: 6379,
  ttl: <redis session TTL in seconds>,
  db: 0,
  pass: <redis auth password>
  prefix: 'sess:'
```



### Using Other Connect-Compatible Session Stores

Any session adapter written for Connect/Express works in Sails, as long as you use a compatible version.

For example to use Mongo as your session store, you should use version 0.8.4 of `connect-mongo`.  First, run the following from your project's directory:

```
npm install sails-mongo@0.8.4 --save
```

Then add the following lines to your session configuration dictionary in `config/session.js`:

```javascript
  adapter: 'mongo',
  host: 'localhost',
  port: 27017,
  db: 'sails',
  collection: 'sessions',
```

The following values are optional, and should only be used if relevant for your Mongo configuration. You can read more about these, and other available options, at [https://github.com/kcbanner/connect-mongo](https://github.com/kcbanner/connect-mongo).

```javascript
        // Note: url will override other connection settings
        // url: 'mongodb://user:pass@host:port/database/collection',

        username: '',
        password: '',
        auto_reconnect: false,
        ssl: false,
        stringify: true

```


> **Note:**
> If you run into kerberos-related issues when using the MongoDB as your session store or the database for one or more of your app's models, be sure and have a look at the relevant [troubleshooting page](http://mongodb.github.io/node-mongodb-native/2.0/getting-started/installation-guide/#troubleshooting) in the Mongo docs.  Also see [#3362](https://github.com/balderdashy/sails/issues/3362) for more diagnostic information about using Kerberos with Mongo in your Sails app.



### Disabling sessions

Sessions are enabled by default in Sails.  To disable sessions in your app, disable the `session` hook.  Note that tthe process for disabling any hook is identical to the process for [disabling the Grunt hook](http://sailsjs.org/documentation/concepts/assets/disabling-grunt) (just type `grunt` instead of `session`).





<docmeta name="displayName" value="sails.config.session">
<docmeta name="pageType" value="property">
