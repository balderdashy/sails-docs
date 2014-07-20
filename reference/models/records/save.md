# * .save(`callback`)

### Purpose
The `save()` method updates your record in the database using the current attributes.  It then returns the newly saved object in the callback. 

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |     Callback        | `function`          | Yes        |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Saved Record       | `{ }`               |


### Example Usage

```javascript
User.find().exec(
  function(err,myRecords){

    // Grab a record off the top of the returned array and save a new attribute to it
    var getOneRecord = myRecords.pop();
    getOneRecord.name = 'Hank';
    getOneRecord.save(
      function(err,s){
        console.log('User with ID '+s.id+' now has name '+s.name);
      });
  });

// User with ID 1 now has name Hank

// Don't forget to handle your errors.
// Don't forget to abide by the rules you set in your model

```
### Notes
> This is an instance method.  Currently, instance methods ARE NOT TRANSACTIONAL.  Because of this, it is recommended that you use the equivalent model method instead.  

<docmeta name="uniqueID" value="save581656">
<docmeta name="methodType" value="association">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".save()">

