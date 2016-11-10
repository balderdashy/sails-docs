# sails.config.security.cors

Configuration for Sails' [built-in support for Cross-Origin Resource Sharing](http://sailsjs.org/documentation/concepts/CORS).  CORS specifies how HTTP requests to your app originating from foreign domains should be treated.  It is primarily used to allow third-party sites to make AJAX requests to your app, which are normally blocked by browsers following the [same-origin policy](http://en.wikipedia.org/wiki/Same-origin_policy).

These options are conventionally set in the **config/security.js** configuration file.  Note that these settings (with the exception of `allRoutes`) can be changed on a per-route basis in the [**config/routes.js** file](http://sailsjs.org/documentation/concepts/Routes/RouteTargetSyntax.html?q=route-target-options).

### Properties

| Property    | Type       | Default   | Details |
|:------------|:----------:|:----------|:--------|
| `allRoutes` | ((boolean))| false     | Indicates whether the other CORS configuration settings should apply to every route in the app by default.
| `allowOrigins`        | ((string))       | `*`      | Array of default hosts (beginning with http:// or https://) to give access to, or the string `*` to allow all domains CORS access.  If `allRoutes` is `true` and `origin` is `*`, then your app will be fully accessible to sites hosted on foreign domains (except for routes which have their own CORS settings).  If `credentials` is also `true`, then the app will fail to lift unless the `allowAnyOriginWithCredentialsUnsafe` setting is also `true` (see below).
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
    allowOrigins: 'http://foobar.com,https://owlhoot.com',
    allowRequestMethods: 'GET,PUT,POST,OPTIONS,HEAD'
  }
}
```





<docmeta name="displayName" value="sails.config.security.cors">
<docmeta name="pageType" value="property">

