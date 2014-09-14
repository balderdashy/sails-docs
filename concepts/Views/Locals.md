# Locals

The variables accessible in a particular view are called `locals`.  Locals represent server-side data that is _accessible_ to your view-- locals are not actually _included_ in the compiled HTML unless you explicitly reference them using special syntax provided by your view engine.

```ejs
<div>Logged in as <a><%= name %></a>.</div>
```

##### Using locals in your views

The notation for accessing locals varies between view engines.  In EJS, you use special template markup (e.g. `<%= someValue %>`) to include locals in your views.

There are three kinds of template tags in EJS:
+ `<%= someValue %>`
  + HTML-escapes the `someValue` local, and then includes it as a string.
+ `<%- someRawHTML %>`
  + Includes the `someRawHTML` local verbatim, without escaping it.
  + Be careful!  This tag can make you vulnerable to XSS attacks if you don't know what you're doing.
+ `<% if (!loggedIn) { %>  <a>Logout</a>  <% } %>`
  + Runs the javascript inside the `<% ... %>` when the view is compiled.
  + Useful for conditionals (`if`/`else`), and looping over data (`for`/`each`).


Here's an example of a view (`views/backOffice/profile.ejs`) using two locals, `user` and `corndogs`:

```html
<div>
  <h1><%= user.name %>'s first view</h1>
  <h2>My corndog collection:</h2>
  <ul>
    <% _.each(corndogs, function (corndog) { %>
    <li><%= corndog.name %></li>
    <% }) %>
  </ul>
</div>
```

> You might have noticed another local, `_`.  By default, Sails passes down a few locals to your views automatically, including lodash (`_`).

If the data you wanted to pass down to this view was completely static, you don't necessarily need a controller- you could just hard-code the view and its locals in your `config/routes.js` file, i.e:

```javascript
  // ...
  'get /profile': {
    view: 'backOffice/profile',
    locals: {
      user: {
        name: 'Frank',
        emailAddress: 'frank@enfurter.com'
      },
      corndogs: [
        { name: 'beef corndog' },
        { name: 'chicken corndog' },
        { name: 'soy corndog' }
      ]
    }
  },
  // ...
```

On the other hand, in the more likely scenario that this data is dynamic, we'd need to use a controller action to load it from our models, then pass it to the view using the [res.view()](http://beta.sailsjs.org/#/documentation/reference/res/res.view.html) method.

Assuming we hooked up our route to one of our controller's actions (and our models were set up), we might send down our view like this:

```javascript
// in api/controllers/UserController.js...

  profile: function (req, res) {
    // ...
    return res.view('backOffice/profile', {
      user: theUser,
      corndogs: theUser.corndogCollection
    });
  },
  // ...
```

<docmeta name="uniqueID" value="Locals453748">
<docmeta name="displayName" value="Locals">

