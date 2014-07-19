# * .validate(`callback`)

### Purpose
Checks the current keys/values on the record against the validations specified in the attributes object of your model. 

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |     Callback        | `function`          | Yes        |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |


### Example Usage

```javascript
User.find().exec(
  function(err,myRecords){

    // Grab a record off the top, change it to the wrong data type, then try to validate
    var getOneRecord = myRecords.pop();
    getOneRecord.name = ['Marie','Hank'];
    getOneRecord.name.validate(
      function(err){
        if (err)
          console.log(JSON.stringify(err));
      });
  });
  
// {"ValidationError":{"name":[{"data":["Marie","Hank"],"message":"Validation error: \"Marie,Hank\" is not of type \"string\"","rule":"string"}]}}

```

For model

```javascript
module.exports = {

  attributes: {
    name: 'string'

  }

};
```

### Notes
> This is shorthand for `Model.validate({ attributes }, cb)`
> If you `.save()` without first validating, Waterline tries to convert.  If it can't, it will throw an error.
> In this case, it would have converted the array to the string 'Marie,Hank'

> There will be no parameters in the callback unless there is an error.  No news is good news.

> This is an instance method.  Currently, instance methods ARE NOT TRANSACTIONAL.  Because of this, it is recommended that you use the equivalent model method instead.  

<docmeta name="uniqueID" value="validate76690">
<docmeta name="methodType" value="instance">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".validate()">

