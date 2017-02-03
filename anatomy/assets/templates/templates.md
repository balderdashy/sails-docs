# assets/templates
### Objectif

Les templates HTML (côté client) sont des conditions préalables importantes pour certains types d'applications client modernes et riches conçues pour les navigateurs; Notamment les [SPAs](https://fr.wikipedia.org/wiki/Application_web_monopage). Pour travailler leur magie, les frameworks comme Backbone, Angular, Ember, et Knockout exigent que vous chargez des templates côté client; Complètement séparé de vos [vues côté serveur] (http://sailsjs.com/documentation/concepts/views). Les nouvelles applications Sails supportent le meilleur des deux mondes.

Que vous utilisiez ou non des templates côté client dans votre application et peu importe où vous les placez, bien sûr, c'est à vous de voir. Mais pour des raisons de convention, les nouvelles applications générées avec Sails incluent un dossier `templates/` par défaut.

### Comment puis-je utiliser ces templates ?

Par défaut, votre GruntFile est configuré pour charger et précompiler automatiquement des modèles JST côté client dans votre dossier `assets/templates`, puis les inclure dans votre vue `layout.ejs` automatiquement (entre TEMPLATES et TEMPLATES END).

    <!--TEMPLATES-->

    <!--TEMPLATES END-->

Cela expose vos templates HTML comme des fonctions précompilées sur `window.JST` pour une utilisation à partir de votre  JavaScript (client côté).

Pour personnaliser ce comportement en fonction de vos besoins, il vous suffit de modifier votre fichier Grunt.
Par exemple, voici quelques choses que vous pourriez faire:

- Importer des modèles d'autres répertoires
- Utiliser un moteur de template différent (handlebars, jade, dust, etc.)
- Traduire vos templates en utilisant un stringfile côté serveur avant qu'ils soient servis.

Pour plus d'informations, consultez la documentation conceptuelle sur les [tâches Grunt par défaut] (http://sailsjs.com/documentation/concepts/assets/default-tasks) qui constitutent le pipeline d'assets de Sails.

<docmeta name="displayName" value="templates">

