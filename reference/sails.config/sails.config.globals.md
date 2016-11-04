# sails.config.globals


Configuration for the [global variables](https://developer.mozilla.org/en-US/docs/Glossary/Global_variable) that Sails exposes by default.  The options are conventionally specified in the [`config/globals.js`](http://sailsjs.com/anatomy/config/globals-js) configuration file.



### Properties

| Property    | Type       | Default   | Details |
|:-----------|:----------:|:----------|:--------|
| `_` _(underscore)_  | ((ref))<br/>_or_<br/>((boolean))     | `require('lodash')`  | Expose the specified `lodash` as a global variable (`_`).  Or set this to `false` to disable the `_` global altogether.  _(More on that below.)_
| `async`  | ((ref))<br/>_or_<br/>((boolean)) | `require('async')` | Expose the specified `async` as a global variable (`async`).  Or set this to `false` to disable the `async` global altogether. _(More on that below.)_
| `models` | ((boolean)) | `true` | Expose each of your app's models as a global variable (using its "globalId").  For example, a model defined in `api/models/User.js` would have a "globalId" of `User`.   If this is disabled, then you can still access all of your models by identity in the [`sails.models`](http://sailsjs.org/documentation/reference/application#?sailsmodels) dictionary.
| `sails` | ((boolean)) | `true` | Expose the `sails` instance representing your app.  Even if this is disabled, you can still get access to it in your actions via `env.sails`, or in your policies via `req._sails`.
| `services` | ((boolean)) | `true` | Expose each of your app's services as global variables (using their "globalId").  E.g. a service defined in `api/services/NaturalLanguage.js` would have a globalId of `NaturalLanguage` by default.  If this is disabled, you can still access your services via `sails.services.*`.



### Using Lodash (`_`) and async without globals

If you have to disable globals, but would still like to use Lodash and/or async, you're in luck.  With Node.js and NPM, importing modules is very straightforward.

To use your own version of Lodash or async without relying on globals, first modify the relevant settings in `config/globals.js`:

```js
// Disable `_` and `async` globals.
_: false,
async: false,
```

Then install your own Lodash:

```sh
npm install lodash --save --save-exact
```

Or async:

```sh
npm install async --save --save-exact
```


Finally, just like you'd import [any other Node.js module](https://soundcloud.com/marak/marak-the-node-js-rap), include `var _ = require('lodash');` or `var async = require('async')` at the top of any file where you need them.



### Using a different version of `lodash` or `async`

As of Sails v1.0, to use your own version of Lodash or async, you just need to `npm install` the version you want.  For example, to install the latest version of Lodash 4.x.x:

```sh
npm install lodash@^4.x.x --save --save-exact
```



### Notes

> + As a shortcut to disable _all_ of the above global variables, you can set `sails.config.globals` itself to `false`.  This does the same thing as if you had manually disabled each of the settings above.
> + In previous versions of Sails, when `sails.config.globals._` or `sails.config.globals.async` was set to `true`, Sails would expose its own internal `lodash` and/or `async` dependency.  If you are migrating an app built before Sails v1.0 and want to use the same lodash and async version as before, run `npm install lodash@3.10.1 async@1.5.2 --save --save-exact`, then modify `config/globals.js` to pass in `_: require('lodash')` and `async: require('async')`.  See [lodash/lodash#2768](https://github.com/lodash/lodash/issues/2768) for more background.




<docmeta name="displayName" value="sails.config.globals">
<docmeta name="pageType" value="property">

