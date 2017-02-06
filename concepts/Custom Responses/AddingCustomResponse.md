# Ajout d'une réponse personnalisée

Pour ajouter votre propre méthode de réponse personnalisée, ajoutez simplement un fichier `/api/responses` avec le même nom que la méthode que vous souhaitez créer. Le fichier doit exporter une fonction, qui peut prendre tous les paramètres que vous voulez.

```
/** 
 * api/responses/myResponse.js
 *
 * Cela sera disponible dans les contrôleurs sous la forme res.maResponse('foo');
 */

module.exports = function(message) {
   
  var req = this.req;
  var res = this.res;
   
  var viewFilePath = 'maBelleVue';
  var statusCode = 200;

  var result = {
    status: statusCode
  };

  // Message optionnel
  if (message) {
    result.message = message;
  }

  // Si un user-agent souhaite une réponse JSON, envoyez alors du json
  if (req.wantsJSON) {
    return res.json(result, result.status);
  }

  // Définir le code de statut HTTP et les vues locales
  res.status(result.status);
  for (var key in result) {
    res.locals[key] = result[key];
  }
  // Afficher la vue
  res.render(viewFilePath, result, function(err) {
    // Si la vue n'existe pas ou si une erreur s'est produite, envoyez du json
    if (err) {
      return res.json(result, result.status);
    }

    // Sinon, affichez la page `views/maBelleVue.*`
    res.render(viewFilePath);
  });
}
```
<docmeta name="displayName" value="Ajout d'une réponse personnalisée">
