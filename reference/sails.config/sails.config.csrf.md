# sails.config.csrf

Configuration for Sails' built-in [CSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery) protection middleware.  These options are conventionally set in the [`config/csrf.js`](http://sailsjs.org/documentation/anatomy/myApp/config/csrf.js.html) configuration file.  See the docs on [Cross-Site Request Forgery](http://sailsjs.org/documentation/concepts/security/csrf) in the security section for detailed usage instructions.

This option protects your Sails app against cross-site request forgery (or CSRF) attacks. A would-be attacker needs not only a user's session cookie, but also this timestamped, secret CSRF token, which is refreshed/granted when the user visits a URL on your app's domain.

This allows you to have certainty that your users' requests haven't been hijacked, and that the requests they're making are intentional and legitimate.


### Properties

| Property    | Type       | Default   | Details |
|-------------|:----------:|-----------|---------|
| `csrf`      | ((boolean)) or ((dictionary))| false     | CSRF protection is disabled by default to facilitate development.  To turn it on, just set `sails.config.csrf` to true, or for more flexibility, specify a dictionary with any of the properties described below.
| `csrf.grantTokenViaAjax`      | ((boolean))| true     | Whether to activate the **/csrfToken** route, which will return the current CSRF token value which can then be used in AJAX requests.
| `csrf.origin`| ((string)) | '' | Comma-delimited list of origins that are allowed to access the CSRF token via the **/csrfToken** shadow route.  This is separate from the other [CORS](http://sailsjs.org/documentation/reference/sails.config/sails.config.cors.html) settings, which *do not apply* to **/csrfToken**.
| `csrf.routesDisabled`| ((string)) or ((regexp)) or ((array)) | '' | Comma-delimited list of routes or array of regexp/express-style-path where CSRF protection is disabled.


<docmeta name="displayName" value="sails.config.csrf">
<docmeta name="pageType" value="property">

