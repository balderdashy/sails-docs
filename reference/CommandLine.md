# Command Line
### Overview

The Sails command line tool is used to create new projects, launch existing ones, add new models and controllers, and a few other things.  


# sails new
### Purpose

Creates a new Sails app in the current directory.

### Example Usage

```sh
catGuy@catGuy:~/nodeProjects$ sails new myApp --linker
debug: Building new Sails.js app in ./myApp...

info: New app created!
```

This will create your app using [Automatic Asset Linking](./#!documentation/guides/assets).


# sails generate
### Purpose

Generates a model and/or controller for the app in the current directory.


### Example Usage

######Generate new controller

```sh
catGuy@catGuy:~/nodeProjects/blogApp$ sails generate controller pet
info: Generated controller for pet !
```

This will create the file 'api/controllers/PetController.js'

######Generate new model

```sh
catGuy@catGuy:~/nodeProjects/blogApp$ sails generate model pet
warn: For the record :: to serve the blueprint API for this model,
warn: you'll also need to have an empty controller.
info: Generated model for pet!

```
This will create the file 'api/models/Pet.js'

######Generate both!

```sh
catGuy@catGuy:~/nodeProjects/blogApp$ sails generate pet
info: Generating model and controller for pet...
```

This will create the files 'api/controllers/PetController.js' and 'api/models/Pet.js'


# sails lift
### Purpose
The lift argument launches the sails app in the current directory.  You can also add the folowing flags behind lift for more control.

| `--flag` |  Description  |
|----------|---------------|
| `--verbose`| This displays extra information in console relevent to your app |
| `--silly`| This flag displays ALL of the information.  All of it. |
| `--port=<integer>`| Lifts your app on the specified port eliminating the need to change config. |
| `--dev`| Lifts your app in development mode eliminating the need to change config. |
| `--prod`| Lifts your app in production mode eliminating the need to change config |


### Example Usage

```sh
catGuy@catGuy:~/nodeProjects/blogApp$ sails lift --port=1338 --verbose --environment=production

verbose: Enabling CoffeeScript...
verbose: Using Express router...
verbose: Configuring express.static flat-file middleware...
verbose: Loading app Gruntfile...
verbose: Tracking new grunt child process...
verbose: Loading hook: request
verbose: Hook loaded successfully: request
verbose: Loading hook: orm
verbose: Loading the apps models and adapters...
verbose: Loading app models...
verbose: Loading app adapters...
verbose: Loading hook: views
verbose: Setting view engine to ejs...
verbose: Setting Model.adapter with ad-hoc clone ids =>  [ 'adhoc_adapter_0' ]
verbose: Starting ORM...
verbose: Registering model `users` in Waterline (ORM) with definition :: 
verbose: Applying policy to users.create... [ [Function: alwaysAllow], [Function: create] ]
verbose: Applying policy to users.destroy... [ [Function: alwaysAllow], [Function: destroy] ]
verbose: Applying policy to users.find... [ [Function: alwaysAllow], [Function: find] ]
verbose: Applying policy to users.update... [ [Function: alwaysAllow], [Function: update] ]
verbose: Applying policy ::  [ [Function: alwaysAllow] ]  to  403
verbose: Policy-controller bindings complete!
verbose: Binding route ::   /*
verbose: Loading app services...
verbose: Waiting for all hooks to declare that theyre ready...
verbose: Sails loaded successfully.
verbose: Starting app at /node/sails/myApp...
erbose: Running the setup logic in `sails.config.bootstrap(cb)`...
info: 
info: 
info:    Sails.js           <|
info:    v0.9.7              |\
info:                       /|.\
info:                      / || \
info:                    ,'  |'  \
info:                 .-'.-==|/_--'
info:                 `--'-------' 
info:    __---___--___---___--___---___--___
info:  ____---___--___---___--___---___--___-__
info: 
info: Server lifted in `node/sails/myApp`
info: To see your app, visit http://localhost:1338
info: To shut down Sails, press <CTRL> + C at any time.
debug: --------------------------------------------------------
debug: :: Wed Oct 30 2013 14:02:53 GMT-0500 (CDT)
debug: 
debug: Environment	: production
debug: Port		: 1338
debug: --------------------------------------------------------
verbose: Lifting guard-- all conditions satisfied.
verbose: Binding RESTful controller blueprints for  users
verbose: Binding route ::  get /users/:id?
verbose: Binding route ::  post /users
verbose: Binding route ::  put /users/:id?
verbose: Binding route ::  delete /users/:id?
verbose: Binding shortcut controller blueprints for  users
verbose: Binding route ::   /users/find/:id?
verbose: Binding route ::   /users/create
verbose: Binding route ::   /users/update/:id?
verbose: Binding route ::   /users/destroy/:id?
verbose: Grunt :: Running "clean:dev" (clean) task
verbose: Grunt :: Cleaning ".tmp/public"...
verbose: Grunt :: OK
verbose: Grunt :: 
verbose: Grunt :: Done, without errors.

```


# sails console
### Purpose

This command will quietly lift your sails app, web server and all.  At this point, it sends the <link>global sails object</link> to the node.js shell.  This means you can access all of your model instances, their methods, and much more, all by using javascript commands.

### Example Usage
```javascript
catGuy@catGuy:~/nodeProjects/blogApp$ sails console

debug: Welcome to the Sails console (v0.9.7)
debug: ( to exit, type <CTRL>+<C> )

sails> Blog.find( { } ).exec(function found(err,myRecord){console.log(myRecord)});

[ { blogName: 'First Blog',
    description: 'Hey, my first blog entry.',
    keywords: 'first new blog lol',
    createdAt: '2013-10-08T18:37:37.719Z',
    updatedAt: '2013-10-13T01:11:45.364Z',
    id: 1,
    seenBy: 'everyone' }]
```


### Notes
> This might come in handy when you want to quickly add a record to a model and can't be bothered installing PostMAN.  It's also a good tool for diagnosing problems in your app.  If you can't access something over console, neither can your app.  
> Once inside sails console, two consecutive CTRL+C will close the app and exit back to shell.
> For more information, see node REPL docs @ http://nodejs.org/api/repl.html


# sails version
### Purpose
Returns the version of Sails which will run the app in the current directory.

### Example Usage
```javascript
catGuy@catGuy:~/nodeProjects/myApp$ sails version
info: v0.9.7
```


### Notes
> If you have Sails installed locally (i.e. `npm install sails`), its version will be returned.
> Otherwise, the global version of Sails will be used.
