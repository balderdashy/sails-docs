Models
======
Sails models have the following blah blah blah


### Class Methods
Sails supports the following class methods.


#### ORM
Sails supports these class methods for ORM type stuff

#### Pub-Sub
Sails has these pub pub-sub type methods.  

### Instance Methods
#### Overview

| Method Name  |       Parameters     |                    Returned              |   Is It Asyncronous?  |
| ------------ | -------------------  | ---------------------------------------- | --------------------- |
|  .save       | callback ```function```  |  callback ```function ({ err },{savedValue})```     |       Yes    |
|  .destroy    | callback ```function```  |  callback ```function ({ err })``` |       Yes     |
|  .validate   | callback ```function``` |  callback ```function ({ err })``` |       Yes      |
|  .toObject   |      none            |  model values ```object```                   |        No         |
|  .toJSON     |      none            |  clone of model ```object```                 |        No         |


#### save

The save method updates the database with the parent instance's current values and returns the newly saved object. This is shorthand for Model.update({ attributes }, cb)
* Warning!  Your data will not be validated before it is saved.  Call .validate() before you .save() !
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

The validate method checks the attributes that are currently set on the model instance against the validations that you specified in the attributes object of your model. This is shorthand for Model.validate({ attributes }, cb)
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

#### toObject

This returns a cloned object containing only the model values. It is useful for doing operations on the current values minus the instance methods.

##### Example Usage

```javascript

m.toJSON()

```

#### toJSON

This returns a cloned object and can be overriden to manipulate records . Same as toObject but made to be overriden.
	
##### Example Usage

```javascript

m.toJSON()

```
