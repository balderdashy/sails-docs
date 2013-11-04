Models
======
Sails models have the following blah blah blah


### Class Methods
Sails supports the following class methods.





#### Pub-Sub
Sails has these pub pub-sub type methods.  

### Instance Methods
#### Overview

| Method Name  |       Parameters     |                    Returned              |   Is It Asyncronous?  |
| ------------ | -------------------  | ---------------------------------------- | --------------------- |
|  .save       | callback ```function```  |  callback ```function ({ err } , { savedValue } )```     |       Yes    |
|  .destroy    | callback ```function```  |  callback ```function ( { err } )``` |       Yes     |
|  .validate   | callback ```function``` |  callback ```function ( { err } )``` |       Yes      |
|  .toObject   |      none            |  clone of instance ```object```                   |        No         |
|  .toJSON     |      none            |  clone of instance ```object```                 |        No         |


#### save

The `save` method updates the database with the parent instance's current values and returns the newly saved object. This is shorthand for Model.update({ attributes }, cb)

> Warning!
> Your data will not be validated before it is saved.  Call `.validate()` before you `.save()` !

##### Example Usage

```javascript

Users.find().limit(1).done(
	function(err,mI){
		mI[0]['petName'] = 'BooBoo';
		mI[0].save(
			function(err,s){
				console.log('User with ID '+s.id+' now has name '+s.petName);
			});
	});

// User with ID 1 now has name BooBoo

// Don't forget to handle your errors.
// Don't forget to abide by the rules you set in your model

```

#### destroy

This method destroys the parent model instance then runs a callback.

##### Example Usage

```javascript

Users.find().limit(1).done(
	function(err,mI){
		mI[0].destroy(
			function(err){
				console.log('User with ID '+mI[0].id+' was destroyed');
			});
	});

// User with ID 1 was destroyed

// Don't forget to handle your errors.


```

#### validate

The validate method checks the keys/values that are currently set on the model instance against the validations that you specified in the attributes object of your model. This is shorthand for Model.validate({ attributes }, cb)
There will be no parameters in the callback unless there is an error.  No news is good news.

##### Example Usage

```javascript

Users.find().limit(1).done(
	function(err,mI){
		mI[0]['petName'] = ['pookie','BooBoo'];
		mI[0].validate(
			function(err){
				if (err)
					console.log(JSON.stringify(err));
			});
	});
	
// {"ValidationError":{"petName":[{"data":["pookie","BooBoo"],"message":"Validation error: \"pookie,BooBoo\" is not of type \"string\"","rule":"string"}]}}

```

For model

```javascript
module.exports = {

  attributes: {
  	petName: 'string'

  }

};
```

#### toObject and toJSON

By default, the only difference between toJSON and toObject is the absence of methods inside toObject.  The real power of toJSON relies on the fact every model instance sent out via res.json is first passed through toJSON.
Instead of writing custom code for every controller action that uses a particular model (including the "out of the box" blueprints) , you can manipulate outgoing records by simply overriding the default toJSON function in your model.  You would use this to keep private data like email addresses and passwords from being sent back to every client.

The toObject method also returns a cloned object however, it is stripped of all instance methods.  You will probably only want to use .toObject when overriding the default .toJSON instance method. The example below should demonstrate it's most common use as well as the difference between the two.

##### Example Usage

```javascript

Users.find().limit(1).done(
	function(err,mI){
		var datUser = mI[0].toObject();
		console.log(datUser);
	});

/* { id: 2,
  createdAt: '2013-10-31T22:42:25.459Z',
  updatedAt: '2013-11-01T20:12:55.534Z',
  petName: 'BooBoo',
  phoneNumber: '101-150-1337' } */

Users.find().limit(1).done(
	function(err,mI){
		var datUser = mI[0].toJSON();
		console.log(datUser);
	});

/* { id: 2,
  createdAt: '2013-10-31T22:42:25.459Z',
  updatedAt: '2013-11-01T20:12:55.534Z',
  petName: 'BooBoo' } */



// Don't forget to handle your errors

```

For model

```javascript

module.exports = {
  attributes: {
    petName: 'string',
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


#### Custom Instance Methods

If you would like to write your own instance methods, you will declare them inside of your model.  For more information, see the guide on models at http://omfgdogs.com
