### Traduire le contenu dynamique

Si votre backoffice stocke des données multilingues (par exemple, les données du produit sont entrées dans plusieurs langues via un CMS), vous ne devez pas vous fier à de simples fichiers régionaux JSON, sauf si vous planifiez d'une manière ou d'une autre de modifier vos traductions dynamiquement. Une option consiste à modifier les traductions par programmation, soit par une implémentation personnalisée, soit par un service de traduction. Les fichiers de langue JSON de Sails/node-i18n sont compatibles avec le format utilisé par [webtranslateit.com](https://webtranslateit.com/fr).

D'autre part, vous pouvez choisir de stocker ces types de chaînes dynamiques traduites dans une base de données. Si c'est le cas, assurez-vous de construire votre modèle de données adapté afin que vous puissiez stocker et récupérer les données dynamiques pertinentes par identifiant de locale (par ex. "en", "es", "de", etc.). [`req.getLocale()`](https://github.com/mashpie/i18n-node#getlocale) va vous aider à déterminer le contenu traduit à utiliser pour chaque requête et à respecter les conventions utilisées ailleurs dans votre App.

<docmeta name="displayName" value="Translating Dynamic Content">
