# Conventional Defaults

Sails comes bundled with a suite of conventional HTTP middleware, ready to use.  You can, of course, disable, override, rearrange, or append to it, but the pre-installed stack is perfectly acceptable for most apps in development or production.  Below is a list of the standard HTTP middleware functions that comes bundled in Sails in the order they execute every time the server receives an incoming HTTP request:

 HTTP Middleware Key       | Purpose
 ------------------------- | ------------
 **startRequestTimer**     | Allocates a variable in memory to hold the timestamp when the request began.  This can be accessed and used by your app to provide diagnostic information about slow requests.
 _cookieParser_ *          | Parses the cookie header into a clean object for use in subsequent middleware and your application code.
 _session_ *               | Sets up a unique session object using your [session configuration](http://sailsjs.org/documentation/reference/sails.config/sails.config.session.html).
 **bodyParser**            | Parses parameters and binary upstreams (for streaming file uploads) from the HTTP request body using [Skipper](https://github.com/balderdashy/skipper).
 **compress**              | Compresses response data using gzip/deflate. See [`compression`](https://github.com/expressjs/compression) for details.
 **methodOverride**        | Provides faux HTTP method support, letting you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it (e.g. legacy versions of Internet Explorer.)  If a request has a `_method` parameter set to `"PUT"`, the request will be routed as if it was a proper PUT request.  See [Connect's methodOverride docs](http://www.senchalabs.org/connect/methodOverride.html) for more information if you need it.
 **poweredBy**             | Attaches an `X-Powered-By` header to outgoing responses.
 **$custom**               | Provides backwards compatibility for a configuration option from Sails v0.9.x.  Since Sails v0.10 offers much more configuration flexibility for HTTP middleware, as long as you are not using `sails.config.express.customMiddleware`, you can confidently remove this item from the list.
 _router_ *                | This is where the bulk of your app logic gets applied to any given request.  In addition to running `"before"` handlers in hooks (e.g. csrf token enforcement) and some internal Sails logic, this routes requests using your app's explicit routes (in [`sails.config.routes`](http://sailsjs.org/documentation/reference/sails.config/sails.config.routes.html)) and/or route blueprints.
 _www_ *                   | Serves static files- usually images, stylesheets, scripts- in your app's "public" folder (configured in [`sails.config.paths`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md), conventionally [`.tmp/public/`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)) using Connect's [static middleware](http://www.senchalabs.org/connect/static.html).
 **favicon**               | Serves the [browser favicon](http://en.wikipedia.org/wiki/Favicon) for your app if one is provided as `/assets/favicon.ico`.
 _404_ *                   | Handles requests which do not match any routes - triggers `res.notFound()`  <!-- technically, this emits the `router:request:404` event)  -->
 _500_ *                   | Handles requests which trigger an internal error (i.e. call Express's `next(err)`)  - triggers `res.serverError()` <!-- technically, this emits the `router:request:500` event)  -->

<docmeta name="displayName" value="Conventional Defaults">
