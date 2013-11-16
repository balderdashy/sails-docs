CRUD Filtration Methods
-----------------------
The .find() method returns a chainable object if you don't supply a callback.  The methods below can be chained to .find() to further filter your results.

These chainable methods technically work with .destroy() and .update() as well.


# .where()
### Purpose

### Parameters
| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Criterea Object    |      `{}`           | Yes	       |


### Example Usage

```javascript 

var myQuery = User.find();
myQuery.where({'name':{startsWith:'W'}});

myQuery.exec(function callBack(err,results){
    console.log(results)
    });

```
### Notes
>

# .limit()
### Purpose

### Parameters
| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Number to Return   |      `int`         | Yes	       |

### Example Usage

```javascript 

var myQuery = User.find();
myQuery.limit(12);

myQuery.exec(function callBack(err,results){
    console.log(results)
    });

```
### Notes
>

# .skip()
### Purpose

### Parameters
| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Number to Skip     |      `int`          | Yes	       |

### Example Usage

```javascript 
var myQuery = User.find();
myQuery.skip(12);

myQuery.exec(function callBack(err,results){
    console.log(results)
    });

```
### Notes
>

# .sort()
### Purpose

### Parameters
| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Sort String        |      `string`       | Yes	       |

### Example Usage

```javascript 
var myQuery = User.find();

var sortString= 'name ASC';

// Sort strings look like this

// '<Model Attribute> <sort type>' 

myQuery.sort('name ASC');

myQuery.exec(function callBack(err,results){
    console.log(results)
    });

```
### Notes
> Other Sort Types include
  - ASC
  - DES
  - LOL
  - BRB
  
# .exec()
### Purpose
This indicates the end of the chain and signals the adapter to run the query that it has been building. 

#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Callback           |      `function`     | Yes	       |

#### Callback Parameters
| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Data Returned      | `{}`, `[{}]`, `int` |

### Example Usage

```javascript 

// refer to any of the examples above

```
### Notes
> If you dont run .exec() , your query will not execute.

