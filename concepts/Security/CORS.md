# Cross-Origin Resource Sharing (CORS)

<!--
Every Sails app comes ready to handle AJAX requests from a web page on the same domain.  But what if you need to handle AJAX requests 
originating from other domains?
-->

[CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) is a mechanism that allows browser scripts on pages served from other domains (e.g. myothersite.com) to talk to your server (e.g. api.mysite.com).  Like [JSONP](https://en.wikipedia.org/wiki/JSONP), the goal of CORS is to circumvent the [same-origin policy](http://en.wikipedia.org/wiki/Same-origin_policy); allowing your Sails server to successfully respond to requests from client-side JavaScript code running on a page hosted from some other domain.  But unlike JSONP, it works with more than just GET requests.  And it allows you to whitelist particular origins (`staging.yoursite.com` or `yourothersite.net`) and prevent requests from others (`evil.com`).

Sails can be configured to allow cross-origin requests from a list of domains you specify, or from every domain.  This can be done on a per-route basis, or globally for every route in your app.

### Enabling CORS

For security reasons, CORS is disabled by default in Sails.  But enabling it is dead-simple.

To allow cross-origin requests from a whitelist of trusted domains to _any_ route in your app, simply enable `allRoutes` and provide an `origin` setting in [`config/cors.js`](http://sailsjs.com/docs/reference/configuration/sails-config-cors):

```javascript
allRoutes: true,
origin: 'example.com,api.example.com,blog.example.com,foo.com'
```

To allow cross-origin requests from _any_ domain to _any_ route in your app, use `origin: '*'`:

```javascript
allRoutes: true,
origin: '*',
credentials: false
```

> #### WARNING:
> If you enable CORS with `origin: '*'`, but fail to also set `credentials: false`, your app will **not** be protected against attacks that exploit CORS.  To prevent third-party sites from being able to trick your logged-in users into making unauthorized requests to your app, you should either (A) set `origin` to a specific set of trusted domains, or (B) keep `origin: '*'` but set `credentials: false`.  Just realize that, if you choose to set `credentials: false`, affected routes will not be able to access the [session](http://sailsjs.com/docs/concepts/sessions).


See [`sails.config.cors`](http://sailsjs.com/docs/reference/configuration/sails-config-cors) for a comprehensive reference of all available options.


### Configuring CORS For individual routes
Besides the global CORS configuration in `config/cors.js`, you can also configure these settings on a per-route basis in [`config/routes.js`](http://sailsjs.com/anatomy/config/routes-js).

If you set `allRoutes: true` in `config/cors.js`, but you want to exempt a specific route, set the `cors: false` in the route's target:

```javascript
'POST /signup': {
   controller: 'UserController',
   action: 'signup',
   cors: false
}
```

To enable or override global CORS configuration for a particular route, provide `cors` as a dictionary:

```javascript
'GET /videos': {
   controller: 'VideoController',
   action: 'find',
   cors: {
     origin: 'example.com,api.example.com,blog.example.com,foo.com',
     credentials: false
   }
}
```


### Security levels

The browser's cross-origin policy allows requests to be sent-- it simply does not allow the browser to receive the response.  Similarly, Sails will still process all the requests that come in regardless of domain, even with CORS enabled.  But for routes with CORS enabled, it will simply set the appropriate headers on the response so that the *browser* can decide whether or not to expose the response.  For example, if you send a `GET` request to `/foo/bar` from a domain that is not in your CORS whitelist (`origin`), the `bar` action in your `FooController.js` file will still run, but the browser will throw away the result.  This may seem counterintuitive, but it is important because it allows non-browser-based clients (like [Postman](https://www.getpostman.com) and [curl](http://curl.haxx.se/)) to work while still blocking the kind of attacks that the [Same-Origin Policy](http://en.wikipedia.org/wiki/Same-origin_policy) is meant to protect against.

If you want to completely prevent Sails from processing requests from disallowed domains, you can use the `securityLevel` setting:

```javascript
module.exports.cors = {
  allRoutes: true,
  origin: "http://sailsjs.org",
  securityLevel: 1
}
```

Security level 1 (high) will respond with a 403 status code to any request from a disallowed origin prefixed with the `http` or `https` protocol.  Security level 2 (very high) will do the same, but extended to *all* protocols (so things like Postman and curl won't work).


### Notes
 
> + CORS is not supported in Internet Explorer 7.  Fortunately, it is supported in IE8 and up, as well as in all other modern browsers.
> + Read [more about CORS from MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
> + Read the [CORS spec](https://www.w3.org/TR/cors/)

<docmeta name="displayName" value="CORS">
