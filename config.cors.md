#Cross-Origin Resource Sharing (CORS)

Your default Sails setup is equipped with everything you need to handle AJAX requests from a web page you serve to a server on the same domain.  But what if you need to handle client requests originating from a different domain?  That's where CORS comes in.  Using the `config/cors.js` file, Sails can be configured to allow cross-origin requests from a list of domains you specify, or from every domain.  This can be done on a per-route basis or for every route in your app.

### The dead-simple way
To allow cross-origin requests from any domain to any route, simply edit `config/cors.js`, set `allRoutes` to `true`, and leave all of the other options unchanged.

### Cors.js in detail
The cors.js file has the following configurable properties:

**allRoutes**: Allow CORS on all routes by default?  If not, you must enable CORS on a per-route basis by either adding a "cors" configuration object to the route config, or setting "cors:true" in the route config to use the default settings below.  *Default: false*

**origin**: Which domains are allowed CORS access? This can be a comma-delimited list of hosts (beginning with http:// or https://) or "\*" to allow all domains CORS access. *Default: \**

**credentials**: Allow cookies to be shared for CORS requests? *Default: true*

**methods**: Which methods should be allowed for CORS requests?  This is only used in response to [preflight requests](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS#Preflighted_requests). *Default: GET, POST, PUT, DELETE, OPTIONS, HEAD*

**headers**: Which headers should be allowed for CORS requests?  This is only used
in response to [preflight requests](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS#Preflighted_requests). *Default: content-type*

See [this article](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS) for a more in-depth discussion of how CORS works, and what preflight requests are for.

### Configuring CORS for a single route
Besides the global CORS configuration, you can set up individual routes in `config/routes.js` to accept (or deny) cross-origin requests.  To indicate that a route should accept CORS requests using the configuration parameters in `config/cors.js`, set its `cors` property to `true`:

```
"get /foo": {
   controller: "FooController",
   action: "index",
   cors: true
}
```

If you have the `allRoutes` parameter set to `true` in `config.cors.js`, but you want to exempt a specific route, you can do so by explicitly setting its `cors` property to `false`:

```
"get /foo": {
   controller: "FooController",
   action: "index",
   cors: false
}
```

To override specific CORS configuration parameters for a route, add a `cors` property object:

```
"get /foo": {
   controller: "FooController",
   action: "index",
   cors: {
     origin: "http://www.sailsjs.org, http://www.sailsjs.com",
     credentials: false
}
```
