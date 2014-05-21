# res.negotiate()

Given an error (`err`), send an appropriate error response back down to the client.

### Usage

```js
return res.negotiate(err);
```

### Details

`res.negotiate()` chooses the appropriate error-handling behavior from one of the following methods:

+ [`res.badRequest()`]()   (400)
+ [`res.forbidden()`]()    (403)
+ [`res.notFound()`]()     (404)
+ [`res.serverError()`]()  (500)

If a more specific diagnosis cannot be determined, Sails will default to [`res.serverError()`]().


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.negotiate()` (like other userland response methods) can be overridden - just define a response module (`/responses/negotiate.js`) and export a function definition.
>+ This method is used as the default handler for uncaught errors in Sails.  That means it is called automatically if an error is thrown in _any_ request handling code, _but only within the initial step of the event loop_.  You should always specifically handle errors that might arise in callbacks/promises from asynchronous code.







<docmeta name="uniqueID" value="resnegotiate730536">
<docmeta name="displayName" value="res.negotiate()">

