# Parasails pages

If you are interested on a quick intro on starting your first Parasails page: [take a look at this tutorial](/documentation/tutorials/getting-started-with-parasails).

Your Parasails pages are javascript files that live in your `assets/js/pages` folder (if you want to know about the assets/js folder: [take a look in the docs](/documentation/anatomy/assets/js)). And they should follow the naming convention: `<page-name>.page.js`. 


## Anatomy of a *page-name.page.js* file
*TODO unless Rachel / Mike / any core team member says otherwise:*
Quickly explain the `parasails.registerPage(pageName, Vue_instance_options)` line, and [reference it to the Parasails docs](https://github.com/mikermcneil/parasails/blob/f521672e5ae5b1c8fbd75edb012caa35841c3fc0/dist/parasails.js#L720). Also introduce both of it's inputs:
- `pageName` : string. Parasails will load this javascript file and start the Vue Instance on the div with an id equal to this value.
- `Vue-instance-object` : object. It's the `options` object passed upon when [starting the Vue instance](https://vuejs.org/v2/guide/instance.html#Creating-a-Vue-Instance). Inside of it you can initiate `data`, `computed`, `methods` objects just like you would do with a Vue instance.


## When and how does the file gets loaded into the client
*TODO unless Rachel / Mike / any core team member says otherwise:*
Reference the [sails-linker documentation](/documentation/concepts/assets/default-tasks#?sailslinker) and explain that the `***.page.js` files (should) get injected at the end of the HTML file, and after the dependencies (the `parasails.js` and `Vue.js` files mainly)


<docmeta name="displayName" value="Pages">