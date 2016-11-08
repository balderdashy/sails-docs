# tasks/register/buildProd.js


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
