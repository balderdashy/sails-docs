# Logs

### Overview
Sails comes with a simple, built-in logger called [`captains-log`](https://github.com/balderdashy/captains-log).  Its usage is purposely very similar to Node's [`console.log`](http://nodejs.org/api/stdio.html), but with a handful of extra features; namely support for multiple log levels with colorized, prefixed console output.

### Configuration
The Sails logger's configuration is located in [`sails.config.log`](), for which a conventional configuration file ([`config/log.js`]()) is bundled in new Sails projects out of the box.

When configured at a given log level, Sails will output log messages that are output at a level at or above the currently configured level. The hierarchy is defined by the chart below:

| Priority | level     | Log fns visible   |
|----------|-----------|-------------------|
| 7        | silent    | N/A
| 6        | error     | `.error()`            |
| 5        | warn      | `.warn()`, `.error()` |
| 4        | debug     | `.debug()`, `.warn()`, `.error()` |
| 3        | info      | `.info()`, `.debug()`, `.warn()`, `.error()` |
| 2        | verbose   | `.verbose()`, `.info()`, `.debug()`, `.warn()`, `.error()` |
| 1        | silly     | `.silly()`, `.verbose()`, `.info()`, `.debug()`, `.warn()`, `.error()` |


#### Notes
+ The default log level is "info".  When your app's log level is set to "info", Sails logs limited information about the server/app's status.
+ When the log level is set to "silly", Sails outputs internal information on which routes are being bound and other detailed framework lifecycle information, diagnostics, and implementation details.
+ When the log level is set to "verbose", Sails logs Grunt output, as well as much more detailed information on the routes, models, hooks, etc. that were loaded.


### Usage
Each of the methods below accepts an infinite number of arguments of any data type, seperated by commas. Like `console.log`, data passed as arguments to the Sails logger is automatically prettified for readability using Node's [`util.inspect()`](http://nodejs.org/api/util.html#util_util_inspect_object_options). Consequently, standard Node.js conventions apply- i.e. if you log an object with an `inspect()` method, it will be run automatically, and the string that it returns will be written to the console.  Similarly, objects, dates, arrays, and most other data types are pretty-printed using the built-in logic in `util.inspect()` (e.g. you see `{ pet: { name: 'Hamlet' } }` instead of `[object Object]`.)


#### `sails.log()`

The default log function, which writes console output to `stderr` at the "debug" log level.

```js
sails.log('hello');
// -> debug: hello.
```

#### `sails.log.error()`

Writes log output to `stderr` at the "error" log level.

```js
sails.log.error('Unexpected error occurred.');
// -> error: Unexpected error occurred.
```

#### `sails.log.warn()`

Writes log output to `stderr` at the "warn" log level.

```js
sails.log.warn('File upload quota exceeded for user','request aborted.');
// -> warn: File upload quota exceeded for user- request aborted.
```

#### `sails.log.debug()`
_Alias for `sails.log()`_

#### `sails.log.info()`

Writes log output to `stdout` at the "info" log level.

```js
sails.log.info('A new user (', 'mike@foobar.com', ') just signed up!');
// -> info: A new user ( mike@foobar.com ) just signed up!
```


#### `sails.log.verbose()`

Writes log output to `stdout` at the "verbose" log level.
Useful for capturing detailed information about your app that you might only want to enable on rare occasions.

```js
sails.log.verbose('A user initiated an account transfer...')
// -> verbose: A user initiated an account transfer...
```


#### `sails.log.silly()`

Writes log output to `stdout` at the "silly" log level.
Useful for capturing utterly ridiculous information about your app you only need on rare occasions.

```js
sails.log.silly('A user probably clicked on something..?');
// -> silly: A user probably clicked on something..?
```



