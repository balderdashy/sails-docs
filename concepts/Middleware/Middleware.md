# Middleware

Sails is fully compatible with Express / Connect middleware - in fact, it's all over the place!  Much of the code you'll write in Sails is effectively middleware; most notably [controller actions](http://beta.sailsjs.org/#/documentation/concepts/Controllers?q=actions) and [policies](http://beta.sailsjs.org/#/documentation/concepts/Policies).


### HTTP Middleware

Sails also utilizes an additional [configurable middleware stack](http://beta.sailsjs.org/#/documentation/concepts/Middleware?q=adding-or-overriding-http-middleware) just for handling HTTP requests.  Each time your app receives an HTTP request, the configured HTTP middleware stack runs in order.

> Note that this HTTP middleware stack is only used for "true" HTTP requests-- it is ignored for **virtual requests** (e.g. requests from a live Socket.io connection.)



#### Conventional Defaults

Sails comes bundled with a suite of conventional HTTP middleware, ready to use.  You can, of course, disable, override, rearrange, or append to it, but the pre-installed stack is perfectly acceptable for most apps in development or production.  Below is a list of the standard HTTP middleware functions that comes bundled in Sails in the order they execute every time the server receives an incoming HTTP request:

 HTTP Middleware Key       | Purpose
 ------------------------- | ------------
 **startRequestTimer**     | Allocates a variable in memory to hold the timestamp when the request began.  This can be accessed and used by your app to provide diagnostic information about slow requests.
 _cookieParser_ *          | Parses the cookie header into a clean object for use in subsequent middleware and your application code.
 _session_ *               | Sets up a unique session object using your [session configuration](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.session.html).
 **bodyParser**            | Parses parameters and binary upstreams (for streaming file uploads) from the HTTP request body using [Skipper](https://github.com/balderdashy/skipper).
 **compress**              | Compresses response data using gzip/deflate.
 **methodOverride**        | Provides faux HTTP method support, letting you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it (e.g. legacy versions of Internet Explorer.)  If a request has a `_method` parameter set to `"PUT"`, the request will be routed as if it was a proper PUT request.  See [Connect's methodOverride docs](http://www.senchalabs.org/connect/methodOverride.html) for more information if you need it.
 **poweredBy**             | Attaches an `X-Powered-By` header to outgoing responses.
 **$custom**               | Provides backwards compatibility for a configuration option from Sails v0.9.x.  Since Sails v0.10 offers much more configuration flexibility for HTTP middleware, as long as you are not using `sails.config.express.customMiddleware`, you can confidently remove this item from the list.
 _router_ *                | This is where the bulk of your app logic gets applied to any given request.  In addition to running `"before"` handlers in hooks (e.g. csrf token enforcement) and some internal Sails logic, this routes requests using your app's explicit routes (in [`sails.config.routes`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.routes.html)) and/or route blueprints.
 _www_ *                   | Serves static files- usually images, stylesheets, scripts- in your app's "public" folder (configured in [`sails.config.paths`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md), conventionally [`.tmp/public/`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)) using Connect's [static middleware](http://www.senchalabs.org/connect/static.html).
 **favicon**               | Serves the [browser favicon](http://en.wikipedia.org/wiki/Favicon) for your app if one is provided as `/assets/favicon.ico`.
 _404_ *                   | Handles requests which do not match any routes - triggers `res.notFound()`  <!-- technically, this emits the `router:request:404` event)  -->
 _500_ *                   | Handles requests which trigger an internal error (i.e. call Express's `next(err)`)  - triggers `res.serverError()` <!-- technically, this emits the `router:request:500` event)  -->

###### Legend:

+ `*` - The middleware with an asterisk (*) above should _almost never_ need to be modified or removed. Please only do so if you really understand what you're doing.



#### Adding or Overriding HTTP Middleware

To configure a custom HTTP middleware function, define a new HTTP key `sails.config.http.middleware.FOO` and set it to the configured middleware function, then add the string name ("FOO") to your `sails.config.http.middleware.order` array wherever you'd like it to run in the middleware chain (a good place to put it might be right before "cookieParser"):

E.g. in `config/http.js`:

```js
  // ...
  middleware: {
    
    // Define a custom HTTP middleware fn with the key `foobar`:
    foobar: function (req,res,next) { /*...*/ next(); },

    // Define another couple of custom HTTP middleware fns with keys `passportInit` and `passportSession`
    // (notice that this time we're using an existing middleware library from npm)
    passportInit    : require('passport').initialize(),
    passportSession : require('passport').session(),

    // Override the conventional cookie parser:
    cookieParser: function (req, res, next) { /*...*/ next(); },


    // Now configure the order/arrangement of our HTTP middleware
    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'passportInit',            // <==== passport HTTP middleware should run after "session"
      'passportSession',         // <==== (see https://github.com/jaredhanson/passport#middleware)
      'bodyParser',
      'compress',
      'foobar',                  // <==== we can put this stuff wherever we want
      'methodOverride',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ]
  },
  
  customMiddleware: function(app){
     //Intended for other middleware that doesn't follow 'app.use(middleware)' convention
     require('other-middleware').initialize(app);
  }
  // ...
```


### Express Middleware In Sails

One of the really nice things about Sails apps is that they can take advantage of the wealth of already-existing Express/Connect middleware out there.  But a common question that arises when people _actually_ try to do this is:

> _"Where do I `app.use()` this thing?"_.

In most cases, the answer is to install the Express middleware as a custom HTTP middleware in [`sails.config.http.middleware`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html).  This will trigger it for ALL HTTP requests to your Sails app, and allow you to configure the order in which it runs in relation to other HTTP middleware.

### Express Routing Middleware In Sails 

You can also include Express middleware as a policy- just configure it in [`config/policies.js`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html).  You can either require and setup the middleware in an actual wrapper policy (usually a good idea) or just require it directly in your policies.js file.  The following example uses the latter strategy for brevity:

```js
{
  '*': true,
  
  ProductController: {
  
    // Prevent end users from doing CRUD operations on products reserved for admins
    // (uses HTTP basic auth)
    '*': require('http-auth')({
      realm: 'admin area'
    }, function customAuthMethod (username, password, onwards) {
      return onwards(username === "Tina" && password === "Bullock");
    }),
    
    // Everyone can view product pages
    show: true
  }
}
```



<!--

  TODO:

### Advanced Express Middleware In Sails

You can actually do this in a few different ways, depending on your needs.



Generally, the following best-practices apply:

If you want a middleware function 
 
+ If you want a piece of middleware to run only when your app's explicit or blueprint routes are matched, you should include it as a policy.
+ this will run passport for all incoming http requests, including images, css, etc.

If you want a middleware function to run for all you should include it at the top of your `config/routes.js` as a wildcard route.  for your controller (both HTTP and virtual) requests
-->





<docmeta name="uniqueID" value="middleware198259">
<docmeta name="displayName" value="Middleware">
