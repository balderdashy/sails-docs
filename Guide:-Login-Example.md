> _Note: You are viewing the Sails.js v0.9.0 documentation.  If you're looking for information on v0.8.x, please visit [here](http://08x.sailsjs.org)._

This example uses the [bcrypt](https://github.com/ncb000gt/node.bcrypt.js) module to securly encrypt and compare passwords.
```javascript

/*---------------------
  :: Session 
    -> controller
---------------------*/
var bcrypt = require('bcrypt');

var SessionController = {
 
	login: function(req, res) {
 
		// Get password and username from request
		var username = req.param('username');
		var password = req.param('password');
 
		// No username/password entered
		if(!(username && password)) {
			return res.send('No username or password specified!', 500);
		}
		// Lookup the user in the database
		User.find({
			username: username
		}).exec(function (err, user) {

			// Account not found
			if (err || !user) {
				return res.send('Invalid username and password combination!', 500);
			}
            
            // Compare the passwords
            bcrypt.compare(password, user.password, function(err, valid) {
                if(err || !valid)
                    return res.send('Invalid username and password combination!', 500)
                
                // The user has authenticated successfully, set their session
                req.session.authenticated = true;
				req.session.User = user;

				// Redirect to protected area
				return res.redirect('/dashboard');
            });
		});
	},
    
    register: function(req, res){
        var username = req.param('username');
        var password = req.param('password');
        var confirm = req.param('password-confirm');
        
        // Make sure user has filled out the form correctly
        if (!username || !password || !confirm || password !== confirm) {
            return res.send('Please fill in all required fields', 500);
        }
        
        // Hash the password
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return res.send('An error occured', 500);
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) return res.send('An error occured', 500);
                
                // Save user to the database
                User.create({
                   username: username,
                   password: hash
                }).exec(function(err, user){
                    if (err) return res.send('An error occured', 500);
                    
                    // TODO: add email verification process
                    req.session.authenticated = true;
                    req.session.User = user;
                
                    // Redirect to protected area
                    return res.redirect('/dashboard');
                })
                
            });
        });
    }
};
module.exports = SessionController;
```

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8acf2fc2ca0aca8a3018e355ad776ed7 "githalytics.com")](http://githalytics.com/balderdashy/sails/wiki/loginExample)
