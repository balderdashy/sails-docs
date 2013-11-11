# CRUD Methods

### .create()
#### Purpose
Creates a new record.

#### Example Usage

```javascript 

// create a new record with no attributes

Users.create({name:'Walter Jr'}).exec(function createCB(err,created){
	console.log('Created user with name '+created.name);
	});

// Created user with name Walter Jr
// Don't forget to handle your errors and abide by the rules you defined in your model
```
#### Notes




### .update()
#### Purpose
Updates an existing record.

#### Example Usage

```javascript 
Users.update({name:'Walter Jr'},{name:'Flynn'}).exec(function updateCB(err,updated){
	console.log('Updated user to have name '+updated[0].name);
	});
	
// Updated user to have name Flynn
// Don't forget to handle your errors and abide by the rules you defined in your model

```
#### Notes
Although you may pass .update() an object or an array of objects, it will always return an array.





### .destroy()
#### Purpose
Destroys a record that may or may not exist.

#### Example Usage

```javascript 
Users.destroy({name:'Flynn'}).exec(function deleteCB(err){
	console.log('The record has been deleted');
	});
	
// The record has been deleted
// Don't forget to handle your errors

```
#### Notes




### .findOrCreate()
#### Purpose
This checks for the existence of the record in the first parameter.  If it can't be found, the record in the second parameter is created.

#### Example Usage

```javascript 

Users.findOrCreate({name:'Walter'},{name:'Jessie'}).exec(function createFindCB(err,record){
	console.log('What\'s cookin\' '+record.name+'?');
	});
	
// What's cookin' Jessie?
// Don't forget to handle your errors and abide by the rules you defined in your model

```
#### Notes




### .findOne()
#### Purpose
This finds and returns a single record that meets the criterea.
#### Example Usage

```javascript 
Users.findOne({name:'Jessie'}).exec(function findOneCB(err,found){
	console.log('We found '+found.name);
	});
	
//We found Jessie
// Don't forget to handle your errors

```
#### Notes




### .find()
#### Purpose
Finds and returns all records that meet the criterea object(s) that you pass it.

#### Example Usage

```javascript 
Users.find({}).exec(function findCB(err,found){
	while (found.length)
		console.log('Found User with name '+found.pop().name)
	});

// Found User with name Flynn
// Found User with name Jessie
// Don't forget to handle your errors

```
#### Notes



### .startsWith()
#### Purpose
This is shorthand for a .find() query that uses the startsWith query modifier.
#### Example Usage

```javascript 
Users.startsWith({name:'Fl'},function swCB(err,found){
	console.log('User  '+found[0].name+' starts with \'Fl\'');
	});
	
// User  Flynn starts with 'Fl'
// Don't forget to handle your errors

```
#### Notes
Although you may pass .startsWith an object or an array of objects, it will always return an array.

Warning! This method does not support .exec() !  You MUST supply a callback.  


### .endsWith()
#### Purpose

#### Example Usage

```javascript 
Users.endsWith({name:'ie'},function ewCB(err,found){
	console.log('User '+found[0].name+' ends with \'ie\'');
	});
	
// User Jessie ends with 'ie'
// Don't forget to handle your errors

```
#### Notes
Although you may pass .endsWith an object or an array of objects, it will always return an array.
Warning! This method does not support .exec() !  You MUST supply a callback.  



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




### .count()
#### Purpose

#### Example Usage

```javascript 
Users.count({name:'Flynn'}).exec(function countCB(err,found){
	console.log('There are '+found+' users called \'Flynn\'');
	});
	
// There are 1 users called 'Flynn'
// Don't forget to handle your errors

```
#### Notes




### .stream()
#### Purpose
This method uses a <a href="http://nodejs.org/api/stream.html#stream_class_stream_writable">node write stream</a> to pipe model data as it is retrieved without first having to buffer the entire thing to memory.  
#### Example Usage (controller code)

```javascript 


	    SearchResult.stream({
	            limit: maxPerPage,
	            skip: offset
	    }, {
	            write: function(model, index, cb) {
	 
	                    // Output prefix
	                    if (index === 0) {
	                            return cb(null, '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
	                    } else {
	 
	                            // Convert & characters to escaped HTML entities &amp;
	                            // (see http://stackoverflow.com/questions/3431280/validation-problem-entityref-expecting-what-should-i-do)
	                            var url = model.url || '';
	                            url = url.replace(/\&/g,'&amp;');
	 
	                            return cb(null, '<url>' +
	                                    '<loc>'+url+'</loc>' +
	                                    '<priority>'+model.priority+'</priority>' +
	                                    '<changefreq>daily</changefreq>' +
	                                    '</url>');
	                    }
	            },
	            end: function(cb) {
	                    // Output suffix
	                    cb(null, '</urlset>');
	            }
	    }).pipe(res);

```
#### Notes
This method is useful for piping data from VERY large models straight to res.  You can also pipe it other places.  See the node stream docs for more info.




# Dynamic Finders
These methods are automatically generated for each attribute in each model of your sails app.  This includes the id, CreatedAt, and UpdatedAt attributes that exist in every record.

Warning!  The first parameter of every dynamic finder MUST HAVE THE SAME DATA TYPE that you declared for the model attribute by which you are searching. The only exception to this is when you wish to return multiple records.  In this case, the first parameter must be an array containing data of the type specified in your controller for that attribute.

### Overview

| Method Name  |       Parameters     | Callback Parameters |
| ------------ | -------------------  | ------------------- |
|.findBy`<attribute>`()|-```findCriterea {} or [{}]```<br>-```callback()``` | ```function ( Error , [foundRecords])```|
|.findOneBy`<attribute>`()|-```findCriterea {} or [{}]```<br>-```callback()``` | ```function ( Error , foundRecord)```|
|.countBy`<attribute>`()|-```findCriterea {} or [{}]```<br>-```callback()``` | ```function ( Error , integer )```|
|.`<attribute>`StartsWith()|-```findCriterea {} or [{}]```<br>-```callback()``` | ```function ( Error , foundRecords)```|
|.`<attribute>`EndsWith()|-```findCriterea {} or [{}]```<br>-```callback()``` | ```function ( Error , foundRecords)```|


### .findBy`<attribute>`()
#### Purpose
Find and return records by a specific model attribute.
#### Example Usage

```javascript 
Users.findByName(['Flynn','Walter','craig']).exec(function findCB(err,found){
	while (found.length)
		console.log('Found User with name '+found.pop().name);
	});
	
// Found User with name Walter
// Found User with name Flynn
// Don't forget to handle your errors

```
#### Notes



### .findOneBy`<attribute>`()
#### Purpose
Find and return one record by a specific model attribute.
#### Example Usage

```javascript 
Users.findOneByName('Walter').exec(function findCB(err,found){
	console.log('Found User with name '+found.name);
	});
	
// Found User with name Walter
// Don't forget to handle your errors

```
#### Notes
This will always return a single object.




### .countBy`<attribute>`()
#### Purpose
Count the number of records in a model with a particular model attribute. 
#### Example Usage

```javascript 
Users.countByName('Walter').exec(function countCB(err,found){
	console.log('There are '+found+' users called \'Walter\'');
	});
	
// There are 1 users called 'Walter'
// Don't forget to handle your errors
```
#### Notes
The value returned will be equal to the sum of the products of all matched criterea objects and the number of records that particular object matched. 

SUM [ matchedObjects * RecordsMatchedByObject ]
// how the hell do I say this?

### .`<attribute>`StartsWith()
#### Purpose

#### Example Usage

```javascript 
Users.nameStartsWith('W', function startsWithCB(err,found){
	while (found.length)
		console.log('User '+found.pop().name+' has name that starts with \'W\'');
	});

// User Walter has name that starts with 'W'
// Don't forget to handle your errors

```
#### Notes
Warning! Your attribute in the method name must be lowerCase!
Warning! .exec() DOES NOT work on this method.  You MUST supply a callback.




### .`<attribute>`EndsWith
#### Purpose

#### Example Usage

```javascript 
Users.nameEndsWith('sie', function endsWithCB(err,found){
	console.log('User '+found[0].name+' has name that ends with \'sie\'');
	});
	
// User Jessie has name that ends with 'sie'
// Don't forget to handle your errors

```
#### Notes
Warning! Your attribute in the method name must be lowerCase!
Warning! .exec() DOES NOT work on this method.  You MUST supply a callback.

