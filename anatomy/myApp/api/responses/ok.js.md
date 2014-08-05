# myApp/api/responses/ok.js
### Purpose

This is one of the default Server Responses included in a new Sails project.

It contains the logic for what should happen when you wish to issue an http 200 response. It can be issued from anywhere you have access to the express `res` object by calling res.ok.

Feel free to edit this file to suit your needs.  You can also create a custom response using our `sails-generate-custom-response` generator.

See the Response section of Reference Documentation for more info.

<docmeta name="uniqueID" value="okjs629833">
<docmeta name="displayName" value="ok.js">

```
/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 * return res.ok(data, view);
 * return res.ok(data, redirectTo);
 * return res.ok(data, true);
 *
 * @param  {Object} data
 * @param  {Boolean|String} viewOrRedirect
 *         [optional]
 *          - pass string to render specified view
 *          - pass string with leading slash or http:// or https:// to do redirect
 */

module.exports = function sendOK (data, viewOrRedirect) {

	// Get access to `req` & `res`
  var req = this.req;
  var res = this.res;

  // Serve JSON (with optional JSONP support)
  function sendJSON (data) {
    if (!data) {
      return res.send();
    }
    else {
      if (typeof data !== 'object') { return res.send(data); }
      if ( req.options.jsonp && !req.isSocket ) {
        return res.jsonp(data);
      }
      else return res.json(data);
    }
  }

  // Set status code
  res.status(200);

  // Log error to console
  this.req._sails.log.verbose('Sent 200 ("OK") response');
  if (data) {
    this.req._sails.log.verbose(data);
  }

	// Serve JSON (with optional JSONP support)
	if (req.wantsJSON) {
		return sendJSON(data);
	}

  // Make data more readable for view locals
  var locals;
  if (!data || typeof data !== 'object'){
    locals = {};
  }
  else {
    locals = data;
  }

  // Serve HTML view or redirect to specified URL
  if (typeof viewOrRedirect === 'string') {
    if (viewOrRedirect.match(/^(\/|http:\/\/|https:\/\/)/)) {
      return res.redirect(viewOrRedirect);
    }
    else return res.view(viewOrRedirect, locals, function viewReady(viewErr, html) {
      if (viewErr) return sendJSON(data);
      else return res.send(html);
    });
  }
  else return res.view(locals, function viewReady(viewErr, html) {
    if (viewErr) return sendJSON(data);
    else return res.send(html);
  });

};

```
