# .create( `values`, [`callback`] )
### Purpose
Creates a new instance of this model in the database.

### Overview

#### Parameters
|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Record(s) to Create  |      `{}`, `[{}]`   | Yes      |
| 2 |     Callback        | `function`          | No         |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Records Created    | `{}`, `[{}]`        |



### Example Usage

```javascript 
// create a new record with name 'Walter Jr'

User.create({name:'Walter Jr'}).exec(function createCB(err,created){
  console.log('Created user with name '+created.name);
  });

// Created user with name Walter Jr
// Don't forget to handle your errors and abide by the rules you defined in your model
```



<docmeta name="uniqueID" value="create312605">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".create()">

