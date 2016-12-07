# config/routes.js

This file is where you can define explicit routes to connect clients with the resources that they request.

When a user tries to access a resource on your app, Sails uses this file (and a few other things) in order to map the URL requested to it's appropriate controller action which upon authentication, will respond to the client with the requested resource.

By default, there is only one explicitly defined route.  Its purpose is to point users that try to access the base URL `http://localhost:1337/` to the view located in `myApp/views/home/index.ejs`. Feel free to add as many routes as you'd like to this file.

You can even define routes in a way such that part of the requested URL is treated as a request parameter. For example, `http://localhost:1337/ponies/PinkiePie` would request the resource with the 'id' parameter equal to 'PinkiePie'.



<docmeta name="displayName" value="routes.js">
