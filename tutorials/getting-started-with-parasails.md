
# A Parasails page

## What is a Parasails page

If are already familiarized with Vue it's pretty straight-forward: 

> A Parasails page is a [Vue instance](https://vuejs.org/v2/guide/instance.html#Creating-a-Vue-Instance). Mounted on top of the HTML file sent by your Sails server.


## Generating a new page

After learning that a Parasails page is just a Vue instance, you may have some questions:
- When does it get mounted?
- What data, methods, computed properties... get passed to it?

Luckily, generating and setting up a new Parasails couldn't be easier. Thanks to [sails generators](https://sailsjs.com/documentation/reference/command-line-interface/sails-generate#?core-generators), in particular, to the "sails generate page" generator.

Let's have a look at what the details say about it:

> (sails generate page) Generate four pages: .ejs, .less, page script, and view action. 
> You must add your .less file to the importer and you must set your route for your new page to work. 
> Note: sails generate page is intended for use with projects generated with the "Web app" template. You can still use this command if you're not using the web app template, but you'll need to delete the assets/js/pages/page-name.page.js file that's been generated, as it relies on dependencies that don't come bundled with an "Empty" Sails app.

For more information on which *"dependencies that don't come bundled..."*: refer to the previous section "prerequisites".

So, in order to generate a new Parasails page, say, an "example-page" in the route "entrance/example" we would have to:

1. To generate the four files described above: run the following command:
`sails generate page entrance/example-page`
2. To link the route "/example" to the files we just generated: paste on the routes.js file the following:
`'GET /example': { action: 'view-example-page' },`
3. Restart your dev server
4. Go to "localhost:1337/entrance/example" (supposing you are using the default port 1337)

(I put "entrance/" at the beginning to avoid the default [Sails policy](https://sailsjs.com/documentation/concepts/policies) that comes with the Web App installation) You should be seeing something on the lines of:

> ### TODO: Implement this page.
> (See also *assets/styles/pages/entrance/example-page.less*, *assets/js/pages/entrance/example-page.page.js*, and *api/controllers/entrance/view-example-page.js*.)

Voilà! You have an up-and-running alread-set-up Parasails page. Done. Sails takes care of all the internal naming so that you don't have to deal with it.

But, now you might be asking yourself what this (fully static) page you are seeing right now has to do with Vue, interactivity, and Parasails. Great question! 


## Making the Page dynamic: the *xxx.ejs* and *xxx.page.js* files

To understand how these files that you just created with the command `sails generate page`, we have to take a look first at the HTML that is being served from your server. This HTML response is made from your *layout.ejs*` file (in case you are using layouts, and you should), and it's body: the *example-page.ejs* file (in the case of the route "entrance/example") that you created before:

```html
<div id="example-page" v-cloak>
  <h1>TODO: Implement this page.</h1>
  <p>(See also <em>assets/styles/pages/entrance/example-page.less</em>, <em>assets/js/pages/entrance/example-page.page.js</em>, and <em>api/controllers/entrance/view-example-page.js</em>.)</p>
</div>
<%- /* Expose server-rendered data as window.SAILS_LOCALS :: */ exposeLocalsToBrowser() %>
```

In particular: notice the `id="example-page"` of the parent div. Remember it.

Now, let's take a look at the another file that created: *assets/js/pages/entrance/example-page.page.js*`:

```javascript
parasails.registerPage('example-page', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
  }
});
```

This file, upon importing into your HTML code (which Sails should automatically do for being on your assets folder), calls for the `parasails.registerPage()` function. Which mounts the Vue instance taking 2 inputs:

1. The id of the div where to mount the Vue instance (you guessed it! The same `"example-page"` id that is on our *example-page.ejs* template file)
2. An object with the [data, methods](https://vuejs.org/v2/guide/instance.html#Data-and-Methods), [different lifecycle hooks](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks), and the rest of the Vue instance configuration.


And, now that we have a mounted and running Vue instance on our hands, we can make it dynamic. 


### Quick and simple example: implementing a counter + button

Let's quickly add to our *example page* a counter and a button that adds to the counter upon click.

First we add the [dynamic data](https://vuejs.org/v2/guide/instance.html#Data-and-Methods) (the counter) to the data that the Vue instance will make reactive. 

We will set this in the *example-page.page.js* file we opened before. We will call it `counter` and set its initial value to 0:


```javascript
parasails.registerPage('example-page', {

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    counter: 0
  },

  // the rest of the file.... 
```

Now let's add it to the *example-page.ejs* file so that we can see the actual value of the counter. And we will also comment the auto-generated text from Sails to not drag it around:

```html
<div id="example-page" v-cloak>
  <!-- <h1>TODO: Implement this page.</h1>
  <p>(See also <em>assets/styles/pages/entrance/example-page.less</em>, <em>assets/js/pages/entrance/example-page.page.js</em>, and <em>api/controllers/entrance/view-example-page.js</em>.)</p> -->

  <p>The counter: {{counter}}</p>
</div>
<%- /* Expose server-rendered data as window.SAILS_LOCALS :: */ exposeLocalsToBrowser() %>
```

For those that are not that experienced with Vuue: this uses [Vue's template syntax](https://vuejs.org/v2/guide/syntax.html) to render in real time the value of `counter`. When reloading the page: you should see 0, its initial state.


And let's finish this quick example by adding a quick button to increment the counter. For this we will use the [Vue click event-listeners](https://vuejs.org/v2/guide/events.html#Listening-to-Events): 

```html
<div id="example-page" v-cloak>
  <!-- <h1>TODO: Implement this page.</h1>
  <p>(See also <em>assets/styles/pages/entrance/example-page.less</em>, <em>assets/js/pages/entrance/example-page.page.js</em>, and <em>api/controllers/entrance/view-example-page.js</em>.)</p> -->

  <p>The counter: {{counter}}</p>
  <button v-on:click="counter = counter + 1">
    Click to add one to the counter!
  </button>
</div>
<%- /* Expose server-rendered data as window.SAILS_LOCALS :: */ exposeLocalsToBrowser() %>
```

And, just like that, we have a dynamic page.


## Receiving *data* from the server and linking it to the Page

It's really common to send some data along with rendering the HTML when a request for a page comes. This data reaches the client's through the View's [Locals](https://sailsjs.com/documentation/concepts/views/locals).

These Locals are exposed to the the window (in `window.SAILS_LOCALS`) thanks to the last line in your *xxx.ejs* file:

```html
<!-- ...all the content of your template file... -->

<%- /* Expose server-rendered data as window.SAILS_LOCALS :: */ exposeLocalsToBrowser() %>
```

Back to the client, after the HTML has been rendering, Parasails fires the Vue instance. And inside the Vue instance, before it actually starts, the `window.SAILS_LOCALS` gets merged into the Vue Instance data. This is optional and can be prevented by deleting the following line of the *xxx.page.js* file:


```javascript
  // ...

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS); // <<<<< This line right here 
  },

  // ....
});
```

<docmeta name="displayName" value="Getting started with Parasails">