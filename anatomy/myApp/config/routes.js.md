# myApp/config/routes.js
### Purpose
This file is where you can define explicit routes to connect clients with the resources that they request.

When a user tries to access a resource on your app, Sails uses this file (and a few other things) in order to map the URL requested to it's appropriate controller action which upon authentication, will respond to the client with the requested resource.  

By default, there is only one explicitely defined route.  Its purpose is to point users that try to access the base URL `http://localhost:1337/` to the view located in `myApp/views/home/index.ejs`. Feel free to add as many routes as you'd like to this file.  

You can even define routes in a way such that part of the requested URL is treated as a request parameter. For example, `http://localhost:1337/ponies/PinkiePie` would request the resource with the 'id' parameter equal to 'PinkiePie'.


<docmeta name="uniqueID" value="routesjs120276">
<docmeta name="displayName" value="routes.js">

```
/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://links.sailsjs.org/docs/config/routes
 */

module.exports.routes = {


  // Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, etc. depending on your
  // default view engine) your home page.
  //
  // (Alternatively, remove this and add an `index.html` file in your `assets` directory)
  '/': {
    view: 'homepage'
  },


  // Custom routes here...


  // If a request to a URL doesn't match any of the custom routes above,
  // it is matched against Sails route blueprints.  See `config/blueprints.js`
  // for configuration options and examples.

};

```
