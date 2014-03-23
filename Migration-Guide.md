# Migration Guide
### How to upgrade your v0.9.x Sails app to v0.10

Sails v0.10 comes with some big changes.

##### Pubsub

The biggest change to pubsub is that Socket.io events are emitted under the name of the model emitting them.  Previously, your client listened for the `message` event and then had to determine which model it came from based on the included data:

```
socket.on('message', function(data) {
   if (data.model == 'user') ...
}
```

Now, you subscribe to the identity of the model:

```
socket.on('user', function(data) {...}
```

This helps to structure your front end code.

The way you subscribe clients to models has also changed.  Previously, you specified whether you were subscribing to the model class (class room) or one or more model instances based on the parameters that you passed to `Model.subscribe`.  It was effectively one method to do two very different things.

Now, you use `Model.subscribe()` to subscribe only to model instances (records).  You can also specify event "contexts", or types, that you'd like to hear about.  For example, if you only wanted to get messages about updates to an instance, you would call `User.subscribe(req, myUser, 'update')`.  If no context is given in a call to `.subscribe()`, then all contexts specified by the model class's [autosubscribe property](./#!documentation/reference/ModelProperties) will be used.

To subscribe to model creation events, you can now use `Model.watch()`.  Upon subscription, your clients will receive messages every time a new record is created on that model using the blueprint routes, and will automatically be subscribed to the new instance as well.

Remember, when working with blueprints, clients are no longer auto subscribed to the class room.  This must be done manually.

Finally, if you want to see all pubsub messages from all models, you can access the `firehose`, a development-only tool that broadcasts messages about *everything* that happens to your models.  You can subscribe to the firehose using `sails.sockets.subscribeToFirehose(socket)`, or on the front end by making a socket request to `/firehose`.  The firehose will broadcast a `firehose` event whenever a model is created, updated, destroyed, added to, removed from or messaged.  This effectively replaces the `message` event used in previous Sails versions.

To see examples of the new pubsub methods in action, see [SailsChat](https://github.com/balderdashy/sailschat).



##### Associations

Sails v0.10 introduces associations between data models.  Since the work we've done on associations is largely additive, your existing models should still just work.  That said, this is a powerful new feature that allows you to write less code and makes your app more maintainable, so we suggest taking advantage of it!  To learn about how to use associations in Sails, [check out the docs](./#!documentation/reference/ModelAssociations).

Associations (or "relations") are really just special attributes.  Instead of `string` or `integer` values, you can specify an instance of a model or a collection of model instances.  You can think about this kind of like an object (`{...}`) or an array (`[{...}, {...}]`) you might store as JSON in a NoSQL database.  The difference is, in Sails, this works with any of the supported databases, and even allows you to `populate` (i.e. join) across different databases and types of databases.




##### Generators


Sails has had support for generating code for a while now (e.g. `sails generate controller foo`) but in v0.10, we wanted to make this feature more extensible, open, and accessible to everybody in the Sails community.  With that in mind, v0.10 comes with a complete rewrite of the command-line tool, and pluggable generators.  Want to be able to run `sails generate blog foo` to make a new blog built on Sails?  Create a `blog` generator (run `sails generate generator blog`), add your templates, and configure the generator to copy the new templates over.  Then you can release it to the community by publishing an npm module called `sails-generate-blog`.  Compatibility with Yeoman generators is also in our roadmap.


For a complete guide to what generators are and how they work, [check out the in-progress docs on the subject.](https://github.com/balderdashy/sails-docs/blob/master/Guide:%20Using%20Generators.md)

##### Controller configuration
The object literal describing controller configuration overrides for controller blueprints should change from
```javascript
...
_config: {
  blueprints: {
    rest: true,
    ...
  }
}
```
to
```javascript
...
_config: {
    rest: true,
    ...
}
```


##### Command-Line Tool

The big change here is how you create a new api.  In the past you called `sails generate new_api`.  This would generate a new controller and model called `new_api` in the appropriate places.  This is now done using `sails generate api new_api`

You can still generate models and controllers seperately using the same [CLI Commands](./#!documentation/reference/CommandLine/)

Also, --linker switch is no longer available. In previos version, if --linker switch was provided, it created a `linker` folder inside the `assets` folder, with `js`, `styles` and `templates`, and everything inside there got compiled/processed. In this new version, the `linker` folder is not created. Compiling CoffeeScript and Less is the default behavior now, right from the `/assets/js` and `/assets/scripts` folders.

##### Custom Server Responses

In v0.10, you can now generate your own custom server responses.  [See here to learn how](https://github.com/uncletammy/sails-generate-serverResponse).

Like before, there are a few that we automatically create for you.  Instead of generating `myApp/config/500.js` and other .js responses in the config directory, they are now generated in `myApp/api/responses/`.

To migrate, you will need to create a new v0.10 project and copy the `myApp/api/responses` directory into your existing app.  You will then modify the appropriate .js file to reflect any customization you made in your response logic files (500.js,etc).


##### Legacy data stored in the temporary `sails-disk` database

`sails-disk`, used by default in new Sails projects, now stores data a bit differently.  If you have some temporary data stored in a 0.9.x project, you'll want to wipe it out and start fresh.  To do this:

```
# From your project's root directory:
$ rm .tmp/disk.db
```


##### Adapter/Database Configuration

`config.adapters` (in `myApp/config/adapters.js`) is now `config.connections` (in new projects, this is generated in `myApp/config/connections.js`). Also, `config.model` is now `config.models`.

Your app's default `connection` (i.e. database) should now be configured as a string `config.models.connection` used by default for model.  New projects are generated with a `/config/models.js` file that includes the default connection.

To configure a model to use specific adapters, you must now specify them in the `connection` key instead of `adapters`.

####### For example
```javascript

module.exports = {

    connection: ['someMongoDatabase'],

	attributes: {
		name:{
			type     : 'string',
			required : true
		}
	}
};

```



##### Validations: Upgrade to validator 3.x

Validator 3.x removed support for the `regex` validation, and consequently it no longer works in Sails/Waterline models.  There is an [open feature request](https://github.com/balderdashy/anchor/issues/41) awaiting a PR to bring it back.


### Did we miss something?

If you notice something we've missed, please visit the `sails-docs` repo on GitHub and [edit the page](https://github.com/balderdashy/sails-docs/blob/master/Migration-Guide.md) to submit a pull request.

If you're having migration issues that we havn't mentioned here, please open an issue on the `sails-docs` repo.  If you've already figured out how to resolve the issue, give us a hand by submitting a PR to this file describing the problem and how you fixed it. Thanks!
