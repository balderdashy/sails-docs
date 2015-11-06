# myApp/tasks/register/prod.js

<docmeta name="uniqueID" value="prodjs338763">
<docmeta name="displayName" value="prod.js">

プロダクション環境のgruntのタスクリストです。SailsはNODE_ENVにマッチする(例:NODE_ENV = QA and QA.jsが存在する)タスクリストファイルがない際にこれを実行します。

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
