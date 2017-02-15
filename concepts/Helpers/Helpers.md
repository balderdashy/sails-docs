# Helpers

As of version 1.0, all Sails apps come with built-in support for **helpers**, simple utilities that let you share Node.js code in more than one place.  This helps you avoid repeating yourself, and makes development more efficient by reducing bugs and minimizing rewrites.  It also makes it much easier to create documentation for your app.

### Overview

In Sails, helpers are the recommended approach for pulling repeated code into a separate file, then reusing that code in various [actions](http://sailsjs.com/documentation/concepts/actions-and-controllers), [custom responses](http://sailsjs.com/documentation/concepts/custom-responses) or even other helpers. You don't _have_ to use helpers-- in fact you might not even need them right at first.  But as your code base grows, helpers will become more and more important for your app's maintainability.  (Plus, they're really convenient.)

For example, in the course of creating the actions that your Node.js/Sails app uses to respond to client requests, you will sometimes find yourself repeating code in several places.  So in order to avoid repeating yourself, and to make the development and documentation of your app more efficient, Sails provides **helpers** as 

```javascript
sails.helpers.sayHello({ name: 'Bubba' }).exec(function(err, greeting) {
  if (err) { return res.serverError(err); }
  
  // `greeting` is now "Hello, Bubba!"
  return res.ok();
});
```

> The example above demonstrates calling a helper from an action, but helpers can be called from almost anywhere in your code; as long as that place has access to the [`sails` app instance](http://sailsjs.com/documentation/reference/application).

### How helpers are defined

Helpers follow the <a href="http://node-machine.org" target="_blank">node-machine specification</a> (like [Actions2-style actions](http://sailsjs.com/documentation/concepts/actions-and-controllers#?actions-2)).  Here's an example of a small, well-defined helper:

```javascript
// api/helpers/say-hello.js
module.exports = {


  friendlyName: 'Say hello',


  description: 'A utility that accepts a name and creates a greeting.',


  sync: true, // See the `Synchronous helpers` documentation later in this document


  inputs: {

    name: {
      type: 'string',
      description: 'The name of the person to greet.',
      required: true
    }

  },


  fn: function (inputs, exits) {

    var greeting = 'Hello, ' + inputs.name + '!';
    return exits.success(greeting);

  }
  
};
```

Though simple, this file displays all the characteristics of a good helper: it starts with a friendly name and description that make it immediately clear what the utility does, it describes its inputs so that it&rsquo;s easy to see how the utility is used, and it accomplishes a discrete task with a minimum amount of code.  You might call this helper from an action like this:

```javascript
sails.helpers.sayHello({ name: 'Bubba'}).exec(function(err, greeting) {
  if (err) { ... handle error ... }
  // `greeting` is now "Hello, Bubba!"
});
```

or, since the helper declares the `sync` property:

```javascript
var greeting;
try {
  greeting = sails.helpers.sayHello({ name: 'Bubba'}).execSync();
} catch (e) { ... handle error .. }
```

##### The `fn` function

The core of the helper is the `fn` function, which contains the actual code that the helper will run.  The function takes two arguments: `inputs` (a dictionary of input values) and `exits` (a dictionary of exit functions).  The job of `fn` is to utilize and process the inputs, and then call one of the provided exits to return control back to whatever code called the helper.  Note that as opposed to a typical Javascript function that uses `return` to provide a value to the caller, helpers provide that value (aka the &ldquo;output&rdquo;) by passing it as an argument to one of the exits.

##### Inputs

A helper&rsquo;s _inputs_ are analogous to the parameters of a typical Javascript function: they define the values that the code has to work with.  However, unlike function parameters, inputs are _typed_ and can be _required_.  If a helper is called using inputs of the wrong type, or missing a required input, it will trigger an error.  Thus, helpers are _self-validating_.

Inputs for a helper are defined in the `inputs` dictionary, with each input being composed of, at minimum, a `type` property.  Helper inputs currently support the following types:

* `string` - a string value
* `number` - a number value (both integers and floats are valid)
* `boolean` - the value `true` or `false`
* `ref` - a Javascript variable reference.  Technically this can be _any_ value, but typically it refers to an object like a dictionary or an array.

You can provide a default value for an input by setting its `defaultsTo` property.

##### Exits

Exits describe the different possible outcomes a helper can have.  Every helper automatically supports the `error` and `success` exits.  Additionally, you are encouraged to provide custom exits to handle specific error cases.  This adds to your code&rsquo;s maintainability.  For example, a helper called &ldquo;Create User&rdquo; could include a special `usernameConflict` exit to be called if the provided username already exists, allowing you to handle this scenario after calling the helper without having to resort to `try/catch` blocks or examining complex return values.

```javascript
sails.helpers.createUser({ username: 'bubba123', email: 'bubba@hawtmail.com'}).exec({
  success: function(newUser) { ... continue action with new user ... },
  usernameConflict: function() { ... return 409 status code to client ... }
  error: function(err) { ... return 500 status code to client ... },
});
```

Custom exits for a helper are defined in the `exits` dictionary, with each exit being composed of, at minimum, a `description` property.  Any argument passed to such an exit will be wrapped in a Javascript Error object (if it isn&rsquo;t already one) before being outputted.  If no argument is passed, the exit description will be used to create an error for the helper output.

##### Synchronous helpers

By default, all helpers are considered _asynchronous_.  If the code inside your helper function is definitely synchronous, you can set the top-level `sync` property to `true`, which allows users to call the helper using `execSync()` instead of `exec()`.  When called with `execSync`, any argument passed to an exit is _returned_ instead of provided as the argument to the error handler.  Keep in mind that when called synchronously, triggering any exit besides `success` will cause the helper to throw an error, so you&rsquo;ll want to wrap any such invocations in a `try/catch` block!

> Note: calling an asynchronous helper with `execSync()` (either because `sync: true` was not used, or the `fn` code was not really synchronous) will trigger an error.

### Generating a helper

Sails provides an easy generator to create a new helper:

```bash
sails generate helper foo-bar
```

This will create a file `api/helpers/foo-bar.js` that can be accessed in your code as `sails.helpers.fooBar`.  The file that is initially created will be a generic helper with no inputs and just the default exits (`success` and `error`), which immediately triggers its `success` exit when executed.

### Calling a helper

Whenever a Sails app loads, it finds all of the files in `api/helpers`, compiles them into functions, and stores them in the `sails.helpers` dictionary using the camel-cased version of the filename.  Helpers can then be invoked by calling them with a dictionary of inputs as the sole argument, and then calling `.exec()` on the returned value, with the set of exits to handle as the argument.  This typically happens in a chain:

```javascript
sails.helpers.fooBar({ someInput: 'abc', anotherInput: 123 }).exec({
   error: function(err) { ... },
   success: function(someOutput) { ... },
   someOtherExit: function() { ... }
});
```

##### Shortcut syntax

If your helper only has the default `error` and `success` exits, you can use a classic Node callback function as the argument to `exec`, instead of a dictionary of exit handlers:

```javascript
sails.helpers.fooBar({ someInput: 'abc', anotherInput: 123 }).exec(function(err, result) {
  if (err) {...handle error and return...}
  ...process result...
});
```

### Accessing `req` in a helper

If you&rsquo;re calling a helper from an action, the simplest way to pass along the [request object](http://sailsjs.com/documentation/reference/request-req) is to define it as an input:

```javascript
inputs: {

  req: {
    friendlyName: 'Request',
    type: 'ref',
    description: 'A reference to the request object'
  }
  
}
```

<docmeta name="displayName" value="Helpers">
