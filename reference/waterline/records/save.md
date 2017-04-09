# * .save(`callback`)

### Purpose
The `save()` method updates your record in the database using the current attributes.

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |     Callback        | `function`          | No         |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |


### Example Usage

```javascript
User.find().exec(
  function(err,myRecords){

    // Grab a record off the top of the returned array and save a new attribute to it
    var getOneRecord = myRecords.pop();
    getOneRecord.name = 'Hank';
    getOneRecord.save(
      function(err, savedUser){
        console.log('User with ID '+getOneRecord.id+' now has name '+getOneRecord.name);
      });
  });

// User with ID 1 now has name Hank

// Don't forget to handle your errors.
// Don't forget to abide by the rules you set in your model

```
### Notes
> + This is an instance method.  Currently, instance methods ARE NOT TRANSACTIONAL.  Because of this, it is recommended that you use the equivalent model method instead.
> + If you have any associations on the model they will currently be populated when you call `.save()`. This could cause issues with memory so to prevent this, you can take advantage of an experimental feature: passing in an options argument with `populate: false` set. Example: `.save({ populate: false }, function() {})`.


<docmeta name="displayName" value=".save()">
<docmeta name="pageType" value="method">

