# 404.js

This is the default 404 (not found) handler.

If a request is made that has no matching [routes](https://github.com/balderdashy/sails-wiki/blob/0.9/routes.md), Sails will respond using this handler:



```javascript
module.exports[404] = function pageNotFound(req, res, defaultNotFoundBehavior) {

  // If the user-agent wants a JSON response,
  // the views hook is disabled,
  // or the 404 view doesn't exist,
  // send JSON
  if (req.wantsJSON || !sails.config.hooks.views || !res.view || !sails.hooks.views.middleware[404]) {
    return res.json({
      status: 404
    }, 404);
  }

  // Otherwise, serve the `views/404.*` page
  res.view('404');
  
};
```
For more information on 404/notfound handling in Sails/Express, check out: http://expressjs.com/faq.html#404-handling
