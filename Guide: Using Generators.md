# Using Generators
 Warning, this is incomplete and will be cleaned up and finalized soon!
 
### What do they do?
		They create new files and folders within your app based on the options and templates you provide the generator

### Why do I want them?

Example: You always want your sails projects to integrate with an obscure HTML templating engine that is a pain to configure.  You can create a generator that writes the necessary files and folders and plugs your additional Sails CLI tool parameters into the "tough to set up" configuration file for your templating engine.

Example: You hate that in v0.10, we've stopped generating the services folder with each new sails project. You want it back.  You can create a generator that adds this folder.


### What do they look like?

Our generators look like this

```
        sails-generator-generatorName		- Root directory of your generator.

				bin								- Ignore this.   
					index.js					- Passes the config from /lib to sails-generate which does the real work.

				lib								- This folder contains all the config for your generator
					before.js					- In here you will define a function which will be run on 
													every "generator action" specified in lib/index.js
					index.js					- Exports an object containing your "generator actions".  
													This is read by /bin/index.js which calls the sails-generate module

				templates						- Place any templates in here that will be used by your "generator actions".
					templateName.ejs			- This is an example of a template.
					anotherTemplateName.ejs		- Templates are currently ejs. That will be able to be changed at some point.
```

### How do you make them?

The first step is to clone the sails-generate-generator repo.  Sails-generate-generator is a tool created to make the process of making generators easier.  Run it as a node script with your new generatorName as a param.

### Sails RC File

`myApp/.sailsrc`



### reh reh reh

Output targets syntax:

You can use params in your target paths:
{
'./:someScopeVariable/somethingStatic/:somethingDynamicAgain': '...'
}


Other directives:

Generate a folder: (`folder`)
'./controllers': { folder: {} }



Copy a file : (`copy`)
(note: if the path doesn't exist, empty directories will be created, like mkdirp)

'./bar.foo': { copy: path.resolve(__dirname, './templates/foo.template') },
'./baz/bar/foo': { copy: path.resolve(__dirname, './templates/foo.template') },



Render a template file: (`template`)
(uses lodash, works just like EJS-- this is the relative path from the template directory)
'./README.md': { template: 'README.template' },



Run another generator:
'./controllers/:controllerName.js': 'adapter'


Do something custom: (asynchronous)
'./foo/bar': { exec: function (scope, cb) {
cb();
}}


		'./:generatorName/bin/index.js':       { template: 'bin/index.js' },

