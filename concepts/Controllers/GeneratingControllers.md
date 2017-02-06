# Génération de contrôleurs

Vous pouvez utiliser la ligne de commande [Sails](http://sailsjs.com/documentation/reference/command-line-interface) pour générer rapidement un contrôleur en tapant:

```sh
$ sails generate controller <nom du contrôleur> [les noms des actions séparés par un espace...]
```

Par exemple, si vous exécutez la commande suivante:

```sh
$ sails generate controller commentaire poster supprimer tagger aimer
info: Generated a new controller `commentaire` at api/controllers/CommentareController.js!
```

Sails va générer `api/controllers/CommentaireController.js`:

```javascript
/**
 * CommentaireController.js
 *
 * @description :: Server-side logic for managing comments.
 */

module.exports = {

  /**
   * CommentController.poster()
   */
  poster: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  },

  /**
   * CommentController.supprimer()
   */
  supprimer: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  },

  /**
   * CommentController.tagger()
   */
  tagger: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  },

  /**
   * CommentController.aimer()
   */
  aimer: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  }
};
```


<docmeta name="displayName" value="Génération de contrôleurs">
