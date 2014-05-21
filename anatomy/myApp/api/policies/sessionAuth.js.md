# myApp/api/policies/sessionAuth.js
### Purpose
This is an example policy file against which all routes are checked before allowing a client access to any part of your app.  By default, it allows everyone to access everything but this can (and probably should) be changed before you switch into production mode.     

In Sails, a policy is simply express middleware that does something to authenticate users before they are allowed to access some part of your app.  For more information on creating policies, you'll probably want to check our guide on it.

<docmeta name="uniqueID" value="sessionAuthjs444151">
<docmeta name="displayName" value="sessionAuth.js">

```
/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.authenticated) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};

```
