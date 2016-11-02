# req.options

`req.options` is a dictionary of additional information that allows your action to access its configured route options, if there are any.

### Route options

Any additional properties provided in a [route target](http://sailsjs.com/docs/concepts/routes/custom-routes#?route-target) are made available as properties of `req.options`.  For example, given the following in [`config/routes.js`](http://sailsjs.com/anatomy/config/routes-js):

```js
'GET /foo': {
  controller: 'UserController',
  action: 'login',
  owl: 'hoot'
}
```

In this example, `req.options.owl` will be available in our `UserController.login` action.


### With the blueprint API

Several special route options are always provided to [blueprint actions](http://sailsjs.com/docs/reference/blueprint-api).  This provides a way to programatically modify the criteria and/or values that a blueprint action uses when accessing models.  These options can be configured in a route, or set dynamically in a policy.

For example, `req.options` can be modified in a [policy](http://sailsjs.com/docs/concepts/policies) to filter requested records based on the logged-in user:

```javascript
// `config/policies/filterByUser.js`
module.exports = function filterByUser (req, res, next) {

  if (req.session.userId) {  

    req.options.where = {
      userId: req.session.userId
    }
    
  }

  return next();

}
```

> Making the transition between the blueprint API and writing custom actions?  Check out [Concepts > Controllers](http://sailsjs.com/docs/concepts/controllers).


<docmeta name="displayName" value="req.options">
