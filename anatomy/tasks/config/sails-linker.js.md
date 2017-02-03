# tasks/config/sails-linker.js

Ce fichier configure une tâche Grunt appelée "sails-linker".

Injectez automatiquement des balises `<script>` et `<link>` dans le répertoire spécifique aux fichiers HTML et/ou EJS. Les délimiteurs spécifiés (`startTag` et `endTag`) déterminent les points d'insertion.

#### Développement (par défaut)

Par défaut, les tags seront injectés pour les fichiers JavaScript côté-client de votre application, des feuilles de style CSS et des templates HTML précompilés côté-client dans les templates `templates/` (Reportez-vous à la tâche `jst` pour plus d'informations). En outre, si un LESS existe dans `assets/styles/import.less`, il sera compilé en CSS et une balise `<link>` sera insérée pour elle. De même, si un Coffeescript existe dans `assets/js/`, ils seront compilés en JavaScript et injectés aussi.

#### Production (`NODE_ENV=production`)

En production, toutes les feuilles de style sont minifiées en un seul fichier `.css` (voir `Task/config/cssmin.js`) et tous les scripts côté-client sont minifiés dans un fichier `.js` (voir la tâche `tasks/config/uglify.js`). Tout les fichiers de templates HTML, CoffeeScript ou LESS sont regroupés dans ces mêmes deux fichiers minifiés.

### Utilisation

Pour plus d'informations, reportez-vous à la section [`grunt-sails-linker`](https://www.npmjs.com/package/grunt-sails-linker).


<docmeta name="displayName" value="sails-linker.js">

