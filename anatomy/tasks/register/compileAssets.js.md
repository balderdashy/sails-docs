# myApp/tasks/register/compileAssets.js


<docmeta name="displayName" value="compileAssets.js">

```
module.exports = function (grunt) {
  grunt.registerTask('compileAssets', [
    'clean:dev',
    'jst:dev',
    'less:dev',
    'copy:dev',
    'coffee:dev'
  ]);
};

```
