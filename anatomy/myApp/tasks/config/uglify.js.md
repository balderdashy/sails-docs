# myApp/tasks/config/uglify.js

<docmeta name="uniqueID" value="uglifyjs687746">
<docmeta name="displayName" value="uglify.js">

```
/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {

	grunt.config.set('uglify', {
		dist: {
			src: ['.tmp/public/concat/production.js'],
			dest: '.tmp/public/min/production.min.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
};

```
