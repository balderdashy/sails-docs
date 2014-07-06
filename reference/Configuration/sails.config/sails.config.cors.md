# sails.config.cors

Configuration for Sails' [built-in support for Cross-Origin Resource Sharing]().  These options are conventionally set in the [`config/cors.js`]() configuration file.


<!--

  TODO: break out a separate page that covers how the CORS support works in sails
  (we have some content for that already somewhere... i think i lost it)

  Here's some stuff to start off with:

  [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) is most often used as a more modern equivalent of JSONP- it allows your server/API to successfully respond to requests from client-side JavaScript code running on some other domain (e.g. google.com).  Unlike JSONP, it works with POST, PUT, and DELETE requests.
-->



### Properties

| Property    | Type       | Default   | Details |
|-------------|:----------:|-----------|---------|
| `allRoutes` | ((boolean))| false     | todo
| todo        | todo       | todo      | todo


TODO: move the rest of these into the formatted table above:


### Things Pt. 1


**allRoutes**: Allow CORS on all routes by default?  If not, you must enable CORS on a per-route basis by either adding a "cors" configuration object to the route config, or setting "cors:true" in the route config to use the default settings below.  *Default: false*

**origin**: Which domains are allowed CORS access? This can be a comma-delimited list of hosts (beginning with http:// or https://) or "\*" to allow all domains CORS access. *Default: **

**credentials**: Allow cookies to be shared for CORS requests? *Default: true*

**methods**: Which methods should be allowed for CORS requests?  This is only used in response to [preflight requests](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS#Preflighted_requests). *Default: GET, POST, PUT, DELETE, OPTIONS, HEAD*

**headers**: Which headers should be allowed for CORS requests?  This is only used
in response to [preflight requests](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS#Preflighted_requests). *Default: content-type*

See [this article](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS) for a more in-depth discussion of how CORS works, and what preflight requests are for.


### Things Pt. 2

```js

module.exports.cors = {

  // Allow CORS on all routes by default?  If not, you must enable CORS on a
  // per-route basis by either adding a "cors" configuration object
  // to the route config, or setting "cors:true" in the route config to
  // use the default settings below.
  allRoutes: false,

  // Which domains which are allowed CORS access?
  // This can be a comma-delimited list of hosts (beginning with http:// or https://)
  // or "*" to allow all domains CORS access.
  origin: '*',

  // Allow cookies to be shared for CORS requests?
  credentials: true,

  // Which methods should be allowed for CORS requests?  This is only used
  // in response to preflight requests (see article linked above for more info)
  methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',

  // Which headers should be allowed for CORS requests?  This is only used
  // in response to preflight requests.
  headers: 'content-type'

};

```


### Notes
> + Any of these settings (with the exception of `allRoutes`) can be changed on a per-route basis by adding a "cors" object to the route configuration:
>
> ```javascript
> 'get /foo/bar': {
>   target: 'FooController.bar',
>   cors: {
>     origin: 'http://foobar.com,https://owlhoot.com'
>   }
> }
> ```



<docmeta name="uniqueID" value="sailsconfigcors588825999999">
<docmeta name="displayName" value="sails.config.cors">

