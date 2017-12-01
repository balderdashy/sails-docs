# res.redirect()

Redirect the requesting user-agent to the given absolute or relative url.


### Usage
```js
return res.redirect([status,] url);
```

### Arguments

|   | Argument       | Type        | Details |
|---|----------------|:-----------:|---------|
| 1 | `status`       | ((integer)) |  (optional) a positive integer that corresponds to an [HTTP status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html).  Defaults to 302 ("found").|
| 2 | `url`          | ((string))  | A URL expression (see below for complete specification).<br/> e.g. `"http://google.com"` or `"/login"`



### Details

Sails/Express support a few forms of redirection, first being a fully qualified URI for redirecting to a different domain:

```javascript
return res.redirect('http://google.com');
```

The second form is the domain-relative redirect.  For example, if you were on http://example.com/admin/post/new, the following redirect to `/admin` would land you at http://example.com/admin:

```javascript
return res.redirect('/checkout');
```

Pathname relative redirects are also possible. If you were on http://example.com/admin/post/new, the following redirect would land you at http//example.com/admin/post:

```javascript
return res.redirect('..');
```
The final special-case is a back redirect, which allows you to redirect a request back where it came from using the "Referer" (or "Referrer") header (if omitted, redirects to `/` by default)

```javascript
return res.redirect('back');
```

If you want to send a custom status code along with a redirect, you can do so by sending the status as the first argument to res.redirect:
```javascript
return res.redirect(301, '/foo');
```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
> + When your app calls `res.redirect()`, Sails sends a response with status code [302](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#3xx_Redirection).  This instructs the user-agent to send a new request to the indicated URL.  There is no way to _force_ a user-agent to follow redirects, but most clients play nicely.
> + In general, you should not need to use `res.redirect()` if a request "wants JSON" (i.e. [`req.wantsJSON`](http://sailsjs.com/documentation/reference/req/req.wantsJSON.html)).
> + The [Sails socket client](http://sailsjs.com/documentation/reference/web-sockets/socket-client) does _not_ follow redirects, so if an action is called via a websocket request using (for example) [`io.socket.get()`](http://sailsjs.com/documentation/reference/web-sockets/socket-client/io-socket-get), it will simply receive a 302 status code and a header indicating the location of the desired resource.  It&rsquo;s up to the client-side code to decide how to handle redirects for websocket requests.
> + If you want to send a custom status code along with a redirect, you can set it as the first argument for res.redirect() function: `return res.redirect(301, '/foo')`;








<docmeta name="displayName" value="res.redirect()">
<docmeta name="pageType" value="method">

