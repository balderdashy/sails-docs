# Migration guide:

## Security

New apps created with Sails 1.0 will contain a **config/security.js** file instead of individual **config/cors.js** and **config/csrf.js** files, but apps migrating from earlier versions don&rsquo;t can keep their existing files as long as they perform the following upgrades:

* Change `module.exports.cors` to `module.exports.security.cors` in `config/cors.js`
* Change CORS config settings names to match the newly documented names in http://sailsjs.com/documentation/reference/configuration/sails-config-security-cors
* Change `module.exports.csrf` to `module.exports.security.csrf` in `config/csrf.js`
* `sails.config.csrf.routesDisabled` is no longer supported -- instead, add `csrf: false` to any route in `config/routes.js` that you wish to be unprotected by CSRF, for example:

```
'POST /some-thing': { action: 'do-a-thing', csrf: false },
```
