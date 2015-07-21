# req.options.values

Default values for blueprint [`create`](http://sailsjs.org/documentation/reference/blueprint-api/Create.html) and [`update`](http://sailsjs.org/documentation/reference/blueprint-api/Update.html) actions.

> Note: Before using `req.options.value`, confirm that it exists and create it if necessary.

### Example

To default to using the logged-in user&rsquo;s name when creating a new record:

```
// In config/policies/createWithUserName.js
module.exports = function createWithUserName (req, res, next) {

  if (req.session.user) {

    // Use existing req.options.values, or initialize it to an empty object
    req.options.values = req.options.values || {};

    // Set the default `name` for "create" and "updates" blueprints
    req.options.values.name = req.session.user.name;

  }

  return next();

}
```

Then [apply this policy](http://sailsjs.org/documentation/concepts/Policies?q=to-apply-a-policy-to-a-specific-controller-action) to the desired blueprint actions.

<docmeta name="displayName" value="req.options.values">
