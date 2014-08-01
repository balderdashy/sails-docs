# res.negotiate()

Given an error (`err`), send an appropriate error response back down to the client.  Especially handy for handling potential validation errors from [Model.create()](/#/documentation/reference/waterline/models/create.html) or [Model.update()](/#/documentation/reference/waterline/models/update.html).

### Usage

```js
return res.negotiate(err);
```

### Details

Like the other built-in custom response modules, the behavior of this method is customizable.

`res.negotiate()` examines the provided error (`err`) and determines the appropriate error-handling behavior from one of the following methods:

+ [`res.badRequest()`](/#/documentation/anatomy/myApp/api/responses/badRequest.js.html)   (400)
+ [`res.forbidden()`](/#/documentation/anatomy/myApp/api/responses/forbidden.js.html)    (403)
+ [`res.notFound()`](/#/documentation/anatomy/myApp/api/responses/notFound.js.html)     (404)
+ [`res.serverError()`](/#/documentation/anatomy/myApp/api/responses/serverError.js.html)  (500)

The determination is made based on `err`'s "status" property.  If a more specific diagnosis cannot be determined (e.g. `err` doesn't have a "status" property, or it's a string), Sails will default to `res.serverError()`.



### Example


```javascript
// Add Fido's birthday to the database:
Pet.update({name: 'fido'})
  .set({birthday: new Date('01/01/2010')})
  .exec(function (err, fido) {
    if (err) return res.negotiate(err);
    return res.ok(fido);
   });
```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.negotiate()` (like other userland response methods) can be overridden - just define a response module (`/responses/negotiate.js`) and export a function definition.
>+ This method is used as the default handler for uncaught errors in Sails.  That means it is called automatically if an error is thrown in _any_ request handling code, _but only within the initial step of the event loop_.  You should always specifically handle errors that might arise in callbacks/promises from asynchronous code.







<docmeta name="uniqueID" value="resnegotiate730536">
<docmeta name="displayName" value="res.negotiate()">

