# Migration Guide
### What has changed

Sails v0.10 comes with some big changes.

##### Pub Sub

The biggest change to pub-sub is that Socket.io events are emmited under the name of the model emmiting them.  Before, your client listened for the `message` event then had to determine which model it came from based on the included data.

Now, instead of everything being emmited on `message`, you subscribe to the identity of the model. 

For example, the client will call `socket.on('user',functio...` to see the messages emmited by the server with `User.publishUpdate()`

Finally, the way you subscribe clients has changed.  Before, you specified whether you were subscribing the client to either the Model Class or model instances (class rooms) based on the parameters that you passed to `Model.subscribe`.  It was effectively one method to do two very different things.

Now, you can use `Model.subscribe()` to subscribe only to model instances (records).  You can also tell it the CRUD methods for which an event should be emitted.  For example, if you only wanted to get messages about `delete`s, you can do that!

To replace the second `.subscribe()`, `Model.watch()` has been created.  Use this to subscribe to the model class.  Upon subscription, your clients will receive messages every time a new record is created on that model using the blueprint routes.  Furthermore, those new models are `.subscribe()`'d to any event `context`s specified via the new [autosubscribe model property](./#!documentation/reference/ModelProperties).

Remember, when working with blueprints, clients are no longer auto subscribed to the class room.  This must be done manually.

Also, if you want to see all pub-sub messages from all models, you can access the `firehose` located on `sails global`.  Note, this only works in development mode. Here is Scott to tell you all about it!

##### Associations

Since associations are brand new to Sails, this may not belong in the "migration guide" but go [check out the docs](./#!documentation/reference/ModelAssociations).  We think it's kind of a big deal.

##### Generators


Sails has used `generators` for a while now but for v0.10, we restructured them to be more open and accessible.   

For a complete guide to what generators are and how they work,[Look here!](https://github.com/balderdashy/sails-docs/blob/master/Guide:%20Using%20Generators.md)

##### Command Line Tool

The big change here is how you create a new api.  In the past you called `sails generate new_api`.  This would generate a new controller and model called `new_api` in the appropriate places.  This is now done using `sails generate api new_api`

You can still generate models and controllers seperately using the same [CLI Commands](./#!documentation/reference/CommandLine/)

##### Custom Server Responses

In v0.10, you can now generate your own custom server responses.  [See here to learn how](https://github.com/uncletammy/sails-generate-serverResponse).

Like before, there are a few that we automatically create for you.  Instead of generating `myApp/config/500.js` and other .js responses in the config directory, they are now generated in `myApp/api/responses/`.

To migrate, you will need to create a new v0.10 project then copy the `myApp/api/responses` directory into your app.  You will then modify the appropriate .js file to reflect any customization you made in your response logic files (500.js,etc).


##### Adapter Configuration

`myApp/config/adapters.js` has been moved to `myApp/config/connections.js`

Also, when configuring models to use specific adapters you must now put them in the `connections` key instead of `adapters`.  

####### For example
```javascript

module.exports = {

	connections: ['mongo','disk'],

	attributes: {
		name:{
			type:'STRING',
			required:true
		}
	}
};

```



### Did we miss something?

Of course we did.  We are glad you're here to help though.  If you're having migration issues that we havn't mentioned here, please open an issue on the sails-docs repo.  If you've already figured out the issue, give us a hand by submitting a PR to this file describing the problem and how you fixed it.



[-] sails.config[500] (i.e. `config/500.js`) has been superceded in Sails v0.10.
[-] Please define a "response" instead. (i.e. api/responses/serverError.js)
[-] Your old handler is being ignored. (the format has been upgraded in v0.10)
[-] Please define a "response" instead. (i.e. api/responses/notFound.js)
[-] Your old handler is being ignored. (the format has been upgraded in v0.10)




> _**Note:** You are viewing the Sails.js v0.10.x documentation.  If you're looking for information on v0.8.x or v.0.9.x, you'll be asked to leave._




## You&rsquo;re done!
