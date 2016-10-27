# Routing to Actions

By default, Sails will create a [blueprint action route](http://sailsjs.org/documentation/reference/blueprint-api) for each action, so that a `GET` request to `/:actionIdentity` will trigger the action.  For example, an action saved as `api/controllers/user/sign-up` would be bound to a `/user/sign-up` route.  See the [blueprints documentation](http://sailsjs.org/documentation/reference/blueprint-api) for more information about Sails&rsquo; automatic route binding.

Besides the default routing, Sails allows you to manually bind routes to actions using the [`config/routes.js`](http://sailsjs.org/documentation/concepts/Routes) file.  Some examples of when you might want to use explicit routes are:

+ When you want to use separate actions to handle the same route path, based on the [HTTP method](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) (aka verb).  The aforementioned **action blueprint** routes bind *all* request methods for a path to a given action, including `GET`, `POST`, `PUT`, `DELETE`, etc.
+ When you want an action to be available at a custom URL (e.g. `PUT /login`, `POST /signup`, or a "vanity URL" like `GET /:username`)
+ When you want to set up additional options for how the route should be handled (e.g. special CORS configuration)

To manually bind a route to an action in the `config/routes.js` file, you can use the HTTP verb and path (i.e. the **route address**) as the key, and the action identity as the value (i.e. the **route target**).

For example, the following manual route will cause your app to trigger the action in `api/controllers/sandwich/make-it.js` whenever it receives a POST request to `/make/a/sandwich`:

```js
  'POST /make/a/sandwich': 'sandwich/make-it'
```

For a full discussion of manual routing, please see the [routes documentation](http://sailsjs.org/documentation/concepts/Routes).


<docmeta name="displayName" value="Routing to Actions">
