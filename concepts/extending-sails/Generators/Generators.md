# Generators
## Status

##### Stability: [2](http://nodejs.org/api/documentation.html#documentation_stability_index) - Unstable

The API is in the process of settling, but has not yet had sufficient real-world testing to be considered stable.  

Backwards-compatibility will be maintained if reasonable.


### Purpose

What is my purpose in this world?

### old partial content from when spec was an itty bitty baby

Generators are designed to make it easier to customize the `sails new` and `sails generate` command-line tools, and provide better support for different Gruntfiles, configuration options, view engines, coffeescript, etc.


#### Structure


A generator has either:

(1) a `generate` method, or

(2) a `configure` + `render` method  (render may be omitted in the simplest of cases)


Sails 

```
	app (appPath + name)
		<- view
		<- folder
		<- jsonfile
		<- file

	api (appPath + name)
		<- controller
		<- model

	controller (appPath + template + name)
		<- file

	model (appPath + template + name)
		<- file

	view (appPath + template + name)
		<- file

	file (destination + name + template + data)

	jsonfile (destination + name + data)
	
	folder (destination + name)
```


<docmeta name="uniqueID" value="Generators82739">
<docmeta name="displayName" value="Generators">
<docmeta name="stabilityIndex" value="2">
