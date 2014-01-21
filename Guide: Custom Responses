# Using Custom Responses

### Overview

-- these can be generated

-- nice standardize.  so content-negotiation!  Wow!



// ...
return res.serverError(msgOrData);
// ...
By using standardized logic to respond, we give ourselves (and anyone else integrating against our API) a consistent, recognizable, and perhaps most importantly- stable- experience. I.e. error payloads are normalized, production vs. development logging is taken into account, error codes are consistent, content negotiation (JSON vs HTML) is taken care of, and any tweaks you want to make to the API can be done in one quick edit to the appropriate generic response file.

// ...
return res.respond(data);
// ...
For example- let's say your front-end switches from Backbone to Ember, and now you need to wrap all of your JSON responses in an extra object. No problem-- just change your responses.

// ...
return res.badRequest(msgOrData);
// ...
Need to mimic the API of another product or service?

How about standardizing your own API error codes?

etc. etc.

// ...
return res.forbidden(msgOrData);
// ...
Sails comes with a handful of the most common response types by default, but at the end of the day, each app has its own specific needs. To add a new custom response, create a new file into the api/responses directory. If you name your response module foo.js, you'll be able to access it on res.foo().
(warning: you can't override built-in sails/express/nodejs HttpResponse methods/properties with your custom response-- this is validated at lift-time)


DAT CODE


/**
 * 404 (Not Found) Handler
 *
 * Usage:
 * return res.notFound();
 * 
 * NOTE:
 * If no user-defined route, blueprint route, or static file matches
 * the requested URL, Sails will call `res.notFound()`.
 */

module.exports = function notFound() {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  var viewFilePath = '404';
  var statusCode = 404;
  var result = {
    status: statusCode
  };

  // If the user-agent wants a JSON response, send json
  if (req.wantsJSON) {
    return res.json(result, result.status);
  }

  res.status(result.status);
  res.render(viewFilePath, function(err) {
    // If the view doesn't exist, or an error occured, send json
    if (err) {
      return res.json(result, result.status);
    }

    // Otherwise, serve the `views/404.*` page
    res.render(viewFilePath);
  });
};
