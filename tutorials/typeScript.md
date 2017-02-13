# Using TypeScript in a Sails App

Sails supports using TypeScript to write your custom app code (like [actions](http://www.sailsjs.com/documentation/concepts/actions-and-controllers) and [models](http://www.sailsjs.com/documentation/concepts/core-concepts-table-of-contents/models-and-orm)).  You can enable this support in three steps:

1. Run `npm install ts-node` in your app folder.
2. Add the following line at the top of your app's `app.js` file:
```javascript
require('ts-node').register({ /* options */ }); // See options in https://www.npmjs.com/package/ts-node
```
3. Start your app with `node app.js` instead of `sails lift`.

<docmeta name="displayName" value="Using TypeScript">
