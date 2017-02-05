# Les actions Blueprint

Les actions Blueprint (à ne pas confondre avec les *routes* Blueprint) sont des actions génériques conçues pour fonctionner avec n'importe lequel de vos contrôleurs disposant d'un modèle ayant le même nom (par exemple `PatateController` aurait besoin d'un modèle `Patate`). Considérez-les comme le comportement par défaut de votre application. Par exemple, si vous avez un modèle `Utilisateur.js` et un contrôleur `UtilisateurController.js` vide, alors les actions `find`,` create`, `update`,` destroy`, `populate`,` add` et `remove` existeront implicitement, sans que vous ayez à les écrire.

Par défaut, les routes RESTful du Blueprint et les routes de raccourci sont liés à leurs actions Blueprint correspondantes. Toutefois, toute action Blueprint peut être surchargée dans un contrôleur particulier en créant une action personnalisée (par exemple, `PatateController.find`). Sinon, vous pouvez remplacer l'action Blueprint _n'importe où dans votre application_ en créant votre propre action Blueprint personnalisée (Par exemple `api/blueprints/create.js`).

La version actuelle de Sails est livrée avec les actions Blueprint suivantes:

+ [find](http://sailsjs.com/documentation/reference/blueprint-api/Find)
+ [findOne](http://sailsjs.com/documentation/reference/blueprint-api/FindOne)
+ [create](http://sailsjs.com/documentation/reference/blueprint-api/create)
+ [update](http://sailsjs.com/documentation/reference/blueprint-api/Update)
+ [destroy](http://sailsjs.com/documentation/reference/blueprint-api/Destroy)
+ [populate](http://sailsjs.com/documentation/reference/blueprint-api/Populate)
+ [add](http://sailsjs.com/documentation/reference/blueprint-api/Add)
+ [remove](http://sailsjs.com/documentation/reference/blueprint-api/Remove)

##### Surcharger les actions Blueprint

Vous pouvez également surcharger n'importe quelle action d'un modèle en nommant votre méthode avec le même nom que l'action Blueprint.

```javascript
module.exports = {
  findOne: function (req, res) {
    return res.json(403, 'La recherche est désactivée !');
  }
}

```
Pour plus d'informations sur les actions Blueprint, y compris sur la façon de les désactiver et de les srucharger, voir [la référence de l'API Blueprint](http://sailsjs.com/documentation/reference/blueprint-api)


<docmeta name="displayName" value="Blueprint Actions">
