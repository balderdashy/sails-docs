# Deprecated Features
The following features are considered deprecated and should at some point be removed from the codebase

## Class Methods

### Dynamic Finder Methods

- .findOneBy`<attribute>`In()
- .findOneBy`<attribute>`Like()
- .findBy`<attribute>`In()
- .findBy`<attribute>`Like() 
- .countBy`<attribute>`In()
- .countBy`<attribute>`Like()
- .`<attribute>`Contains()
 
### CRUD Class Methods
- .findAll()
- .findOneLike()
- .findLike()
- .contains()
- .join()
- .select() This is also an alias for find.  It only exists for compatibility with a very old version of waterline.  Don't use it.  Use find. 
 - .findOrCreateEach()
- .join()

# .startsWith()
### Purpose
This is shorthand for a .find() query that uses the startsWith query modifier.

### Overview
#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criterea    | `{}`,`[{}]`, 'string'| Yes |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Found Records      | `[{}]`              |

### Example Usage

```javascript 
User.startsWith({name:'Fl'},function swCB(err,found){
	console.log('User  '+found[0].name+' starts with \'Fl\'');
	});
	
// User  Flynn starts with 'Fl'
// Don't forget to handle your errors

```
### Notes
> Although you may pass .startsWith an object or an array of objects, it will always return an array.
> Warning! This method does not support .exec() !  You MUST supply a callback.  
> Any string arguments passed must be the ID of the record.

# .endsWith()
### Purpose
This method performs a query on the model and returns those ...
### Overview
#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criterea    | `{}`,`[{}]`, 'string'| Yes |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Found Records      | `[{}]`              |

### Example Usage

```javascript 
User.endsWith({name:'ie'},function ewCB(err,found){
	console.log('User '+found[0].name+' ends with \'ie\'');
	});
	
// User Jessie ends with 'ie'
// Don't forget to handle your errors

```
### Notes
> Although you may pass .endsWith an object or an array of objects, it will always return an array of objects.
> Warning! This method does not support .exec() !  You MUST supply a callback.  
> Any string arguments passed must be the ID of the record.
