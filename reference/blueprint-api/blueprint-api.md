# Blueprint API

### Overview

For a conceptual overview of blueprints, see [Concepts > Blueprints](https://sailsjs.com/documentation/concepts/blueprints).

### Activating/deactivating blueprints in your app

The process for activating/deactivating blueprints varies slightly with the kind of blueprint route you are concerned with (RESTful routes, shortcut routes or action routes).  See the [Blueprint Routes documentation section](https://sailsjs.com/documentation/concepts/blueprints?blueprint-routes) for a discussion of the different blueprint types.


##### Disabling blueprints on a per-controller basis

You may also override any of the settings from [`config/blueprints.js`](https://sailsjs.com/documentation/anatomy/my-app/config/blueprints-js) on a per-controller basis by defining a `_config` key in your controller definition:

```javascript
// In /api/controllers/PetController.js
module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  }
}
```

### Overriding blueprints

##### RESTful / shortcut routes and actions

To override a RESTful blueprint route for a single model, simply create an action in the relevant controller file (or a [standalone action](https://sailsjs.com/documentation/concepts/actions-and-controllers#?standalone-actions) in the relevant folder) with the appropriate name: [_find_](https://sailsjs.com/documentation/reference/blueprint-api/find-where), [_findOne_](https://sailsjs.com/documentation/reference/blueprint-api/find-one), [_create_](https://sailsjs.com/documentation/reference/blueprint-api/create), [_update_](https://sailsjs.com/documentation/reference/blueprint-api/update), [_destroy_](https://sailsjs.com/documentation/reference/blueprint-api/destroy), [_populate_](https://sailsjs.com/documentation/reference/blueprint-api/populate), [_add_](https://sailsjs.com/documentation/reference/blueprint-api/add) or [_remove_](https://sailsjs.com/documentation/reference/blueprint-api/remove).

> If you&rsquo;d like to override a particular blueprint for _all_ models, check out the <a href="https://www.npmjs.com/package/sails-hook-custom-blueprints" target="_blank">sails-hook-custom-blueprints plugin</a>.
> It's important to realize that, even if you haven't defined these yourself, Sails will respond with built-in CRUD logic for each model in the form of a JSON API (including support for sort, pagination, and filtering) as long as action or shortcut blueprints are enabled in your [blueprints configuration](https://sailsjs.com/documentation/reference/configuration/sails-config-blueprints.


### Blueprints and resourceful pubsub

The blueprint API (just like any of your custom actions and policies) is compatible with WebSockets, thanks to the virtual request interpreter.  Check out the reference section on the browser SDK ([Reference > WebSockets > sails.io.js](https://sailsjs.com/documentation/reference/web-sockets/socket-client)) for example usage.

##### Blueprints and `.subscribe()`

By default, the **Find** and **Find One** blueprint actions will call [`.subscribe()`](https://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub/subscribe) automatically when a socket request is used. This subscribes the requesting socket to each of the returned records.  However, if the _same_ socket sends a request to the **Update** or **Destroy** actions with `io.socket.put()` (for example) this will *not* cause a message to be sent to the requesting socket by default--only to the *other* connected, subscribed sockets.  This is intended to allow UI code to use the client-side SDK's callback to handle the server response separately; e.g. to replace a loading spinner.


##### Blueprints and "auto-watch"

By default, the **find** blueprint action (when triggered via a WebSocket request) will subscribe the requesting socket to notifications about _new_ instances of that model being created.  This behavior can be changed for all models by setting [`sails.config.blueprints.autoWatch`](https://sailsjs.com/documentation/reference/configuration/sails-config-blueprints) to `false`.


<docmeta name="displayName" value="Blueprint API">
