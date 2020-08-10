# What is Parasails
According to the [official Parasails repo](https://github.com/mikermcneil/parasails):

> (Parasails is a ) lightweight structures for apps with more than one page. Built on top of Vue.js.
> Out of the box, parasails supports:
> - pages
> - components
> - utilities
> - constants

And while that *is* true, it does so much more, that I will provide another definition:

> Parasails is a front-end framework that aims to give you an easy, structured, working-out-of-the-box and opinionated way to give your templating reactivity, encapsulation, and dynamicity, while still looking like HTML.
> It works mainly springing Vue.js + jQuery *on top* of your server-side templates, complimenting them on a way that feels natural and clear. Without using complex webpack configuration


The aim of these docs is to explain how Parasails interacts with Vue / jQuery and your application. If you don’t know [Vue.js](https://vuejs.org/v2/guide/) or [jQuery](https://vuejs.org/v2/guide/) basics: you should really take a look at their amazing docs. 


This documentation is a work in progress and it aims to cover Parasails...:
- Pages
- Components
- “Cloud” object (for easy API calls to your [actions](https://sailsjs.com/documentation/concepts/actions-and-controllers#?actions-2))
- Vue Router


## Prerequisites

In order for Parasails to be correctly working: you need to have the following scripts imported in your HTML. If you are using a general Sails app that imports your "assets/dependencies" files: make sure the next files in that folder. If you are importing manually the scripts to your HTML files: make sure they get imported *after* your templating (so that the browser first renders the HTML), but *before* the rest of your scripts. It is specially important to load the next files before your "xxxx.page.js" files.

Keep in mind that you should have these files if you started your new sails app with the "Web" variant. If you didn't, or you deleted some because you didn't know what they did, I will try including links on where you can download the latest versions:
- [parasails.js](https://github.com/mikermcneil/parasails/blob/master/dist/parasails.js)
- [cloud.js](https://github.com/mikermcneil/parasails/blob/master/dist/cloud.js)
- jquery.min.js, [and this is the version recommended for Parasails](https://github.com/mikermcneil/ration/blob/master/assets/dependencies/jquery.min.js)
- lodash.js, but make sure it's the [version maintained by the core Sails team](https://github.com/sailshq/lodash/blob/master/lib/index.js)
- vue.js, but make sure it's the [version maintained by the core Sails team](https://github.com/mikermcneil/ration/blob/master/assets/dependencies/vue.js)
- [vue.router.js](https://github.com/mikermcneil/ration/blob/master/assets/dependencies/vue-router.js)

<docmeta name="displayName" value="Parasails">