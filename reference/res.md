#res.status()
### Purpose
Chainable alias of node's '`res.statusCode=`.

### Example Usage
```javascript
res.status(404).sendfile('path/to/404.png');
```

### Notes
>

# res.set(`field`, [value])
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
// => "text/plain"

```

### Notes
>

# res.cookie(name, value, [options])
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

# res.clearCookie()
### Purpose

### Example Usage
```javascript

```

### Notes
>

# res.redirect()
### Purpose

### Example Usage
```javascript

```

### Notes
>

# res.location()
### Purpose

### Example Usage
```javascript

```

### Notes
>

# res.charset
### Purpose

### Example Usage
```javascript

```

### Notes
>

# res.send()
### Purpose

### Example Usage
```javascript

```

### Notes
>

# res.json()
### Purpose

### Example Usage
```javascript

```

### Notes
>

# res.jsonp()
### Purpose

### Example Usage
```javascript

```

### Notes
>

# res.type()
### Purpose

### Example Usage
```javascript

```

### Notes
>

# res.format()
### Purpose

### Example Usage
```javascript

```

### Notes
>

# res.attachment()
### Purpose

### Example Usage
```javascript

```

### Notes
>

# res.sendfile()
### Purpose

### Example Usage
```javascript

```

### Notes
>

# res.download()
### Purpose

### Example Usage
```javascript

```

### Notes
>

# res.links()
### Purpose

### Example Usage
```javascript

```

### Notes
>

# res.locals
### Purpose

### Example Usage
```javascript

```

### Notes
>

# res.render()
### Purpose

### Example Usage
```javascript

```

### Notes
>

# res.view()
### Purpose

### Example Usage
```javascript

```

### Notes
>


### Purpose

### Example Usage
```javascript

```

### Notes
>

