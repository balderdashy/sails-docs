# tasks/config/copy.js

### Objectif

Ce fichier configure une tâche Grunt appelée "copy".

Cette tâche copie les fichiers et/ou les dossiers de votre répertoire `assets/` dans la racine web (`.tmp/public`) afin qu'ils puissent être servis via HTTP, ainsi que pour d'autres traitements préalables par d'autres tâches Grunt.

#### Utilisation normale (`sails lift`)
Copie tous les répertoires et fichiers (à l'exception de CoffeeScript et LESS) du dossier `assets/` dans la racine Web - conventionnellement un dossier caché situé dans `.tmp/public`.

#### Via la liste de tâches `build` (`sails www`)
Copie tous les répertoires et fichiers du répertoire `.tmp/public` dans un répertoire www.

### Utilisation

Pour plus d'informations sur l'utilisation, consultez [`grunt-contrib-copy`](https://npmjs.com/package/grunt-contrib-copy).



<docmeta name="displayName" value="copy.js">
