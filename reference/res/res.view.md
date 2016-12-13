# res.view()

Respond with an HTML page.


### Usage

```js
return res.view(pathToView, locals);
```

_Or:_
+ `return res.view(pathToView);`
+ `return res.view(locals);`
+ `return res.view();`


Uses the [configured view engine](http://sailsjs.org/documentation/concepts/Views/ViewEngines.html) to compile the [view template](http://sailsjs.org/documentation/concepts/Views/Partials.html) at `pathToView` into HTML.  If `pathToView` is not provided, serves the conventional view based on the current controller and action.

The specified [`locals`](http://sailsjs.org/documentation/reference/Views/Locals.html) are merged with your configured app-wide locals, as well as certain built-in locals from Sails and/or your view engine, then passed to the view engine as data.


### Arguments

|   | Argument       | Type        | Details |
|---|----------------|:-----------:|---------|
| 1 | `pathToView`   | ((string))  | The path to the desired view file relative to your app's [`views` folder](http://sailsjs.org/documentation/anatomy/myApp/views) (usually `views/`), without the file extension (e.g. `.ejs`), and with no trailing slash.<br/>Defaults to "identityOfController/nameOfAction".
| 2 | `locals`       | ((dictionary))  | Data to pass to the view template.  These explicitly specified locals will be merged in to Sails' [built-in locals](http://sailsjs.org/documentation/concepts/Views/Locals.html) and your [configured app-wide locals](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md).<br/>Defaults to `{}`.



### Example

Consider a conventionally configured Sails app with a call to `res.view()` in the `api/controllers/oven/cook.js` action.

With no `pathToView` argument, `res.view()` will decide the path by combining the identity of the controller (`oven`) and the name of the action (`cook`):

```js
return res.view();
// -> responds with `views/oven/cook.ejs`
```

Here's how you would load the same view using an explicit `pathToView`:

```js
return res.view('oven/cook');
// -> responds with `views/oven/cook.ejs`
```

Finally, here's a more involved example demonstrating how `res.view` can be combined with Waterline queries:

```js
// Find the 5 hottest oven brands on the market
Oven.find().sort('heat ASC').exec(function (err, ovens){
  if (err) return res.serverError(err);

  return res.view('oven/top5', {
    hottestOvens: ovens
  });
  // -> responds using the view at `views/oven/top5.ejs`,
  // and with the oven data we looked up as view locals.
  //
  // e.g. in the view, we might have something like:
  // ...
  // <% _.each(hottestOvens, function (aHotOven) { %>
  //  <li><%= aHotOven.name %></li>
  // <% }) %>
  // ...
});

```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
> + `res.view()` reads a view file from disk, compiles it into HTML, then streams it back to the client.  If you already have the view in memory, or don't want to stream the compiled HTML directly back to the client, use `sails.hooks.views.render()` instead.
> + `res.view()` always looks for the _lowercased_ version of a view filename.  For example, if your controller is `FooBarController` and your action is `Baz`, `res.view()` will attempt to find `views/foobar/baz.ejs`.  On _case-sensitive_ filesystems (e.g. Ubuntu Linux), this can lead to unexpected errors locating views if they are saved with capital letters.  For this reason, it is recommended that you always save your views and view folders in lowercase.










<docmeta name="displayName" value="res.view()">
<docmeta name="pageType" value="method">

