# Blueprints

### Vue d'ensemble

Comme tout bon framework Web, Sails vise à réduire à la fois la quantité de code que vous écrivez et le temps qu'il faut pour obtenir une application fonctionnelle et opérationnelle. Les _Blueprints_ sont la façon avec laquelle Sails permet de générer rapidement [les routes d'API](http://sailsjs.com/documentation/concepts/routes) et [les actions](http://sailsjs.com/documentation/concepts/controllers#?actions) en fonction de la conception de votre application.

Ensemble, [les routes Blueprint] (http://sailsjs.com/documentation/concepts/blueprints/blueprint-routes) et [Les actions Blueprint](http://sailsjs.com/documentation/concepts/blueprints/blueprint-actions) constituent L'API **Blueprint**, la logique intégrée qui alimente l'API JSON [RESTful](https://fr.wikipedia.org/wiki/Representational_state_transfer) que vous obtenez à chaque fois que vous créez un modèle et un contrôleur.

Par exemple, si vous créez un modèle `Utilisateur.js` et un contrôleur `UtilisateurController.js` dans votre projet, alors avec Blueprints, vous pourrez immédiatement visiter `/utilisateur/create?name=Julie` pour créer un utilisateur , et visitez `/user` pour voir la liste des utilisateurs de votre application. Tout cela sans écrire une seule ligne de code !!

Les Blueprint sont excellents pour le prototypage, mais ils sont également un outil puissant dans la production en raison de leur capacité à être remplacé, protégé, étendu ou désactivé entièrement.

<docmeta name="displayName" value="Blueprints">
