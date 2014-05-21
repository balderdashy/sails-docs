# myApp/tasks/register/linkAssetsBuildProd.js

<docmeta name="uniqueID" value="linkAssetsBuildProdjs100842">
<docmeta name="displayName" value="linkAssetsBuildProd.js">

```
module.exports = function (grunt) {
	grunt.registerTask('linkAssetsBuildProd', [
		'sails-linker:prodJsRelative',
		'sails-linker:prodStylesRelative',
		'sails-linker:devTpl',
		'sails-linker:prodJsRelativeJade',
		'sails-linker:prodStylesRelativeJade',
		'sails-linker:devTplJade'
	]);
};

```
