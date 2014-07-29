# sails.config.routes

Configuration for custom (aka "explicit") routes.  `sails.config.routes` consists of a single Javascript object whose keys are URL paths (the "address") and whose values are one of several types of route handler configurations (the "target"), for example:

```
module.exports.routes = {

    "GET /": {view: "homepage"},
    "POST /foo/bar": {controller: "FooController", action: "bar"}

}
```

Please see the [routes concept overview](/#/documentation/concepts/Routes) for a full discussion of Sails routes, and the [custom routes documentation](/#/documentation/concepts/Routes/RouteTargetSyntax.html) for a detailed description of the available configurations for both the route address and target.

<docmeta name="uniqueID" value="sailsconfigroutes141736">
<docmeta name="displayName" value="sails.config.routes">

