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
|  .save       | callback <```function```>  |  callback <```function (err,savedValue)```>     |       Yes             |
|  .destroy    | callback < function >  |  callback < function(err,destroyedValue) > |       Yes             |
|  .validate   | callback < function >  |  callback < function(err,validatedValue) > |       Yes             |
|  .toObject   |      none            |  model values < object >                   |        No             |
|  .toJSON     |      none            |  clone of model < object >                 |        No             |


#### save

The save method updates the database with the parent instance's current values and returns the newly saved object. This is shorthand for Model.update({ attributes }, cb)

##### Example Usage

```json

m.save()

```

#### destroy

This method destroys the parent model instance and returns an object containing it's former value.

##### Example Usage

```json

m.destroy()

```

#### validate

The validate method takes the currently set attributes and validates the model. This is shorthand for Model.validate({ attributes }, cb)

##### Example Usage

```json

m.validate()

```

#### toObject

This returns a cloned object containing only the model values. It is useful for doing operations on the current values minus the instance methods.

##### Example Usage

```json

m.toJSON()

```

#### toJSON

This returns a cloned object and can be overriden to manipulate records . Same as toObject but made to be overriden.
	
##### Example Usage

```json

m.toJSON()

```
