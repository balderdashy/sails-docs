# Assets

### Overview

Assets refer to [static files](http://en.wikipedia.org/wiki/Static_web_page) (js, css, images, etc) on your server that you want to make accessible to the outside world.  In Sails, these files are placed in the [`assets/`](http://sailsjs.org/documentation/anatomy/myApp/assets) folder.  When you lift your app, add files to your `assets/` folder, or change existing assets, Sails' built-in asset pipeline processes and syncs those files to a hidden folder (`.tmp/public/`).

> This intermediate step (moving files from `assets/` into `.tmp/public/`) allows Sails to pre-process assets for use on the client - things like LESS, CoffeeScript, SASS, spritesheets, Jade templates, etc.

The contents of this `.tmp/public` folder are what Sails actually serves at runtime.  This is roughly equivalent to the "public" folder in [express](https://github.com/expressjs), or the `www/` folder you might be familiar with from other web servers like Apache.


### Static middleware

Behind the scenes, Sails uses the [static middleware](http://www.senchalabs.org/connect/static.html) from Express to serve your assets. You can configure this middleware (e.g. cache settings) in [`/config/http.js`](http://sailsjs.org/documentation/reference/sails.config/sails.config.http.html).

##### `index.html`
Like most web servers, Sails honors the `index.html` convention.  For instance, if you create `assets/foo.html` in a new Sails project, it will be accessible at `http://localhost:1337/foo.html`.  But if you create `assets/foo/index.html`, it will be available at both `http://localhost:1337/foo/index.html` and `http://localhost:1337/foo`.

##### Precedence
It is important to note that the static [middleware](http://stephensugden.com/middleware_guide/) is installed **after** the Sails router.  So if you define a [custom route](http://sailsjs.org/documentation/concepts/Routes?q=custom-routes), but also have a file in your assets directory with a conflicting path, the custom route will intercept the request before it reaches the static middleware. For example, if you create `assets/index.html`, with no routes defined in your [`config/routes.js`](http://sailsjs.org/documentation/reference/sails.config/sails.config.routes.html) file, it will be served as your home page.  But if you define a custom route, `'/': 'FooController.bar'`, that route will take precedence.



<docmeta name="displayName" value="Assets">
