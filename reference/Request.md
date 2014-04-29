# Request
### Overview

Sails is built on [Express](), and uses [Node's HTTP server]() conventions.  Because of this, you can access all of the Node and Express methods and properties on the `req` object whereever it is accessible (i.e. in your controllers, policies, and custom responses.)

A nice side effect of this compatibility is that, in many cases, you can paste existing Node.js code into a Sails app and it will work.  And since Sails implements a transport-agnostic request interpreter, the code in your Sails app is WebSocket-compatible as well.

Sails adds a few methods and properties of its own to the `req` object, like [`req.wantsJSON`]() and [`req.params.all()`]().  These features are syntactic sugar on top of the underlying implementation, and also support both HTTP and WebSockets.

The [Supported Features]() section includes a chart summarizes which methods and properties are available for each transport.


# req.wantsJSON
### Purpose
This property is used to check whether JSON is in the list of acceptable `Content-Type`s provided by the user-agent in the HTTP request header.

### Example Usage
```javascript
convertToXML = function(someRecord){

    // pretend there is code in here
    // that parses JSON into XML
}

Users.findOne({name:'Walter'}).exec(function foundHim(err,record){
    var myRecord = record;
});

// Check to see if the client can handle JSON.  If not, give them XML.

if (req.wantsJSON)
  res.send(myRecord)
else
  res.send(convertToXML(myRecord));


```


# req.param()
Returns the value of the parameter with the specified name.

### Usage

```javascript
req.param(nameOfParam);
```

### Details

`req.param()` searches the url path, query string, and body of the request for the specified parameter.  If no parameter value exists anywhere in the request with the given `name`, it returns `undefined`.

+ url path parameters ([`req.params`]())
  + e.g. a request "/foo/4" to route `/foo/:id` has url path params `{ id: 4 }`
+ query string parameters ([`req.query`]())
  + e.g. a request "/foo?email=5" has query params `{ email: 5 }`
+ body parameters ([`req.body`]())
  + e.g. a request with a parseable body (e.g. JSON, url-encoded, or XML) has body parameters equal to its parsed value


### Example

Consider a route (`POST /product/:sku`) which points to a blueprint, controller, or policy with the following code:

```javascript
req.param('sku');
// -> 123
```

We can get the expected result by sending the `sku` parameter any of the following ways:

+ `POST /product/123`
+ `POST /product?sku=123`
+ `POST /product`
    + with a JSON request body: `{ "sku": 123 }`



### Notes
> + If you'd like to get ALL parameters from ALL sources (including the URL path, query string, and parsed request body) you can use [`req.params.all()`]().





# req.file()

Returns a [readable Node stream](http://nodejs.org/api/stream.html#stream_class_stream_readable) of incoming multipart uploads (aka [`Upstream`](https://github.com/balderdashy/skipper/blob/master/lib/Upstream.js)) from the specified field (`fieldName`).

### Usage
`req.file(fieldName);`


### Example

In a controller action or policy:

```javascript
var SomeReceiver = require('../services/SomeReceiver');
req.file('avatar').upload( SomeReceiver(), function (err, files) {
    if (err) return res.serverError(err);
    return res.json({
      message: files.length + ' file(s) uploaded successfully!',
      files: files
    });
  });
});
```


### Notes
> + If you prefer to work directly with the Upstream as a stream of streams, you can omit the `.upload()` method and bind "finish" and "error" events (or use `.pipe()`) instead.  [Under the covers](https://github.com/balderdashy/skipper/blob/master/lib/Upstream.js#L126), all `.upload()` is doing is piping the **Upstream** into the specified receiver instance.




# req.route
### Purpose
This is an object containing information about the [route](http://omfgdogs.com) by which request traveled.
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


# req.accepts(`string`)
### Purpose

Checks if the supplied argument is found in the list of acceptable [Content-Type](http://omfgdogs.com)s specified by the user-agent who sent the request.
### Example Usage
```javascript
// Accept: text/html
req.accepts('html');
//  "html"

// Accept: text/*, application/json
req.accepts('html');
//  "html"
req.accepts('text/html');
//  "text/html"
req.accepts('json, text');
//  "json"
req.accepts('application/json');
//  "application/json"

// Accept: text/*, application/json
req.accepts('image/png');
req.accepts('png');
//  undefined

// Accept: text/*;q=.5, application/json
req.accepts(['html', 'json']);
req.accepts('html, json');
//  "json"
```


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


# req.is()
### Purpose
Checks if the incoming request contains the "Content-Type" header field, and it matches the given mime type.

### Example Usage
```javascript
// With Content-Type: text/html; charset=utf-8
req.is('html');
req.is('text/html');
req.is('text/*');
//  true

// When Content-Type is application/json
req.is('json');
req.is('application/json');
req.is('application/*');
//  true

req.is('html');
//  false

```



# req.ip
### Purpose
Get the client's IP address.

This property contains the IP address of the client initiating the request.

### Example Usage
```javascript
console.log(req.ip);

//  "127.0.0.1"
```


# req.ips
### Purpose
When "trust proxy" is `true`, parse the "X-Forwarded-For" ip address list and return an array, otherwise an empty array is returned. For example if the value were "client, proxy1, proxy2" you would receive the array `["client", "proxy1", "proxy2"]` where "proxy2" is the furthest down-stream.



# req.path
### Purpose
Returns the request URL pathname.

### Example Usage
```javascript
// example.com/users?sort=desc

console.log(req.path);

// '/users'
```


# req.host
### Purpose
Returns the hostname from the "Host" header field (without the port number)

### Example Usage
```javascript
// Host: "example.com:3000"
console.log(req.host);
//  "example.com"

```


# req.fresh
### Purpose
Check if the request is fresh - aka Last-Modified and/or the ETag still match, indicating that the resource is "fresh".

### Example Usage
```javascript
console.log(req.fresh)

//  true
```


# req.xhr
### Purpose
Check if the request was issued with the "X-Requested-With" header field set to "XMLHttpRequest" (AJAX)

### Example Usage
```javascript
console.log(req.xhr);
//  true

```


# req.protocol
### Purpose
This property contains the transport protocol of the request

### Example Usage
```javascript
console.log(req.protocol)
//  "http"
```



# req.secure
### Purpose
Is a [TLS](http://omfgdogs.com) connection established?

### Example Usage
```javascript
'https' == req.protocol;
```



# req.subdomains
### Purpose
This property is an array that contains all of the subdomains found in the URL



# req.method
### Purpose
This property contains the 'method' specified in the http request?

### Notes
> GET,POST,PUT,etc

# req.originalUrl
### Purpose
This property contains the original URL



# req.acceptedLanguages
### Purpose
This property is an array that contains the acceptable languages specified by the user agent in the http request.


### Notes
> This often isnt specified by the user agent

# req.acceptedCharsets
### Purpose
This property is an array that contains the acceptable charsets specified by the user agent in the http request.


### Notes
> This often isnt specified by the user agent

# req.acceptsCharset(`string`)
### Purpose
This method checks to see if the paramater supplied is found in req.acceptedCharsets.

### Notes
> Yo dawg.  I heard you like to iterate.  

# req.acceptsLanguage()
### Purpose
This method checks to see if the paramater supplied is found in req.acceptedLanguages.



# req.isSocket
### Purpose
Returns whether or not the request was delivered via socket.io 

### Example Usage
```javascript
// This would allow you to do different things with the same controller action
// based on whether the request is coming via sockets or http


if (req.isSocket){

  // You're a socket.  Do socket stuff.

} else {

  // Just an http request?  Have some HTML.

  res.view();

}


```



# req.params.all()

Returns the value of _all_ parameters sent in the request merged together into a single object. Includes parameters parsed from the url path, the query string, and the request body. See [`req.param()`](./#!documentation/reference/req.param) for details.

### Usage

```js
req.params.all();
```


### Example

Update the product with the specified `sku`, setting new values using the parameters which were passed in:

```javascript
var values = req.params.all();

// Don't allow `price` or `isAvailable` to be edited.
delete values.price;
delete values.isAvailable;

// At this point, `values` might look something like this:
// values ==> { displayName: 'Bubble Trouble Bubble Bath' }

Product.update({sku: sku})
.set(values)
.then(function (newProduct) {
  // ...
});
```




# req.socket

If the current Request (`req`) originated from a connected Socket.io client, `req.socket` refers to _that_ connected application-layer socket.

On the other hand, if the current Request (`req`) did NOT originate from a Socket.io client, `req.socket` is not guaranteed to exist.  In the most common scenario, HTTP requests, `req.socket` actually _does exist_, but it refers instead to the underlying TCP socket. Before using `req.socket`, you should check the [`req.isSocket`]() flag to ensure the request arrived via a connected Socket.io client.

> **Warning:**
> 
> `req.socket` may be deprecated in a future release of Sails.  You should use the [`sails.sockets.*`](./#!documentation/reference/Sockets) methods instead.

### Usage

`req.socket.id` is a unique identifier representing the current socket.  This is generated by the Socket.io server when a client first connects, and is a valid unique identifier until the socket is disconnected (e.g. if the client is a web browser, until the user closes her browser tab.)

Sails also provides direct, low-level access to all of the other methods and properties from a Socket.io `Socket`, including `req.socket`, including `req.socket.join`, `req.socket.leave`, `req.socket.broadcast`, and more.  See the relevant docs in the [Socket.io wiki](https://github.com/LearnBoost/socket.io/wiki/Rooms) for more information.


### Example

```js
if (req.isSocket) {
  // Low-level Socket.io methods and properties accessible on req.socket.
  // ...
}
else {
  // This is not a request from a Socket.io client, so req.socket
  // may or may not exist.  If this is an HTTP request, req.socket is actually
  // the underlying TCP socket.
  // ...
}
```


# req.url

The path of the current Request (`req`), as requested by the user-agent (i.e. client.)

### Usage

```js
req.url;
// -> "/donor/37"
```



### Example

Assuming a client sends the following request:

> [http://localhost:1337/donor/37]()

`req.url` will be defined as follows:

```js
req.url;
// -> "/donor/37"
```
