# sails lift

Run the Sails app in the current dir (if `node_modules/sails` exists, it will be used instead of the globally installed Sails)

##### Options:

  * `--dev` - in development environment (the default). In the development environment Sails use *grunt-watch* to keep a eye on your files in `/assets`. If you change something (for example in one of our css-files) and reload your browser Sails will automatically show your changes. Also you views won't be cached so you can change your view-files without restarting Sails like the assets.
  * `--staging` - in staging environment (uses config/env/staging.js for configuration)
  * `--prod` - in production environment (uses config/env/production.js for configuration)
  * `--port <portNum>` - on the port specified by `portNum` instead of the default (1337)
  * `--verbose` - with verbose logging enabled
  * `--silly` - with insane logging enabled

NOTE: Any of these commands can start with `NODE_ENV=staging` or `NODE_ENV=production`.
  - `NODE_ENV=production sails lift --staging` will lift your application in staging configuration mode while still leveraging production benefits.
  - `NODE_ENV=staging node app.js` or `NODE_ENV=staging sails lift` will lift the app in staging mode while using `config/env/staging.js` for configuration.


### Example

```sh
$ sails lift

info: Starting app...

info:
info:
info:    Sails              <|
info:    v0.10.3             |\
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








<docmeta name="displayName" value="sails lift">
<docmeta name="pageType" value="command">
