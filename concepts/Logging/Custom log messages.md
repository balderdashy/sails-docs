# Custom log messages

It is often useful to emit custom log messages or events from your application code; whether you are tracking the status of outbound emails sent in the background, or just looking for a configurable alternative to calling [`console.log()`](https://nodejs.org/api/console.html#console_console_log_data) in your application code.

For convenience, Sails exposes its internal logging interface as `sails.log`.  Its usage is purposely very similar to Node's `console.log()`, but with a handful of extra features; namely support for multiple log levels with colorized, prefixed console output.


## Available methods

Each of the log methods below accepts an infinite number of arguments of any data type, seperated by commas.  Like `console.log`, data passed as arguments to the Sails logger are automatically prettified for readability using Node's [`util.inspect()`](http://nodejs.org/api/util.html#util_util_inspect_object_options). Consequently, standard Node.js conventions apply; _any_ dictionaries, errors, dates, arrays, or other data types are pretty-printed using the built-in logic in [`util.inspect()`](https://nodejs.org/api/util.html#util_util_inspect_object_options) (e.g. you see `{ pet: { name: 'Hamlet' } }` instead of `[object Object]`.)  Also, if you log an object that has a custom `inspect()` method, the logger will run that method automatically and write the string it returns to the console.

> See the [`sails.log()`](http://sailsjs.org/documentation/reference/configuration/sails-config-log) reference page for more information and examples.


### `sails.log.error()`

Writes log output to `stderr` at the "error" log level.

```js
sails.log.error('Unexpected error occurred.');
// -> error: Unexpected error occurred.
```

### `sails.log.warn()`

Writes log output to `stderr` at the "warn" log level.

```js
sails.log.warn('File upload quota exceeded for user','request aborted.');
// -> warn: File upload quota exceeded for user- request aborted.
```


### `sails.log()`

_Or: sails.log.debug()_

The default log function, which writes console output to `stderr` at the "debug" log level.

```js
sails.log('hello');
// -> debug: hello.
```



### `sails.log.info()`

Writes log output to `stdout` at the "info" log level.

```js
sails.log.info('A new user (', 'mike@foobar.com', ') just signed up!');
// -> info: A new user ( mike@foobar.com ) just signed up!
```


### `sails.log.verbose()`

Writes log output to `stdout` at the "verbose" log level.
Useful for capturing detailed information about your app that you might only want to enable on rare occasions.

```js
sails.log.verbose('A user initiated an account transfer...')
// -> verbose: A user initiated an account transfer...
```


### `sails.log.silly()`

Writes log output to `stdout` at the "silly" log level.
Useful for capturing utterly ridiculous information about your app you only need on rare occasions.

```js
sails.log.silly('A user probably clicked on something..?');
// -> silly: A user probably clicked on something..?
```






<docmeta name="displayName" value="Custom log messages">

