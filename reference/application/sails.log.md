# sails.log()

Log a message or some data at the debug log level.


```javascript
sails.log(...);
```


### Usage

_This function accepts [any number](https://en.wikipedia.org/wiki/Variadic_function) of arguments._

Usage of `sails.log()` is almost identical to that of [`console.log()`](https://nodejs.org/api/console.html#console_console_log_data) in Node core; including support for:
 - an unlimited number of arguments
 - printf-style parameterization (a la [`util.format()`](https://nodejs.org/api/util.html#util_util_format_format))
 - automatically inspecting non-string arguments (a la [`util.inspect()`](https://nodejs.org/api/util.html#util_util_inspect_object_options)


#### Returns

_N/A_



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
> - The built-in logger in Sails is called internally by the framework, but also exposed as an alternative to calling `console.log()` directly.  Keep in mind that the Sails logger can be configured, or completely overridden using built-in log configuration settings ([`sails.config.log`](http://sailsjs.org/documentation/reference/configuration/sails-config-log)).
> - Keep in mind that, like any part of Sails, using `sails.log` is completely optional.  Most Sails apps take advantage of the built-in logger; while some users prefer to stick with `console.log()`, while still others `require()` more feature-rich libraries like [Winston](https://www.npmjs.com/package/winston). If you aren't sure what your app needs yet, start with the built-in logger and go from there.

<docmeta name="displayName" value="sails.getRouteFor()">
