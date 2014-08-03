# req.url

Like [`req.path`](http://sailsjs.org/#/documentation/reference/req/req.path.html), but also includes the query string suffix.

```js
req.url;

// => "/search?q=worlds%20largest%20dogs"
```


### Notes
> + It is worth mentioning that the URL fragment/hash (e.g. "#some/clientside/route") part of the url is [not available on the server](https://github.com/strongloop/express/issues/1083#issuecomment-5179035). This is an [open issue with the current HTTP specification](http://stackoverflow.com/a/2305927/486547). So if you write an action to redirect from one subdomain to another, for instance, you won't be able to peek at the URL fragment in that action.
> + However, if you respond with a 302 redirect (i.e. `res.redirect()`) the user agent on the other end will preserve the URL fragment/hash and tack it on to the end of the new redirected URL.  In many cases, this is exactly what you want!



<!--
This doesn't seem to be true anymore: 

The querystring parser in Express/Connect removes the query string from the standard `req.url` in Node, so in Sails/Express/Koa/Connect, `req.url` is effectively a synonym for `req.path`.  Please see `req.path` for example usage.
-->


<docmeta name="uniqueID" value="requrl810500">
<docmeta name="displayName" value="req.url">

