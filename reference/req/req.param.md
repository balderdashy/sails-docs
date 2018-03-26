# req.param()
Returns the value of the parameter with the specified name.

### Usage

```javascript
req.param(name[, defaultValue]);
```

### Details

`req.param()` searches the url path, query string, and body of the request for the specified parameter.  If no parameter value exists anywhere in the request with the given `name`, it returns `undefined`, or the optional `defaultValue` if specified.

+ url path parameters ([`req.params`](http://sailsjs.com/documentation/reference/request-req/req-params))
  + e.g. a request "/foo/4" to route `/foo/:id` has url path params `{ id: 4 }`
+ query string parameters ([`req.query`](http://sailsjs.com/documentation/reference/request-req/req-query))
  + e.g. a request "/foo?email=5" has query params `{ email: 5 }`
+ body parameters ([`req.body`](http://sailsjs.com/documentation/reference/request-req/req-body))
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
> + If you'd like to get ALL parameters from ALL sources (including the URL path, query string, and parsed request body) you can use [`req.allParams()`](https://sailsjs.com/documentation/reference/request-req/req-all-params).




<docmeta name="displayName" value="req.param()">
<docmeta name="pageType" value="method">

