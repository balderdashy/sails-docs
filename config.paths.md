# Configuring custom module directories

Convention is good.  But sometimes, because of your organization's build process, or the way your code repository is set up, or whatever, you may need to change where your app files are located.

> That said, please forgive one last piece of advice: 
> Don't change these paths unless you have to!  It'll make it harder for people to work on your app, in the future (including you), and adds needless complexity to an otherwise simple and conventional application structure.




> TODO: finish this

<!--

You can configure where Sails looks for the various parts of your app by setting `sails.config.paths` (i.e. create a `config/paths.js` file and export an object containing your desired overrides)

Here's an example, with all of the defaults:

```javascript

// Example `config/paths.js` file, using defaults
module.exports = {

	controllers		: 'api/controllers',
	models			: 'api/models',
	services		: 'api/services',
	policies		: 'api/policies',
	adapters		: 'api/adapters',
	views			: 'views',
	layout			: 'views/layout.ejs'
};
```
-->
