# myApp/config/globals.js

Configuration for the global variables Sails exposes to its Node process.  See [`sails.config.globals`](http://sailsjs.org/documentation/reference/configuration/sails-config-globals) for a detailed overview of all available options.


```javascript
/**
 * Global Variable Configuration
 * (sails.config.globals)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/documentation/reference/configuration/sails-config-globals
 */

module.exports.globals = {

  /****************************************************************************
  *                                                                           *
  * Whether to expose the `lodash` installed within Sails core as a global    *
  * variable, making it accessible throughout your app.                       *
  *                                                                           *
  * As of Sails v0.12.x, the built-in version of Lodash is v3.10.1.           *
  * (see https://github.com/lodash/lodash/tree/3.10.1/doc for usage)          *
  *                                                                           *
  * > To use your own version of Lodash, set this to `false`, and run:        *
  * > `npm install lodash --save --save-exact`.  Then, like you'd import any  *
  * > other Node.js package, just include `var _ = require('lodash')` in the  *
  * > files where you need access to it.                                      *
  *                                                                           *
  ****************************************************************************/

	// _: true,

  /****************************************************************************
  *                                                                           *
  * Whether to expose the `async` installed within Sails core as a global     *
  * variable, making it accessible throughout your app.                       *
  *                                                                           *
  * As of Sails v0.12.x, the built-in version of `async` is v1.5.0.           *
  * (see https://github.com/caolan/async/blob/v1.5.0/README.md for usage)     *
  *                                                                           *
  * > To use your own version of `async`, set this to `false`, and run:       *
  * > `npm install async --save --save-exact`.  Then, like you'd import any   *
  * > other Node.js package, just include `var async = require('async')` in   *
  * > the files where you need access to it.                                  *
  *                                                                           *
  ****************************************************************************/

	// async: true,

  /****************************************************************************
  *                                                                           *
  * Whether to expose the `sails` instance representing your app as a global  *
  * variable, making it accessible throughout your app.                       *
  *                                                                           *
  * > If this is disabled, you can get a hold of it using `req._sails`.       *
  *                                                                           *
  ****************************************************************************/

	// sails: true,

  /****************************************************************************
  *                                                                           *
  * Whether to expose each of your app's models as global variables.          *
  *                                                                           *
  * > The global var name for a model is determined using its "globalId".     *
  * > For example, a model defined in `api/models/User.js` would have a       *
  * > "globalId" of `User`.  If this setting (`sails.config.globals.models`)  *
  * > is disabled, then you can still access your models in `sails.models`,   *
  * > keyed on their identity (e.g. `sails.models.user`.)  See the Sails docs *
  * > for more information on globalIds and identities.                       *
  *                                                                           *
  ****************************************************************************/

	// models: true

};
```

<docmeta name="displayName" value="globals.js">
