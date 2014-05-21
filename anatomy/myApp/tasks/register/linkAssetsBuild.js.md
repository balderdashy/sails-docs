# myApp/tasks/register/linkAssetsBuild.js

<docmeta name="uniqueID" value="linkAssetsBuildjs786345">
<docmeta name="displayName" value="linkAssetsBuild.js">

```
module.exports = function (grunt) {
	grunt.registerTask('linkAssetsBuild', [
		'sails-linker:devJsRelative',
		'sails-linker:devStylesRelative',
		'sails-linker:devTpl',
		'sails-linker:devJsRelativeJade',
		'sails-linker:devStylesRelativeJade',
		'sails-linker:devTplJade'
	]);
};

```
