# Partials

Sails uses `ejs-locals` in its view rendering code, so in your views you can do:

```
<%- partial ('foo.ejs') %> 
```

to render a partial located at `/views/foo.ejs`. All of your locals will be sent to the partial automatically.

the paths are relative to the view, that is loading the partial. So if you have a a user view at `/views/users/view.ejs` and want to load `/views/partials/widget.ejs` then you would use:

```
<%- partial ('../../partials/widget.ejs') %> 
```

One thing to note: partials are rendered synchronously, so they will block Sails from serving more requests until they're done loading. It's something to keep in mind while developing your app, especially if you anticipate a large number of connections.

NOTE: When using other templating languages than ejs, their syntax for loading partials or block, etc. will be used. Please refer to their documentation for more information on their syntax and conventions

<docmeta name="uniqueID" value="Partials610916">
<docmeta name="displayName" value="Partials">

