# Migration Guide
### How to upgrade your v0.9.x Sails app to v0.10

Sails v0.10 comes with some big changes.

##### Pubsub

The biggest change to pub-sub is that Socket.io events are emitted under the name of the model emitting them.  Before, your client listened for the `message` event and then had to determine which model it came from based on the included data.

Now, instead of everything being emitted on `message`, you subscribe to the identity of the model. 

For example, the client will call `socket.on('user',functio...` to see the messages emmited by the server with `User.publishUpdate()`

Finally, the way you subscribe clients has changed.  Before, you specified whether you were subscribing the client to  the Model Class (class rooms) or model instances based on the parameters that you passed to `Model.subscribe`.  It was effectively one method to do two very different things.

Now, you can use `Model.subscribe()` to subscribe only to model instances (records).  You can also tell it the CRUD methods for which an event should be emitted.  For example, if you only wanted to get messages about `delete`s, you can do `User.subscribe(req, myUser, 'destroy')`!

To replace the second `.subscribe()`, `Model.watch()` has been created.  Use this to subscribe to the model class.  Upon subscription, your clients will receive messages every time a new record is created on that model using the blueprint routes.  Furthermore, those new models are `.subscribe()`'d to any event `context`s specified via the new [autosubscribe model property](./#!documentation/reference/ModelProperties).

Remember, when working with blueprints, clients are no longer auto subscribed to the class room.  This must be done manually.

Also, if you want to see all pub-sub messages from all models, you can access the `firehose`, a development-only tool that broadcasts messages about *everything* that happens to your models.  You can subscribe to the firehose using `sails.sockets.subscribeToFirehose(socket)`, or on the front end by making a socket request to `/firehose`.  The firehose will broadcast a `firehose` event whenever a model is created, updated, destroyed, added to, removed from or messaged.



##### Associations

Sails v0.10 introduces associations between data models.  Since the work we've done on associations is largely additive, your existing models should still just work.  That said, this is a pretty powerful feature that allows you to write less code and makes your app more maintainable, so I suggest taking advantage of it.  To learn about how to use associations in Sails, [check out the docs](./#!documentation/reference/ModelAssociations).

Associations (or "relations") are really just special attributes.  Instead of `string` or `integer` values, you can specify an instance of a model or a collection of model instances.  You can think about this kind of like an object (`{...}`) or an array (`[{...}, {...}]`) you might store as JSON in a NoSQL database.  The difference is, in Sails, this works with any of the supported databases, and even allows you to `populate` (i.e. join) across different databases and types of databases.




##### Generators


Sails has had support for generating code for a while now (e.g. `sails generate controller foo`) but in v0.10, we wanted to make this feature more extensible, open, and accessible to everybody in the Sails community.  Not that it was ever intended to be shrouded in mystery or whatever, but the core team hadn't had the time to refactor things and elucidate the details of how it all works.

v0.10 comes with a complete rewrite of the command-line tool, and pluggable generators.  Want to be able to run `sails generate blog foo` to make a new blog built on Sails?  Create a `blog` generator (run `sails generate generator blog`), add your templates, and configure the generator to copy the new templates over.  Then you can release it to the community by publishing an npm module called `sails-generate-blog`.  Compatibility with Yeoman generators is also in our roadmap.


For a complete guide to what generators are and how they work, [check out the in-progress docs on the subject.](https://github.com/balderdashy/sails-docs/blob/master/Guide:%20Using%20Generators.md)




##### Command-Line Tool

The big change here is how you create a new api.  In the past you called `sails generate new_api`.  This would generate a new controller and model called `new_api` in the appropriate places.  This is now done using `sails generate api new_api`

You can still generate models and controllers seperately using the same [CLI Commands](./#!documentation/reference/CommandLine/)

##### Custom Server Responses

In v0.10, you can now generate your own custom server responses.  [See here to learn how](https://github.com/uncletammy/sails-generate-serverResponse).

Like before, there are a few that we automatically create for you.  Instead of generating `myApp/config/500.js` and other .js responses in the config directory, they are now generated in `myApp/api/responses/`.

To migrate, you will need to create a new v0.10 project then copy the `myApp/api/responses` directory into your app.  You will then modify the appropriate .js file to reflect any customization you made in your response logic files (500.js,etc).


##### Legacy data stored in the temporary `sails-disk` database

`sails-disk`, used by default in new Sails projects, now stores data a bit differently.  If you have some temporary data stored in a 0.9.x project, you'll want to wipe it out and start fresh.  To do this:

```
# From your project's root directory:
$ rm .tmp/disk.db
```


##### Adapter/Database Configuration

`config.adapters` (in `myApp/config/adapters.js`) is now `config.connections` (in new projects, this is generated in `myApp/config/connections.js`).

Your app's default `connection` (i.e. database) should now be configured as a string `config.models.connection`. used by default for model
....

Also, in your models,  configuring models to use specific adapters you must now put them in the `connection` key instead of `adapters`.

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

