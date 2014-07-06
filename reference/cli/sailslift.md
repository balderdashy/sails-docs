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







<docmeta name="uniqueID" value="sailslift482554">
<docmeta name="displayName" value="sails lift">

