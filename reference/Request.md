# Request
### Overview

Sails is built on [Express](), and uses [Node's HTTP server]() conventions.  Because of this, you can access all of the Node and Express methods and properties on the `req` object whereever it is accessible (i.e. in your controllers, policies, and custom responses.)

A nice side effect of this compatibility is that, in many cases, you can paste existing Node.js code into a Sails app and it will work.  And since Sails implements a transport-agnostic request interpreter, the code in your Sails app is WebSocket-compatible as well.

Sails adds a few methods and properties of its own to the `req` object, like [`req.wantsJSON`]() and [`req.params.all()`]().  These features are syntactic sugar on top of the underlying implementation, and also support both HTTP and WebSockets.

The [Features](./features) overview at [www.sailsjs.org](http://www.sailsjs.org) includes a chart summarizes which methods and properties are available for each transport.


# req.wantsJSON

A flag indicating whether the requesting client would prefer a JSON response (as opposed to some other format, like XML or HTML.)

`req.wantsJSON` is used by all of the [built-in custom responses]() in Sails.


### Usage
```js
req.wantsJSON;
```

### Details

The intended purpose of `req.wantsJSON` is to provide a clean, reusable indication of whether the server should respond with JSON, or send back something else (like an HTML page or a 302 redirect.) It is not the right answer for _every_ content negotiation problem, but it is a simple, go-to solution for most use cases.

For instance, for requests typed into the URL bar, all major browsers set an "Accept: text/plain;" request header.  In that case, `req.wantsJSON` is false.  But for many other cases, the distinction is not quite as clear.  In those scenarios, Sails uses heuristics to determine the best value for `req.wantsJSON`.

Technically, `req.wantsJSON` inspects the request's `"Content-type"`, `"Accepts"`, and `"X-Requested-With"` headers to make an inference as to whether the request is expecting a JSON response.  If the request did not provide enough information to know for sure, Sails errs on the side of JSON (i.e. `req.wantsJSON` will be set to `true`.)

This all makes your app more future-proof and less brittle: as best-practices for content negotiation change over time (e.g. a new type of consumer device or enterprise user-agent introduces a new header) Sails can patch `req.wantsJSON` at the framework level and modify the heuristics accordingly. Not to mention that it reduces code duplication and saves you the annoyance of manually inspecting headers in each of your routes.

### Example
```javascript
if (req.wantsJSON) {
  return res.json(data);
}
else {
  return res.view(data);
}
```

### Notes
> + Lower-level content negotiation is, of course, still possible using `req.is()`, `req.accepts()`, `req.xhr`, and `req.get()`.
> + As of Sails v0.10, requests originating from a WebSocket client always "want JSON".


# req.param()
Returns the value of the parameter with the specified name.

### Usage

```javascript
req.param(name);
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



# req.params

An object containing parameter values parsed from the URL path.

For example if you have the route `/user/:name`, then the "name" from the URL path wil be available as `req.params.name`.  This object defaults to `{}`.


### Usage

```javascript
req.params;
```

### Notes
> + When a route address is defined using a regular expression, each capture group match from the regex is available as `req.params[0]`, `req.params[1]`, etc.This strategy is also applied to unnamed wild-card matches in string routes such as `/file/*`.






# req.query

An object containing the parsed query-string, defaulting to `{}`.

### Usage
```js
req.query;
```

### Example

If the request is `GET /search?q=mudslide`:

```js
req.query.q
// -> "mudslide"
```




# req.body

An object containing text parameters from the parsed request body, defaulting to `{}`.

By default, the request body can be url-encoded or stringified as JSON.  Support for other formats, such as serialized XML, is possible using the [middleware]() configuration.

### Usage
```js
req.body;
```

### Notes
>+ If a request contains one or more file uploads, only the text parameters sent _**before**_ the first file parameter will be available in `req.body`.


# req.file()

Returns a [readable Node stream](http://nodejs.org/api/stream.html#stream_class_stream_readable) of incoming multipart file uploads (an [`Upstream`](https://github.com/balderdashy/skipper/blob/master/lib/Upstream.js)) from the specified `field`.


### Usage
```js
req.file(field);
```

### Details

`req.file()` comes from [Skipper](https://github.com/balderdashy/skipper), an opinionated variant of the original Connect body parser that allows you to take advantage of high-performance, streaming file uploads without any dramatic changes in your application logic.

This is a great simplification, but comes with a minor caveat:  **Text parameters must be included before files in the request body.**  Typically, these text parameters contain string metadata which provides additional information about the file upload.

Multipart requests to Sails should send all of their **text parameters**. before sending _any_ **file parameters**.  For instance, if you're building a web frontend that communicates with Sails, you should include text parameters _first_ in any form upload or AJAX file upload requests.  The term "text parameters" refers to the metadata parameters you might along with the file(s) providing some additional information about this upload.


### How It Works

Skipper treats _all_ file uploads as streams.  This allows users to upload monolithic files with minimal performance impact and no disk footprint, all the while protecting your app against nasty denial-of-service attacks involving tmp files.

When a multipart request hits your server, instead of writing temporary files to disk, Skipper buffers the request just long enough to run your app code, giving you an opportunity to "plug in" to a compatible blob receiver.  If you don't "plug in" the data from a particular field, the Upstream hits its "high water mark", the buffer is flushed, and subsequent incoming bytes on that field are ignored.

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
> + Remember that the client request's **text parameters must be sent first**, before the file parameters.
> + `req.file()` supports multiple files sent over the same field, but it's important to realize that, as a consequence, the Upstream it returns is actually a stream (buffered event emitter) of potential binary streams (files).
> + If you prefer to work directly with the Upstream as a stream of streams, you can omit the `.upload()` method and bind "finish" and "error" events (or use `.pipe()`) instead.  [Under the covers](https://github.com/balderdashy/skipper/blob/master/lib/Upstream.js#L126), all `.upload()` is doing is piping the **Upstream** into the specified receiver instance, then running the specified callback when the Upstream emits either a `finish` or `error` event.





# req.cookies
An object containing all of the [**unsigned cookies**]() from this request (`req`).


### Usage
```javascript
req.cookies;
```


### Example
Assuming the request contained a cookie named "chocolatechip" with value "Yummy:

```javascript
req.cookies.chocolatechip;
// "Yummy"
```







# req.signedCookies

### Purpose
An object containing all of the [**signed cookies**]() from this request (`req`).


### Usage
```javascript
req.signedCookies;
```



### Example
Assuming the request contained a signed cookie named "chocolatechip" with value "Yummy:

```javascript
req.cookies.chocolatechip;
// "Yummy"
```







# req.get()

Returns the value of the specified `header` field in this request (`req`).  Note that header names are case-_insensitive_.

### Usage

```js
req.get(header);
```

### Example
Assuming `req` contains a header named 'myField' with value 'cat':

```javascript
req.get('myField');
// -> cat
```

### Notes
>+ The `header` argument is case-insensitive.
>+ The `header` argument treats both "referrer" and "referer" as synonyms, because sp3ll1n6.





# req.is()
Returns true if this request's declared "Content-Type" matches the specified media/mime `type`.  

Specifically, this method matches the given `type` against this request's "Content-Type" header.

### Usage
```js
req.is(type);
```


### Example
Assuming the request contains a "Content-Type" header, "text/html; charset=utf-8":
```javascript
req.is('html');
// -> true
req.is('text/html');
// -> true
req.is('text/*');
// -> true
```



# req.ip
### Purpose
The IP address of the client who sent this request (`req`).

If the `trust proxy` option is disabled, this is the "remote address".  Otherwise, if `trust proxy` is enabled, this is the "upstream address".


### Usage
```javascript
req.ip;
```

### Example
```javascript
req.ip;
// -> "127.0.0.1"
```


# req.ips
If "trust proxy" is enabled, this variable contains the IP addresses in this request's "X-Forwarded-For" header as an array of the IP address strings. Otherwise an empty array is returned.

### Usage
```js
req.ips;
```

### Example
If a request contains a header: "X-Forwarded-For: client, proxy1, proxy2":

```js
req.ips;
// -> ["client", "proxy1", "proxy2"]`

// ("proxy2" is the furthest "down-stream" IP address)
```









# req.fresh

A flag indicating the user-agent sending this request (`req`) wants "fresh" data (as indicated by the "[if-none-match](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.26)", "[cache-control](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9)", and/or "[if-modified-since](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.25)" request headers.)

If the request wants "fresh" data, usually you'll want to `.find()` fresh data from your models and send it back to the client.

### Usage
```js
req.fresh;
```

### Example
```js
if (req.fresh) {
  // The user-agent is asking for a more up-to-date version of the requested resource.
  // Let's hit the database to get some stuff and send it back.
}
```

### Notes
> + See the [`node-fresh`](https://github.com/visionmedia/node-fresh) module for details specific to the implementation in Sails/Express/Koa/Connect.








# req.protocol
The protocol used to send this request (`req`).

### Usage
```javascript
req.protocol;
```

### Example

```js
switch (req.protocol) {
  case 'http':
    // this is an HTTP request
    break;
  case 'https':
    // this is a secure HTTPS request
    break;
}
```



# req.secure

Indicates whether or not the request was sent over a secure [TLS]() connection (i.e. `https://` or `wss://`).

### Usage
```javascript
req.secure;
```





# req.host
The hostname of this request, without the port number, as specified by its "Host" header.


### Usage
```javascript
req.host;
```

### Example

If this request's "Host" header was: "ww3.staging.ibm.com:1492":

```javascript
req.host;
// -> "ibm.com"
```








# req.subdomains
An array of all the subdomains in this request's URL.

### Usage
```javascript
req.subdomains;
```

### Example

If the requested URL was "https://ww3.staging.ibm.com":

```javascript
req.subdomains;
// -> ['ww3', 'staging']
```






# req.method
The request method (aka "verb".)

### Usage
```js
req.method;
```

### Example

If a client sends a POST request to `/product`:

```js
req.method;
// -> "POST"
```

### Notes

> + All requests to a Sails server have a "method", even via WebSockets (this is thanks to the request interpreter)








# req.accepts()

Checks whether this request's stated list of "accepted" [media types](http://www.iana.org/assignments/media-types/media-types.xhtml) includes the specified `type`. Returns true or false.


### Usage
```javascript
req.accepts(type);
```

### Example

```javascript
req.accepts('application/json');
// -> true
req.accepts('json');
// -> true
```

### Notes
> + See the [`accepts` module](https://github.com/expressjs/accepts) for the finer details of the header parsing algorithm used in Sails/Express/Koa/Connect.



# req.accepted

Contains an array of the "media types" this request (`req`) can accept (e.g. `text/html` or `application/json`), ordered from highest to lowest quality.

### Usage
```javascript
req.accepted;
```

### Example

```javascript
req.accepted;

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
> + See the [`accepts` module](https://github.com/expressjs/accepts) for the finer details of the header parsing algorithm used in Sails/Express/Koa/Connect.




# req.acceptedLanguages
An array containing the "acceptable" response languages specified by the user agent in the "[Accept-Language](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)" header of this request (`req`).

### Usage
```js
req.acceptedLanguages;
```

### Details

`req.acceptedLanguages` contains all the languages specified by the request's `Accept-Language` header (see [RFC-2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4).)

This method is used by Sails internally for its implementation of internationalization and localization.  The [i18n]() hook automatically serves different content to different locales, based on the request.


### Example

```js
req.acceptedLanguages;
// -> ['en-US', 'en']
```

### Notes
> + See the [`accepts` module](https://github.com/expressjs/accepts) for the finer details of the header parsing algorithm used in Sails/Express/Koa/Connect.
> + Browsers send the "Accept-Language" header automatically based on the user's language settings.
> + You can expect the "Accept-Language" header to exist in most requests which originate from web browsers.




# req.acceptsLanguage()

Returns whether this request (`req`) considers a certain `language` "acceptable".


### Usage

```js
req.acceptsLanguage(language);
```

### Details

`req.acceptsLanguage()` returns true if a request has specified the given `language` as "acceptable" its `Accept-Language` header (see [RFC-2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4).)

This method is used by Sails internally for its implementation of internationalization and localization.  The [i18n]() hook automatically serves different content to different locales, based on the request.


### Example

If a request is sent with a `"Accept-Charset: utf-8"` header:

```js
req.acceptsCharset('utf-8');
// -> true
```

### Notes
> + See the [`accepts` module](https://github.com/expressjs/accepts) for the finer details of the header parsing algorithm used in Sails/Express/Koa/Connect.
> + Browsers send the "Accept-Language" header automatically based on the user's language settings.
> + You can expect the "Accept-Language" header to exist in most requests which originate from web browsers.














# req.acceptedCharsets
This property is an array that contains the acceptable charsets specified by the user agent in the request.



### Usage

```js
req.acceptedCharsets;
```

### Details

Useful for advanced content negotiation where a client may or may not support certain character sets, such as unicode (utf-8.)  This returns all of the "acceptable" charsets specified in this request's `Accept-Charset` header (see [RFC-2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.2).)



### Example

```js
req.acceptedCharsets;
// -> ['utf-8', 'utf-16']
```

### Notes
> + See the [`accepts` module](https://github.com/expressjs/accepts) for the finer details of the header parsing algorithm used in Sails/Express/Koa/Connect.












# req.acceptsCharset()

Returns whether this request (`req`) is able to handle a specified `characterSet`.


### Usage

```js
req.acceptsCharset(characterSet);
```

### Details

Useful for advanced content negotiation where a client may or may not support certain character sets, such as unicode (utf-8.)  This method determines whether or not a request has specified the given `characterSet` as "acceptable" its `Accept-Charset` header (see [RFC-2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.2).)



### Example

If a request is sent with a `"Accept-Charset: utf-8"` header:

```js
req.acceptsCharset('utf-8');
// -> true
```

### Notes
> + See the [`accepts` module](https://github.com/expressjs/accepts) for the finer details of the header parsing algorithm used in Sails/Express/Koa/Connect.














# req.isSocket

A flag indicating whether or not this request (`req`) originated from a Socket.io connection.


### Usage
```js
req.isSocket;
```

### Example
```javascript
if (req.isSocket){
  // You're a socket.  Do cool socket stuff.
}
else {
  // Just another HTTP request.
}
```

### Notes

> + Useful for allowing HTTP requests to skip calls to pubsub or WebSocket-centric methods like `subscribe()` or `watch()`  that depend on an actual Socket.io request.  This allows you to reuse backend code, using it for both WebSocket and HTTP clients.
> + As you might expect, `req.isSocket` doesn't need to be checked before running methods which **publish to other** connected sockets.  Those methods don't depend on the request, so they work either way.










# req.allParams()

Returns the value of _all_ parameters sent in the request, merged together into a single object. Includes parameters parsed from the url path, the query string, and the request body. See [`req.param()`](./#!documentation/reference/req.param) for details.

### Usage

```js
req.allParams();
```


### Example

Update the product with the specified `sku`, setting new values using the parameters which were passed in:

```javascript
var values = req.allParams();

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

### Notes

>+ This method can also be called as `req.params.all()` - they are synonyms.















# req.socket

If the current Request (`req`) originated from a connected Socket.io client, `req.socket` refers to the raw Socket.io socket instance.

### Usage

```js
req.socket;
```


### Details

> **Warning:**
> 
> `req.socket` may be deprecated in a future release of Sails.  You should use the [`sails.sockets.*`](./#!documentation/reference/Sockets) methods instead.

If the current request (`req`) did NOT originate from a Socket.io client, `req.socket` does not have the same meaning.  In the most common scenario, HTTP requests, `req.socket` actually _does exist_, but it refers instead to the underlying TCP socket. Before using `req.socket`, you should check the [`req.isSocket`]() flag to ensure the request arrived via a connected Socket.io client.

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





# req.path

The URL pathname from the [request URL string](http://nodejs.org/api/http.html#http_message_url) of the current request (`req`). Note that this is the part of the URL after and including the leading slash (e.g. `/foo/bar`), but without the query string (e.g. `?name=foo`) or fragment (e.g. `#foobar`.)


### Usage

```js
req.path;
```


### Example

Assuming a client sends the following request:

> [http://localhost:1337/donor/37?name=foo#foobar]()

`req.path` will be defined as follows:

```js
req.path;
// -> "/donor/37"
```








# req.url

The querystring parser in Express/Connect removes the query string from the standard `req.url` in Node, so in Sails/Express/Koa/Connect, `req.url` is effectively a synonym for `req.path`.  Please see `req.path` for example usage.





# req.xhr
A flag indicating whether the current request (`req`) appears to be an AJAX request (i.e. it was issued with its "X-Requested-With" header set to "XMLHttpRequest".)


### Usage
```js
req.xhr;
```

### Example
```javascript
if (req.xhr) {
  // Yup, it's AJAX alright.
}
```


### Notes
> + Whenever possible, you should prefer the `req.wantsJSON` flag.  Avoid writing custom content-negotiation negotiation logic into your app  - it makes your code more brittle and more verbose.



