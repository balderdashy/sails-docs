#Controllers
> _**Note:** You are viewing the Sails.js v0.9.x documentation.  If you're looking for information on v0.8.x, please visit [here](http://08x.sailsjs.org)._

## What is a Controller?
Sails controllers work very similarly to controllers in other MVC frameworks. Think of controllers
as being the middleman between your model and your views.

## Where are Controllers Defined?
Controllers are defined in the `/api/controllers/` folder. By default when you create a
controller using the command line, you can add additional arguments that represent the controller
actions.

```
sails generate controller comment create destroy tag like
```
generates:
```javascript

// Comment controller with generated actions.
var CommentController = {
	create: function(req, res) {

	},

	destroy: function(req, res) {

	},

	tag: function(req, res) {

	},

	like: function(req, res) {

	}
}

module.exports = CommentController;
```

<!--
Alternively if you add a federated flag [[[2]]] to the end of your generate controller command the
controller will be created as a folder with each action being its own file. This is useful if
your actions contain a bunch of logic. No more super long controller files! The best part about this
is that, routing to these actions works the exact same way!

[[[3]]]
will create the directory, **api/controllers/comment/** with three files 
**/api/controllers/comment/create.js**,
**/api/controllers/comment/destory.js**, and
**/api/controllers/comment/tag.js**.

-->

## How do I use the controller once I&rsquo;ve created it?
After a controller has been defined, Sails will automatically map out routes to give you easy access.  
For the controller above, the routes would be the following:  
`http://localhost:1337/comment/create`  
`http://localhost:1337/comment/destroy`  
`http://localhost:1337/comment/tag`  
`http://localhost:1337/comment/like`  

Additionally, thanks to blueprints, you also get these methods by default:  
`get /:controller/:id?`  
`post /:controller`  
`put /:controller/:id`  
`delete /:controller/:id`  

`/:controller/find/:id?`  
`/:controller/create`  
`/:controller/update/:id`  
`/:controller/destroy/:id`  

To turn off the CRUD routes, simply set the &lsquo;shortcuts&rsquo; flag to false in `config/controllers.js`,  
and to turn off REST routes, simply set the &lsquo;rest&rsquo; flag to false in `config/conttrollers.js`

## The Request Object

### `req.param()`
Whether it was sent as POSTed JSON, to look up the value of a request parameter, do:

```javascript
var foo = req.param('foo');
```

If you need to dive deeper into request parameters, check out the <a href="http://expressjs.com/2x/guide.html#req.param()">express guide</a>.


### `req.isSocket`
Whether or not this request was sent over Socket.io

### `req.isAjax`
Whether or not this is an AJAX/xhr request

### `req.isJson`
Whether or not this request is JSONish (has a JSON &ldquo;Accept&rdquo; or &ldquo;Content-Type&rdquo; header)


## The Response Object
When responding to a request, Sails uses many of the same res methods as Express.

### `res.view([view, options[, fn]])`
This method is an enhanced version of  Express&rsquo;s `res.render()`. The method `res.view()`
automatically renders the appropriate view based on the controller and action. The original function
is still accessible via `res.render()`.

### `res.send(body|status[, headers|status[, status]])`
From the <a href="http://expressjs.com/2x/guide.html#res.send()">express guide</a>.
The `res.send()` method is a high level response utility allowing you to pass objects to respond
with json, strings for html, Buffer instances, or numbers representing the status code. The
following are all valid uses:

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
`res.send()` or previously with `res.header()` or `res.contentType()` it will not be set
again.

Note that this method ends the response, so you will want to use node’s `res.write()` for multiple
writes or streaming.

### `res.json(obj[, headers|status[, status]])`
From the <a href="http://expressjs.com/2x/guide.html#res.json()">express guide</a>.
Send a JSON response with optional headers and status. This method is ideal for JSON-only APIs,
however `res.send(obj)` will send JSON as well, though not ideal for cases when you want to send
for example a string as JSON, since the default for `res.send(string)` is text/html.

```javascript
	res.json(null);
	res.json({ user: 'tj' });
	res.json('oh noes!', 500);
	res.json('I dont have that', 404);
```

### `res.redirect(url[, status])`
From the <a href="http://expressjs.com/2x/guide.html#res.redirect()">express guide</a>.
Redirect to the given url with a default response status of 302.

```javascript
	res.redirect('/', 301);
	res.redirect('/account');
	res.redirect('http://google.com');
	res.redirect('home');
	res.redirect('back');
```

### `res.viewExists`
Whether or not the view for this controller exists.





## Accessing your models

In many cases, the reason you have a controller at all is that you want to do custom stuff with your models.  Otherwise, you could just use the defaults!

For example, your controller might look like:
```javascript
// Keep in mind you'd probably want to do this transactionally, in case the chicken is being pecked 
var ChickenController = {

  // Peck the chicken specified by id (subtract 50 HP)
  peck: function (req,res) {
    Chicken.find(req.param('id')).exec(function (err, chicken) {
      if (err) return res.send(err,500);
      if (!chicken) return res.send("No other chicken with that id exists!", 404);
      if (chicken.hp <= 0) return res.send("The other chicken is already dead!", 403);

      // Subtract 50 HP from the chicken
      chicken.hp -= 50;

      // Persist the change
      chicken.save(function (err) {
        if (err) return res.send(err,500);

        // Report back with the new state of the chicken
        res.json(chicken);
      });
    });

  }
};
module.exports = ChickenController;
```

Check out the page on [Models](https://github.com/balderdashy/sails/wiki/Models) to learn more.
