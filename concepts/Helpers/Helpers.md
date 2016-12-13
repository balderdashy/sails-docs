# Helpers

In the course of creating the [actions](http://sailsjs.com/documentation/concepts/actions-and-controllers) that your app uses to respond to client requests, you will often find yourself repeating pieces of code in several places.  In order to make the development and documentation of your app more efficient, you can pull repeated code into _helpers_ that can be shared between actions.  Helpers are small utilities that can be called from anyplace in your code that has access to the `sails` app instance (e.g. [actions](http://sailsjs.com/documentation/concepts/actions-and-controllers), [custom responses](http://sailsjs.com/documentation/concepts/custom-responses) or even other helpers).

### How helpers are defined

Helpers follow the <a href="http://node-machine.org" target="_blank">node-machine specification</a> (like [Actions2-style actions](http://sailsjs.com/documentation/concepts/actions-and-controllers#?actions-2)), which means that they are dictionaries containing at the _bare minimum_ an `inputs` and a `fn` key.  They will typically also contain keys like `friendlyName` and `description` which help document the purpose of the utility.  Here's an example of a small, fully defined helper:

```
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

```
sails.helpers.sayHello({ name: 'Bubba'}).exec(function(err, greeting) {
  if (err) { ... handle error ... }
  // `greeting` is now "Hello, Bubba!"
});
```

or, since the helper declares the `sync` property:

```
var greeting;
try {
  greeting = sails.helpers.sayHello({ name: 'Bubba'}).execSync();
}
catch (e) { ... handle error .. }
```

##### The `fn` function

The core of the helper is the `fn` function, which contains the actual code that the helper will run.  The function takes two arguments: `inputs` and `exits`.  The job of `fn` is to utilize and process the inputs, and then call one of the provided exits to return control back to whatever code called the helper.  Note that as opposed to a typical Javascript function that uses `return` to provide a value to the caller, helpers provide that value (aka the &ldquo;output&rdquo;) by passing it as an argument to one of the exits.

##### Inputs

A helper&rsquo;s _inputs_ are analogous to the parameters of a typical Javascript function: they define the values that the code has to work with.  However, unlike function parameters, inputs are _typed_ and can be _required_.  If a helper is called using inputs of the wrong type, or missing a required input, it will trigger an error.  Thus, helpers are _self-validating_.

Inputs for a helper are defined in the `inputs` dictionary, with each input being composed of, at minimum, a `type` property.  Helper inputs currently support the following types:

* `string` - a string value
* `number` - a number value (both integers and floats are valid)
* `boolean` - the value `true` or `false`
* `ref` - a Javascript variable reference.  Technically this can be _any_ value, but typically it refers to an object like a dictionary or an array.

##### Exits

Every helper automatically supports the `error` and `success` exits.  Additionally, you are encouraged to provide custom exits to handle specific error cases.  This adds to your code&rsquo;s maintainability.  For example, a helper called &ldquo;Create User&rdquo; could include a special `usernameConflict` exit to be called if the provided username already exists, allowing you to handle this scenario after calling the helper without having to resort to `try/catch` blocks or examining complex return values.

```
exits: {
  usernameConflict: {
    description: 'The provided username already exists in the database.'
  }
}
```

Custom exits for a helper are defined in the `exits` dictionary, with each exit being composed of, at minimum, a `description` property.  Any argument passed to such an exit will be wrapped in a Javascript Error object (if it isn&rsquo;t already one) before being outputted.  If no argument is passed, the exit description will be used to create an error for the helper output.

##### Synchronous helpers

By default, all helpers are considered _asynchronous_.  If the code inside your helper function is definitely synchronous, you can set the top-level `sync` property to `true`, which allows users to call the helper using `execSync()` instead of `exec()`.  When called with `execSync`, any argument passed to an exit is _returned_ instead of provided as the argument to the error handler.  Keep in mind that when called synchronously, triggering any exit besides `success` will cause the helper to throw an error, so you&rsquo;ll want to wrap any such invocations in a `try/catch` block!



### Creating a helper

Sails provides an easy generator to create a new helper:

```
sails generate helper foo-bar
```

This will create a file `api/helpers/foo-bar.js` that can be accessed in your code as `sails.helpers.fooBar`.  The file that is initially created will be a generic helper with no inputs and just the default exits (`success` and `error`), which immediately triggers its `success` exit when executed.

### Calling a helper

Whenever a Sails app loads, it finds all of the files in `api/helpers`, compiles them into functions, and stores them in the `sails.helpers` dictionary using the camel-cased version of the filename.  Helpers can then be invoked by calling them with a dictionary of inputs as the sole argument, and then calling `.exec()` on the returned value, with the set of exits to handle as the argument.  This typically happens in a chain:

```
sails.helpers.fooBar({ someInput: 'abc', anotherInput: 123 }).exec({
   error: function(err) { ... },
   success: function(someOutput) { ... },
   someOtherExit: function() { ... }
});
```

##### Shortcut syntax

If your helper only has the default `error` and `success` exits, you can use a classic Node callback function as the argument to `exec`, instead of a dictionary of exit handlers:

```
sails.helpers.fooBar({ someInput: 'abc', anotherInput: 123 }).exec(function(err, result) {
  if (err) {...handle error and return...}
  ...process result...
});
```

### Accessing the request object in a helper

If you&rsquo;re calling a helper from an action, the simplest way to pass along the [request object](http://sailsjs.com/documentation/reference/request-req) is to define it as an input:

```
inputs: {
  req: {
    friendlyName: 'Request',
    type: 'ref',
    description: 'A reference to the request object'
  }
}
```

<docmeta name="displayName" value="Helpers">
