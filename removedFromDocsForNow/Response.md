

<!--
# res.locals

> Probably best to not go over res.locals in the mainline docs- it confuses the issue, and brings the number of sources for local variables up to 5, which is really too many places, don't you think?  Anything you can do with res.locals you can do with res.view(locals).

The living  local variables are scoped to the request, thus only available to the view(s) rendered during that request / response cycle, if any. Otherwise this API is identical to app.locals.

This object is useful for exposing request-level information such as the request pathname, authenticated user, user settings etcetera.

### Example Usage
```javascript
app.use(function(req, res, next){
  res.locals.user = req.user;
  res.locals.authenticated = ! req.user.anonymous;
  next();
});
```
-->

<!--
 res.links()
Sets the "Link" header of the response using the given `links`.

### Usage
```js
res.links(links);
```

### Example

```javascript
res.links({
  next: 'http://api.example.com/users?page=2',
  last: 'http://api.example.com/users?page=5'
});
res.send(200);
```

yields the following response header:

```http
Link: <http://api.example.com/users?page=2>; rel="next", 
      <http://api.example.com/users?page=5>; rel="last"
```



-->






<!--

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

-->













<!--

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

-->



<!-- 



res.format(`object`)
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
-->

<!--
res.charset

Use [res.set()](https://github.com/visionmedia/express/wiki/Migrating%20from%203.x%20to%204.x#rescharset)

Sets the "Charset" response header.

Defaults to "utf-8".

### Usage

```js
res.charset('utf-16');
```


### Example Usage
```javascript
res.charset = 'value';
res.send('some html');
// Content-Type: text/html; charset=value
```
-->


