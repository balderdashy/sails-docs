# sails.log()

Log a message or some data at the "debug" [log level](http://preview.sailsjs.org/documentation/reference/configuration/sails-config-log) using Sails' [built-in logger](http://sailsjs.org/documentation/concepts/logging).


```javascript
sails.log(...);
```

_Or:_
+ `sails.log.error(...);`
+ `sails.log.warn(...);`
+ `sails.log.debug(...);`
+ `sails.log.info(...);`
+ `sails.log.verbose(...);`
+ `sails.log.silly(...);`



### Usage

While this function is also called internally by Sails, the primary purpose of `sails.log()` is to provide a configurable alternative to calling `console.log()` directly in your application code.  Consequently, usage of `sails.log()` et. al. is almost identical to that of [`console.log()`](https://nodejs.org/api/console.html#console_console_log_data) in Node core; including support for:
 - an [unlimited number](https://en.wikipedia.org/wiki/Variadic_function) of arguments, separated by commas
 - printf-style parameterization (a la [`util.format()`](https://nodejs.org/api/util.html#util_util_format_format))
 - non-string arguments are automatically prettified (a la [`util.inspect()`](https://nodejs.org/api/util.html#util_util_inspect_object_options)

Note that standard Node.js conventions apply- i.e. if you log an object with a custom `inspect()` method, that method will run automatically, and the string that it returns will be written to the console.  Similarly, objects, dates, arrays, and most other data types are pretty-printed using the built-in logic in `util.inspect()` (e.g. you see `{ pet: { name: 'Hamlet' } }` instead of `[object Object]`.)



### Example

```javascript
var sum = +req.param('x') + +req.param('y');
sails.log();
sails.log('Hey %s, did you know that the sum of %d and %d is %d?', req.param('name'), +req.param('x'), +req.param('y'), sum);
sails.log('Bet you didn\'t know robots could do math, huh?');
sails.log();
sails.log('Anyways, here is a dictionary containing all the parameters I received in this request:', req.allParams());
sails.log('Until next time!');
return res.ok();
```




### Notes
> - For a deeper conceptual exploration of logging in Sails, see [concepts/logging](http://sailsjs.org/documentation/concepts/logging).
> - Remember: in addition to being exposed as an alternative to calling `console.log` directly, the built-in logger in Sails is called internally by the framework.  The Sails logger can be configured, or completely overridden using built-in log configuration settings ([`sails.config.log`](http://sailsjs.org/documentation/reference/configuration/sails-config-log)).
> - Keep in mind that, like any part of Sails, using `sails.log` is completely optional.  Most Sails apps take advantage of the built-in logger; while some users prefer to stick with `console.log()`, while still others `require()` more feature-rich libraries like [Winston](https://www.npmjs.com/package/winston). If you aren't sure what your app needs yet, start with the built-in logger and go from there.

<docmeta name="displayName" value="sails.log()">
<docmeta name="pageType" value="method">

