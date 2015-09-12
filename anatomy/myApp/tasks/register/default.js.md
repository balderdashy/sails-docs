# myApp/tasks/register/default.js

<docmeta name="uniqueID" value="defaultjs909775">
<docmeta name="displayName" value="default.js">

The default grunt task list.  sails will run this if there is no task list file matching NODE_ENV (eg. NODE_ENV = QA and QA.js exists) and no other environment is set (--prod, etc.).

```
module.exports = function (grunt) {
	grunt.registerTask('default', ['compileAssets', 'linkAssets',  'watch']);
};

```
