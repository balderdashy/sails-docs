# .create()
### Purpose
Creates a new record.

### Overview

#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | Records to Create   | Object, Object Array| Yes		     |
| 2 |     callback        | function            | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types  |
|---|---------------------|----------------------|
| 1 |  Error              | Error                |
| 2 |  Records Created    | Object, Object Array |

### Example Usage

```javascript 

// create a new record with no attributes

Users.create({name:'Walter Jr'}).exec(function createCB(err,created){
	console.log('Created user with name '+created.name);
	});

// Created user with name Walter Jr
// Don't forget to handle your errors and abide by the rules you defined in your model
```
### Notes
>
