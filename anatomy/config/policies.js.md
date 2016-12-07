# config/policies.js

This file contains the default policies for your app.

Policies are simply Express middleware functions which run before your controllers. You can apply one or more policies to a given controller, or protect just one of it's actions. Any policy file (e.g. `myApp/api/policies/sessionAuth.js`) can be dropped into the `myApp/api/policies/` folder, at which point it can be accessed by it's filename, minus the extension, (e.g. `sessionAuth`).



<docmeta name="displayName" value="policies.js">
