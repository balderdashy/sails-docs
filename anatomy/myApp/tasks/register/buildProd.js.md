# myApp/tasks/register/buildProd.js

<docmeta name="uniqueID" value="buildProdjs242328">
<docmeta name="displayName" value="buildProd.js">

```
module.exports = function (grunt) {
	grunt.registerTask('buildProd', [
		'compileAssets',
		'concat',
		'uglify',
		'cssmin',
		'linkAssetsBuildProd',
		'clean:build',
		'copy:build'
	]);
};

```
