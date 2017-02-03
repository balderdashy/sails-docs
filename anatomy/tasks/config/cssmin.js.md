# tasks/config/cssmin.js

### Objectif

Ce fichier configure une tâche Grunt appelée "cssmin".

Minifiez le CSS intermédiaire, concaténée qui a été préparée par la tâche `concat` à `.tmp/public/concat/production.css`. Avec la tâche `concat`, c'est l'étape finale qui minifie tous les fichiers CSS de `assets/styles/` (et potentiellement votre fichier d'importateur LESS `assets/styles/import.less`).

### Utilisation

Pour plus d'informations sur l'utilisation, consultez [`grunt-contrib-cssmin`](https://npmjs.com/package/grunt-contrib-cssmin).



<docmeta name="displayName" value="cssmin.js">
