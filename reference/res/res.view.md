# res.view()

Respond with an HTML page.

```js
return res.view(pathToView, locals);
```

_Or:_
+ `return res.view(pathToView);`
+ `return res.view(locals);`
+ `return res.view();`


### Usage

Uses the [configured view engine]() to compile the [view template]() at `pathToView` into HTML.  If `pathToView` is not provided, serves the conventional view based on the current controller and action.

The specified [`locals`](./#documentation/reference/Views/Locals.html) are merged with your configured app-wide locals, as well as certain built-in locals from Sails and/or your view engine, then passed to the view engine as data.


|   | Argument       | Type        | Details |
|---|----------------|:-----------:|---------|
| 1 | `pathToView`   | ((string))  | The path to the desired view file relative to your app's [`views` folder]() (usually [`views/`]()), without the file extension (e.g. `.ejs`), and with no trailing slash.<br/>Defaults to "identityOfController/nameOfAction".
| 2 | `locals`       | ((object))  | Data to pass to the view template.  These explicitly specified locals will be merged in to Sails' [built-in locals]() and your [configured app-wide locals]().<br/>Defaults to `{}`.



### Example

Consider a conventionally configured Sails app with a call to `res.view()` in the `cook()` action of its `OvenController.js`.

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


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
> + `res.view()` reads a view file from disk, compiles it into HTML, then streams it back to the client.  If you already have the view in memory, or don't want to stream the compiled HTML directly back to the client, use [`sails.hooks.views.render()`]() instead.









<docmeta name="uniqueID" value="resview916814">
<docmeta name="displayName" value="res.view()">

