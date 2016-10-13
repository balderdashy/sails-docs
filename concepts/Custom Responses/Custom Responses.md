# Custom Responses

### Overview

Sails allows for customizable server responses.  Sails comes with a handful of the most common response types by default.  They can be found in the `/api/responses` directory of your project.  To customize these, simply edit the appropriate .js file.

As a quick example, consider the following controller action:

```javascript
foo: function(req, res) {
   if (!req.param('id')) {
     res.status(400);
     res.view('400', {message: 'Sorry, you need to tell us the ID of the FOO you want!'});
   }
   ...
}
```

This code handles a bad request by sending a 400 error status and a short message describing the problem.  However, this code has several drawbacks, primarily:

*  It isn't *normalized*; the code is specific to this instance, and we'd have to work hard to keep the same format everywhere
*  It isn't *abstracted*; if we wanted to use a similar approach elsewhere, we'd have to copy / paste the code
*  The response isn't *content-negotiated*; if the client is expecting a JSON response, they're out of luck

Now, consider this replacement:

```javascript
foo: function(req, res) {
   if (!req.param('id')) {
     res.badRequest('Sorry, you need to tell us the ID of the FOO you want!');
   }
   ...
}
```


This approach has many advantages:

 - Error payloads are normalized
 - Production vs. Development logging is taken into account
 - Error codes are consistent
 - Content negotiation (JSON vs HTML) is taken care of
 - API tweaks can be done in one quick edit to the appropriate generic response file

### Responses methods and files

Any `.js` script saved in the `/api/responses` folder will be executed by calling `res.[responseName]` in your controller.  For example, `/api/responses/serverError.js` can be executed with a call to `res.serverError(errors)`.  The request and response objects are available inside the response script as `this.req` and `this.res`; this allows the actual response function to take arbitrary parameters (like `serverError`'s `errors` parameter).


<docmeta name="displayName" value="Custom Responses">
