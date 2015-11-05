# myApp/tasks/register/prod.js

<docmeta name="uniqueID" value="prodjs338763">
<docmeta name="displayName" value="prod.js">

The production grunt task list.  sails will run this if there is no task list file matching NODE_ENV (eg. NODE_ENV = QA and QA.js exists).

```
module.exports = function (grunt) {
	grunt.registerTask('prod', [
		'compileAssets',
		'concat',
		'uglify',
		'cssmin',
		'sails-linker:prodJs',
		'sails-linker:prodStyles',
		'sails-linker:devTpl',
		'sails-linker:prodJsJade',
		'sails-linker:prodStylesJade',
		'sails-linker:devTplJade'
	]);
};

```
