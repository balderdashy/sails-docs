# langage de requête de Waterline

Le langage de requête de Waterline est une syntaxe basée sur les objets utilisée pour récupérer les enregistrements à partir de n'importe quelle base de données prise en charge. Sous la couverture, Waterline utilise les adaptateurs de base de données installés dans votre projet pour traduire ce langage en requêtes natives, puis envoyer ces requêtes à la base de données appropriée. Cela signifie que vous pouvez utiliser la même requête avec MySQL que avec Redis ou MongoDb. Et il vous permet de modifier votre base de données avec des modifications minimales (le cas échéant) à votre code d'application.

> Toutes les requêtes à l'intérieur de Waterline sont insensibles à la casse. Bien que cela permette une interrogation plus cohérente entre les bases de données, selon la base de données que vous utilisez, il peut rendre les chaînes d'indexation difficiles. C'est quelque chose à savoir si vous prévoyez de créer des index dans votre base de données pour optimiser les performances de la recherche sur les champs de chaîne.

### Les bases du langage de requête

Les objets de critères sont formés en utilisant l'un des quatre types de clés d'objet. Ce sont les clés de niveau supérieur
utilisées dans un objet de requête. Il est basé librement sur les critères utilisés dans MongoDB avec quelques légères variations.

Les requêtes peuvent être créées à l'aide d'une clé `where` pour spécifier des attributs, ce qui vous permettra également d'utiliser des options de requête telles que `limit` et `skip` ou, si` where` est exclue, l'objet entier sera traité comme un `where`.

```javascript

Personne.find({
  nom: 'marie'
}).exec(function (err, personnesNommeeMarie){

});


// OU


Personne.find({
  where: { nom: 'mary' },
  skip: 20,
  limit: 10,
  sort: 'createdAt DESC'
}).exec(function(err, troisiemePageDesNouvellesPersonnesNommeeMarie){

});
```

#### Paires de clés

Une paire de clés peut être utilisée pour rechercher des enregistrements pour les valeurs correspondant exactement à ce qui est spécifié. Il s'agit de la base d'un objet de critères où la clé représente un attribut d'un modèle et la valeur est une vérification d'égalité stricte des enregistrements pour les valeurs correspondantes.

```javascript
Personne.find({
  nom: 'lise'
}).exec(function (err, personnesNommeeLise) {

});
```

Ils peuvent être utilisés ensemble pour rechercher des attributs multiples.

```javascript
Personne.find({
  nom: 'daniel',
  ville: 'Lyon'
}).exec(function (err, danielsDeLyon) {
  
});
```

#### Paires modifiées

Les paires modifiées ont également des attributs de modèle pour les clés, mais ils utilisent également l'un des modificateurs de critères pris en charge pour effectuer des requêtes dans lesquelles une vérification d'égalité stricte ne fonctionnerait pas.

```javascript
Personne.find({
  nom : {
    'contains' : 'belle'
  }
})
```

#### Dans les paires

Fournir un tableau pour trouver des enregistrements dont la valeur pour cet attribut correspond exactement (sans distinction entre majuscules et minuscules) à _l'un_ des termes de recherche spécifiés.

> Ceci est plus ou moins équivalent aux requêtes "IN" dans SQL et à l'opérateur `$in` dans MongoDB.

```javascript
Personne.find({
  name : ['lise', 'daniel']
}).exec(function (err, lisesEtDaniels){

});
```

#### Pas dans les paires

Fournir un tableau enveloppé dans un dictionnaire sous une clé `!` (Comme `{'!': [...]}`) pour trouver des enregistrements dont la valeur pour cet attribut _ne_ correspond pas aux (insensible à la casse) ermes de recherche spécifiés.

> Ceci est plus ou moins équivalent aux requêtes "NOT IN" dans SQL et à l'opérateur `$nin` dans MongoDB.

```javascript
Personne.find({
  name: { '!' : ['lise', 'daniel'] }
}).exec(function (err, TousExcepteLisesEtDaniels){

});
```

#### Les paires Où

Utilisez le modificateur `or` pour correspondre à _l'un_ des ensembles de règles imbriqués que vous spécifiez en tant que tableau de paires de requêtes. Pour que les enregistrements correspondent à une requête `or`, ils doivent correspondre à au moins une des paires de requêtes spécifiées dans le tableau `or`.

```javascript
Personne.find({
   or : [
     {nom: 'albert'},
     {occupation: 'professeur'}
   ]
}).exec(function (err, lesProfsAlbert) {

});
```

### Critères Modificateurs

Les modificateurs suivants sont disponibles pour l'utilisation lors de la création de requêtes.

* Inférieur à           : `'<'` / `'lessThan'`
* Inférieur ou égale à  : `'<='` / `'lessThanOrEqual'`
* Supérieur à           : `'>'` / `'greaterThan'`
* Supérieur ou égale à  : `'>='` / `'greaterThanOrEqual'`
* Négation              : `'!'` / `'not'`
* Comme                 : `'like'`
* Contient              : `'contains'`
* Commence par          : `'startsWith'`
* Fini par              : `'endsWith'`


#### '<' / 'lessThan'

Recherche des enregistrements dont la valeur est inférieure à la valeur spécifiée.

```javascript
Personne.find({ age: { '<': 30 }})
```

#### '<=' / 'lessThanOrEqual'

Recherche des enregistrements dont la valeur est inférieure ou égale à la valeur spécifiée.

```javascript
Personne.find({ age: { '<=': 21 }})
```

#### '>' / 'greaterThan'

Recherche des enregistrements dont la valeur est supérieure à la valeur spécifiée.

```javascript
Personne.find({ age: { '>': 18 }})
```

#### '>=' / 'greaterThanOrEqual'

Recherche des enregistrements dont la valeur est supérieure ou égale à la valeur spécifiée.

```javascript
Personne.find({ age: { '>=': 21 }})
```

#### '!' / 'not'

Recherche des enregistrements dont la valeur n'est pas égale à la valeur spécifiée.

```javascript
Personne.find({
  nom: { '!': 'foo' }
})
```

#### 'contains'

Recherche les enregistrements où la valeur de cet attribut _contient_ la chaîne donnée (Insensible à la casse).

```javascript
Livre.find({
  sujet: { contains: 'musique' }
}).exec(function (err, livresDeMusique){
  
});
```

#### 'startsWith'

Recherche les enregistrements où la valeur de cet attribut _commence par_ avec la chaîne donnée (Insensible à la casse).

```javascript
Livre.find({
  sujet: { startsWith: 'america' }
}).exec(function (err, livresSurAmerique){

});
```

#### 'endsWith'

Recherche des enregistrements dans lesquels la valeur de cet attribut _fini par_ la chaîne donnée (Insensible à la casse).

```javascript
Livre.find({
  sujet: { endsWith: 'histoire' }
}).exec(function (err, livresHistoire) {

})
```

#### 'like'

Recherche des enregistrements en utilisant la correspondance de motif avec le signe `%` (Insensible à la casse).

```javascript
Recette.find({ ingredients: { 'like': '%tomate%' }})
```

#### Périodes de date

Vous pouvez effectuer des requêtes de dates en utilisant les opérateurs de comparaison.

```javascript
Model.find({ date: { '>': new Date('2/4/2014'), '<': new Date('2/7/2014') } })
```

### Query Options

Les options de requête vous permettent d'affiner les résultats renvoyés par une requête. Les options disponibles sont:

* `limit`
* `skip`
* `sort`

#### Limit

Limitez le nombre de résultats renvoyés par une requête.

```javascript
Model.find({ where: { name: 'foo' }, limit: 20 })
```

#### Skip

Renvoie tous les résultats à partir d'un certain nombre (début de sélection).

```javascript
Model.find({ where: { name: 'foo' }, skip: 10 });
```

##### Pagination

`skip` et` limit` peuvent être utilisés ensemble pour créer un système de pagination.

```javascript
Model.find({ where: { name: 'foo' }, limit: 10, skip: 10 });
```

`paginate` est une méthode auxiliaire Waterline qui peut accomplir la même chose que` skip` et `limit`.

``` javascript
Model.find().paginate({page: 2, limit: 10});
```

> **Waterline**
>
> Pour en savoir plus sur l'API Waterline ci-dessous:
> * [Documentation Sails.js](http://sailsjs.com/documentation/reference/waterline/queries)
> * [README de Waterline](https://github.com/balderdashy/waterline/blob/master/README.md)
> * [Documentation sur Waterline](https://github.com/balderdashy/waterline-docs)
> * [Dépôt Waterline](https://github.com/balderdashy/waterline)

#### Sort

Les résultats peuvent être triés par nom d'attribut. Il suffit de spécifier un nom d'attribut pour un tri naturel (ascendant), ou spécifier respectivement avec "asc" ou "desc" pour les ordres ascendants ou descendants.

```javascript
// Trier par nom en ordre croissant
Model.find({ where: { name: 'foo' }, sort: 'name' });

// Trier par nom en ordre décroissant
Model.find({ where: { name: 'foo' }, sort: 'name DESC' });

// Trier par nom en ordre croissant
Model.find({ where: { name: 'foo' }, sort: 'name ASC' });

// Trier par notation binaire 
Model.find({ where: { name: 'foo' }, sort: { 'name': 1 }});

// Trier par plusieurs attributs
Model.find({ where: { name: 'foo' }, sort: { name:  1, age: 0 });
```
> **Sensibilité à la casse**
>
> Toutes les requêtes à l'intérieur de Waterline sont **insensibles à la casse**. Cela facilite l'interrogation mais rend les chaînes d'indexation difficiles. C'est quelque chose à savoir si vous indexez et recherchez sur des champs de chaîne.
>
> Actuellement, la meilleure façon d'exécuter les requêtes **sensible à la casse** consiste à utiliser [`.native()`](http://sailsjs.com/documentation/reference/waterline/models/native.html) ou [`.query ()`](http://sailsjs.com/documentation/reference/waterline/models/query.html).


<docmeta name="displayName" value="Langage de requête">
