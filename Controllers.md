
# What is a Controller?
Sails controllers work very similar to controllers in other MVC frameworks. Think of controllers
being the middle man between your model and your views.... _TODO: add content_

# Where are Controllers defined?
Controllers are defined in the api/controllers/ folder. By default when you create a controller with
actions using the command line they produce a single file with the actions as methods.

```
sails generate controller comment create destory tag
```
generates:
```javascript
var CommentController = {
	create: function(req, res) {

	},

	destroy: function(req, res) {

	},

	tag: function(req, res) {

	}
}

exports = CommentController;
```

Alternively if you add a federated flag ```-f``` to the end of your controller then the controller will 
be created as a folder wit each action being its own file. This is useful if your actions contain
a bunch of logic. No more super long controller files! The best part about this is that, routing to
these actions works the exact same way!

```
sails generate controller comment create destory tag -f
```
will will create the directory, 
**api/controllers/comment/** with three files **api/controllers/comment/create.js**,
**api/controllers/comment/destory.js**, and
**api/controllers/comment/tag.js**.
 
# Express Crash-Course
http://expressjs.com/
_TODO_

