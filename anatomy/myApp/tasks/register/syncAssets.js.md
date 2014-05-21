# myApp/tasks/register/syncAssets.js

<docmeta name="uniqueID" value="syncAssetsjs528286">
<docmeta name="displayName" value="syncAssets.js">

```
module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
		'less:dev',
		'sync:dev',
		'coffee:dev'
	]);
};

```
