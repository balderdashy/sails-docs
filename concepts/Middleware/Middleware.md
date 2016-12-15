# Middleware

Sails is fully compatible with Express / Connect middleware - in fact, it's all over the place!  Much of the code you'll write in Sails is effectively middleware; most notably [controller actions](http://sailsjs.org/documentation/concepts/Controllers?q=actions) and [policies](http://sailsjs.org/documentation/concepts/Policies).


### HTTP Middleware

Sails also utilizes an additional [configurable middleware stack](http://sailsjs.org/documentation/concepts/Middleware#adding-or-overriding-http-middleware) just for handling HTTP requests.  Each time your app receives an HTTP request, the configured HTTP middleware stack runs in order.

Read about the default middleware stack [here](http://sailsjs.org/documentation/concepts/middleware/conventional-defaults).

> Note that this HTTP middleware stack is only used for "true" HTTP requests-- it is ignored for **virtual requests** (e.g. requests from a live Socket.io connection.)



##### Adding or overriding HTTP middleware

To configure a custom HTTP middleware function, define a new HTTP key `sails.config.http.middleware.foobar` and set it to the configured middleware function, then add the string name ("foobar") to your `sails.config.http.middleware.order` array wherever you'd like it to run in the middleware chain (a good place to put it might be right before "cookieParser"):

For example, in `config/http.js`:

```js
  middleware: {

    // Now configure the order/arrangement of our HTTP middleware
    order: [
      'cookieParser',
      'session',
      'passportInit',            // <==== passport HTTP middleware should run after "session"
      'passportSession',         // <==== (see https://github.com/jaredhanson/passport#middleware)
      'bodyParser',
      'compress',
      'foobar',                  // <==== we can put other, custom HTTP middleware like this wherever we want
      'methodOverride',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],


    // Define a custom HTTP middleware fn with the key `foobar`:
    foobar: (function (){
      console.log('Setting up `foobar` (HTTP middleware)...');
      return function (req,res,next) {
        console.log('Received HTTP request: '+req.method+' '+req.path);
        return next();
      };
    })(),

    // Define another couple of custom HTTP middleware fns with keys `passportInit` and `passportSession`
    // (notice that this time we're using an existing middleware library from npm)
    passportInit    : (function (){
      var passport = require('passport');
      var reqResNextFn = passport.initialize();
      return reqResNextFn;
    })(),

    passportSession : (function (){
      var passport = require('passport');
      var reqResNextFn = passport.session();
      return reqResNextFn;
    })(),

    // Override the built-in HTTP body parser:
    bodyParser: (function (){
      var skipper = require('skipper');
      var reqResNextFn = skipper({ strict: true });
      return reqResNextFn;
    })(),

  },
```

Every value assigned to a `sails.config.middleware.*` key should be a function which takes three arguments: `req`, `res` and `next`.  You&rsquo;; note in the above example that rather than setting the value to a "req, res, next" function directly, a self-calling (aka ["immediately-invoked"](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)) function is used that both configures and returns the final middleware.


### Express middleware in Sails

One of the really nice things about Sails apps is that they can take advantage of the wealth of already-existing Express/Connect middleware out there.  But a common question that arises when people _actually_ try to do this is:

> _"Where do I `app.use()` this thing?"_.

In most cases, the answer is to install the Express middleware as a custom HTTP middleware in [`sails.config.http.middleware`](http://sailsjs.org/documentation/reference/sails.config/sails.config.http.html).  This will trigger it for ALL HTTP requests to your Sails app, and allow you to configure the order in which it runs in relation to other HTTP middleware.

> You should never override or remove the `router` HTTP middleware.  It is built-in to Sails, and without it, your app's explicit routes and blueprint routes will not work.


##### Express middleware as policies

To make Express middleware apply only to a particular action, you can also include Express middleware as a policy-- just be sure that you actually want it to run for both HTTP _and_ virtual socket requests.

To do this, edit [`config/policies.js`](http://sailsjs.org/documentation/reference/sails.config/sails.config.policies.html).  You can either require and setup the middleware in an actual wrapper policy (usually a good idea) or just require it directly in your policies.js file.  The following example uses the latter strategy for brevity:

```js
var auth = require('http-auth');
var basic = auth.basic({
  realm: 'admin area'
}, function (username, password, onwards) {
  return onwards(username === 'Tina' && password === 'Bullock');
});

//...
module.exports.policies = {
  '*': [true],

  // Prevent end users from doing CRUD operations on products reserved for admins
  // (uses HTTP basic auth)
  'product/*': [auth.connect(basic)],

  // Everyone can view product pages
  'product/show': [true]
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






<docmeta name="displayName" value="Middleware">
