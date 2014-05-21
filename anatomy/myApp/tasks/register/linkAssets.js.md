# myApp/tasks/register/linkAssets.js

<docmeta name="uniqueID" value="linkAssetsjs43498">
<docmeta name="displayName" value="linkAssets.js">

```
module.exports = function (grunt) {
	grunt.registerTask('linkAssets', [
		'sails-linker:devJs',
		'sails-linker:devStyles',
		'sails-linker:devTpl',
		'sails-linker:devJsJade',
		'sails-linker:devStylesJade',
		'sails-linker:devTplJade'
	]);
};

```
