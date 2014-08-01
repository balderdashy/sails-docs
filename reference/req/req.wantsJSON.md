# req.wantsJSON

A flag indicating whether the requesting client would prefer a JSON response (as opposed to some other format, like XML or HTML.)

`req.wantsJSON` is used by all of the [built-in custom responses](/#/documentation/anatomy/myApp/api/responses) in Sails.


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


<docmeta name="uniqueID" value="reqwantsJSON30891">
<docmeta name="displayName" value="req.wantsJSON">

