# req.options.values

Default values for blueprint [`create`](http://sailsjs.com/documentation/reference/blueprint-api/Create.html) and [`update`](http://sailsjs.com/documentation/reference/blueprint-api/Update.html) actions.

> Note: Before using `req.options.value`, confirm that it exists and create it if necessary.

### Example

To default to using the logged-in user&rsquo;s name when creating a new record:

```javascript
// In config/policies/createWithUserName.js
module.exports = function createWithUserName (req, res, next) {

  // If no user is logged in, continue on.
  if (!req.session.userId) { return next(); }

  // Load the user from the database
  User.findOne(req.session.userId).exec(function(err, user) {
    if (err) {return res.serverError(err);}

    // Use existing req.options.values, or initialize it to an empty object
    req.options.values = req.options.values || {};

    // Set the default `name` for "create" and "updates" blueprints
    req.options.values.name = user.name;

    return next();

  });


}
```

Then [apply this policy](http://sailsjs.com/documentation/concepts/Policies?q=to-apply-a-policy-to-a-specific-controller-action) to the desired blueprint actions.

<docmeta name="displayName" value="req.options.values">
