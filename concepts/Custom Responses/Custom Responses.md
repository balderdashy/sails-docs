# Réponses personnalisées

### Vue d'ensemble

Sails permet d'avoir des réponses serveur personnalisables. Sails est livré par défaut avec une poignée de types de réponses les plus courantes. Ils peuvent être trouvés dans le répertoire `/api/answers` de votre projet. Pour les personnaliser, modifiez simplement le fichier .js approprié.

Voici un exemple rapide de l'action du contrôleur:

```javascript
foo: function(req, res) {
   if (!req.param('id')) {
     res.status(400);
     res.view('400', {message: 'Désolé, vous devez nous indiquer l\'ID du FOO que vous voulez!'});
   }
   ...
}
```

Ce code gère une mauvaise requête en envoyant un statut d'erreur HTTP 400 et un message court décrivant le problème. Cependant, ce code présente plusieurs inconvénients, principalement:

* Il n'est pas *normalisé*; Le code est spécifique à cette instance, et nous devrons travailler dur pour garder le même format partout.
* Elle n'est pas abstraite; Si nous voulions utiliser une approche similaire ailleurs, nous devrions copier/coller le code.
* La réponse n'est pas *négociée par le contenu*; Si le client s'attend à une réponse JSON, ils n'auront pas de chance.

Maintenant, considérez ce remplacement:

```javascript
foo: function(req, res) {
   if (!req.param('id')) {
     res.badRequest('Désolé, vous devez nous indiquer l\'ID du FOO que vous voulez!');
   }
   ...
}
```

Cette approche présente de nombreux avantages:

- Les charges utiles d'erreurs sont normalisées.
- Le logging en production versus développement est pris en considération.
- Les codes d'erreur sont cohérents.
- La négociation de contenu (JSON vs HTML) est prise en charge.
- Les réglages de l'API peuvent être effectués en une seule modification rapide au fichier de réponses génériques approprié.
 
### Les méthodes et fichiers des réponses

Tout script `.js` enregistré dans le dossier `/api/responses` sera exécuté en appelant `res.[nomDeLaResponse]` dans votre contrôleur. Par exemple, `/api/responses/erreurServeur.js` peut être exécutée avec un appel à `res.erreurServeur(errors)`. Les objets de requête et de réponse sont disponibles dans le script de réponse sous la forme `this.req` et `this.res`; Cela permet à la fonction de réponse de prendre des paramètres arbitraires (comme le paramètre `errors` de `erreurServeur`).


<docmeta name="displayName" value="Réponses personnalisées">
