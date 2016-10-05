# sails.config.routes

Configuration for custom (aka "explicit") routes.  `sails.config.routes` is a dictionary whose keys are URL paths (the "route address") and whose values are one of several types of route handler configurations (called the "route target").

For example:

```
module.exports.routes = {

    "GET /": {view: "homepage"},
    "POST /foo/bar": {controller: "FooController", action: "bar"}
}
```

Please see the [routes concept overview](http://sailsjs.org/documentation/concepts/Routes) for a full discussion of Sails routes, and the [custom routes documentation](http://sailsjs.org/documentation/concepts/Routes/RouteTargetSyntax.html) for a detailed description of the available configurations for both the route address and route target.


<docmeta name="displayName" value="sails.config.routes">
<docmeta name="pageType" value="property">

