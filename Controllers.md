
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

Alternively if you add a federated flag ```-f``` to the end of your generate controller command the
controller will be created as a folder wit each action being its own file. This is useful if
your actions contain a bunch of logic. No more super long controller files! The best part about this
is that, routing to these actions works the exact same way!

```
sails generate controller comment create destory tag -f
```
will create the directory, **api/controllers/comment/** with three files 
**api/controllers/comment/create.js**,
**api/controllers/comment/destory.js**, and
**api/controllers/comment/tag.js**.
 
# Express Crash-Course
Sails uses many of the same res methods as express does.

## res.view()
This method is an enhanced version of  Express's res.render() which automatically renders the 
appropriate view based on the entity and action. The original function is still accessible via
res.render().

```javascript
	res.view();
```

__from the <a href="http://expressjs.com/2x/guide.html">express guide</a>.__
## res.send()
The res.send() method is a high level response utility allowing you to pass objects to respond with
json, strings for html, Buffer instances, or numbers representing the status code. The following are
all valid uses:

```javascript
	res.send(); // 204
	res.send(new Buffer('wahoo'));
	res.send({ some: 'json' });
	res.send('<p>some html</p>');
	res.send('Sorry, cant find that', 404);
	res.send('text', { 'Content-Type': 'text/plain' }, 201);
	res.send(404);
```

By default the Content-Type response header is set, however if explicitly assigned through
res.send() or previously with res.header() or res.contentType() it will not be set again.

Note that this method end()s the response, so you will want to use node’s res.write() for multiple
writes or streaming.

## res.json()
Send a JSON response with optional headers and status. This method is ideal for JSON-only APIs,
however res.send(obj) will send JSON as well, though not ideal for cases when you want to send for
example a string as JSON, since the default for res.send(string) is text/html.

```javascript
	res.json(null);
	res.json({ user: 'tj' });
	res.json('oh noes!', 500);
	res.json('I dont have that', 404);
```

## res.redirect()
Redirect to the given url with a default response status of 302.

```javascript
	res.redirect('/', 301);
	res.redirect('/account');
	res.redirect('http://google.com');
	res.redirect('home');
	res.redirect('back');
```

Express supports “redirect mapping”, which by default provides home, and back. The back map checks
the Referrer and Referer headers, while home utilizes the “basepath” setting and defaults to “/”.

