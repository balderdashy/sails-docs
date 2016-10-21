# sails.config.security.csrf

Configuration for Sails' built-in [CSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery) protection middleware.  These options are conventionally set in the [`config/security.js`](http://sailsjs.org/documentation/anatomy/myApp/config/security.js.html) configuration file.  For detailed usage instructions, see [Concepts > Security > Cross-Site Request Forgery](http://sailsjs.com/documentation/concepts/security/csrf).

This option protects your Sails app against cross-site request forgery (or CSRF) attacks.  A would-be attacker needs not only a user's session cookie, but also this timestamped, secret CSRF token, which is refreshed/granted when the user visits a URL on your app's domain.  This allows you to have certainty that your users' requests haven't been hijacked, and that the requests they're making are intentional and legitimate.

### Properties

| Property    | Type       | Default   | Details |
|:------------|:----------:|:----------|:--------|
| `csrf`      | ((boolean)) or ((dictionary))| false     | CSRF protection is disabled by default to facilitate development.  To turn it on, just set `sails.config.security.csrf` to `true`, or for more flexibility, specify `csrf: true` or `csrf: false` in any route in your [`config/routes.js`](http://sailsjs.com/anatomy/config/routes-js) file.



### Notes

> + In Sails v1.0, `sails.config.csrf.grantTokenViaAjax` and `sails.config.csrf.origin` were removed in favor of the [built-in `security.grantcsrftoken`](http://sailsjs.com/docs/concepts/security/csrf) action.


<docmeta name="displayName" value="sails.config.security.csrf">
<docmeta name="pageType" value="property">

