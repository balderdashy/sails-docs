# Custom Responses

### Overview

Sails v.10 allows for customizable server responses.  Sails comes with a handful of the most common response types by default.  They can be found in the `/api/responses` directory of your project.  To customize these, simply edit the appropriate .js file. 

As a quick example, consider the following controller action:

```
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

```
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

### Default responses

The following responses are bundled with all new Sails apps inside the `/api/responses` folder.  Each one sends a normalized JSON object if the client is expecting JSON, containing a `status` key with the HTTP status code, and additional keys with relevant information about any errors.

#### res.serverError(errors)

This response normalizes the error/errors of {errors} into an array of proper, readable `Error` objects. `errors` can be one or more strings or `Error` objects.  It then logs all Errors to the Sails logger (usually the console), and responds with the `views/500.*` view file if the client is expecting HTML, or a JSON object if the client is expecting JSON.  In development mode, the list of errors is included in the response.  In production mode, the actual errors are suppressed.

#### res.badRequest(validationErrors, redirectTo)

For requesters expecting JSON, this response includes the 400 status code and any relevant data sent as `validationErrors`.

For traditional (not-AJAX) web forms, this middleware follows best-practices for when a user submits invalid form data:

 - First, a one-time-use flash variable is populated, probably a string message or an array of semantic validation error objects.
 - Then the  user is redirected back to `redirectTo`, i.e. the URL where the bad request originated.
 - There, the controller and/or view might use the flash `errors` to either display a message or highlight the invalid HTML form fields.


#### res.notFound()

If the requester is expecting JSON, this response simply sends a 404 status code and a `{status: 404}` object. 

Otherwise the view located in `myApp/views/404.*` will be served.  If that view can't be found, then the client is just sent the JSON response.

#### res.forbidden(message)

If the requester is expecting JSON, this response sends the 403 status code along with the contents of `message`.

Otherwise the view located in `myApp/views/403.*` will be served.  If that view can't be found, then the client is just sent the JSON response.

### Custom Response

To add your own custom response method, simply add a file to `/api/responses` with the same name as the method you would like to create.  The file should export a function, which can take any parameters you like.

```
/** 
 * api/responses/myResponse.js
 *
 * This will be available in controllers as res.myResponse('foo');
 */

module.exports = function(message) {
   
  var req = this.req;
  var res = this.res;
   
  var viewFilePath = 'mySpecialView';
  var statusCode = 200;

  var result = {
    status: statusCode
  };

  // Optional message
  if (message) {
    result.message = message;
  }

  // If the user-agent wants a JSON response, send json
  if (req.wantsJSON) {
    return res.json(result, result.status);
  }

  // Set status code and view locals
  res.status(result.status);
  for (var key in result) {
    res.locals[key] = result[key];
  }
  // And render view
  res.render(viewFilePath, result, function(err) {
    // If the view doesn't exist, or an error occured, send json
    if (err) {
      return res.json(result, result.status);
    }

    // Otherwise, serve the `views/mySpecialView.*` page
    res.render(viewFilePath);
  });   
```


<docmeta name="uniqueID" value="CustomResponses867259">
<docmeta name="displayName" value="Custom Responses">

