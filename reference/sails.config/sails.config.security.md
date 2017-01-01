# sails.config.security

Configuration for your app's security settings, including how it deals with cross-origin requests (CORS), and which routes require a CSRF token to be included with the request. For an overview of how Sails handles security, see [Concepts > Security](http://sailsjs.com/documentation/concepts/security).

## sails.config.security.cors
Configuration for Sails' [built-in support for Cross-Origin Resource Sharing](http://sailsjs.com/documentation/concepts/security/cors).  CORS specifies how HTTP requests to your app originating from foreign domains should be treated.  It is primarily used to allow third-party sites to make AJAX requests to your app, which are normally blocked by browsers following the <a href="http://en.wikipedia.org/wiki/Same-origin_policy" target="_blank">same-origin policy</a>.

These options are conventionally set in the **config/security.js** configuration file.  Note that these settings (with the exception of `allRoutes`) can be changed on a per-route basis in the [**config/routes.js** file](http://sailsjs.com/documentation/concepts/Routes/RouteTargetSyntax.html?q=route-target-options).

### Properties

| Property    | Type       | Default   | Details |
|:------------|:----------:|:----------|:--------|
| `allRoutes` | ((boolean))| false     | Indicates whether the other CORS configuration settings should apply to every route in the app by default.
| `allowOrigins`        | ((array)) or ((string))       | `*`      | Array of default hosts (beginning with http:// or https://) to give access to, or the string `*` to allow all domains CORS access.  If `allRoutes` is `true` and `origin` is `*`, then your app will be fully accessible to sites hosted on foreign domains (except for routes which have their own CORS settings).  If `credentials` is also `true`, then the app will fail to lift unless the `allowAnyOriginWithCredentialsUnsafe` setting is also `true` (see below).
| `allowRequestMethods`|((string))|GET, POST, PUT, DELETE, OPTIONS, HEAD|Comma-delimited list of methods that are allowed to be used in CORS requests.  This is only used in response to [preflight requests](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS#Preflighted_requests), so the inclusion of GET, POST, OPTIONS and HEAD, although customary, is not necessary.
| `allowRequestHeaders`|((string))|content-type|Comma-delimited list of headers that are allowed to be sent with CORS requests.  This is only used in response to [preflight requests](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS#Preflighted_requests).
|`allowResponseHeaders`|((string))|`''`| List of headers that browsers will be allowed to access.  See [access-control-expose-headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Access-Control-Expose-Headers).
|`allowCredentials`|((boolean))|false|Indicates whether cookies can be shared in CORS requests.
|`allowAnyOriginWithCredentialsUnsafe`|((boolean))|false| Indicates whether `origin: '*'` and `allowCredentials: true` may be set at the same time.  This essentially negates the security benefits of browsers' cross-origin policy, and should be used very carefully.

### Custom route config example

The following will allow cross-origin AJAX GET, PUT and POST requests to `/foo/bar` from sites hosted `http://foobar.com` and `https://owlhoot.com`.  DELETE requests, or requests from sites on any other domains, will be blocked by the browser.

```javascript
'/foo/bar': {
  action: 'foo/bar',
  cors: {
    allowOrigins: ['http://foobar.com','https://owlhoot.com'],
    allowRequestMethods: 'GET,PUT,POST,OPTIONS,HEAD'
  }
}
```

## sails.config.security.csrf

Configuration for Sails' built-in [CSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery) protection middleware.  CSRF options are conventionally set in the [`config/security.js`](http://sailsjs.com/documentation/anatomy/myApp/config/security.js.html) configuration file.  For detailed usage instructions, see [Concepts > Security > Cross-Site Request Forgery](http://sailsjs.com/documentation/concepts/security/csrf).

This setting protects your Sails app against cross-site request forgery (or CSRF) attacks.  A would-be attacker needs not only a user's session cookie, but also this timestamped, secret CSRF token, which is refreshed/granted when the user visits a URL on your app's domain.  This allows you to have certainty that your users' requests haven't been hijacked, and that the requests they're making are intentional and legitimate.

### Properties

| Property    | Type       | Default   | Details |
|:------------|:----------:|:----------|:--------|
| `csrf`      | ((boolean)) or ((dictionary))| false     | CSRF protection is disabled by default to facilitate development.  To turn it on, just set `sails.config.security.csrf` to `true`, or for more flexibility, specify `csrf: true` or `csrf: false` in any route in your [`config/routes.js`](http://sailsjs.com/anatomy/config/routes-js) file.



### Notes

> + In Sails v1.0, `sails.config.csrf.grantTokenViaAjax` and `sails.config.csrf.origin` were removed in favor of the [built-in `security/grant-csrf-token`](http://sailsjs.com/docs/concepts/security/csrf) action.



<docmeta name="displayName" value="sails.config.security">
<docmeta name="pageType" value="property">

