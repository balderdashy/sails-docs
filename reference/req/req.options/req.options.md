# req.options
`req.options` allows altering of (or providing defaults for) request parameters without modifying the original object.

Any properties provided in a [custom route configuration](http://sailsjs.org/documentation/concepts/Routes/RouteTargetSyntax.html) are made available in the `req.options` object.  For example, given the following in [`config/routes.js`](http://sailsjs.org/documentation/reference/sails.config/sails.config.routes.html):

```js
"GET /foo": {controller: 'user', action: 'myAction', owl: 'hoot'}
```

`req.options.controller`, `req.options.action` and `req.options.owl` will all be available.

Additionally, several special `req.options` objects are available for use with [blueprints](http://sailsjs.org/documentation/reference/blueprint-api), specifically to programatically change the criteria and/or values that a blueprint action uses when accessing a data store.  These are best used in [policies](http://sailsjs.org/documentation/concepts/Policies) to, for example, filter requested records based on the logged-in user.

### Example

In a `config/policies/filterByUser.js` policy:

```javascript
module.exports = function filterByUser (req, res, next) {

  if (req.session.user) {

    req.options.where = req.options.where || {};
    req.options.where.userId = req.session.user.id;

  }

  return next();

}
```

<docmeta name="displayName" value="req.options">
