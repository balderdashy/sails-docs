# Helpers

As of version 1.0, all Sails apps come with built-in support for **helpers**, simple utilities that let you share Node.js code in more than one place.  This helps you avoid repeating yourself, and makes development more efficient by reducing bugs and minimizing rewrites.  It also makes it much easier to create documentation for your app.

### Overview

In Sails, helpers are the recommended approach for pulling repeated code into a separate file, then reusing that code in various [actions](http://sailsjs.com/documentation/concepts/actions-and-controllers), [custom responses](http://sailsjs.com/documentation/concepts/custom-responses), [command-line scripts](https://www.npmjs.com/package/machine-as-script), [unit tests](http://sailsjs.com/documentation/concepts/testing), or even other helpers. You don't _have_ to use helpers-- in fact you might not even need them right at first.  But as your code base grows, helpers will become more and more important for your app's maintainability.  (Plus, they're really convenient.)

For example, in the course of creating the actions that your Node.js/Sails app uses to respond to client requests, you will sometimes find yourself repeating code in several places.  That can be pretty bug-prone, of course, not to mention annoying.  Fortunately, there's a neat solution: replace the duplicate code with a call to a custom helper:

```javascript
sails.helpers.formatWelcomeMessage({ name: 'Bubba' }).exec(function(err, greeting) {
  if (err) { return res.serverError(err); }
  
  // `greeting` is now "Hello, Bubba!"
  sails.log(greeting);
  
  return res.ok();
});
```

> The example above demonstrates calling a helper from an action, but helpers can be called from almost anywhere in your code; as long as that place has access to the [`sails` app instance](http://sailsjs.com/documentation/reference/application).

### How helpers are defined

Here's an example of a small, well-defined helper:

```javascript
// api/helpers/format-welcome-message.js
module.exports = {

  friendlyName: 'Format welcome message',


  description: 'Return a personalized greeting based on the provided name.',


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

Though simple, this file displays all the characteristics of a good helper: it starts with a friendly name and description that make it immediately clear what the utility does, it describes its inputs so that it&rsquo;s easy to see how the utility is used, and it accomplishes a discrete task with a minimum amount of code.

> Look familiar?  Much like [actions2](http://sailsjs.com/documentation/concepts/actions-and-controllers#?actions-2), helpers follow the [node-machine specification](http://node-machine.org/spec).  

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

> These are the same data types (and related semantics) that you might already be accustomed to from [defining model attributes](http://sailsjs.com/documentation/concepts/models-and-orm/attributes).

##### Exits

Exits describe the different possible outcomes a helper can have.  Every helper automatically supports the `error` and `success` exits.  Additionally, you are encouraged to expose custom exits to allow userland code that calls your helper to handle specific error cases.  

> Custom exits for a helper are defined in the `exits` dictionary, with each exit definition being composed of, at minimum, a `description` property.  For more advanced options, see the [full specification](http://node-machine.org/spec).

This helps guarantee your code&rsquo;s maintainability by providing strong conventions.  For example, a helper called &ldquo;Create user&rdquo; could expose a custom `usernameConflict` exit.  The helper's `fn` might trigger this special exit if the provided username already exists, allowing your userland code to handle this specific scenario after calling the helper without muddying up your result values or resorting to extra `try/catch/switch` blocks.

```javascript
sails.helpers.createUser({ username: 'bubba123', email: 'bubba@hawtmail.com' }).exec({
  error: function(err) { return res.serverError(err); },
  usernameConflict: function() { return res.status(409).badRequest(); }
  success: function(newUserId) {
    return res.ok();
  }
});
```

> Internally, your helper's `fn` is responsible for triggering one of its exits internally (e.g. `exits.usernameConflict('foo')`).  If your helper sends back a result through the exit (e.g. `'foo'`), then that result will be passed back to the exit handler.
> Note: For every exit **other than `success`**,  any result will be automatically wrapped in a new Javascript Error instance (if it isn&rsquo;t already one) before being outputted.  And if a non-success exit is triggered _without a result_, Sails will use the exit's predefined description to create an appropriate Error automatically.

##### Synchronous helpers

By default, all helpers are considered _asynchronous_.  While this is a safe default assumption, it's not always true-- and when you know for certain that's the case, it's nice to avoid adding another level of indentation.  Sails helpers support this using the `sync` property.

If you know all of the code inside your helper's `fn` is definitely synchronous, you can set the top-level `sync` property to `true`, which allows userland code to call the helper using [`execSync()`](http://sailsjs.com/documentation/concepts/helpers#?synchronous-usage) instead of `exec()`.

When your helper is invoked with `execSync()`, then any result data that your `fn`'s code passes in to `exits.success()` is _returned_ instead of being provided as an argument to the callback.  And, when its being called synchronously, if your helper's `fn` calls any exit other than `success`, then it will throw an Error.

> Note: calling an asynchronous helper with `execSync()` (either because `sync: true` was not used, or the `fn` code was not really synchronous) will trigger an error.


##### Accessing `req` in a helper

If you&rsquo;re designing a helper that parses request headers, specifically for use from within actions, then you'll want to take advantage of pre-existing methods and/or properties of the [request object](http://sailsjs.com/documentation/reference/request-req).  The simplest way to allow the code in your action to pass along `req` to your helper is to define a `type: 'ref'` input:

```javascript
inputs: {

  req: {
    friendlyName: 'Request',
    type: 'ref',
    description: 'A reference to the request object (req).',
    required: true
  }
  
}
```


Then, to use your helper in your actions, you might write code like this:

```javascript
var headers = sails.helpers.parseMyHeaders({ req: req }).execSync();
```

### Generating a helper

Sails provides a built-in generator that you can use to create a new helper automatically:

```bash
sails generate helper foo-bar
```

This will create a file `api/helpers/foo-bar.js` that can be accessed in your code as `sails.helpers.fooBar`.  The file that is initially created will be a generic helper with no inputs and just the default exits (`success` and `error`), which immediately triggers its `success` exit when executed.

### Calling a helper

Whenever a Sails app loads, it finds all of the files in `api/helpers`, compiles them into functions, and stores them in the `sails.helpers` dictionary using the camel-cased version of the filename.  Any helper can then be invoked from your code, simply by calling it with a dictionary of values (one key for each input), and providing a standard Node.js callback function:

```javascript
sails.helpers.formatWelcomeMessage({ name: 'Dolly' }).exec(function(err, result) {
  if (err) { /*...handle error and return...*/ return res.serverError(err); }
  /* ...process result... */
  sails.log('Ok it worked!  The result is:', result);
  return res.ok();
});
```

> This is the same usage you might already be familiar with from [model methods](sailsjs.com/documentation/concepts/models-and-orm/models) like `.create()`.

##### Synchronous usage

If a helper declares the `sync` property, you can also call it like this:

```javascript
var greeting;
try {
  greeting = sails.helpers.formatWelcomeMessage({ name: 'Timothy' }).execSync();
} catch (e) { /*... handle error ...*/ return res.serverError(err); }

/* ...process result... */
return res.ok();
```

If something goes wrong, `.execSync()` handles exceptions by throwing an Error.  So remember: if you're using `.execSync()` from within some other asynchronous callback, be sure you handle the possibility of it throwing.  If you're ever unsure about whether you can safely call `.execSync()`, you can always just wrap it in a `try`/`catch` and handle the error in the `catch`.

### Handling exceptions

For more granular error handling (and for those exceptional cases that aren't _quite_ errors, even) you may be used to setting some kind of error code, then sniffing it out.  This approach works fine, but it can be time consuming and hard to keep track of.

Fortunately, Sails helpers take things a couple of steps further.

##### Traditional error negotiation
When invoking a helper, if you pass in a classic Node callback when you call `.exec()` (or if you use `.execSync()`) then the Error instance might have a property called `exit`.  If set, it will be the name of the exit that the helper's implementation (`fn`) called when it exited.  (And if it's not set, it just means that the helper exited via the `error` exit.)

For example, with asynchronous (non-blocking) usage:

```javascript
sails.helpers.getGravatarUrl(/*...*/).exec(function (err, gravatarUrl) {
  if (err) {
    if (err.exit === 'invalidEmail') { return res.badRequest(); }
    return res.serverError(err);
  }
  
  // ...
  return res.ok();
});
```

Or with _synchronous_ (blocking) usage:


```javascript
var gravatarUrl;
try {
  gravatarUrl = sails.helpers.getGravatarUrl(/*...*/).execSync();
} catch (err) {
  if (err.exit === 'invalidEmail') { return res.badRequest(); }
  return res.serverError(err);
}

// ...
return res.ok();
```

##### Switchback-style error negotiation

For convenience, there's another, even easier way to negotiate errors from an asynchronous helper.  Instead of a Node.js callback, you can simply pass `.exec()` a dictionary of exit handlers (a.k.a. a "switchback"):

```javascript
sails.helpers.getGravatarUrl({ emailAddress: req.param('email') })
.exec({
  error: function(err) { return res.serverError(err); },
  invalidEmail: function (err) { return res.badRequest(); },
  success: function(gravatarUrl) {
    // ...
    return res.ok();
  }
});
```

##### As much or as little as you need

While this example usage is kind of trumped-up, it's easy to see a scenario where it's very helpful to rely on custom exits like `invalidEmail`.  Still, you don't want to have to handle _every_ custom exit _every_ time.  Ideally, you'd only have to mess with handling a custom exit in your userland code if you actually needed it: whether that's to implement a feature of some kind, or even just to improve the user experience or provide a better internal error message.

Luckily, with Sails helpers, userland code can choose to integrate with _as few or as many custom exits as you like_, on a case by case basis.  And when custom exits _aren't_ handled, the edge case behavior is well-defined.

For example, here's a breakdown of what happens (under various usage conditions) when our helper's `fn` calls its "invalidEmail" exit (`exits.invalidEmail()`):
+ if called using `.exec(function(err){...})` -- i.e. a Node.js-style callback -- then that userland callback function would be triggered with an automatically-generated Error instance as its first argument
+ if called using `.execSync()`, then since this is synchronous usage, our helper would throw an automatically-generated Error.
+ if called using `.exec({...})`, a switchback, but where the switchback _does not include an exit handler_ for `invalidEmail`, then the `error` exit handler would be triggered instead (again, with an automatically-generated Error instance as its first argument).
+ if called using `.exec({...})`, a switchback that _includes a dedicated exit handler_ for `invalidEmail`, then that dedicated handler function would be triggered.

### Next steps

+ [Explore a practical example](http://sailsjs.com/documentation/concepts/helpers/example-helper) of a helper in a Node.js/Sails app.
+ Since 2014, the Sails community has created hundreds of MIT-licensed, open-source helpers for many common use cases.  [Have a look!](http://node-machine.org/machinepacks)
+ [Click here](https://sailsjs.com/support) to ask a question about helpers or see more tutorials and examples.

<docmeta name="displayName" value="Helpers">
