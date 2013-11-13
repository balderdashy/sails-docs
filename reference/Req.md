Request (req)
-------------
Sails is built on Express. Because of this, you can access all of the express methods and properties on the req() object over http.  Sails has also added a few methods on top of socket.io that allows you to access some of them over websockets.

# req.files
### Purpose
This is an object containing information about files uploaded through the Express bodyParser.  

### Example Usage
If a file field was named "image", and a file was uploaded, req.files.image would contain the following File object:
```json
{ size: 74643,
  path: '/tmp/8ef9c52abe857867fd0a4e9a819d1876',
  name: 'edge.png',
  type: 'image/png',
  hash: false,
  lastModifiedDate: Thu Aug 09 2012 20:07:51 GMT-0700 (PDT),
  _writeStream: 
   { path: '/tmp/8ef9c52abe857867fd0a4e9a819d1876',
     fd: 13,
     writable: false,
     flags: 'w',
     encoding: 'binary',
     mode: 438,
     bytesWritten: 74643,
     busy: false,
     _queue: [],
     _open: [Function],
     drainable: true },
  length: [Getter],
  filename: [Getter],
  mime: [Getter] }
```

### Notes

# req.param(string)
### Purpose
This method searches the http request body , header, and query string for a parameter with name equal to the supplied parameter.  

### Example Usage
```javascript

var myParam = req.param('blueStuff');

// myParam would contain the value of 'blueStuff' 

```

### Notes
> This is nice.  Sails makes it nicer by making ALL params available through req.params.all().  See this method below.

# req.route
### Purpose
This is an object containing information about the <a href=http://omfgdogs.com>route</a> by which request traveled.
### Example Usage
```javascript

console.log(req.route);

/*

{ path: '/user/:id?',
  method: 'get',
  callbacks: [ [Function] ],
  keys: [ { name: 'id', optional: true } ],
  regexp: /^\/user(?:\/([^\/]+?))?\/?$/i,
  params: [ id: '12' ] }
*/

```

### Notes

# req.cookies

### Purpose
This contains the unsigned cookies sent by the user-agent.

### Example Usage
```javascript

// Assuming the browser sends a cookie named 'Yummy'
console.log(req.cookies.name);

// "Yummy"

```

### Notes
> You should never have to use this method.  While it can be overridden, by default Sails uses the express cookieParser middleware which blanks req.cookies 

# req.signedCookies

### Purpose
This contains the signed cookies sent by the user-agent.

### Example Usage
```javascript

// Assuming the browser sends a SIGNED cookie named 'Yummy'
console.log(req.signedCookies.user);

// "Yummy"

```

### Notes
> You should never have to use this method.  While it can be overridden, by default Sails uses the express cookieParser middleware which blanks req.signedCookies 

# req.get()

### Purpose

Get the value of a field within the http request header with name equal to the supplied parameter.

### Example Usage
```javascript

// assuming a header field named 'myField' with value 'cat'

console.log(req.get('myField'));

// cat

```

### Notes

# req.accepts(```string```)
### Purpose
Checks if the supplied argument is found in the list of acceptable <a href="http://omfgdogs.com">Content-Type</a>s specified by the user-agent who sent the request.
### Example Usage
```javascript
// Accept: text/html
req.accepts('html');
// => "html"

// Accept: text/*, application/json
req.accepts('html');
// => "html"
req.accepts('text/html');
// => "text/html"
req.accepts('json, text');
// => "json"
req.accepts('application/json');
// => "application/json"

// Accept: text/*, application/json
req.accepts('image/png');
req.accepts('png');
// => undefined

// Accept: text/*;q=.5, application/json
req.accepts(['html', 'json']);
req.accepts('html, json');
// => "json"
```

### Notes

# req.accepted
### Purpose
Return an array of Accepted media types ordered from highest quality to lowest.

### Example Usage
```javascript
console.log(req.accepted);

/*
  [ { value: 'application/json',
      quality: 1,
      type: 'application',
      subtype: 'json' },
  { value: 'text/html',
       quality: 0.5,
       type: 'text',
       subtype: 'html' } ]
*/
```

### Notes

# req.is()
### Purpose
Check if the incoming request contains the "Content-Type" header field, and it matches the given mime type.
### Example Usage
```javascript

// With Content-Type: text/html; charset=utf-8
req.is('html');
req.is('text/html');
req.is('text/*');
// => true

// When Content-Type is application/json
req.is('json');
req.is('application/json');
req.is('application/*');
// => true

req.is('html');
// => false

```

### Notes

# req.ip
### Purpose
This property contains the IP address of the client initiating the request.
### Example Usage
```javascript

console.log(req.ip);

// => "127.0.0.1"

```

### Notes

# req.ips
### Purpose
When "trust proxy" is `true`, parse the "X-Forwarded-For" ip address list and return an array, otherwise an empty array is returned. For example if the value were "client, proxy1, proxy2" you would receive the array ["client", "proxy1", "proxy2"] where "proxy2" is the furthest down-stream.

### Example Usage
```javascript

```

### Notes

# req.path
### Purpose
Returns the request URL pathname.

### Example Usage
```javascript

// example.com/users?sort=desc

console.log(req.path);

// '/users'
```

### Notes

# req.host
### Purpose
Returns the hostname from the "Host" header field (without the port number)

### Example Usage
```javascript
// Host: "example.com:3000"
console.log(req.host);
// => "example.com"

```

### Notes

# req.fresh
### Purpose
Check if the request is fresh - aka Last-Modified and/or the ETag still match, indicating that the resource is "fresh".

### Example Usage
```javascript

console.log(req.fresh)

// => true
```

### Notes

# req.stale
### Purpose

### Example Usage
```javascript

```

### Notes

# req.xhr
### Purpose
Check if the request was issued with the "X-Requested-With" header field set to "XMLHttpRequest" (AJAX)

### Example Usage
```javascript

console.log(req.xhr);
// => true

```

### Notes

# req.protocol
### Purpose
This property contains the transport protocol of the request

### Example Usage
```javascript
console.log(req.protocol)
// => "http"
```

### Notes

# req.secure
### Purpose
Is a <a href="">TLS</a> connection established?

### Example Usage
```javascript
'https' == req.protocol;
```

### Notes

# req.session
### Purpose
This property is an array that contains all of the subdomains found in the host URL
### Example Usage
```javascript

```

### Notes

# req.subdomains
### Purpose

### Example Usage
```javascript

```

### Notes

# req.method
### Purpose

### Example Usage
```javascript

```

### Notes

# req.originalUrl
### Purpose

### Example Usage
```javascript

```

### Notes

# req.acceptedLanguages
### Purpose

### Example Usage
```javascript

```

### Notes

# req.acceptedCharsets
### Purpose

### Example Usage
```javascript

```

### Notes

# req.acceptsCharset()
### Purpose

### Example Usage
```javascript

```

### Notes

# req.acceptsLanguage()
### Purpose

### Example Usage
```javascript

```

### Notes

# req.isSocket
### Purpose

### Example Usage
```javascript

```

### Notes

# req.params.all()
### Purpose

### Example Usage
```javascript

```

### Notes

# req.socket.id
### Purpose

### Example Usage
```javascript

```

### Notes

# req.socket.join
### Purpose

### Example Usage
```javascript

```

### Notes

# req.socket.leave
### Purpose

### Example Usage
```javascript

```

### Notes

# req.socket.broadcast
### Purpose

### Example Usage
```javascript

```

### Notes

# req.transport
### Purpose

### Example Usage
```javascript

```

### Notes

# req.url
### Purpose

### Example Usage
```javascript

```

### Notes

# req.wantsJSON
