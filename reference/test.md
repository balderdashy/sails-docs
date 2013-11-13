# .create()
### Purpose
Creates a new record.

### Overview

#### Parameters

| # |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | Records to Create   | `{}`, `[{}]`        | Yes	     |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

| # |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | Error               |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

```javascript 

// create a new record with name 'Walter Jr'

Users.create({name:'Walter Jr'}).exec(function createCB(err,created){
	console.log('Created user with name '+created.name);
	});

// Created user with name Walter Jr
// Don't forget to handle your errors and abide by the rules you defined in your model
```
### Notes
> If no callback is included, a chainable object is returned
