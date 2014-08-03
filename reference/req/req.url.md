# req.url

<!--
The querystring parser in Express/Connect removes the query string from the standard `req.url` in Node, so in Sails/Express/Koa/Connect, `req.url` is effectively a synonym for `req.path`.  Please see `req.path` for example usage.
-->

Like [`req.path`](), but includes the query string suffix, e.g. `/search?q=worlds%20largest%20dogs`.


### Notes
> + It is worth mentioning that the URL fragment/hash (e.g. "#some/clientside/route") pat of the url is [not available on the server](https://github.com/strongloop/express/issues/1083#issuecomment-5179035). This is an [open issue with the current HTTP specification](http://stackoverflow.com/a/2305927/486547).




<docmeta name="uniqueID" value="requrl810500">
<docmeta name="displayName" value="req.url">

