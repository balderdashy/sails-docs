# Response
### Overview
Below is a chart describing Sails.js support of the .res() methods.

|Name| Author  | HTTP ?  | socket.io |
|----|-------------|---------|---------|
| res.status() | Express | :-) | :-) |
| res.set() | Express | :-) | :-( |
| res.get() | Express | :-) | :-( |
| res.cookie() | Express | :-) | :-( |
| res.clearCookie() | Express | :-) | :-( |
| res.redirect() | Express | :-) | :-) |
| res.location() | Express | :-) | :-( |
| res.charset | Express | :-) | :-) |
| res.send() | Express | :-) | :-) |
| res.json() | Express | :-) | :-) |
| res.jsonp() | Express | :-) | :-) |
| res.type() | Express | :-) | :-( |
| res.format() | Express | :-) | :-( |
| res.attachment() | Express | :-) | :-( |
| res.sendfile() | Express | :-) | :-( |
| res.download() | Express | :-) | :-( |
| res.links() | Express | :-) | :-( |
| res.locals | Express | :-) | :-) |
| res.render() | Express | :-) | :-( |
|||||
|||||
| res.view | Sails | :-) | :-( |


# res.status()
### Purpose
Chainable alias of node's '`res.statusCode=`.

### Example Usage
```javascript
res.status(404).sendfile('path/to/404.png');
```

### Notes
>

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

### Notes
>

# res.get(`string`)
### Purpose
Get the case-insensitive response header `field`

### Example Usage
```javascript

res.get('Content-Type');
// "text/plain"

```

### Notes
>

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
>Later you may access this value through the req.signedCookie object.

# res.clearCookie(`name`, `[options]`)
### Purpose
Clear cookie name. The path option defaults to "/".
### Example Usage
```javascript
res.cookie('name', 'tobi', { path: '/admin' });
res.clearCookie('name', { path: '/admin' });
```

### Notes
>

# res.redirect()
### Purpose
Redirect to the given url with optional status code defaulting to 302 "Found".
### Example Usage

```javascript
res.redirect('/foo/bar');
res.redirect('http://example.com');
res.redirect(301, 'http://example.com');
res.redirect('../login');
```
Express supports a few forms of redirection, first being a fully qualified URI for redirecting to a different site:

```javascript
res.redirect('http://google.com');
```
The second form is the pathname-relative redirect, for example if you were on http://example.com/admin/post/new, the following redirect to /admin would land you at http://example.com/admin:

```javascript
res.redirect('/admin');
```
This next redirect is relative to the mount point of the application. For example if you have a blog application mounted at /blog, ideally it has no knowledge of where it was mounted, so where a redirect of /admin/post/new would simply give you http://example.com/admin/post/new, the following mount-relative redirect would give you http://example.com/blog/admin/post/new:

```javascript
res.redirect('admin/post/new');
```
Pathname relative redirects are also possible. If you were on http://example.com/admin/post/new, the following redirect would land you at http//example.com/admin/post:

```javascript
res.redirect('..');
```
The final special-case is a back redirect, redirecting back to the Referer (or Referrer), defaulting to / when missing.

```javascript
res.redirect('back');
```

### Notes
>

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

### Notes
>

# res.charset
### Purpose
Assign the charset. Defaults to "utf-8".

### Example Usage
```javascript
res.charset = 'value';
res.send('some html');
// Content-Type: text/html; charset=value
```

### Notes
>

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

### Notes
>

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

### Notes
>

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

### Notes
>

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

### Notes
>

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

### Notes
>

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

### Notes
>

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

### Notes
>

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
### Notes
>

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

### Notes
>

# res.render(`view`, `[locals]` , callback)
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

### Notes
>

# res.view(`{}`)
### Purpose
This is a Sails method that loads the appropriate view.  

### Example Usage

Assuming the example below is an action in UsersController.js .

```javascript

riceNoodles: function(req,res){

    res.view();

}

// This would render the view /views/users/riceNoodles.ejs


```

### Notes
>

# res.badRequest()
### Purpose
do whatever is in config/400.js
### Example Usage


```javascript


```

### Notes
>

# res.forbidden()
### Purpose
Do whatever is in config/403.js

### Example Usage


```javascript


```

### Notes
>


# res.notFound()
### Purpose
Do whatever is in config/404.js
### Example Usage


```javascript


```

### Notes
>


# res.serverError()
### Purpose
Do whatever is in config/500.js
### Example Usage


```javascript


```

### Notes
>
