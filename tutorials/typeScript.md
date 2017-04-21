# Using TypeScript in a Sails app

Sails supports using TypeScript to write your custom app code (like [actions](http://www.sailsjs.com/documentation/concepts/actions-and-controllers) and [models](http://sailsjs.com/documentation/concepts/models-and-orm)).  You can enable this support in three steps:

1. Run `npm install typescript-require --save` in your app folder.
2. Install the necessary typings for your app.  At the very least you'll probably want to:
   ```
   npm install @types/node --save
   npm install @types/express --save
   ```
3. Add the following line at the top of your app's `app.js` file:
```javascript
require('typescript-require');
```
4. Start your app with `node app.js` instead of `sails lift`.

Here's an example Typescript controller to get you started, courtesy of [@oshatrk](https://github.com/oshatrk):

```typescript
// api/controllers/TsController.js

import util = require('util');
import express = require('express');

declare var sails: any;

export function index(req:any, res:any, next: Function):any {
  console.log('index() from TsController.ts');
  res.status(200).send('Hello from Typescript!');
}

export function config(req: express.Request, res: express.Response, next: Function) {
  console.log('config() from TsController.ts');
  res.status(200)
     .send('<h1>sails.config :</h1><pre>' + util.inspect(sails.config) + '<pre>');
}
```

<docmeta name="displayName" value="Using TypeScript">
