# Sails Object
### Overview
Here is an overview of the sails object.  

# sails.log
### Purpose
These methods provide different levels of logging functionality in sails.

- sails.log() 
- sails.log.verbose() 
- sails.log.info()
- sails.log.warn()
- sails.log.error()

### Example Usage
```
// Logs using the log level currently set in config.
sails.log('There',{sure:'are'},['a','lot'],'of',[{log:'levels'}, 'huh'],'?',true);

// There { sure: 'are' } [ 'a', 'lot' ] of [ { log: 'levels' }, 'huh' ] ? true

```

### Notes
> These will accept an infinite number of arguments of any data type, seperated by commas.


# sails.config
### Purpose
The config object allows you to see your apps configuration settings. 

- sails.config.log.level
- sails.config.port
- sails.config.environment
- sails.config.host
- sails.config.adapters.default
- sails.config.controllers.blueprints.actions
- sails.config.controllers.blueprints.shortcuts
- sails.config.controllers.blueprints.rest
- sails.config.views.engine.ext
- sails.config.csrf

### Example Usage
```javascript
// Make sure csrf is enabled if we are in production mode.  Throw an error otherwise.

if (sails.config.environment && !sails.config.csrf)
    throw new Error('STOP IMMEDIATELY ! CSRF should always be enabled in production mode!');

```

### Notes
> These settings are only read upon lifting your app.  Changing them will do nothing.

# sails.models

### Purpose
If you disable globals, you can use sails.models.`<model name>` to access your models.  This is useful when you need to access models from inside '/config/bootstrap.js' which is run before your app lifts.

### Example Usage

```javascript
sails.models.pet.find().limit(1).exec(function(err,record){
	console.log('My Pet is called '+record[0].name);
});
```
### Notes

> Keep in mind that this method will convert your entire model name to lowercase.



# sails.io

### Purpose

Provides raw access to socket.io.

Here are some examples:

#### sails.io.sockets
`sails.io.sockets()`

This is the raw reference to socket.io .  Use it when you want low level access to socket.io .  If you are new to sockets, you should use the <a href=""> sails pubsub class methods </a> for socket.io .  

For more information, see the socket.io docs [right here](https://github.com/LearnBoost/socket.io/wiki/Rooms).

#### sails.io.sockets.clients(`<roomName>`)
Gives an array containing the sockets currently connected to the supplied room name (string).

#### Example Usage

UsersController.js
```javascript
module.exports{

  index: function(req,res){
  			if (req.isSocket){

          // Have the requesting socket join the room 'beyonce'
          req.socket.join('beyonce',function(){
            var firstID = sails.io.sockets.clients('beyonce')[0].id;

            // Send that client a message with their own socket ID.
            // Watch for it in the browser console
            req.socket.emit('message',{socketID:firstID});
          });

  			} else {

    	  			res.view();
	  		}
  }
}

```

views/Users/index.ejs
```html
<style>.addButton{display:inline-block;line-height:100px;width:400px;height:100px;border:1px solid black;cursor:pointer;}</style>

<script>

function makeNew(){
    console.log('Joining room \'beyonce\'');
    socket.get('/users/index/');
}

</script>

<center>
<div class="addButton" onClick="makeNew()">
Join 'Beyonce' ! </div>

```

#### sails.io.sockets.emit(`<eventName>`)

Emit a message to every client, regardless of what room they are in.  

#### Example Usage

UsersController.js
```javascript
module.exports{

  index: function(req,res){
        if (req.isSocket){

          // Have the requesting socket join the room 'beyonce'
          req.socket.join('beyonce',function(){

            // Lets emit a message to everyone
            // Subscribe in multiple tabs and see what happns.
            
            sails.io.sockets.emit('message',{HelloFrom:req.socket.id});
          });

        } else {

              res.view();
        }
  }
}

```

views/Users/index.ejs
```html
<style>.addButton{display:inline-block;line-height:100px;width:400px;height:100px;border:1px solid black;cursor:pointer;}</style>

<script>

function makeNew(){
    console.log('Joining room \'beyonce\'');
    socket.get('/users/index/');
}

</script>

<center>
<div class="addButton" onClick="makeNew()">
Join 'Beyonce' ! </div>

```


#### sails.io.sockets.in(`<roomname>`).emit('msg',{})

Send a message to everyone in the specified room.

#### Example Usage

`UsersController.js`

```javascript
module.exports{

  index: function(req,res){
        if (req.isSocket){

          // Have the requesting socket join the room 'beyonce'
          req.socket.join('beyonce',function(){

            // Now that someone is subscribed, let's emit a message to the room
            // Subscribe in multiple tabs and see what happns.
            
            sails.io.sockets.in('beyonce').emit('message',{HelloFrom:req.socket.id});
          });

        } else {

              res.view();
        }
  }
}

```

`views/Users/index.ejs`

```html
<style>.addButton{display:inline-block;line-height:100px;width:400px;height:100px;border:1px solid black;cursor:pointer;}</style>

<script>

function makeNew(){
    console.log('Joining room \'beyonce\'');
    socket.get('/users/index/');
}

</script>

<center>
<div class="addButton" onClick="makeNew()">
Join 'Beyonce' ! </div>

```

### Notes
> These are low level socket methods.  Sails has improved upon them.  See the <a href=""> pubsub class methods </a> !


