# myApp/api/controllers/UserController.js
### Purposes

This file was created when you ran 'sails generate api User'.  It contains all of the controller logic for the model called 'User'. 

This is where you will put "controller actions" that send data to your clients and render the views which display that data.

<docmeta name="uniqueID" value="UserControllerjs867576">
<docmeta name="displayName" value="UserController.js">

```
/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function(req, res) {
		// index stuff goes here
	},

	show: function(req, res) {
		// show stuff goes here

		// 'title' and 'description' variables are accessible in the 'some_view_file.ejs' view.
		// You can use them anywhere in the view just like this <%= title %> or <%= description %>
		res.view("/path/to/some_view_file.ejs", {title: "Hello world!", description: "This is a Sails app!"})
	},
	
	new: function(req, res) {
		// new stuff goes here
	},

	create: function(req, res) {
		// create stuff goes here
	},

	edit: function(req, res) {
		// edit stuff goes here
	},

	update: function(req, res) {
		// update stuff goes here
	},

	destroy: function(req, res) {
		// destroy stuff goes here
	},
};


```
