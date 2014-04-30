# Response
### Overview

Sails is built on [Express](), and uses [Node's HTTP server]() conventions.  Because of this, you can access all of the Node and Express methods and properties on the `res` object whereever it is accessible (i.e. in your controllers, policies, and custom responses.)

A nice side effect of this compatibility is that, in many cases, you can paste existing Node.js code into a Sails app and it will work.  And since Sails implements a transport-agnostic request interpreter, the code in your Sails app is WebSocket-compatible as well.

Sails adds a few methods of its own to the `res` object, like [`res.view()`]().  These features are syntactic sugar on top of the underlying implementation, and also support both HTTP and WebSockets.

The [Supported Features]() section includes a chart summarizes which methods and properties are available for each transport.




# res.view()

Respond to this request with an HTML page.

Uses the [configured view engine]() to compile the [view template]() at `pathToView` into HTML.

The specified [`locals`](./#documentation/reference/Views/Locals.html) are merged with your configured app-wide locals, as well as certain built-in locals from Sails and/or your view engine, then passed to the view engine as data.


### Usage

```js
return res.view(pathToView, locals);
```
-or-

```js
return res.view(pathToView);
```

-or-

```js
return res.view(locals);
```

-or-

```js
return res.view();
```

### Arguments

|   | Argument       | Type        | Details |
|---|----------------|:-----------:|---------|
| 1 | `pathToView`   | ((string))  | The path to the desired view file relative to your app's [`views` folder]() (usually [`views/`]()), without the file extension (e.g. `.ejs`), and with no trailing slash.<br/>Defaults to "identityOfController/nameOfAction".
| 2 | `locals`       | ((object))  | Data to pass to the view template.  These explicitly specified locals will be merged in to Sails' [built-in locals]() and your [configured app-wide locals]().<br/>Defaults to `{}`.



### Example

Consider a conventionally configured Sails app with a call to `res.view()` in the `cook()` action of its `OvenController.js`.

With no `pathToView` argument, `res.view()` will decide the path by combining the identity of the controller (`oven`) and the name of the action (`cook`):

```js
return res.view();
// -> responds with `views/oven/cook.ejs`
```

Here's how you would load the same view using an explicit `pathToView`:

```js
return res.view('oven/cook');
// -> responds with `views/oven/cook.ejs`
```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
> + `res.view()` reads a view file from disk, compiles it into HTML, then streams it back to the client.  If you already have the view in memory, or don't want to stream the compiled HTML directly back to the client, use [`sails.hooks.views.render()`]() instead.








# res.locals
### Purpose
Response local variables are scoped to the request, thus only available to the view(s) rendered during that request / response cycle, if any. Otherwise this API is identical to app.locals.

This object is useful for exposing request-level information such as the request pathname, authenticated user, user settings etcetera.

### Example Usage
```javascript
app.use(function(req, res, next){
  res.locals.user = req.user;
  res.locals.authenticated = ! req.user.anonymous;
  next();
});
```







# res.redirect()

Redirect the requesting user-agent to the given absolute or relative url.


### Usage
```js
return res.redirect(url);
```

### Arguments

|   | Argument       | Type        | Details |
|---|----------------|:-----------:|---------|
| 1 | `url`          | ((string))  | A URL expression (see below for complete specification).<br/> e.g. `"http://google.com"` or `"/login"`



### Details

Sails/Express/Koa/Connect support a few forms of redirection, first being a fully qualified URI for redirecting to a different domain:

```javascript
return res.redirect('http://google.com');
```

The second form is the domain-relative redirect.  For example, if you were on http://example.com/admin/post/new, the following redirect to `/admin` would land you at http://example.com/admin:

```javascript
return res.redirect('/checkout');
```

<!--
Probably more confusing than helpful:

This next redirect is relative to the mount point of the application. For example if you have a blog application mounted at /blog, ideally it has no knowledge of where it was mounted, so where a redirect of /admin/post/new would simply give you http://example.com/admin/post/new, the following mount-relative redirect would give you http://example.com/blog/admin/post/new:

```javascript
return res.redirect('admin/post/new');
```
-->


Pathname relative redirects are also possible. If you were on http://example.com/admin/post/new, the following redirect would land you at http//example.com/admin/post:

```javascript
return res.redirect('..');
```
The final special-case is a back redirect, which allows you to redirect a request back where it came from using the "Referer" (or "Referrer") header (if omitted, redirects to `/` by default)

```javascript
return res.redirect('back');
```

### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
> + When your app calls `res.redirect()`, Sails sends a response with status code [302]().  This instructs the user-agent to send a new request to the indicated URL.  There is no way to _force_ a user-agent to follow redirects, but most clients play nicely.
> + In general, you should not need to use `res.redirect()` if a request "wants JSON" (i.e. [`req.wantsJSON`]()).
> + If a request originated from a Socket.io client, it always "wants JSON".  If you do call `res.redirect()` for a socket request, Sails reroutes the request internally on the server, effectively "forcing" the redirect to take place (i.e. instead of sending a 302 status code, the server simply creates a new request to the redirect URL).
>  + As a result, redirects to external domains are not supported for socket requests (although this is technically possible by proxying).
>  + This behavior may change to more closely reflect HTTP in future versions of Sails.










# res.negotiate()

Given an error (`err`), send an appropriate error response back down to the client.

### Usage

```js
return res.negotiate(err);
```

### Details

`res.negotiate()` chooses the appropriate error-handling behavior from one of the following methods:

+ [`res.badRequest()`]()   (400)
+ [`res.forbidden()`]()    (403)
+ [`res.notFound()`]()     (404)
+ [`res.serverError()`]()  (500)

If a more specific diagnosis cannot be determined, Sails will default to [`res.serverError()`]().


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.negotiate()` (like other userland response methods) can be overridden - just define a response module (`/responses/negotiate.js`) and export a function definition.
>+ This method is used as the default handler for uncaught errors in Sails.  That means it is called automatically if an error is thrown in _any_ request handling code, _but only within the initial step of the event loop_.  You should always specifically handle errors that might arise in callbacks/promises from asynchronous code.







# res.ok()

Send a 200 ("OK") response back down to the client.


### Usage

```js
return res.ok(data);
```
-or-

```js
return res.ok(data, pathToView);
```

-or-

```js
return res.ok(data, url);
```

-or-

```js
return res.ok();
```

### Details

By default, `res.ok()` performs content-negotiation based its arguments, your app's environment, and the type of request.

If a view (`pathToView`) is provided, Sails serves that view.  If a url expression (`url`) is provided, Sails redirects to that URL.  If some data (`data`) is provided, Sails either uses it to form the JSON response or sends it to the specified view as [locals]().

If the request "wants JSON", Sails will always send JSON.  If no `data` is provided a default response body will be sent:

```json
{
  "status": 200
}
```

If the request "wants JSON" and the `data` is a string, `data` will be wrapped in an object and included under the "message" key:

```json
{
  "status": 200,
  "message": "..."
}
```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.ok()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in `/responses/ok.js`, which is bundled automatically in newly generated Sails apps.  If an `ok.js` response method does not exist in your app, Sails will implicitly use the default behavior.
>+ This method is used by [blueprint actions]() to send a success response.  Therefore as you might expect, it is a great place to marshal response data for clients which expect data in a specific format, i.e. to convert data to XML, or it wrap in an additional object (for Ember clients).
>+ If `pathToView` refers to a missing view, this method will respond as if the request "wants JSON".










# res.serverError()

This method is used to send a [500]() ("Server Error") response back down to the client indicating that some kind of server error occurred.


### Usage

```js
return res.serverError(err);
```

-or-

```js
return res.serverError();
```

### Details

By default, `res.serverError()` performs content-negotiation based its arguments, your app's environment, and the type of request.

If the request "wants JSON", Sails will serve a default error page ("views/500.js") or send a JSON error response.  In both cases, it sends the response with a 500 "Server Error" status code.

### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.serverError()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in `/responses/serverError.js`, which is bundled automatically in newly generated Sails apps.  If a `serverError.js` response method does not exist in your app, Sails will implicitly use the default behavior.
>+ If `pathToView` refers to a missing view, this method will respond as if the request "wants JSON".
>+By default, the specified error (`err`) will be excluded if the app is running in the "production" environment (i.e. `process.env.NODE_ENV === 'production'`).



# res.forbidden()

This method is used to send a [403]() ("Forbidden") response back down to the client indicating that the request is not allowed.  This usually means the user-agent tried to do something it was not allowed to do, like change the password of another user.


### Usage

```js
return res.forbidden(err, pathToView);
```

-or-


```js
return res.forbidden(err, url);
```

-or-

```js
return res.forbidden(err);
```

-or-

```js
return res.forbidden();
```

### Details


By default, `res.forbidden()` performs content-negotiation based on its arguments, your app's environment, and the type of request.

If the request "wants JSON", Sails will send a JSON response.  Otherwise it calls `res.redirect()` using the specified `url`.  If a view (`pathToView`) is specified, Sails will serve the view.  In any case, a 403 ("Forbidden") status code will be sent.

If a request "wants JSON", but no `err` argument is provided, a default response body will be sent:

```json
{
  "status": 403
}
```

If a request "wants JSON" and a string `err` argument is provided, the error message will be wrapped in an object under the "error" key:

```json
{
  "status": 403,
  "error": "..."
}
```

### Example

```javascript
if ( !req.session.authorized ) {
  return res.forbidden('YOU SHALL NOT PASS!');
}
```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.forbidden()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in `/responses/forbidden.js`, which is bundled automatically in newly generated Sails apps.  If a `forbidden.js` response method does not exist in your app, Sails will implicitly use the default behavior.
>+ If `pathToView` refers to a missing view, this method will respond as if the request "wants JSON".
>+By default, the specified error (`err`) will be excluded if the app is running in the "production" environment (i.e. `process.env.NODE_ENV === 'production'`).






# res.notFound()

This method is used to send a [404]() ("Not Found") response back down to the client.  This is normally used to indicate that the user-agent tried to get, update, or delete something that doesn't exist.


### Usage

```js
return res.notFound(err, pathToView);
```

-or-


```js
return res.notFound(err, url);
```

-or-

```js
return res.notFound(err);
```

-or-

```js
return res.notFound();
```

### Details


By default, `res.notFound()` performs content-negotiation based on its arguments, your app's environment, and the type of request.

If the request "wants JSON", Sails will send a JSON response.  Otherwise it calls `res.redirect()` using the specified `url`.  If a view (`pathToView`) is specified, Sails will serve the view.  In any case, a 404 ("Not Found") status code will be sent.

`res.notFound()` includes the specified error (`err`) in its JSON response unless the app is running in the "production" environment (i.e. `process.env.NODE_ENV === 'production'`.

If a request "wants JSON", but no `err` argument is provided, a default response body will be sent:

```json
{
  "status": 403
}
```

If a request "wants JSON" and a string `err` argument is provided, the error message will be wrapped in an object under the "error" key:

```json
{
  "status": 403,
  "error": "..."
}
```

### Example

```javascript
if ( !req.session.authorized ) {
  return res.notFound('YOU SHALL NOT PASS!');
}
```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.notFound()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in `/responses/notFound.js`, which is bundled automatically in newly generated Sails apps.  If a `notFound.js` response method does not exist in your app, Sails will implicitly use the default behavior.
>+ If `pathToView` refers to a missing view, this method will respond as if the request "wants JSON".
>+By default, the specified error (`err`) will be excluded if the app is running in the "production" environment (i.e. `process.env.NODE_ENV === 'production'`).











# res.badRequest()

This method is used to send a [400]() ("Bad Request") response back down to the client indicating that the request is invalid.  This usually means it contained invalid parameters or headers, or tried to do something impossible based on your app logic.


### Usage

```js
return res.badRequest(err, url);
```

-or-

```js
return res.badRequest(err);
```

-or-

```js
return res.badRequest();
```

### Details

By default, `res.badRequest()` performs content-negotiation based on its arguments, your app's environment, and the type of request.

If the request "wants JSON", Sails will send a JSON response.  Otherwise it calls `res.redirect()` using the specified `url`.  If a view (`pathToView`) is specified, Sails will serve the view.  In any case, a 400 ("Bad Request") status code will be sent.

If a request "wants JSON", but no `err` argument is provided, a default response body will be sent:

```json
{
  "status": 400
}
```

If a request "wants JSON" and a string `err` argument is provided, the error message will be wrapped in an object under the "error" key:

```json
{
  "status": 400,
  "error": "..."
}
```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.badRequest()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in `/responses/badRequest.js`, which is bundled automatically in newly generated Sails apps.  If a `badRequest.js` response method does not exist in your app, Sails will implicitly use the default behavior.
>+ If `pathToView` refers to a missing view, this method will respond as if the request "wants JSON".
>+ By default, the specified error (`err`) will be excluded if the app is running in the "production" environment (i.e. `process.env.NODE_ENV === 'production'`).












# res.status()
### Purpose
Chainable alias of node's '`res.statusCode=`.

### Example Usage
```javascript
res.status(404).sendfile('path/to/404.png');
```


# res.set(`field`, `[value]`)
### Purpose
Set header `field` to `value`, or pass an object to set multiple fields at once.

### Example Usage
```javascript

res.set('Content-Type', 'text/plain');

res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  'ETag': '12345'
})

```


# res.get()

Returns the current value of the specified response header (`header`).

### Usage
```js
res.get();
```

### Example
```javascript
res.get('Content-Type');
// -> "text/plain"
```

### Notes
>+ The `header` argument is case-insensitive.
>+Response headers can be changed up until the response is sent - see [`res.set()`]().













# res.cookie()

Sets a cookie with name (`name`) and value (`value`) to be sent along with the response.


### Usage
```js
res.cookie(name, value [,options]);
```


### Details

The "path" option defaults to "/".

The "maxAge" option is a convenience option for setting "expires" relative to the current time in milliseconds. The following is equivalent to the previous example.

```javascript
res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
```

An object may be passed which is then serialized as JSON, which is automatically parsed by the bodyParser() middleware.

```javascript
res.cookie('cart', { items: [1,2,3] });
res.cookie('cart', { items: [1,2,3] }, { maxAge: 900000 });
```

Signed cookies are also supported through this method. Simply pass the signed option. When given res.cookie() will use the secret passed to express.cookieParser(secret) to sign the value.

```javascript
res.cookie('name', 'tobi', { signed: true });
```


### Example
```javascript
res.cookie('name', 'tobi', {
  domain: '.example.com',
  path: '/admin',
  secure: true
});

res.cookie('rememberme', '1', {
  expires: new Date(Date.now() + 900000),
  httpOnly: true
});
```




# res.clearCookie()

Clears cookie (`name`) in the response.

### Usage

```js
res.clearCookie(name [,options]);
```

### Details

The path option defaults to "/".


### Example
```javascript
res.cookie('name', 'tobi', { path: '/admin' });
res.clearCookie('name', { path: '/admin' });
```







# res.location()
Sets the "Location" response header to the specified URL expression (`url`).

### Usage
res.location(url);

### Example
```javascript
res.location('/foo/bar');
res.location('foo/bar');
res.location('http://example.com');
res.location('../login');
res.location('back');
```

### Notes
>+ You can use the same kind of URL expressions as in res.redirect().










# res.send()

Send a simple response.  `statusCode` defaults to 200 ("OK").

This method is used in the underlying implementation of most of the other terminal response methods.

### Usage
```javascript
return res.send([statusCode,] body);
```


### Details
This method performs a myriad of useful tasks for simple non-streaming responses such as automatically assigning the Content-Length unless previously defined and providing automatic HEAD and HTTP cache freshness support.

When a Buffer is given the Content-Type is set to "application/octet-stream" unless previously defined as shown below:

```javascript
res.set('Content-Type', 'text/html');
res.send(new Buffer('some html'));
```
When a String is given the Content-Type is set defaulted to "text/html":

```javascript
res.send('some html');
```
When an Array or Object is given Express will respond with the JSON representation:

```javascript
res.send({ user: 'tobi' })
res.send([1,2,3])
```
Finally when a Number is given without any of the previously mentioned bodies, then a response body string is assigned for you. For example 200 will respond will the text "OK", and 404 "Not Found" and so on.

```javascript
res.send(200)
res.send(404)
res.send(500)
```


### Example
```javascript
res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('some html');
res.send(404, 'Sorry, we cannot find that!');
res.send(500, { error: 'something blew up' });
res.send(200);
```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).



# res.json()

Sends a JSON response composed of a stringified version of the specified `data`.

### Usage
```js
return res.json([statusCode, ] data);
```

### Details

This method is identical to res.send() when an object or array is passed, however it may be used for explicit JSON conversion of non-objects (null, undefined, etc), though these are technically not valid JSON.

### Example
```javascript
res.json(null)
res.json({ user: 'tobi' })
res.json(500, { error: 'message' })
```

### Notes
> + Don't forget this method's name is all lowercase.
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).



# res.jsonp()

Send a JSON or JSONP response.

Identical to [`res.json()`](), except if a "callback" parameter exists, a [JSONP]() response will be sent instead, using the value of the "callback" parameter as the name of the function wrapper.

### Usage
```js
return res.jsonp([statusCode, ] data);
```

### Example

```js
return res.jsonp({
  users: [{
    name: 'Thelma',
    id: 1
  }, {
    name: 'Leonardo'
    id: 2
  }]
});
```

<!--

Need to make this better:

By default the JSONP callback name is simply callback, however you may alter this with the jsonp callback name setting. The following are some examples of JSONP responses using the same code:

```javascript
// ?callback=foo
res.jsonp({ user: 'tobi' })
// foo({ "user": "tobi" })

app.set('jsonp callback name', 'cb');

// ?cb=foo
res.jsonp(500, { error: 'message' })
// foo({ "error": "message" })
```
-->

### Notes
> + Don't forget this method's name is all lowercase.
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).







# res.type()

Sets the "Content-Type" response header to the specified `type`.

This method is pretty forgiving (see examples below), but note that if `type` contains a `"/"`, `res.type()` assumes it is a MIME type and interprets it literally.

### Usage
```javascript
res.type(type);
```

### Example
```javascript
res.type('.html');
res.type('html');
res.type('json');
res.type('application/json');
res.type('png');
```





# res.attachment()

Sets the "Content-Disposition" header of the current response to "attachment". If a `filename` is given, then the "Content-Type" will be automatically set based on the extension of the file (e.g. `.jpg` or `.html`), and the "Content-Disposition" header will be set to "filename=`filename`".

### Usage
```javascript
res.attachment([filename]);
```

### Example
```javascript
res.attachment();
// -> response header will contain:
//   Content-Disposition: attachment

res.attachment('path/to/logo.png');
// -> response header will contain:
//   Content-Disposition: attachment; filename="logo.png"
//   Content-Type: image/png
```


