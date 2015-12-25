# myApp/tasks/register/build.js


<docmeta name="displayName" value="build.js">

```
module.exports = function (grunt) {
	grunt.registerTask('build', [
		'compileAssets',
		'linkAssetsBuild',
		'clean:build',
		'copy:build'
	]);
};

```
