# tasks/config/uglify.js

This file configures a Grunt task called "uglify".

Its job is to [minify](https://en.wikipedia.org/wiki/Minification_(programming)) client-side JavaScript files.  Internally, it uses [UglifyJS](https://www.npmjs.com/package/uglifyjs).

### Usage

For additional usage documentation, see [`grunt-contrib-uglify`](https://npmjs.com/package/grunt-contrib-uglify).

### ES6 and beyond

The default "uglify" task _cannot_ handle client-side JavaScript written with >=ES6 syntax (arrow functions, `await`, etc.).  This is because, at the time of this release, the `grunt-contrib-uglify` plugin does not support client-side JavaScript files written using ES6 syntax.  For this reason, we've included the "babel" step in the Grunt tasks for the production environment, which takes care of this out of the box.

> If you encounter issues related issues, stop by https://sailsjs.com/support for advice and troubleshooting help.


### Minification without transpilation

If your client-side JavaScript code (`assets/js/` or `assets/dependencies/`) is written using this syntax, and you want minification to work, you will need to make sure not to remove the provided `babel` task (as well as the recommended `polyfill` task to provide polyfills for features such as Promises), or else use a different uglifier.  For example, if you'd prefer not to use Babel to transpile your code, but still want it uglified, you might try installing the "harmony" branch of grunt-contrib-uglify with:

```bash
npm install gruntjs/grunt-contrib-uglify#harmony --save-dev --save-exact
```

You'd then want to remove `polyfill:prod` and `babel` from the production tasks (`tasks/register/prod.js` and `tasks/register/buildProd.js`).

<docmeta name="displayName" value="uglify.js">
