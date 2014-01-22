# Server Responses

### Overview

Sails v.10 allows for customizable server responses.  Sails comes with a handful of the most common response types by default.  They can be found in the `/api/responses` directory of your project.  To customize these, simply edit the appropriate .js file. 

By using standardized logic to respond, we give ourselves and anyone else integrating against our API a consistent, recognizable, and perhaps most importantly, stable experience. 

This approach to error handling has many advantages.  Here are a few.

 - Error payloads are normalized
 - Production vs. Development logging is taken into account
 - Error codes are consistent
 - Content negotiation (JSON vs HTML) is taken care of
 - API tweaks can be done in one quick edit to the appropriate generic response file


At the end of the day, each app has its own specific response needs.  That's why Sails allows you to create your own server responses.  See "Custom Responses" below for details on how to do this.

> Warning: You can't override built-in sails/express/nodejs HttpResponse methods/properties with your custom response. This is validated at lift-time


### Default Responses

Below you will find the default server responses with examples of how to serve them. 


#### res.serverError(msgOrData)

This response normalizes the error/errors of {String|Object|Error} into an array of proper, readable `Error` objects. In production, it won't display any identifying information about the error(s). It then logs all Errors in a clean 'stack' to the Sails Logger.

Finally it renders the view located in `myApp/views/500.*`.  If that view can't be found or the client is expecting JSON, then a JSON response is sent with the 500 status code.

##### Example

Lets say you have a policy which uses some special middleware to authenticate a user.  If that middleware fails, you'll want to call res.serverError to inform the authenticating client of the problem.

```javascript

// myApp/api/policy/authenticate.js

module.exports = function(req, res, next) {

  var middleware = require('mySketchyMiddleware');
  var myProfileID = req.session.myProfileID;
  
  // Pass the profileID to our middleware with a callback to run after it Authenticates 
  middleware.authenticate(myProfileID, function myCallback(middlewareError,isOkay){
  
    if (middlewareError){
      return res.serverError(middlewareError);
    } else {
    
      if (isOkay === true)
        req.session.authenticated = true;
      else
        req.session.authenticated = false;
        
      return next();
      
    }
  });
}


```

#### res.badRequest(msgOrData,url)

For requesters expecting JSON, everything works like you would expect

A simple JSON response indicating the 400: Bad Request status with relevant information will be returned. 

For traditional (not-AJAX) web forms, this middleware follows best-practices for when a user submits invalid form data:

 - First, a one-time-use flash variable is populated, probably a string message or an array of semantic validation error objects.
 - Then the  user is redirected back to `redirectTo`, i.e. the URL where the bad request originated.
 - There, the controller and/or view might use the flash `errors` to either display a message or highlight the invalid HTML form fields.

##### Example

Lets say you have the route `'GET /profile/:profileID':'ProfileController.showProfile'` in your app and a client sends a GET request to `/profile/`

Normally, express would convert whatever is after the `/profile/` portion of the URL into a parameter that Sails gives you access to via `req.param('profileID')`.  In this case since there is nothing after `/profile/`, the parameter will be blank.


```javascript

// myApp/api/controllers/ProfileController.js

module.exports = {

	showProfile: function(req,res){
  	var profileID = req.param('profileID') | undefined;
  	
    Profile.find({id:profileID}).exec(function(err,profile){
      if (err)
        return res.badRequest(err);
      else
        return res.json(profile);
    })
  }
}

```

#### res.notFound(msgOrData)

This is the simplest by default of the customizable server responses.  If the requester is expecting JSON, they get a JSON response with the 404 status code.  

Otherwise the view located in `myApp/views/404.*` will be served.  If that view can't be found, then the client is just sent the JSON response.

##### Example

Lets say you have the route `'GET /profile/:profileID':'ProfileController.showProfile'` in your app and a client sends a GET request to `/profile/15`


```javascript

// myApp/api/controllers/ProfileController.js

module.exports = {

	showProfile: function(req,res){
  	var profileID = req.param('profileID') | undefined;

    // Find the profile with id 15
    Profile.find({id:profileID}).exec(function(err,foundProfile){
      if (err) {
        return res.badRequest(err);
      } else {
        // Find always returns an array. If there is an element in it, we have found the profile.
        if (foundProfile.length > 0) 
		      return res.view('profile/user_profile',foundProfile);
        else 
          return res.notFound('That profile doesnt exist bro');
      }  
    })
  }
}

```


#### res.forbidden(msgOrData)


The 403 "Forbidden" status code will be sent along with one of the following. 

If the requester is expecting JSON, they get a JSON response.  

Otherwise the view located in `myApp/views/403.*` will be served.  If that view can't be found, then the client is just sent the JSON response.

##### Example

Let's say a client sends a request to view a restricted profile.  You might create a policy like the one below which checks to see if the client is on a list of users who are allowed to see the restricted profile.

```javascript

// myApp/api/policy/isAllowed.js

module.exports = function(req, res, next) {

  var clientProfileID = req.session.clientProfileID;

  // Assuming you have saved the clients profileID in the users session during authentication
  var wantedProfileID = req.param('profileID') | undefined;

  Profile.findOne({id:profileID}).exec(function(err,foundProfile){
        if (err) return err;
        
        // Load the allowedToSee attribute.
        // It contains an array of profileIDs for users who are allowed to see this resource
        
        var allowedProfileIDs = foundProfile.allowedToSee;
        
        if (allowedProfileIDs.indexOf(clientProfileID >= 0)
            return next();
        else
            return res.forbidden('This profile has been HIDDEN FROM YOU !!!!!');
	
  });

}


```




### Custom Response

The easiest way to create a custom response is by using the ('serverResponse-generator')[http://omfgdogs.com] which is accessed through the ('command line tool')[http://omfgdogs.com].

From your app's root directory in terminal

```sh

catGuy@catGuy:~/nodeProjects/myApp$ sails generate serverResponse myCustomResponse
info: Generating custom server response called myCustomResponse

```

This creates the file `myApp/api/responses/myCustomResponse.js`

You can also just manually add the .js file to your `myApp/api/responses` directory.  

The file will be initialized when you lift your app and a method called `res.myCustomResponse()` will be dynamically generated.  At this point, your error can be easily served within a controller or policy by calling `res.myCustomResponse()`


##### Example

```javascript

// myApp/api/responses/myCustomResponse.js

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


```
