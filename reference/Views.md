# Views

### Overview

In Sails, views are HTML templates that are rendered _on the server_.  In most cases, views are used as a response to an incoming HTTP request, e.g. to serve your home page.

A notable alternative use case is sending HTML emails, in which case you'd want to use [`sails.renderView()`]() to render a view into a string you can use in your backend code.


By default, Sails is configured to use EJS ([Embedded Javascript](http://embeddedjs.com/)) as its view engine.  The syntax for EJS is highly conventional- if you've worked with php, asp, erb, gsp, jsp, etc., you'll immediately know what you're doing.

If you prefer to use a different view engine, there are a multitude of options.  Sails supports all of the view engines compatible with [Express]() via [Consolidate]().


###### Rendering a view
Anywhere you can access the `res` object (i.e. a controller action, custom response, or policy), you can use [`res.view`]() to send one of your views down to the requesting user.

You can also hook up a view to a route directly from your `routes.js` file:

```javascript
{
  'get /': {
    view: 'homepage'
  },
  'get /signup': {
    view: 'signupFlow/basicInfo'
  },
  'get /signup/password': {
    view: 'signupFlow/chooseAPassword'
  },
  // and so on.
}
```

###### What about single-page apps?

If you are building a web application for the browser, part (or all) of your navigation may take place on the client; i.e. instead of the browser fetching a new HTML page each time the user navigates around, the client-side code preloads some markup templates which are then rendered without needing to hit the server again directly.

In this case, you have a couple of options for bootstrapping the single-page app:

+ Use a single view, e.g. `views/publicSite.ejs`.  Advantages:
  + You can use the view engine in Sails to pass data from the server directly into the HTML that will be rendered on the client.  This is an easy way to get stuff like user data to your client-side javascript, without having to send AJAX/WebSocket requests from the client.
+ Use a single HTML page in your assets folder , e.g. `assets/index.html`. Advantages:
  + Although you can't pass server-side data directly to the client this way, this approach allows you to further decouple the client and server-side parts of your application.
  + Anything in your assets folder can be moved to a static CDN (like Cloudfront or CloudFlare), allowing you to take advantage of that provider's geographically distributed data centers to get your content closer to your users.



# Supported View Engines

+ EJS (.ejs)
+ Jade (.jade)
+ Handlebars (.hbs)
+ Dust (.dust)
+ Swig (.swg)

> TODO: add the rest