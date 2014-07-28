# Custom Routes
### Overview

Sails allows you to explicitly route URLs in several different ways in your **config/routes.js** file.  Every route configuration consists of an **address** and a **target**, for example:

```
'GET /foo/bar': 'FooController.bar'
^^^address^^^^  ^^^^^^target^^^^^^^
```

### Route Address

The route address indicates what URL should be matched in order to apply the handler and options defined by the target.  A route consists of an optional verb and a mandatory path:

```
'POST  /foo/bar'
^verb^ ^^path^^
```

If no verb is specified, the target will be applied to any request that matches the path, regardless of the HTTP method used (**GET**, **POST**, **PUT** etc.).  Note the initial `/` in the path--all paths should start with one in order to work properly.

####Wildcards and dynamic parameters

In addition to specifying a static path like **foo/bar**, you can use `*` as a wildcard:

```
'/*'
```
    
will match all paths, where as:

```
'/user/foo/*'
```
    
will match all paths that *start* with **/user/foo**.

You can capture the parts of the address that are matched by wildcards into named parameters by using the `:paramName` wildcard syntax instead of the `*`:

```
'/user/foo/:name/bar/:age'
```

Will match the same URLs as:

```
'/user/foo/*/bar/*'
```
    
but will provide the values of the wildcard portions of the route to the route handler as `req.param('name')` and `req.param('age')`, respectively.

#### Regular expressions in addresses

In addition to the wildcard address syntax, you may also use Regular Expressions to define the URLs that a route should match.  The syntax for defining an address with a regular expression is:

`"r|<regular expression string>|<comma-delimited list of param names>"`

That's the letter "**r**", followed by a pipe character `|`, a regular expression string *without delimiters*, another pipe, and a list of parameter names that should be mapped to parenthesized groups in the regular expression.  For example:

`"r|^/\d+/(\w+)/(\w+)$|foo,bar": "MessageController.myaction"`

Will match `/123/abc/def`, running the `myaction` action of `MessageController` and supplying the values `abc` and `def` as `req.param('foo')` and `req.param('bar')`, respectively.


#### About route ordering

When using wildcards or regular expressions in your addresses, keep in mind that the ordering of your routes in **config/routes.js** matters; URLs are matched against addresses in the list from the top down.  If you have two configurations in this order:

    '/user': 'UserController.doSomething',
    '/*'   : 'CatchallController.doSomethingElse'
    
then a request to `/user` will not be matched by the second configuration unless the first configuration's handler calls `next()` in its code, which is discouraged (only [policies](http://beta.sailsjs.org/#/documentation/concepts/Policies) should call `next()`).  Unless you're doing something very advanced, it is safe to assume that every request will be handled by at most one route in your **config/routes.js** file.

### Route Target

The address portion of a custom route specifies which URLs the route should match.  The *target* portion specifies what Sails should do after the match is made.  A target can take one of several different forms.  In some cases you may want to chain multiple targets to a single address by placing them in an array, but in most cases each address will have only one target.  The different types of targets are discussed below, followed by a discussion of the various options that can be applied to them.

#### Controller / action target syntax

The most common type of target is one which binds a route to a custom [controller action](http://beta.sailsjs.org/#/documentation/concepts/Controllers?q=actions).  The following four routes are equivalent:

```
'GET /foo/go': 'FooController.myGoAction',
'GET /foo/go': 'Foo.myGoAction',
'GET /foo/go': {controller: "Foo", action: "myGoAction"},
'GET /foo/go': {controller: "FooController", action:"myGoAction"},

```

Each one maps `GET /foo/go` to the `myGoAction` action of the controller in **api/controllers/FooController.js**.  If no such controller or action exists, Sails will output an error message and ignore the route.  Otherwise, whenever a **GET** request to **/foo/go** is made, the code in that action will be run.

The controller and action names in this syntax are case-insensitive.

#### View target syntax

Another common target is one that binds a route to a [view](http://beta.sailsjs.org/#/documentation/concepts/Views).  The syntax for this is simple: it's the path to the view file relative to the **views** folder, without the file extension:

```
'GET /home': 'home/index'
```
This maps the `GET /home` to the view stored in **views/home/index.ejs** (assuming the default EJS [template engine](http://beta.sailsjs.org/#/documentation/concepts/Views/ViewEngines.html) is used).  As long as that view file exists, a **GET** request to  **/home** will display it.

#### Blueprint target syntax
In some cases you may want to map a non-standard address to one of the Sails [blueprint actions](http://beta.sailsjs.org/#/documentation/reference/blueprint-api?q=blueprint-actions).  For example, if you have a controller and model named **UserController** and **User** respectively, then Sails will automatically map **GET /user** to the "find" blueprint action which returns a list of User records.  If you'd like to map a different address to that action, you can use the blueprint target syntax:

```
'GET /findAllUsers': {model: 'user', blueprint: 'find'},
'GET /user/findAll': {blueprint: 'find'}
```

Note that in the configuration, both the `model` and `blueprint` properties are set, while in the second one, only `blueprint` is used.  In the second configuration, leaving off the `model` property causes Sails to examine the address and guess that the model is `User`.  You could override this by explicitly setting `model` to something else:

```
'GET /user/findAll': {blueprint: 'find', model: 'pet'}
```

although you will rarely if ever want to do this, as it makes for a messy and confusing API for your app.

If you specify a non-existent model or blueprint in your configuration, Sails will output an error and ignore the route.

#### Redirect target syntax
You can have one address redirect to another--either within your Sails app, or on another server entirely--you can do so just by specifying the redirect URL as a string:

```
'/alias' : '/some/other/route'
'GET /google': 'http://www.google.com'
```

Be careful to avoid infinitely loops when redirecting within your Sails app!

Note that when redirecting, the HTTP method of the original request (and any extra headers / parameters) will likely be lost, and the request will be transformed to a simple **GET** request.  In the above example, a **POST** request to **/alias** will result in a **GET** request to **/some/other/route**.  This is somewhat browser-dependent behavior, but it is recommended that you don't expect request methods and other data to survive a redirect.  

#### Response target syntax
You can map an address directly to a default or custom [response](http://beta.sailsjs.org/#/documentation/concepts/Custom-Responses) using this syntax:

```
'/foo': {response: 'notFound'}
```

Simply specify the name of the response file in your **api/responses** folder, without the **.js** extension.  The response name in this syntax is case-sensitive.  If you attempt to bind a route to a non-existent response, Sails will output an error and ignore the route.

#### Policy target syntax

In most cases, you will want to apply [policies](http://beta.sailsjs.org/#/documentation/concepts/Policies) to your controller actions using the [**config/policies.js**](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html) config file.  However, there are some times when you will want to apply a policy directly to a custom route: particularly when you are using the view or blueprint target syntax.  The policy target syntax is:

```
'/foo': {policy: 'myPolicy'}
```
However, you will always want to chain the policy to at least one other type of target, using an array:

```
'/foo': [{policy: 'myPolicy'}, {blueprint: 'find', model: 'user'}]
```

This will apply the **myPolicy** policy to the route and, if it passes, continue by running the **find** blueprint for the **User** model.

### Route target options

In addition to the options discussed in the various route target syntaxes above, any other property you add to a route target object will be passed through to the route handler in the `req.options` object.  There are several reserved properties that can be used to affect the behavior of the route handlers.  These are listed in the table below.

| Property    | Applicable Target Types       | Details |
|-------------|:----------:|-----------|
|`locals`|controller, view, blueprint, response|

<docmeta name="uniqueID" value="RouteTargetSyntax278177">
<docmeta name="displayName" value="Custom Routes">

