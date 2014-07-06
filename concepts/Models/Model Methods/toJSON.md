# .toJSON()

### Purpose
This method also returns a cloned model instance.  This one however includes all instance methods.  Be sure to read the notes on this one.

### Overview


#### Return Value

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
|   |   Cloned Record     |        `{ }`        |


### Example Usage

```javascript
User.find().exec(
  function(err,myRecord){
    var datUser = myRecord.pop().toObject();
    console.log(datUser);
  });

/* { id: 2,
  createdAt: '2013-10-31T22:42:25.459Z',
  updatedAt: '2013-11-01T20:12:55.534Z',
  name: 'Hank',
  phoneNumber: '101-150-1337' } */

User.find().exec(
  function(err,myRecord){
    var datUser = myRecord.pop().toJSON();
    console.log(datUser);
  });

/* { id: 2,
  createdAt: '2013-10-31T22:42:25.459Z',
  updatedAt: '2013-11-01T20:12:55.534Z',
  name: 'Hank' } */



// Don't forget to handle your errors

```

For model

```javascript
module.exports = {
  attributes: {
    name: 'string',
    phoneNumber: 'string',

    // Override the default toJSON method

    toJSON: function() {
      var obj = this.toObject();
      delete obj.phoneNumber;
      return obj;
    }
  }
}

```
### Notes
> The real power of toJSON relies on the fact every model instance sent out via res.json is first passed through toJSON.
> Instead of writing custom code for every controller action that uses a particular model (including the "out of the box" blueprints), you can manipulate outgoing records by simply overriding the default toJSON function in your model.  
> You would use this to keep private data like email addresses and passwords from being sent back to every client.

> This is an instance method.  Currently, instance methods ARE NOT TRANSACTIONAL.  Because of this, it is recommended that you use the equivalent model method instead.  


<docmeta name="uniqueID" value="toJSON161307">
<docmeta name="methodType" value="instance">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".toJSON()">

