# sails.config.globals


Configuration for the [global variables](./#!documentation/reference/Globals) that Sails exposes to its Node process.  The options are conventionally specified in the [`config/globals.js`](/#/documentation/anatomy/myApp/config/globals.js.html) configuration file.



### Properties

| Property    | Type       | Default   | Details |
|-------------|:----------:|-----------|---------|
| `sails` | ((boolean)) | `true` | Expose the `sails` instance representing your app.  If this is disabled, you can still get access via `req._sails`.
| `models` | ((boolean)) | `true` | Expose each of your app's models as global variables (using their "globalId").  E.g. a model defined in `api/models/User.js` would have a globalId of `User` by default.   If this is disabled, you can still access your models via `sails.models.*`.
| `services` | ((boolean)) | `true` | Expose each of your app's services as global variables (using their "globalId").  E.g. a service defined in `api/models/NaturalLanguage.js` would have a globalId of `NaturalLanguage` by default.  If this is disabled, you can still access your services via `sails.services.*`.
| `_`  | ((boolean))     | `true`  | Expose the `lodash` installed in Sails core as a global variable. If this is disabled, like [any other node module](https://soundcloud.com/marak/marak-the-node-js-rap) you can always run `npm install lodash --save`, then `var _ = require('lodash')` at the top of any file.
| `async`  | ((boolean)) | `true` | Expose the `async` installed in Sails core as a global variable.  If this is disabled, like [any other node module](https://soundcloud.com/marak/marak-the-node-js-rap) you can always run `npm install async --save`, then `var async = require('async')` at the top of any file.

### Notes

> + To disable all global variables, you can set `sails.config.globals` to `false`.



<docmeta name="uniqueID" value="sailsconfigglobals588825999999">
<docmeta name="displayName" value="sails.config.globals">

