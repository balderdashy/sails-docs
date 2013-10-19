#Sails CLI

## What is the Sails CLI?
Sails comes with a convenient tool to quickly get your app scaffolded and running.

## Commands

### `sails lift`
Run the Sails app in the current dir (if node_modules/sails exists, it will be used instead of the global install)

#### Options:

  * `--dev` - in development environment
  * `--prod` - in production environment
  * `--port 9000` - on port 9000
  * `--verbose` - with verbose logging enabled
  
### `sails console`
Run this Sails app (in the current dir & in interactive mode.)

### `sails new <appName>`
Create a new Sails project in a folder called <appName>

### `sails new <appName> --linker`
Create a new Sails project in a folder called <appName>, using automatic asset linking

### `sails generate <foo>`
Generate api/models/Foo.js and api/controllers/FooController.js

### `sails generate model <foo>`
Generate api/models/Foo.js

### `sails generate controller <foo>`
Generate api/controllers/FooController.js

### `sails version`
Get the current globally installed Sails version
