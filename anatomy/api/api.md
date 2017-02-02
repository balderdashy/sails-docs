# api
### Objectif
Ce dossier contient la grande majorité de la logique du backoffice de votre application. Il abrite le «M» et le «C» du [modèle MVC](https://fr.wikipedia.org/wiki/Mod%C3%A8le-vue-contr%C3%B4leur).

Vous y trouverez ce qui suit.

- Controllers: les contrôleurs contiennent la plupart des logiques de backoffice pour votre application.
- Models: Les modèles sont les structures qui contiennent des données pour votre application Sails.
- Policies: les politiques sont généralement utilisées pour authentifier des clients et restreindre l'accès à certaines parties de votre application.
- Responses: Logique de réponse serveur (404 - Non trouvé, 500 - Erreur serveur, etc)
- Services: Les services sont similaires aux actions du contrôleur. Ils contiennent la logique utilisée par votre application qui ne s'appuie pas nécessairement sur `.req ()` et `.res ()`.


<docmeta name="displayName" value="api">

