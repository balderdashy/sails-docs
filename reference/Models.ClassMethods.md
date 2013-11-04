# CRUD Methods
The methods below allow you to do crud and stuff.

### Overview
| Method Name  |       Parameters     |                    Returned              |   Is It Asyncronous?  |
| ------------ | -------------------  | ---------------------------------------- | --------------------- |
| .create() | Object or Array, callback | deferred object if no callback | yes |
| .update() | Object, Object, callback | deferred object if no callback | yes |
| .destroy() | Object, callback | deferred object if no callback | yes |
| .count() | Object, Object, callback | deferred object if no callback | yes |
| .createEach() | Array, callback | deferred object if no callback | yes|
| .findOrCreateEach() | Object, Array, callback | deferred object if no callback | yes |
| .findOrCreate() | Object, Object, callback | deferred object if no callback | yes |
| .findOne() | Object, callback | deferred object if no callback | yes |
| .find() | Object, Object, callback | deferred object if no callback | yes |
| .startsWith() | Object, callback | deferred object if no callback | yes |
| .endsWith() | Object, callback | deferred object if no callback | yes |
| .stream() | Object | stream | yes |



### .validate()
#### Purpose
This method ensures that the current attributes on your model instance meet the criteria you defined in your model.

#### Example Usage

```javascript 

Users.findOne(1).exec(function(err,mI){

	// petName is defined as a 'string'.  Let's give it an array and see what happens.

	mI.petName = [1,2];
	
	Users.validate(mI,function(err){
		sails.log('Error:'+JSON.stringify(msg));
	});
});

// Error:{"ValidationError":{"petName":[{"data":[1,2],"message":"Validation error: \"1,2\" is not of type \"string\"","rule":"string"}]}}

```
#### Notes

### .create()
#### Purpose
Creates a new record.

#### Example Usage

```javascript 

```

#### Notes

### .update()
#### Purpose
Updates an existing record.

#### Example Usage

```javascript 

```

#### Notes

### .destroy()
#### Purpose
Destroys a record that may or may not exist.

#### Example Usage

```javascript 

```

#### Notes

### .count()
#### Purpose
This method counts the number of model records

#### Example Usage

```javascript 

```

#### Notes

### .createEach()
#### Purpose

Creates a record for each object passed to it in an array.

#### Example Usage

```javascript 

```

#### Notes

### .findOrCreateEach()
#### Purpose
You pass it two arrays.  Weird Syntax.
#### Example Usage

```javascript 

```

#### Notes

### .findOrCreate()
#### Purpose
This checks for the existence of a record.  If it can't be found, it is created.

#### Example Usage

```javascript 

```

#### Notes

### .findOne()
#### Purpose
This finds and returns a single record that meets the criterea.
#### Example Usage

```javascript 

```

#### Notes

### .find()
#### Purpose
Finds and returns all records that meet the criterea object that you pass it.

#### Example Usage

```javascript 

```

#### Notes


### .startsWith()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

### .endsWith()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

### .stream()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes





# Dynamic Finders
These methods are automatically generated for each attribute in each model of your sails app.  This includes the id, CreatedAt, and UpdatedAt attributes that exist in every record.

###

| Method Name  |       Parameters     |                    Returned              |   Is It Asyncronous?  |
| ------------ | -------------------  | ---------------------------------------- | --------------------- |
|.findOneBy`<attribute>`()||||
|.findBy`<attribute>`()||||
|.countBy`<attribute>`()||||
|.`<attribute>`StartsWith()||||
|.`<attribute>`Contains()||||
|.`<attribute>`EndsWith()||||


### .findOneBy`<attribute>`()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

### .findOneBy`<attribute>`In()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

### .findOneBy`<attribute>`Like()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

### .findBy`<attribute>`()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

### .findBy`<attribute>`In()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

### .findBy`<attribute>`Like()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

### .countBy`<attribute>`()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

### .countBy`<attribute>`In()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

### .countBy`<attribute>`Like()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

### .`<attribute>`StartsWith()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

### .`<attribute>`Contains()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

### .`<attribute>`EndsWith

