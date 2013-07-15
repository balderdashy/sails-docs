## local.js
This file holds local overrides for an app.  For example, if you wanted to use a different port than the one for the app.

```javascript
// Local configuration
// 
// Included in the .gitignore by default,
// this is where you include configuration overrides for your local system
// or for a production deployment.
//
// For example, to use port 80 on the local machine, override the `port` config

module.exports.host = '127.0.0.1';
module.exports.port = 8080;
module.exports.environment = 'production';
```
Many of the other configuration items in the other files can be included here for local overrides.  They normally follow the naming convention of ```module.exports.*configOption*```. This can be determined by looking at the config files themselves.  For example, the adapters would be ```module.exports.adapters.default = mysql```
