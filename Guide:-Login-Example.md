> _Note: You are viewing the Sails.js v0.9.0 documentation.  If you're looking for information on v0.8.x, please visit [here](http://08x.sailsjs.org)._

This doesn't hash the password, or use a salt or anything, but hopefully it will give you an idea of how it works.
```javascript

/*---------------------
  :: Session 
	-> controller
---------------------*/
var SessionController = {
 
	login: function(req, res) {
 
		// Get password and username from request
		var username = req.param('username');
		var password = req.param('password');
 
		// No username/password entered
		if(!(username && password)) {
			res.send("No username or password specified!",500);
			// TODO: redirect, storing an error in the session
		}
 
		else {
			// Lookup the username/password combination
			User.find({
				username: username,
				password: password // TODO: hash the password first
			}).done(function (err, user) {
 
				// Login failed, incorrect username/password combination
				if (err || !user) {
					res.send("Invalid username and password combination!",500);
					// TODO: redirect, storing an error in the session
				}
 
				// Login succeeded
				if (user) {
					req.session.authenticated = true;
					req.session.User = user;
 
					// Redirect to protected area
					res.redirect('/dashboard');
				}
			});
		}
	}
};
module.exports = SessionController;
```

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8acf2fc2ca0aca8a3018e355ad776ed7 "githalytics.com")](http://githalytics.com/balderdashy/sails/wiki/loginExample)
