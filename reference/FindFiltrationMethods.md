CRUD Filtration Methods
-----------------------
The .find() method returns a chainable object if you don't supply a callback.  The methods below can be chained to .find() to further filter your results.




# .where()
### Purpose

### Parameters
| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Criterea Object    |      `{}`           | Yes	       |


### Example Usage

```javascript 

```
### Notes
>

# .limit()
### Purpose

### Parameters
| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Criterea Object    |      `{}`           | Yes	       |

### Example Usage

```javascript 

```
### Notes
>

# .skip()
### Purpose

### Parameters
| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Criterea Object    |      `{}`           | Yes	       |

### Example Usage

```javascript 

```
### Notes
>

# .sort()
### Purpose

### Parameters
| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Criterea Object    |      `{}`           | Yes	       |

### Example Usage

```javascript 

```
### Notes
>


# .exec()
### Purpose
This indicates the end of the chain and signals the adapter to run the query that it has been building. 

### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Callback           |      `function`     | Yes	       |

### Example Usage

```javascript 

```
### Notes
>



### Notes
> These chainable methods technically work with .destroy() and .update() as well.
