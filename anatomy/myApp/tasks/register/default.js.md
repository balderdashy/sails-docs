# myApp/tasks/register/default.js

<docmeta name="uniqueID" value="defaultjs909775">
<docmeta name="displayName" value="default.js">

デフォルトのgruntのタスクリストです。SailsはNODE_ENVにマッチする(例:NODE_ENV = QA and QA.jsが存在する)タスクリストファイルがない際と、別の環境 (--prodなど)が設定されていな場合にこれを実行します。

```
module.exports = function (grunt) {
	grunt.registerTask('default', ['compileAssets', 'linkAssets',  'watch']);
};

```
