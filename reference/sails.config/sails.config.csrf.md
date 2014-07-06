# sails.config.csrf

Configuration for Sails' built-in [CSRF]() protection middleware.  These options are conventionally set in the [`config/csrf.js`]() configuration file.  See the docs on [Cross-Site Request Forgery]() in the security section for detailed usage instructions.

This option protects your Sails app against cross-site request forgery (or CSRF) attacks. A would-be attacker needs not only a user's session cookie, but also this timestamped, secret CSRF token, which is refreshed/granted when the user visits a URL on your app's domain.

This allows you to have certainty that your users' requests haven't been hijacked, and that the requests they're making are intentional and legitimate.


### Properties

| Property    | Type       | Default   | Details |
|-------------|:----------:|-----------|---------|
| `csrf`      | ((boolean))| false     | CSRF protection is disabled by default to facilitate development.  To turn it on, just set `sails.config.csrf` to true.



<docmeta name="uniqueID" value="CSRF353281">
<docmeta name="displayName" value="sails.config.csrf">

