# Sails CLI

### Overview
Sails comes with a convenient tool to quickly get your app scaffolded and running.



# sails lift

Run the Sails app in the current dir (if `node_modules/sails` exists, it will be used instead of the globally installed Sails)

##### Options:

  * `--dev` - in development environment (the default)
  * `--prod` - in production environment
  * `--port <portNum>` - on the port specified by `portNum` instead of the default (1337)
  * `--verbose` - with verbose logging enabled
  * `--silly` - with insane logging enabled
  

### Example

```sh
$ sails lift

info: Starting app...

info: 
info: 
info:    Sails              <|
info:    v0.10.0-rc5         |\
info:                       /|.\
info:                      / || \
info:                    ,'  |'  \
info:                 .-'.-==|/_--'
info:                 `--'-------' 
info:    __---___--___---___--___---___--___
info:  ____---___--___---___--___---___--___-__
info: 
info: Server lifted in `/Users/mikermcneil/code/sandbox/second`
info: To see your app, visit http://localhost:1337
info: To shut down Sails, press <CTRL> + C at any time.

debug: --------------------------------------------------------
debug: :: Sat Apr 05 2014 17:03:39 GMT-0500 (CDT)

debug: Environment : development
debug: Port        : 1337
debug: --------------------------------------------------------
```







# `sails debug`

Attach the node debugger and lift the sails app; similar to running `node --debug app.js`.  Takes the same options as `sails lift`.  You can then use [node-inspector](https://github.com/node-inspector/node-inspector) to debug your app as it runs.


### Example

```sh
$ sails version
0.10.0-rc5
```




> To use the standard (command-line) node debugger with sails, you can always just run `node debug app.js`.

# `sails console`

Quietly lift your sails app (i.e. with logging silenced), and enter the [node shell](http://nodejs.org/api/repl.html) in the context of the app's global scope.  This means you can access all of your model instances, their methods, and much more, all by using javascript commands.  

### Example

```sh
$ sails console

info: Starting app in interactive mode...

info: Welcome to the Sails console.
info: ( to exit, type <CTRL>+<C> )

sails> 
```

> Note that `sails console` still lifts the server, so routes will be accessible using a browser.



# `sails version`

Get the current globally installed Sails version.

### Example

```sh
$ sails version
0.10.0-rc5
```





# sails generate

Sails ships with several *generators* to help you scaffold new projects.  You can also [create your own generators](https://github.com/balderdashy/sails-docs/blob/master/Guide:%20Using%20Generators.md) to handle frequent tasks, or extend functionality (for example, by creating a generator that outputs view files for your [favorite templating language](https://github.com/balderdashy/sails-generate-views-jade)).

The following generator commands are bundled with Sails:

#### `sails new <appName>`
Create a new Sails project in a folder called **appName**.

##### Options:

  * `--no-linker` Turn off automatic asset linking in your view files
  * `--template=[template language]` Use a different template language than the default (e.g. `jade`).  Requires that a views generator for that language (e.g. `sails-generate-views-jade`) be installed in an accessible location (e.g. your home directory).

#### `sails generate api <foo>`
Generate **api/models/Foo.js** and **api/controllers/FooController.js**

#### `sails generate model <foo> [attribute1:type1, attribute2:type2 ... ]`
Generate **api/models/Foo.js**, optionally include attributes with the specified types.

#### `sails generate controller <foo> [action1, action2, ...]`
Generate **api/controllers/FooController.js**, optionally include actions with the specified names.

#### `sails generate adapter <foo>`
Generate a **api/adapters/foo** folder containing the files necessary for building a new adapter.

#### `sails generate generator <foo>`
Generate a **foo** folder containing the files necessary for building a new generator.

