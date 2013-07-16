## 404.js

When you recieve a 404 response from the server, the error handler is contained in this file. By default, the server will first try to send JSON containing the 404 error status. If your app is using server side views, then a 404 view will be sent. Here is the default implementation.

```javascript
module.exports[404] = function pageNotFound (req, res, defaultNotFoundBehavior) {
  
  // If the user-agent wants a JSON response,
  // the views hook is disabled,
  // or the 404 view doesn't exist,
  // send JSON
  if (req.wantsJSON || 
    !sails.config.hooks.views || !res.view ||
    !sails.hooks.views.middleware[404]) {
    return res.json({
      status: 404
    }, 404);
  }

  // Otherwise, serve the `views/404.*` page
  res.view('404');
  
};
```
