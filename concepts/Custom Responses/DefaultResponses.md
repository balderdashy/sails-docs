# Réponses par défaut

Les réponses suivantes sont présentes dans toute nouvelle application Sails dans le dossier `/api/responses`. Chacune de ces réponses envoie un objet JSON normalisé (si le client attend JSON), contenant une clé `status` et une valeur du code de status HTTP avec des clés supplémentaires contenant des informations pertinentes sur les éventuelles erreurs.

#### res.ok()

Cette méthode est utilisée pour envoyer une réponse HTTP 200 ("OK")  au client indiquant que tout s'est bien passé. 

Voir la page de référence [`res.ok()`](http://sailsjs.com/documentation/reference/response-res/res-ok) pour les informations d'utilisation.

#### res.serverError()

Cette méthode est utilisée pour envoyer une réponse HTTP 500 ("Erreur de serveur") au client indiquant qu'une erreur de serveur s'est produite.

Consultez la page de référence [`res.serverError()`](http://sailsjs.com/documentation/reference/response-res/res-server-error) pour obtenir des informations sur l'utilisation.

#### res.badRequest()

Cette méthode est utilisée pour envoyer une réponse HTTP 400 ("Demande incorrecte") au client indiquant que la demande n'est pas valide. 

Voir la page de référence [`res.badRequest()`](http://sailsjs.com/documentation/reference/response-res/res-bad-request) pour les informations d'utilisation.

#### res.notFound()

Cette méthode est utilisée pour envoyer une réponse HTTP 404 ("Introuvée") au client indiquant que l'URL demandée ne correspond à aucune des routes de l'application. 

Voir la page de référence [`res.notFound()`](http://sailsjs.com/documentation/reference/response-res/res-not-found) pour les informations d'utilisation.

#### res.forbidden()

Cette méthode est utilisée pour envoyer une réponse HTTP 403 ("Accès Interdit") au client indiquant que la requête n'est pas autorisée.

Voir la page de référence [`res.forbidden()`](http://sailsjs.com/documentation/reference/response-res/res-forbidden) pour les informations d'utilisation.

#### res.created()

Cette méthode est utilisée pour renvoyer une réponse HTTP 201 ("Créée") au client indiquant qu'une ou plusieurs nouvelles ressources ont été créées. Voir la page de référence [`res.created ()`](http://sailsjs.com/documentation/reference/response-res/res-created) pour les informations d'utilisation.

<docmeta name="displayName" value="Réponses par défaut">
