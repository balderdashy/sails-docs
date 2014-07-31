# req.param()
Returns the value of the parameter with the specified name.

### Usage

```javascript
req.param(name);
```

### Details

`req.param()` searches the url path, query string, and body of the request for the specified parameter.  If no parameter value exists anywhere in the request with the given `name`, it returns `undefined`.

+ url path parameters ([`req.params`](http://beta.sailsjs.org/#/documentation/reference/req/req.params.html))
  + e.g. a request "/foo/4" to route `/foo/:id` has url path params `{ id: 4 }`
+ query string parameters ([`req.query`](http://beta.sailsjs.org/#/documentation/reference/req/req.query.html))
  + e.g. a request "/foo?email=5" has query params `{ email: 5 }`
+ body parameters ([`req.body`](http://beta.sailsjs.org/#/documentation/reference/req/req.body.html))
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
> + If you'd like to get ALL parameters from ALL sources (including the URL path, query string, and parsed request body) you can use [`req.allParams()`](http://beta.sailsjs.org/#/documentation/reference/req/req.allParams.html).



<docmeta name="uniqueID" value="reqparam149618">
<docmeta name="displayName" value="req.param()">

