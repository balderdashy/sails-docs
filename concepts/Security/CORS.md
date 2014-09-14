#Cross-Origin Resource Sharing (CORS)

<!--
Your default Sails setup is already equipped to handle AJAX requests from a web page on the same domain.  But what if you need to handle AJAX requests originating from other domains?  You could set up your browser JSONP That's where [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) comes in.
-->

[CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) is a mechanism that allows browser scripts on pages served from other domains (e.g. myothersite.com) to talk to your server (e.g. api.mysite.com).  Like JSONP, the goal of CORS is to function as a secure method to circumvent the [same-origin policy](http://en.wikipedia.org/wiki/Same-origin_policy); allowing your Sails server to successfully respond to requests from client-side JavaScript code running on a page from some other domain.  But unlike JSONP, it works with more than just GET requests.

Sails can be configured to allow cross-origin requests from a list of domains you specify, or from every domain.  This can be done on a per-route basis, or globally for every route in your app.


### Enabling CORS

For security reasons, CORS is disabled by default in Sails.  But enabling it is dead-simple.

To allow cross-origin requests from _any_ domain to _any_ route in your app, simply enable `allRoutes` in [`config/cors.js`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.cors.html):

```js
allRoutes: true
```

See [`sails.config.cors`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.cors.html) for a comprehensive reference of all available options.


### Configuring CORS For Individual Routes
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
     origin: "http://sailsjs.org, http://sailsjs.com",
     credentials: false
}
```


<docmeta name="uniqueID" value="cors198259">
<docmeta name="displayName" value="CORS">

