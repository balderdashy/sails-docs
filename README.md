![Squiddy reads the docs](http://sailsjs.com/images/squidford_swimming.png)

# Documentation de Sails.js

La documentation officielle de la version stable actuelle de Sails se trouve sur la [branche master](github.com/balderdashy/sails-docs) de ce dépôt. Le contenu de la plupart des sections [du site officiel de Sails](http://sailsjs.com) est compilé ici.

## Progression de la traduction de la documentation FR
- anatomy : Traduit !
  - api (100%)
    - controllers (100%)
    - hooks (100%)
    - models (100%)
    - policies (100%)
    - responses (100%)
    - services (100%)
  - assets (100%)
    - images (100%)
    - js (100%)
    - styles (100%)
    - templates (100%)
  - config (100%)
    - env (100%)
    - locales (100%)
  - tasks (100%)
    - config (100%)
    - register (100%)
  - views (100%)
- concepts : En cours de traduction (40%)
  - Assets (100%)
  - Blueprints (100%)
  - Configuration (100%)
  - Controllers (100%)
  - Custom Responses (100%)
  - Deployment (100%)
  - File Uploads (100%)
  - Globals (100%)
  - Internationalization (100%)
  - Logging (100%)
  - Middleware (50%)
  - ORM (80%)
  - Policies
  - Programmatic Usage
  - Realtime
  - Routes
  - Security
  - Services
  - Sessions
  - Testing
  - Views
  - extending- sails
- contributing : Pas encore traduit
- faq : Pas encore traduit
- irc : Pas encore traduit
- reference : Pas encore traduit
- resources/styleguide : Pas encore traduit
- security : Pas encore traduit
- status : Pas encore traduit
- tutorials : Pas encore traduit
- upgrading : Pas encore traduit
- version-notes : Pas encore traduit

## Dans d'autres langues

La documentation de Sails a été traduite dans différentes langues. La liste ci-dessous est une référence des projets de traduction dont nous sommes au courant.

| Langue                     | [Étiquette d'identification de langues IETF](https://fr.wikipedia.org/wiki/%C3%89tiquette_d%27identification_de_langues_IETF)  | Responsable(s)        | Dépôt |
| ---------------------------- | ------- | ------------------ | ---------------------------------- |
| Japanese                     | `ja`    | [@kory-yhg](https://github.com/kory-yhg)      | [sails-docs-ja](https://github.com/balderdashy/sails-docs/tree/ja) <br/>(_live on [sailsjs.jp](http://sailsjs.jp)_)
| Spanish                      | `es`    | [@eduartua](https://github.com/eduartua/) & [@alejandronanez](https://github.com/alejandronanez)   | [sails-docs-es](https://github.com/eduartua/sails-docs-es)
| Brazilian Portuguese         | `pt-BR` | [@marceloboeira](https://github.com/marceloboeira) & [@gabrielalmir10](https://github.com/gabrielalmir10)   | [sails-docs-pt-BR](https://github.com/balderdashy/sails-docs/tree/pt-BR)
| Taiwanese Mandarin           | `zh-TW` | [@CalvertYang](https://github.com/CalvertYang)   | [sails-docs-zh-TW](https://github.com/balderdashy/sails-docs/tree/zh-TW)
| Korean                       | `ko`    | [@sapsaldog](https://github.com/sapsaldog)   | [sails-docs-ko](https://github.com/balderdashy/sails-docs/tree/ko)
| Chinese                      | `zh-cn`    | [@linxiaowu66](https://github.com/linxiaowu66)   | [sails-docs-zh-cn](https://github.com/linxiaowu66/sails-docs-zh-cn)
| French                       | `fr`    | [@marrouchi](https://github.com/marrouchi)   | [sails-docs-fr](https://github.com/marrouchi/sails-docs-fr)

> Puisque nous utilisons maintenant des branches pour suivre les différentes versions de la documentation de Sails, nous nous éloignons de l'approche originale de l'utilisation de branches pour différentes langues.  Avant de vous lancer dans un nouveau projet de traduction, nous vous demandons d'examiner [les informations mises à jour ci-dessous](#comment-puis-je-aider-à-traduire-la-documentation-)-- Le processus a changé un peu.



## Contribuer à la documentation de Sails

Nous nous réjouissons de votre aide ! Veuillez envoyer une pull request à **master** avec des corrections / ajouts et ils seront vérifiés et fusionnés dès que possible.

Deuxièmement, nous sommes ouverts aux suggestions sur le processus que nous utilisons pour gérer notre documentation et pour travailler avec la communauté en général. Veuillez poster vos idées sur le groupe Google ou si vous souhaitez aider directement, contactez @fancydoilies, @rudeboot ou @mikermcneil sur Twitter.

#### Quelle branche dois-je modifier?

Cela dépend du genre d'édition que vous voulez faire. Le plus souvent, vous allez faire une modification pertinente pour la dernière version stable de Sails (exp. la version sur [NPM](npmjs.org/package/sails)) et donc vous allez éditer la branche `master` de _ce_ dépôt (Ce que vous voyez dans le repo sails-docs par défaut).  L'équipe de documentation fusionne la branche master dans la branche appropriée pour la dernière version stable de Sails, puis déploie cela à sailsjs.com une fois par semaine environ.

D'autre part, si vous faites une modification liée à une fonctionnalité inédite dans une prochaine version; Le plus souvent en tant qu'accompagnement d'une proposition de fonctionnalité ou d'une pull request à Sails ou à un autre projet associé, vous allez alors modifier la branche pour la prochaine version non publiée de Sails (parfois appelée «edge»).

| Branche (dans `sails-docs`)                    | Documentation pour la version de Sails...                                   | Aperçu dans...      |
|-------------------------------------------------------------------------------------|------------------------|:-------------------|
| [`1.0`](https://github.com/balderdashy/sails-docs/tree/1.0) | Prochaine sortie v1.0                           | [next.sailsjs.com](http://next.sailsjs.com)
| [`master`](https://github.com/balderdashy/sails-docs/tree/master) | [![NPM version](https://badge.fury.io/js/sails.png)](http://badge.fury.io/js/sails) | [preview.sailsjs.com](http://preview.sailsjs.com)
| [`0.12`](https://github.com/balderdashy/sails-docs/tree/0.12) | Sails v0.12.x | [sailsjs.com](http://sailsjs.com)
| [`0.11`](https://github.com/balderdashy/sails-docs/tree/0.11) | Sails v0.11.x           | [0.11.sailsjs.com](http://0.11.sailsjs.com)


#### Comment ces documents sont-ils compilés et envoyés sur le site Web?

Nous utilisons un module appelé `doc-templater` pour convertir les fichiers .md en html pour le site Web. Vous pouvez en apprendre davantage sur la façon dont ça fonctionne sur [le dépôt doc-templater](https://github.com/uncletammy/doc-templater).

Chaque fichier .md possède sa propre page sur le site (c-à-d. Tous les fichiers de référence, de concepts et d'anatomie) et doit inclure une balise spéciale `<docmeta name="displayName">` avec une propriété `value` spécifiant le titre de la page. Cela aura un impact sur la façon dont la page doc apparaîtra dans les résultats des moteurs de recherche, et il sera également utilisé dans le menu de navigation sur sailsjs.com. Par exemple:

```markdown
<docmeta name="displayName" value="Construire des pains faits maison sur mesure">
```

#### Quand mon changement apparaîtra-t-il sur le site web de Sails ?

Les modifications de la documentation sont activées lorsqu'elles sont fusionnées sur une branche spéciale correspondant à la version stable actuelle de Sails (par exemple, 0.12). Nous ne pouvons pas fusionner les demandes de tirage envoyées directement à cette branche-- dans le seul but est de refléter le contenu actuellement hébergé sur sailsjs.com, et le contenu est fusionné juste avant le redéploiement du site web de Sails.

Si vous voulez voir comment les changements de documentation apparaîtront sur sailsjs.com, vous pouvez consulter [preview.sailsjs.com](http://preview.sailsjs.com). Le site d'aperçu s'actualise automatiquement lorsque les modifications sont fusionnées dans la branche principale de sails-docs.


#### Comment puis-je aider à traduire la documentation ?

Une excellente façon d'aider le projet Sails, surtout si vous parlez une langue autre que celles qui sont disponibles, est de faire du bénévolat pour traduire la documentation Sails. Si vous souhaitez collaborer avec l'un des projets de traduction répertoriés dans le tableau ci-dessus, contactez le responsable du projet de traduction en suivant les instructions du fichier README de cet fork.

Si votre langue n'est pas représentée dans le tableau ci-dessus et que vous souhaitez créer un projet de traduction, procédez comme suit:

+ Forkez le dépôt (`balderdashy/sails-docs`) et changez le nom de votre fork `sails-docs-{{IETF}}` où {{IETF}} est l'[étiquette d'identification de langues IETF](https://fr.wikipedia.org/wiki/%C3%89tiquette_d%27identification_de_langues_IETF) pour votre langue.
+ Modifiez le README pour résumer vos progrès jusqu'à présent, fournissez toute autre information qui, selon vous, serait utile pour d'autres personnes qui lisent votre traduction, et laissez les contributeurs intéressés savoir comment vous contacter.
+ Envoyez une pull request en modifiant le tableau ci-dessus pour ajouter un lien à votre fork.
+ Lorsque vous êtes satisfait de la première version complète de votre traduction, ouvrez un problème et quelqu'un de notre équipe de documentation sera heureux de vous aider à obtenir un aperçu dans le contexte du site Sails, le mettre en direct sur un domaine (le vôtre ou un Sous-domaine de sailsjs.com, selon ce qui a le plus de sens), et le partager avec le reste de la communauté Sails.


#### Comment puis-je aider?

Pour plus d'informations sur la contribution à Sails en général, voir le [Guide de Contribution](sailsjs.com/documentation/contributing).



## License

[MIT](./LICENSE.md)

Le framework [Sails](http://sailsjs.com) est gratuit et open-source et sous [license MIT](http://sailsjs.com/license).

_(Et les fichiers de ce dépôt le sont aussi.)_

