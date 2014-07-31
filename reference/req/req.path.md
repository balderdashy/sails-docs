# req.path

The URL pathname from the [request URL string](http://nodejs.org/api/http.html#http_message_url) of the current request (`req`). Note that this is the part of the URL after and including the leading slash (e.g. `/foo/bar`), but without the query string (e.g. `?name=foo`) or fragment (e.g. `#foobar`.)


### Usage

```js
req.path;
```


### Example

Assuming a client sends the following request:

> http://localhost:1337/donor/37?name=foo#foobar

`req.path` will be defined as follows:

```js
req.path;
// -> "/donor/37"
```








<docmeta name="uniqueID" value="reqpath216836">
<docmeta name="displayName" value="req.path">

