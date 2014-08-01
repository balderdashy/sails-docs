# .query()

`.query()` is only available on Sails/Waterline models using a SQL database (PostgreSQL and mySQL) adapter.  Its purpose is to perform raw SQL queries.


### Example

```js
Pet.query('SELECT pet.name FROM pet', function(err, results) {
  if (err) return res.serverError(err);
  return res.ok(results);
});
```



### Notes
> This method only works with PostgreSQL and mySQL! use .native() for Mongo.



<!---
###### .findBy`<attribute>`( `criteria` , [`callback`] )
### Purpose
Find and return records by a specific model attribute.

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criteria    | `{}`,`[{}]`, `string`, `int`  | Yes |
| 2 |     Callback        | `function`          | No        |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Found Records      | `[{}]`              |

### Example Usage

```javascript 
User.findByName(['Flynn','Walter','craig']).exec(function findCB(err,found){
  while (found.length)
    console.log('Found User with name '+found.pop().name);
  });
  
// Found User with name Walter
// Found User with name Flynn
// Don't forget to handle your errors

```
### Notes
> Any string arguments passed must be the ID of the record.
> If you are trying to find an attribute that is an array, you must wrap it in an additional set of brackets otherwise Waterline will think you want to perform an inQuery.


###### .findOneBy`<attribute>`( `criteria` , [`callback`] )
### Purpose
Find and return one record by a specific model attribute.

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criteria    | `{}`,`[{}]`, `string`, `int`  | Yes |
| 2 |     Callback        | `function`          | No        |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Found Record       | `{}`                |

### Example Usage

```javascript 
User.findOneByName('Walter').exec(function findCB(err,found){
  console.log('Found User with name '+found.name);
  });
  
// Found User with name Walter
// Don't forget to handle your errors

```
### Notes
> This will always return a single object.
> Any string arguments passed must be the ID of the record.
-->

<!--
###### .countBy`<attribute>`( `criteria` , [`callback`] )
### Purpose
Count the number of records in a model with a particular model attribute. 

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criteria    | `{}`,`[{}]`, `string`, `int`  | Yes |
| 2 |     Callback        | `function`          | No        |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Number of Records  | `int`        |

### Example Usage

```javascript 
User.countByName('Walter').exec(function countCB(err,found){
  console.log('There are '+found+' users called \'Walter\'');
  });
  
// There are 1 users called 'Walter'
// Don't forget to handle your errors
```
### Notes
> The value returned will be equal to the sum of the products of all matched criteria objects and the number of records that particular object matched. 
> SUM [ matchedObjects * RecordsMatchedByObject ]
> Any string arguments passed must be the ID of the record.

-->

<!--

###### .`<attribute>`StartsWith( `criteria` , [`callback`] )
### Purpose
Find records based on the starting letters of one of its attributes value.

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criteria    | `{}`,`[{}]`, `string`, `int`  | Yes |
| 2 |     Callback        | `function`          | Yes      |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Found Records      | `{}`, `[{}]`        |


### Example Usage

```javascript 
User.nameStartsWith('W', function startsWithCB(err,found){
  while (found.length)
    console.log('User '+found.pop().name+' has name that starts with \'W\'');
  });

// User Walter has name that starts with 'W'
// Don't forget to handle your errors

```
### Notes
> Warning! Your attribute in the method name must be lowerCase!
> Warning! .exec() DOES NOT work on this method.  You MUST supply a callback.
> Any string arguments passed must be the ID of the record.





###### .`<attribute>`EndsWith( `criteria` , [`callback`] )
### Purpose
Find records based on the last letters of one of its attributes value.

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criteria    | `{}`,`[{}]`, `string`, `int`  | Yes |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Found Records      | `{}`, `[{}]`        |


### Example Usage

```javascript 
User.nameEndsWith('sie', function endsWithCB(err,found){
  console.log('User '+found[0].name+' has name that ends with \'sie\'');
  });
  
// User Jessie has name that ends with 'sie'
// Don't forget to handle your errors

```

### Notes
> Warning! Your attribute in the method name must be lowerCase!
> Warning! .exec() DOES NOT work on this method.  You MUST supply a callback.
> Any string arguments passed must be the ID of the record.

-->

<docmeta name="uniqueID" value="query546204">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".query()">

