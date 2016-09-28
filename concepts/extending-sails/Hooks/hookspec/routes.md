# `.routes`

The `routes` feature allows a custom hook to easily bind new routes to a Sails app at load time.  If implemented, `routes` should be an object with either a `before` key, an `after` key, or both.  The values of those keys should in turn be objects whose keys are [route addresses](http://sailsjs.org/documentation/concepts/Routes/RouteTargetSyntax.html?q=route-address), and whose values are route-handling functions with the standard `(req, res, next)` parameters.  Any routes specified in the `before` object will be bound *before* custom user routes (as defined in [sails.config.routes](http://sailsjs.org/documentation/reference/sails.config/sails.config.routes.html)) and [blueprint routes](http://sailsjs.org/documentation/reference/blueprint-api?q=blueprint-routes).  Conversely, routes specified in the `after` object will be bound *after* custom and blueprint routes.  For example, consider the following `count-requests` hook:

```javascript
module.exports = function (sails) {

    return {

        initialize: function (cb) {
            const self = sails.hooks['count-requests'];
            self.numRequestsSeen = 0;
            self.numUnhandledRequestsSeen = 0;
            return cb();
        },

        routes: {
            before: {
                'GET /*': function (req, res, next) {
                    const self = sails.hooks['count-requests'];
                    self.numRequestsSeen++;
                    return next();
                }
            },
            after: {
                'GET /*': function (req, res, next) {
                    const self = sails.hooks['count-requests'];
                    self.numUnhandledRequestsSeen++;
                    return next();
                }
            }
        }
    };
};
```

This hook will process all requests via the function provided in the `before` object, and increment its `numRequestsSeen` variable.  It will also process any *unhandled* requests via the function provided in the `after` object&mdash;that is, any routes that aren't bound in the app via a custom route configuration or a blueprint.  

> The two variables set up in the hook will be available to other modules in the Sails app as `sails.hooks["count-requests"].numRequestsSeen` and `sails.hooks["count-requests"].numUnhandledRequestsSeen`


<docmeta name="displayName" value=".routes">
<docmeta name="stabilityIndex" value="3">
