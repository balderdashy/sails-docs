# res.redirect()

Redirect the requesting user-agent to the given absolute or relative url.


### Usage
```js
return res.redirect(url);
```

### Arguments

|   | Argument       | Type        | Details |
|---|----------------|:-----------:|---------|
| 1 | `url`          | ((string))  | A URL expression (see below for complete specification).<br/> e.g. `"http://google.com"` or `"/login"`



### Details

Sails/Express/Koa/Connect support a few forms of redirection, first being a fully qualified URI for redirecting to a different domain:

```javascript
return res.redirect('http://google.com');
```

The second form is the domain-relative redirect.  For example, if you were on http://example.com/admin/post/new, the following redirect to `/admin` would land you at http://example.com/admin:

```javascript
return res.redirect('/checkout');
```

<!--
Probably more confusing than helpful:

This next redirect is relative to the mount point of the application. For example if you have a blog application mounted at /blog, ideally it has no knowledge of where it was mounted, so where a redirect of /admin/post/new would simply give you http://example.com/admin/post/new, the following mount-relative redirect would give you http://example.com/blog/admin/post/new:

```javascript
return res.redirect('admin/post/new');
```
-->


Pathname relative redirects are also possible. If you were on http://example.com/admin/post/new, the following redirect would land you at http//example.com/admin/post:

```javascript
return res.redirect('..');
```
The final special-case is a back redirect, which allows you to redirect a request back where it came from using the "Referer" (or "Referrer") header (if omitted, redirects to `/` by default)

```javascript
return res.redirect('back');
```

### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
> + When your app calls `res.redirect()`, Sails sends a response with status code [302](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#3xx_Redirection).  This instructs the user-agent to send a new request to the indicated URL.  There is no way to _force_ a user-agent to follow redirects, but most clients play nicely.
> + In general, you should not need to use `res.redirect()` if a request "wants JSON" (i.e. [`req.wantsJSON`](/#/documentation/reference/req/req.wantsJSON.html)).
> + If a request originated from a Socket.io client, it always "wants JSON".  If you do call `res.redirect(/#/documentation/reference/res/res.redirect.html)` for a socket request, Sails reroutes the request internally on the server, effectively "forcing" the redirect to take place (i.e. instead of sending a 302 status code, the server simply creates a new request to the redirect URL).
>  + As a result, redirects to external domains are not supported for socket requests (although this is technically possible by proxying).
>  + This behavior may change to more closely reflect HTTP in future versions of Sails.










<docmeta name="uniqueID" value="resredirect444617">
<docmeta name="displayName" value="res.redirect()">

