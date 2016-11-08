# policies/sessionAuth.js

### Purpose
This is a policy file.  Like any policy, you can apply it to any of your controller actions.  (See [config/policies.js](http://sailsjs.com/anatomy/config/policies-js) for more information on how to configure policies to apply to controller actions.)

The main purpose of `sessionAuth.js` is as an example.  But for many apps, this simple session authentication policy will actually be the only policy you need.  Use it to protect actions that _should never_ allow unauthenticated users.

### How it works
This policy prevents access for all but authenticated users.  It simply checks `req.session.userId`, and if it is [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy), then it interprets that to mean this request came from a logged-in user.  So in that case, it proceeds to the next policy-- or, if this is the last policy, the relevant action.  Otherwise, if `req.session.userId` is _not_ truthy, the policy sends a 403 response using [`res.forbidden()`](http://sailsjs.org/documentation/reference/response-res/res-forbidden).


### Assumptions
This policy assumes that, in the controller actions that you use to authenticate a user, you set `req.session.userId` to a truthy value.  A common best practice is to use the `id` of the signed-in user.  For example, you might include the following code in a `handleLogin` action that receives requests from your login form:

```js
User.findOne({
  username: req.param('username'),
  password: req.param('password')
}).exec(function (err, matchingUser) {
  if (err) { return res.serverError(err); }
  if (!matchingUser) { return res.notFound(); }

  //--•
  // Save the id of the user in their secure session.
  // > This tracks this requesting user agent as authenticated,
  // > and gives us a way to access the user id of this logged-in
  // > user when they send subsequent requests.
  req.session.userId = matchingUser.id;

  return res.ok();

});
 ```

### More about policies

For more information about policies and how to use them in your app, see [Concepts > Policies](http://sailsjs.com/docs/concepts/policies).

> It's best to avoid implementing numerous or complex policies in your app.  Instead, when implementing features like granular, role-based permissions, rely on your [actions](http://sailsjs.com/docs/concepts/controllers) to reject unwanted access.  Your actions should also be responsible for any necessary personalization of the view locals and JSON response data you send in the response.
>
> For example, if you need to implement user-level or role-based permissions in your application, the most straightforward approach is to take care of the relevant checks at the top of your controller action-- either inline, or by calling out to a helper.  Following this best practice will significantly enhance the maintainability of your code.


<docmeta name="displayName" value="sessionAuth.js">
