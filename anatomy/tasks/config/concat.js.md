# tasks/config/concat.js

### Objectif

Ce fichier configure une tâche Grunt appelée "concat".

Concatène le contenu de plusieurs fichiers JavaScript et/ou CSS en deux nouveaux fichiers, situés respectivement dans `concat/production.js` et `concat/production.css` dans `.tmp/public/concat`.

Ceci est utilisé comme une étape intermédiaire pour générer des fichiers monolithiques qui peuvent ensuite être transmis à `uglify` et/ou` cssmin` pour la [minification](https://fr.wikipedia.org/wiki/Minification).


### Utilisation

Pour plus d'informations sur l'utilisation, consultez [`grunt-contrib-concat`](https://npmjs.com/package/grunt-contrib-concat).


<docmeta name="displayName" value="concat.js">
