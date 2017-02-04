# Désactivation de Grunt

Pour désactiver l'intégration Grunt dans Sails, supprimez simplement votre dossier Gruntfile (et/ou [`tasks/`](http://sailsjs.com/documentation/anatomy/tasks)). Vous pouvez également désactiver le hook Grunt. Il suffit de placer la propriété `grunt` à` false` dans `.sailsrc` comme ceci:

```json
{
    "hooks": {
        "grunt": false
    }
}
```
### Puis-je personnaliser ceci pour SASS, angulaire, des templates de jade côté-client, etc?

Oui! Remplacez simplement la tâche grunt correspondante dans votre répertoire `tasks/` ou ajoutez une nouvelle tâche. Comme [SASS](https://github.com/sails101/using-sass) par exemple.

Si vous voulez toujours utiliser Grunt pour d'autres raisons, mais que vous ne voulez pas utiliser les fonctionnalités frontoffice par défaut, supprimez simplement le dossier assets de votre projet et supprimez les tâches frontales des dossiers `tasks/register/` et `tasks/config/`. Vous pouvez également exécuter la commande `sails new myCoolApi --no-frontend` pour omettre le dossier assets et les tâches Grunt frontales pour les projets futurs. Vous pouvez également remplacer votre module `sails-generate-frontend` par d'autres générateurs issus de la communauté, ou [créer votre propre générateur](https://github.com/balderdashy/sails-generate-generator). Cela permet à `sails new` de créer la boilerplate pour les applications iOS natives, les applications Android, les applications Cordova, les applications SteroidsJS, etc.


<docmeta name="displayName" value="Disabling Grunt">

### REMARQUE:

Lorsque vous retirez le hook de Grunt ci-dessus, vous devez également spécifier ce qui suit dans `.sailsrc` pour que vos assets soient servis, sinon tous les assets renverront une erreur `404`.

```json
{
    "paths": {
        "public": "assets"
    }
}
```
