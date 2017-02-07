# Locales

### Vue d'ensemble

Le hook i18n lit des fichiers de traduction au format JSON dans le répertoire "locales" de votre projet (`config/locales`). Chaque fichier correspond à un [locale](https://fr.wikipedia.org/wiki/Param%C3%A8tres_r%C3%A9gionaux) (habituellement une langue) que votre backoffice Sails prendra en charge.

Ces fichiers contiennent des chaînes spécifique au locale (en tant que paires clé-valeur JSON) que vous pouvez utiliser dans vos vues, contrôleurs, etc. Le nom du fichier doit correspondre à la langue que vous utilisez. Cela permet une détection automatique de la langue en fonction des en-têtes de requête.

Voici un exemple de fichier de locale (`config/locales/fr.json`):
```json
{
    "Hello!": "Salut !",
    "Hello %s, how are you today?": "Salut %s, comment ça va aujourd'hui ?"
}
```

Notez que les clés dans ces fichiers là (par exemple, "Hello %s, how are you today?") sont **sensibles à la casse** et requièrent des correspondances exactes. Il ya quelques écoles différentes de pensée sur la meilleure approche, et il dépend vraiment de qui/à quelle fréquence vous allez mettre à jour ces fichiers de langue versus HTML à l'avenir. En particulier, si vous modifiez les traductions à la main, des chaînes de caractéres plus simples et plus minces seront préférables pour une meilleure maintenabilité.

Par exemple, voici une autre approche dans `config/locales/fr.json`:

```json
{
    "hello": "salut",
    "howAreYouToday": "comment ça va aujourd'hui"
}
```

Et voiçi la version anglaise `config/locales/en.json`:

```json
{
    "hello": "hello",
    "howAreYouToday": "how are you today"
}
```

Pour représenter des chaînes imbriquées, utilisez le `.` dans les clés. Voici quelques-unes des chaînes de la page "Modifier le profil" d'une application :

``` json
{
  "editProfile.heading": "Modifier votre profil",
  "editProfile.username.label": "Identifiant",
  "editProfile.username.description": "Veuillez choisir un identifiant unique."
}
```

### Détection et/ou surcharger une localisation pour une requête spécifique

Pour déterminer la localisation de la requête, utilisez [`req.getLocale()`](https://github.com/mashpie/i18n-node#getlocale).

Pour surcharger la langue/localisation détectée pour une requête, utilisez [`req.setLocale()`](https://github.com/mashpie/i18n-node#setlocale), en l'appelant avec le code unique de localisation, par exemple:

```js
// Forcer la langue à l'allemand pour le reste de la requête:
req.setLocale('de');
// (Cela utilisera la traduction de `config/locales/de.json`)
```

Par défaut, node-i18n détecte la langue souhaitée d'une requête en examinant ses en-têtes HTTP de langage. Les en-têtes de langue sont définis dans les paramètres du navigateur de vos utilisateurs et, même s'ils sont corrects la plupart du temps, vous pouvez avoir besoin de la souplesse nécessaire pour remplacer cette langue détectée et fournir les vôtres.

Par exemple, si votre application permet aux utilisateurs de choisir leur langue préférée, vous pouvez créer une [politique](http://sailsjs.com/documentation/concepts/Policies) qui vérifie la langue à partir de la session de l'utilisateur, et la définit si elle existe dans les politiques, les contrôleurs et les vues qui vont s'exécuter par la suite. En voiçi un exemple concrêt :

```js
// api/policies/localiser.js
module.exports = function(req, res, next) {
  req.setLocale(req.session.maPreferenceDeLangue);
  next();
};
```

<docmeta name="displayName" value="Locales">
