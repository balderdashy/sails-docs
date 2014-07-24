# sails.config.csrf

Configuration for Sails' built-in [CSRF]() protection middleware.  These options are conventionally set in the [`config/csrf.js`]() configuration file.  See the docs on [Cross-Site Request Forgery]() in the security section for detailed usage instructions.

This option protects your Sails app against cross-site request forgery (or CSRF) attacks. A would-be attacker needs not only a user's session cookie, but also this timestamped, secret CSRF token, which is refreshed/granted when the user visits a URL on your app's domain.

This allows you to have certainty that your users' requests haven't been hijacked, and that the requests they're making are intentional and legitimate.


### Properties

| Property    | Type       | Default   | Details |
|-------------|:----------:|-----------|---------|
| `csrf`      | ((boolean|object))| false     | CSRF protection is disabled by default to facilitate development.  To turn it on, just set `sails.config.csrf` to true, or to an object as described below.

### csrf object settings
Besides `true` and `false`, you can set `sails.config.csrf` to an object with the following properties:

| Property    | Type       | Default   | Details |
|-------------|:----------:|-----------|---------|
| `grantTokenViaAjax`      | ((boolean))| true     | Whether to activate the **/csrfToken** route, which will return the current CSRF token value which can then be used in AJAX requests.
| `origin`| ((boolean)) | '' | Comma-delimited list of origins that are allowed to access the CSRF token via the **/csrfToken** route.  This is separate from the other [CORS](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.cors.html) settings, which *do not apply* to **/csrfToken**.


<docmeta name="uniqueID" value="CSRF353281">
<docmeta name="displayName" value="sails.config.csrf">

