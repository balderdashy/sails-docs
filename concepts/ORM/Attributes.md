# Attributs
### Vue d'ensemble

Les attributs sont des informations de base sur un modèle. Un modèle appelé `Personne` peut avoir des attributs appelés `prenom`, `nom`, `telephone`, `age`, `dateDeNaissance` et `email`.
<!---
TODO: adresse sql vs non sql et des choses comme:
"""
Dans la plupart des cas, ces données sont _homogènes_, ce qui signifie que chaque enregistrement a les mêmes attributs,
"""
-->

### Options d'attribut

Ces options peuvent être utilisées pour imposer diverses contraintes et ajouter des améliorations spéciales aux attributs de notre modèle.

###### type

Spécifie le type de données dans lequel sera stocké l'attribut. Le type peut être :

- string : Une chaîne de caractères
- text : Un texte
- integer : Un entier
- float : Un nombre décimal (aussi connu comme nombre à virgule flottante)
- date : Une date
- datetime : Une date et heure
- boolean : Un booléen (true ou false)
- binary : Un binaire
- array : Un tableau
- json : Une chaîne au format JSON
- mediumtext : Un texte moyen
- longtext : Un text long
- objectid : L'identifiant d'un objet

###### defaultsTo

Lorsqu'un enregistrement est créé, si aucune valeur n'a été fournie, l'enregistrement sera créé avec la valeur spécifiée dans l'attribut `defaultsTo`. La valeur fournie peut également être une fonction que Waterline (L'ORM de Sails) exécutera pendant la création de l'enregistrement.

```javascript
attributes: {
  telephone: {
    type: 'string',
    defaultsTo: '111-222-3333'
  },
  numeroDeCommande: {
    type: 'text',
    defaultsTo: function() {
      return uuid.v4();
    }
  }
}
```

###### autoIncrement

Définit l'attribut en tant que clé d'incrémentation automatique. Lorsqu'un nouvel enregistrement est ajouté au modèle, si une valeur pour cet attribut n'est pas spécifiée, elle sera générée en incrémentant la valeur de l'enregistrement le plus récent par 1. Remarque: Les attributs qui spécifient `autoIncrement` doivent toujours être `type: 'integer'`. Aussi, gardez à l'esprit que la prise en charge de cette attribut varie selon les différents bases de données. Par exemple, MySQL n'autorise pas plus d'une colonne auto-incrémentée par table.

```javascript
attributes: {
  monNumero: {
    type: 'integer',
    autoIncrement: true
  }
}
```

###### unique

Assure qu'aucun enregistrement ne sera permis avec la même valeur pour l'attribut cible. Il s'agit d'une contrainte au niveau de l'adaptateur; dans la plupart des cas, il en résultera un index unique sur l'attribut créé dans la base de données de données.

```javascript
attributes: {
  identifiant: {
    type: 'string',
    unique: true
  }
}
```
> Lorsque vous utilisez MySQL avec le jeu de caractères `utf8mb4`, vous devez ajouter la contrainte `size` à la colonne appropriée de votre table directement via MySQL. Dans le cas contraire, comme `type: 'string'` est traduit en `varchar(255)` dans l'adaptateur MySQL, la contrainte `unique: true` provoque une erreur `'index too long': ER_INDEX_COLUMN_TOO_LONG: Index column size too large. The maximum column size is 767 bytes.` (indiquant que la taille de la colonne index est trop grande et que la taille maximale de la colonne est de 767 octets.).

<!--

Omettre `index` de docs pour le moment.

###### index

Crée un index simple dans la base de données de données sous-jacente pour des requêtes plus rapides si disponibles. Ce n'est que pour les index simples et actuellement ne prend pas en charge les index composés. Pour ceux-ci, vous devrez les créer vous-même ou utiliser une migration.

Il y'a actuellement un problème avec l'ajout d'index aux champs de type `string`. Parce que Waterline effectue ses requêtes d'une manière insensible à la casse, nous ne pouvons pas utiliser l'index sur un attribut string. Certaines solutions de contournement sont discutées mais rien n'est mis en œuvre jusqu'à présent. Cela sera mis à jour dans un proche avenir pour soutenir pleinement les index sur les chaînes.

javascript
attributes: {
  email: {
    type: 'string',
    index: true
  }
}

-->

###### primaryKey

Utilisez cet attribut comme clé primaire pour l'enregistrement. Un seul attribut par modèle peut être `primaryKey`. Remarque: ceci ne doit jamais être utilisé à moins que [autoPK](http://sailsjs.com/documentation/concepts/ORM/model-settings.html?q=autopk) soit défini sur false.

```javascript
attributes: {
  uuid: {
    type: 'string',
    primaryKey: true,
    required: true
  }
}
```

###### enum

Propriété de validation spéciale qui enregistre uniquement les données qui correspondent à un ensemble de valeurs figurant sur la liste blanche.

```javascript
attributes: {
  etat: {
    type: 'string',
    enum: ['En attente', 'Approuvé', 'Refusé']
  }
}
```

<!--
Ceux-ci ne sont pas encore prêts pour les heures de grande écoute, mais les énumérer ici afin qu'ils soient faciles à référencer et à ajouter aux documents officiels plus tard:

###### example

Une valeur d'exemple pour cet attribut, e.g. "Albus Dumbledore".


###### validationMessage

Un message de validation personnalisé à utiliser lorsque des validations échouent pour cet attribut.

-->

###### size

Si elle est prise en charge dans l'adaptateur, elle peut être utilisée pour définir la taille de l'attribut. Par exemple, dans MySQL, `size` peut être spécifié comme un nombre (`n`) pour créer une colonne avec le type de données SQL: `varchar(n)`.

```javascript
attributes: {
  nom: {
    type: 'string',
    size: 24
  }
}
```

###### columnName

À l'intérieur d'une définition d'attribut, vous pouvez spécifier un `columnName` (nom de colonne) pour forcer Sails/Waterline à stocker des données pour cet attribut dans une colonne spécifique dans la connexion configurée (c'est-à-dire la base de données). Soyez conscient que ce n'est pas nécessairement spécifique à SQL - il fonctionnera également pour les champs MongoDB, etc.

Bien que la propriété `columnName` soit principalement conçue pour fonctionner avec des bases de données existantes/héritées, elle peut également être utile dans des situations où votre base de données est partagée par d'autres applications ou si vous n'avez pas les autorisations d'accès pour modifier le schéma.

Pour stocker/récupérer l'attribut `nombreDeRoues` de votre modèle dans/depuis la colonne `nombre_des_choses_qui_tournent`:

```javascript
  // Un attribut dans l'un de vos modèles:
  // ...
  nombreDeRoues: {
    type: 'integer',
    columnName: 'nombre_des_choses_qui_tournent'
  }
  // ...
```


Maintenant pour un exemple plus complet/réel.

Disons que vous avez un modèle `Utilisateur` dans votre application Sails qui ressemble à ceci:

```javascript
// api/models/Utilisateur.js
module.exports = {
  connection: 'maBaseSql',
  attributes: {
    nom: {
      type: 'string'
    },
    motDePasse: {
      type: 'string'
    },
    email: {
      type: 'email',
      unique: true
    }
  }
};
```


Tout fonctionne très bien, mais au lieu d'utiliser une base de données MySQL existante hébergée sur un serveur quelque part qui se trouve à héberger les utilisateurs prévus de votre application:

```javascript
// config/connections.js
module.exports = {
  // ...

  // Existing users are in here!
  maBaseSql: {
    adapter: 'sails-mysql',
    user: 'bofh',
    host: 'db.eleven.sameness.foo',
    password: 'Gh19R!?had9gzQ#Q#Q#%AdsghaDABAMR>##G<ADMBOVRH@)$(HTOADG!GNADSGADSGNBI@(',
    database: 'jonas'
  },
  // ...
};
```

Supposons qu'il existe une table appelée `nos_utilisateurs` dans l'ancienne base de données MySQL qui ressemble à ceci:

| la_cle_primaire | email | nom_complet | mot_de_passe_encrypte|
|------|---|----|---|
| 7 | mike@sameness.foo | Mike McNeil | ranchdressing |
| 14 | nick@sameness.foo | Nick Crumrine | thousandisland |


Pour utiliser ceci depuis Sails, vous devez changer votre modèle `Utilisateur` pour ressembler à ceci:

```javascript
// api/models/Utilisateur.js
module.exports = {
  connection: 'maBaseSql',
  tableName: 'nos_utilisteurs',
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'la_cle_primaire'
    },
    nom: {
      type: 'string',
      columnName: 'nom_complet'
    },
    motDePasse: {
      type: 'string',
      columnName: 'mot_de_passe_encrypte'
    },
    email: {
      type: 'email',
      unique: true,
      columnName: 'email'
    }
  }
};
```

> Vous avez sans doute remarqué que nous avons également utilisé la propriété [`tableName`](http://sailsjs.com/documentation/concepts/ORM/model-settings.html?q=tablename) dans cet exemple. Cela nous permet de contrôler le nom de la table qui sera utilisée pour héberger nos données.








<docmeta name="displayName" value="Attributs">
