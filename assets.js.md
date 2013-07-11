<span id="assets.js"></span>
## assets.js
This file handles the assets that will be included at run time.

```javascript
// Asset rack configuration
module.exports.assets = {

  // In development mode
	// A list of directories, in order, which will be recursively parsed for css, javascript, and templates
	// and then can be automatically injected in your layout/views via the view partials:
	// ( assets.css(), assets.js() and assets.templateLibrary() )
	sequence: [
		'assets/mixins', 
		'assets/js', 
		'assets/styles', 
		'assets/templates'
	]
};
```
_**sequence:**_ \<array\>  This is an array of folders that will be included during runtime.  Each item will be processed in the order it is read in the array (fifo top-down).

<span id="bootstrap.js"></span>
## bootstrap.js
The bootstrap function is run before the server is launched.  A callback function is passed as the first argument that you must trigger when you're finished, e.g.

```
module.exports.bootstrap = function (cb) {
  User.create({
    name: 'Colonel Sanders',
    email: 'colonel@kfc.com',
    age: 286
  }, cb);
};
```
