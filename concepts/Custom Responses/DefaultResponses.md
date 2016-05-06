# Default responses

The following responses are bundled with all new Sails apps inside the `/api/responses` folder.  Each one sends a normalized JSON object if the client is expecting JSON, containing a `status` key with the HTTP status code, and additional keys with relevant information about any errors.

#### res.ok()

This method is used to send a 200 ("Ok") response back down to the client indicating that everything worked out a-okay. 👍 See the [`res.ok()` reference page](http://sailsjs.org/documentation/reference/response-res/res-ok) for usage info.

#### res.serverError()

This method is used to send a 500 ("Server Error") response back down to the client indicating that some kind of server error occurred. 💣 See the [`res.serverError()` reference page](http://sailsjs.org/documentation/reference/response-res/res-server-error) for usage info.

#### res.badRequest()

This method is used to send a 400 ("Bad Request") response back down to the client indicating that the request is invalid. 👎 See the [`res.badRequest()` reference page](http://sailsjs.org/documentation/reference/response-res/res-bad-request) for usage info.

#### res.notFound()

This method is used to send a 404 ("Not Found") response back down to the client indicating that the requested URL doesn&rsquo;t match any routes in the app. 💔 See the [`res.notFound()` reference page](http://sailsjs.org/documentation/reference/response-res/res-not-found) for usage info.

#### res.forbidden()

This method is used to send a 403 ("Forbidden") response back down to the client indicating that the request is not allowed. 🚫 See the [`res.forbidden()` reference page](http://sailsjs.org/documentation/reference/response-res/res-forbidden) for usage info.

#### res.created()

This method is used to send a 201 ("Created") response back down to the client indicating that one or more new resources have been created. See the [`res.created()` reference page](http://sailsjs.org/documentation/reference/response-res/res-created) for usage info.

<docmeta name="displayName" value="Default Responses">
