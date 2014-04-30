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










# res.serverError()

This method is used to send a [500]() response back down to the client indicating that some kind of server error occurred.


### Usage

```js
return res.serverError(err);
```

-or-

```js
return res.serverError();
```

### Details

By default, `res.serverError()` checks if the request "wants JSON", then either serves a default error page ("views/500.js") or sends a JSON error response.  In both cases, it sends the response with a 500 "Server Error" status code.  Sails will include the specified error (`err`) in its response unless the app is running in the "production" environment (i.e. `process.env.NODE_ENV === 'production';`.


### Notes
>+ `res.serverError()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in `/responses/serverError.js`, which is bundled automatically in newly generated Sails apps.  If a `serverError.js` response method does not exist in your app, Sails will implicitly use the default behavior.






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

### Details

By default, `res.ok()` performs content-negotiation.

If a view (`pathToView`) is provided, Sails serves that view.  If a url expression (`url`) is provided, Sails redirects to that URL.  If some data (`data`) is provided, Sails either uses it to form the JSON response, or sends it to the specified view as [locals]().

If the request "wants JSON", Sails will always send JSON.  If no data is provided a default response body will be sent:

```json
{
  "status": 200
}
```


### Notes
>+ `res.ok()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in `/responses/ok.js`, which is bundled automatically in newly generated Sails apps.  If an `ok.js` response method does not exist in your app, Sails will implicitly use the default behavior.
>+ This method is used by [blueprint actions]() to send a success response.  Therefore as you might expect, it is a great place to marshal response data for clients which expect data in a specific format, i.e. to convert data to XML, or it wrap in an additional object (for Ember clients).











========================================================================================
TODO: go over the rest of these methods/properties below and flesh them out

       || 
       \/
========================================================================================



========================================================================================
TODO: go over the rest of these methods/properties below and flesh them out

       || 
       \/
========================================================================================



========================================================================================
TODO: go over the rest of these methods/properties below and flesh them out

       || 
       \/
========================================================================================



========================================================================================
TODO: go over the rest of these methods/properties below and flesh them out

       || 
       \/
========================================================================================



========================================================================================
TODO: go over the rest of these methods/properties below and flesh them out

       || 
       \/
========================================================================================



========================================================================================
TODO: go over the rest of these methods/properties below and flesh them out

       || 
       \/
========================================================================================



========================================================================================
TODO: go over the rest of these methods/properties below and flesh them out

       || 
       \/
========================================================================================


========================================================================================
TODO: go over the rest of these methods/properties below and flesh them out

       || 
       \/
========================================================================================






# res.forbidden([`error message`])

Calls `/config/403.js` which renders the default view for an HTTP 403 error along with an optional error message.

### Usage
```js
res.forbidden(err);
```

### Example Usage

In a controller,

```javascript
login: function(req,res){

    // Use appropriate authentication method

    if (!isAuthenticated)
      res.forbidden('YOU SHALL NOT PASS!');  
}


```


# res.notFound([`error message`])
### Purpose
Calls `/config/404.js` which renders the default view for an HTTP 404 error along with an optional error message.



# res.badRequest([`error message`])
### Purpose
Calls `/config/400.js` which renders the default view for an HTTP 400 error along with an optional error message.



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


# res.get(`string`)
### Purpose
Get the case-insensitive response header `field`

### Example Usage
```javascript
res.get('Content-Type');
// "text/plain"

```


# res.cookie(`name`, `value`, `[options]`)
### Purpose
Set cookie name to value, where which may be a string or object converted to JSON. The path option defaults to "/".

### Example Usage
```javascript
res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
```

The maxAge option is a convenience option for setting "expires" relative to the current time in milliseconds. The following is equivalent to the previous example.

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


### Notes
> Later you may access this value through the req.signedCookie object.

# res.clearCookie(`name`, `[options]`)
### Purpose
Clear cookie name. The path option defaults to "/".
### Example Usage
```javascript
res.cookie('name', 'tobi', { path: '/admin' });
res.clearCookie('name', { path: '/admin' });
```


# res.location()
### Purpose
Set the location header.

### Example Usage
```javascript
res.location('/foo/bar');
res.location('foo/bar');
res.location('http://example.com');
res.location('../login');
res.location('back');
```
You can use the same kind of urls as in res.redirect().

For example, if your application is mounted at /blog, the following would set the location header to /blog/admin:

```javascript
res.location('admin')
```

# res.charset
### Purpose
Assign the charset. Defaults to "utf-8".

### Example Usage
```javascript
res.charset = 'value';
res.send('some html');
// Content-Type: text/html; charset=value
```

# res.send(`[body|status]` , `[body]`)
### Purpose
Send a response.

### Example Usage
```javascript
res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('some html');
res.send(404, 'Sorry, we cannot find that!');
res.send(500, { error: 'something blew up' });
res.send(200);
```

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



# res.json(`[status|body]` , `[body]`)
### Purpose
Send a JSON response. This method is identical to res.send() when an object or array is passed, however it may be used for explicit JSON conversion of non-objects (null, undefined, etc), though these are technically not valid JSON.

### Example Usage
```javascript
res.json(null)
res.json({ user: 'tobi' })
res.json(500, { error: 'message' })
```

### Notes
> Don't forget this method name is all lower case.  I always forget that.

# res.jsonp(`[status|body]` , `[body]`)
### Purpose
Send a JSON response with JSONP support. This method is identical to res.json() however opts-in to JSONP callback support.

### Example Usage
```javascript
res.jsonp(null)
// null

res.jsonp({ user: 'tobi' })
// { "user": "tobi" }

res.jsonp(500, { error: 'message' })
// { "error": "message" }
```
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



# res.type(`type`)
### Purpose
Sets the Content-Type to the mime lookup of type, or when "/" is present the Content-Type is simply set to this literal value.

### Example Usage
```javascript
res.type('.html');
res.type('html');
res.type('json');
res.type('application/json');
res.type('png');
```



# res.format(`object`)
### Purpose
Performs content-negotiation on the request Accept header field when present. This method uses req.accepted, an array of acceptable types ordered by their quality values, otherwise the first callback is invoked. When no match is performed the server responds with 406 "Not Acceptable", or invokes the default callback.

The Content-Type is set for you when a callback is selected, however you may alter this within the callback using res.set() or res.type() etcetera.

The following example would respond with { "message": "hey" } when the Accept header field is set to "application/json" or "*/json", however if "*/*" is given then "hey" will be the response.

### Example Usage
```javascript
res.format({
  'text/plain': function(){
    res.send('hey');
  },
  
  'text/html': function(){
    res.send('hey');
  },
  
  'application/json': function(){
    res.send({ message: 'hey' });
  }
});
```
In addition to canonicalized MIME types you may also use extnames mapped to these types, providing a slightly less verbose implementation:

```javascript
res.format({
  text: function(){
    res.send('hey');
  },
  
  html: function(){
    res.send('hey');
  },
  
  json: function(){
    res.send({ message: 'hey' });
  }
});
```


# res.attachment(`[filename]`)
### Purpose
Sets the Content-Disposition header field to "attachment". If a filename is given then the Content-Type will be automatically set based on the extname via res.type(), and the Content-Disposition's "filename=" parameter will be set.

### Example Usage
```javascript
res.attachment();
// Content-Disposition: attachment

res.attachment('path/to/logo.png');
// Content-Disposition: attachment; filename="logo.png"
// Content-Type: image/png
```



# res.sendfile(`path`, `[options]` , `[fn]`)
### Purpose
Transfer the file at the given path.

Automatically defaults the Content-Type response header field based on the filename's extension. The callback fn(err) is invoked when the transfer is complete or when an error occurs.

Options:

maxAge in milliseconds defaulting to 0
root root directory for relative filenames
This method provides fine-grained support for file serving as illustrated in the following example:

### Example Usage
```javascript
app.get('/user/:uid/photos/:file', function(req, res){
  var uid = req.params.uid
    , file = req.params.file;
    
  req.user.mayViewFilesFrom(uid, function(yes){
    if (yes) {
      res.sendfile('/uploads/' + uid + '/' + file);
    } else {
      res.send(403, 'Sorry! you cant see that.');
    }
  });
});
```


# res.download(`path`, `[filename]` , `[fn]`)
### Purpose
Transfer the file at path as an "attachment", typically browsers will prompt the user for download. The Content-Disposition "filename=" parameter, aka the one that will appear in the brower dialog is set to path by default, however you may provide an override filename.

When an error has ocurred or transfer is complete the optional callback fn is invoked. This method uses res.sendfile() to transfer the file.

### Example Usage
```javascript
res.download('/report-12345.pdf');

res.download('/report-12345.pdf', 'report.pdf');

res.download('/report-12345.pdf', 'report.pdf', function(err){
  if (err) {
    // handle error, keep in mind the response may be partially-sent
    // so check res.headerSent
  } else {
    // decrement a download credit etc
  }
});
```


# res.links()
### Purpose
Join the given links to populate the "Link" response header field.

### Example Usage
```javascript
res.links({
  next: 'http://api.example.com/users?page=2',
  last: 'http://api.example.com/users?page=5'
});
```
yields:

```html
Link: <http://api.example.com/users?page=2>; rel="next", 
      <http://api.example.com/users?page=5>; rel="last"
```

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


# res.render(`pathToView`, `[locals]` , `[callback]`)
### Purpose
Render a view with a callback responding with the rendered string. When an error occurs next(err) is invoked internally. When a callback is provided both the possible error and rendered string are passed, and no automated response is performed.

### Example Usage
```javascript
res.render('index', function(err, html){
  // ...
});

res.render('user', { name: 'Tobi' }, function(err, html){
  // ...
});
```
