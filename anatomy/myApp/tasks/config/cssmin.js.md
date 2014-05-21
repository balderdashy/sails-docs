# myApp/tasks/config/cssmin.js

<docmeta name="uniqueID" value="cssminjs49702">
<docmeta name="displayName" value="cssmin.js">

```
/**
 * Compress CSS files.
 *
 * ---------------------------------------------------------------
 *
 * Minifies css files and places them into .tmp/public/min directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-cssmin
 */
module.exports = function(grunt) {

	grunt.config.set('cssmin', {
		dist: {
			src: ['.tmp/public/concat/production.css'],
			dest: '.tmp/public/min/production.min.css'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
};

```
