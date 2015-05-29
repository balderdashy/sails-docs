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


<docmeta name="displayName" value="Default Responses">
