# sails.config.views

Configuration for your app's server-side [views](./#!documentation/reference/Views).  The options are conventionally specified in the [`config/views.js`](/#/documentation/anatomy/myApp/config/views.js.html) configuration file.


### Properties

| Property    | Type       | Default   | Details |
|-----------|:----------:|-----------|---------|
| `layout`  | ((string)) -or- ((boolean))     | `"layout"`  | Set the default [layout](./#!documentation/reference/Views/Layouts.html) for your app by specifying the relative path to the desired layout file from your views folder (i.e. `views/`.)  Or disable layout support altogether with `false`.
| `engine`  | ((string)) | `"ejs"` | The [view engine](./#!documentation/reference/Views/ViewEngines.html) your app will use to compile server-side markup into HTML.
| `locals` | ((object)) | `{}` | Default data to be included as [view locals](./#!documentation/reference/Views/Locals.html) every time a server-side view is compiled anywhere in this app. |

### Notes

> + If your app is NOT using `ejs` (the default view engine) Sails will function as if the `layout` option was set to `false`.  To take advantage of layouts when using a custom view engine like Jade or Handlebars, check out [that view engine's documentation](./#!documentation/reference/Views/ViewEngines.html) to find the appropriate syntax.



<docmeta name="uniqueID" value="sailsconfigviews588825">
<docmeta name="displayName" value="sails.config.views">

