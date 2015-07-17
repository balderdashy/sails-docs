# Routing to Controllers

By default, Sails will create a [blueprint action route](http://sailsjs.org/#!/documentation/reference/blueprint-api) for each action in a controller, so that a `GET` request to `/:controllerIdentity/:nameOfAction` will trigger the action.  If the example controller in the previous section was saved as `api/controllers/SayController.js`, then the `/say/hi` and `/say/bye` routes would be made available by default whenever the app was lifted.  If the controller was saved under the subfolder `/we`, then the routes would be `/we/say/hi` and `/we/say/bye`.  See the [blueprints documentation](http://sailsjs.org/#!/documentation/reference/blueprint-api) for more information about Sails&rsquo; automatic route binding.

Besides the default routing, Sails allows you to manually bind routes to controller actions using the [`config/routes.js`](http://sailsjs.org/#!/documentation/concepts/Routes) file.  Some examples of when you might want to use explicit routes are:

+ When you want to use separate actions to handle the same route path, based on the [HTTP method](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) (aka verb).  The aforementioned **action blueprint** routes bind *all* request methods for a path to a given action, including `GET`, `POST`, `PUT`, `DELETE`, etc.
+ When you want an action to be available at a custom URL (e.g. `PUT /login`, `POST /signup`, or a "vanity URL" like `GET /:username`)
+ When you want to set up additional options for how the route should be handled (e.g. special CORS configuration)

To manually bind a route to a controller action in the `config/routes.js` file, you can use the HTTP verb and path (i.e. the **route address**) as the key, and the controller name + `.` + action name as the value (i.e. the **route target**).

For example, the following manual route will cause your app to trigger the `makeIt()` action in `api/controllers/SandwichController.js` whenever it receives a POST request to `/make/a/sandwich`:

```js
  'POST /make/a/sandwich': 'SandwichController.makeIt'
```


> **Note:**
>
> For controller files saved in subfolders, the subfolder is part of the controller identity:
>
> ```js
>   '/do/homework': 'stuff/things/HomeworkController.do'
> ```
>
> This will cause the `do()` action in `api/controllers/stuff/things/HomeworkController.js` to be triggered whenever `/do/homework` is requested.

A full discussion of manual routing is out of the scope of this doc--please see the [routes documentation](http://sailsjs.org/#!/documentation/concepts/Routes) for a full overview of the available options.


<docmeta name="displayName" value="Routing to Controllers">
