# req.options.values.where

Default &ldquo;where&rdquo; criteria for user with blueprint [`find`](http://sailsjs.org/documentation/reference/blueprint-api/Find.html) and [`update`](http://sailsjs.org/documentation/reference/blueprint-api/Update.html) actions.

> Note: Before using `req.options.where`, confirm that it exists and create it if necessary.

### Example

To default to finding only records where `userId` matches the logged-in user&rsquo;s id:

```javascript
// In config/policies/filterByUser.js
module.exports = function filterByUser (req, res, next) {

  if (req.session.user) {

    // Use existing req.options.where, or initialize it to an empty object
    req.options.where = req.options.where || {};

    // Set the default `userId` for "find" and "update" blueprints
    req.options.where.userId = req.session.user.id;

  }

  return next();

}
```

Then [apply this policy](http://sailsjs.org/documentation/concepts/Policies?q=to-apply-a-policy-to-a-specific-controller-action) to the desired blueprint actions.

<docmeta name="displayName" value="req.options.where">
