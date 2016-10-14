# sails.config.csrf

Configuration for Sails' built-in [CSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery) protection middleware.  These options are conventionally set in the [`config/csrf.js`](http://sailsjs.org/documentation/anatomy/myApp/config/csrf.js.html) configuration file.  See the docs on [Cross-Site Request Forgery](http://sailsjs.org/documentation/concepts/security/csrf) in the security section for detailed usage instructions.

This option protects your Sails app against cross-site request forgery (or CSRF) attacks. A would-be attacker needs not only a user's session cookie, but also this timestamped, secret CSRF token, which is refreshed/granted when the user visits a URL on your app's domain.

This allows you to have certainty that your users' requests haven't been hijacked, and that the requests they're making are intentional and legitimate.


### Properties

| Property    | Type       | Default   | Details |
|:------------|:----------:|:----------|:--------|
| `csrf`      | ((boolean)) or ((dictionary))| false     | CSRF protection is disabled by default to facilitate development.  To turn it on, just set `sails.config.csrf` to `true`, or for more flexibility, specify a dictionary with any of the properties described below.
| `csrf.routesDisabled`| ((array)) | '' | An array of [route addresses](http://sailsjs.com/docs/concepts/routes/custom-routes#?route-address) where CSRF protection will not be enabled.  Note that regardless of what you configure here, `GET` requests _never_ receive CSRF protection.



### Notes

> + In Sails v1.0, `sails.config.csrf.grantTokenViaAjax` and `sails.config.csrf.origin` were removed in favor of the [built-in `security.grantCsrfToken`](http://sailsjs.com/docs/concepts/security/csrf) action.


<docmeta name="displayName" value="sails.config.csrf">
<docmeta name="pageType" value="property">

