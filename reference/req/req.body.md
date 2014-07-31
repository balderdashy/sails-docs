# req.body

An object containing text parameters from the parsed request body, defaulting to `{}`.

By default, the request body can be url-encoded or stringified as JSON.  Support for other formats, such as serialized XML, is possible using the [middleware](http://beta.sailsjs.org/#/documentation/concepts/Middleware) configuration.

### Usage
```js
req.body;
```

### Notes
>+ If a request contains one or more file uploads, only the text parameters sent _**before**_ the first file parameter will be available in `req.body`.


<docmeta name="uniqueID" value="reqbody1481">
<docmeta name="displayName" value="req.body">

