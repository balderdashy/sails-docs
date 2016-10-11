# tasks/config/clean.js

Prepare for a new pass through the asset pipeline by removing the files and folders in your Sails app's web root.

> (Conventionally, this is a hidden directory called `.tmp/public`.)

### Usage

For usage documentation, see https://github.com/gruntjs/grunt-contrib-clean.


### Example

```js
/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function(grunt) {

	grunt.config.set('clean', {
		dev: ['.tmp/public/**'],
		build: ['www']
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
};

```


<docmeta name="displayName" value="clean.js">
