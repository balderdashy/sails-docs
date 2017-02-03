# tasks/register/default.js


<docmeta name="displayName" value="default.js">

La liste par défaut de tâches grunt. Sails s'exécute si aucun fichier de liste de tâches ne correspond à NODE_ENV (par exemple NODE_ENV=QA et QA.js existe) et qu'aucun autre environnement n'est défini (--prod, etc.).

```
module.exports = function (grunt) {
  grunt.registerTask('default', ['compileAssets', 'linkAssets',  'watch']);
};

```
