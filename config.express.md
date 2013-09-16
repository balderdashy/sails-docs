# Express
This configuration file lets you easily add [Express](http://expressjs.com/) middleware, local variables and helpers for templates and directly access the application instance before it starts. 

```javascript
module.exports.express = {

  customMiddleware: false
  
  /*
  // Say you want to use `connect-flash` for messaging within a session 
  customMiddleware: function (app) {
    var flash = require('connect-flash');
    app.use(flash());
  }
  
  */
  
};
```