# CRUD Methods
The methods below are the basic crud methods offered by the ORM. Here is a very quick reference for each method. More detailed infor can be found below.  All Methods are asyncronous.

For every class method, the callback parameter is optional.  If one is not supplied, it will return a chainable object.

### Overview
| Method Name  |       Parameters     | Callback Parameters 
| ------------ | -------------------  | --------------------
| .create() | -```newRecords {} or [{}]```<br>-```callback()``` | ```function ( Error , newRecords)```
| .update() | -```findCriterea {} or [{}]```<br>-```updatedRecord {} or [{}]```<br>-```callback()```| ```function ( Error , updatedRecords )```
| .destroy() | -```findCriterea {} or [{}]```<br>-```callback()``` | ```function ( Error )```
| .count() | -```findCriterea {} or [{}]```<br>-```callback()``` | ```function ( Error, integer )```
| .findOrCreate() | -```findCriterea {} or [{}]```<br>-```recordsToCreate {} or [{}]```<br>-```callback()``` | ```function ( Error , foundOrCreated)```
| .findOne() | -```findCriterea {}```<br>-```callback()```  | ```function ( Error , foundRecord)```
| .find() | -```findCriterea {} or [{}]```<br>-```callback()``` | ```function ( Error , foundRecords)```
| .startsWith() | -```findCriterea {} or [{}]```<br>-```callback()``` | ```function ( Error , foundRecords)```
| .endsWith() | -```findCriterea {} or [{}]```<br>-```callback()``` | ```function ( Error , foundRecords)```
| .stream() | ```findCriterea {}``` | No callback! A node stream object is returned |


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
#### Purpose

#### Example Usage

```javascript 

```

#### Notes


# Misc Class Methods
### Overview
Here are some other class methods that don't fit in the other sections.

| Method Name  |       Parameters     | Callback Parameters |
| ------------ | -------------------  | ------------------- | 
|.validate()|||
|.join()||||
|.count()||||
|.contains()||||
|.select()||||


### .validate()
#### Purpose
This method ensures that the current attributes on your model instance meet the criteria you defined in your model.

#### Example Usage

```javascript 

Users.findOne(1).exec(function(err,mI){

	// petName is defined as a 'string'.  Let's give it an array and see what happens.

	mI.petName = [1,2];
	
	Users.validate(mI,function(err){
		sails.log('Error:'+JSON.stringify(err));
	});
});

// Error:{"ValidationError":{"petName":[{"data":[1,2],"message":"Validation error: \"1,2\" is not of type \"string\"","rule":"string"}]}}

```
#### Notes

### .join()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

### .count()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

### .contains()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

### .select()
#### Purpose

#### Example Usage

```javascript 

```

#### Notes

