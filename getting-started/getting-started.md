# Getting Started


This guide covers getting up and running with ![Sails][WhatIsSails].

After reading this guide, you will know:

* How to install Sails, create a new Sails application, and connect your application to a database.
* The general layout of a Sails application.
* The basic principles of MVC (Model, View, Controller) and RESTful design.
* How to quickly generate the starting pieces of a Sails application.


# Guide Assumptions

This guide is designed for beginners who want to get started with a Sails application from scratch. It does not assume that you have any prior experience with Sails. However, to get the most out of it, you need to have some prerequisites installed:

* ![Node.js][Node.js] - you can follow our ![guide][Node.js_guide] on what it is and how to install it

Sails is a web application framework running on the Javascript scripting language. If you have no prior experience with Javascript, you will find a very steep learning curve diving straight into Sails. There are a few places where you can learn Javascript:

* ![Eloquent Javascript][EloquentJavascript]
* ![Mozilla's Javascript page][MozillaJavascript]
* ![W3C's Javascript tutorial][W3C_Javascript]

# Creating a New Sails Project

The best way to use this guide is to follow each step as it happens, no code or step needed to make this example application has been left out, so you can literally follow along step by step.

By following along with this guide, you'll create a Sails project called `blog`, a (very) simple weblog. Before you can start building the application, you need to make sure that you have Sails itself installed.

*The examples below use $ to represent your terminal prompt in a UNIX-like OS, though it may have been customized to appear differently. If you are using Windows, your prompt will look something like `c:\source_code`>*


## Installing Sails
To install the latest stable release with the command-line tool:

	sudo npm -g install sails

On Windows, you don't need sudo:

	npm -g install sails

# Creating the Blog Application

Sails comes with a number of scripts called ![generators][SailsJs_Generators] that are designed to make your development life easier by creating everything that's necessary to start working on a particular task. One of these is the ![`new`][SailsJS_Generator_New] application generator, which will provide you with the foundation of a fresh Sails application so that you don't have to write it yourself.

To use this generator, open a terminal, navigate to a directory where you have rights to create files, and type:

	sails new blog

This will create a Sails application called Blog in a blog directory and install the npm dependencies that are already mentioned in `package.json` using `npm install`.

You can see all of the command line options that the Sails application builder accepts by running `sails new -h`.

After you create the blog application, switch to its folder:

	cd blog

The `blog` directory has a number of auto-generated files and folders that make up the structure of a Sails application. The anatomy thereof is described ![here][SailsJs_Anatomy].

# Hello, Sails!

To begin with, let's get some text up on screen quickly. To do this, you need to get your Sails application server running.

## Starting up the Web Server

You actually have a functional Sails application already. To see it, you need to start a web server on your development machine. You can do this by running the following in the blog directory:

	sails lift

At this point, if you visit (http://localhost:1337/) you will see the default home page.

*To stop the web server, hit Ctrl+C in the terminal window where it's running. To verify the server has stopped you should see your command prompt cursor again. For most UNIX-like systems including Mac OS X this will be a dollar sign $.*

## Say "Hello", Sails

To get Sails saying "Hello", you need to create at minimum a ![controller][Controller_Concept] and a ![view][View_Concept].

A controller's purpose is to receive specific requests for the application. Routing decides which controller receives which requests. Often, there is more than one route to each controller, and different routes can be served by different actions. Each action's purpose is to collect information to provide it to a view.

A view's purpose is to display this information in a human readable format. An important distinction to make is that it is the controller, not the view, where information is collected. The view should just display that information. By default, view templates are written in a language called ![EJS][EJS] which is processed by the request cycle in Sails before being sent to the user.

We will have to create a view. This is done manually as a generator for that and a standard folder structure inside of the *views* folders doesn't exist yet. We will be using the Sails way: views/<controller.lowercase>/<action>.<template fileending>

	mkdir views/welcome/
	touch views/welcome/index.ejs

Open the `app/views/welcome/index.ejs` file in your text editor. Delete all of the existing code in the file, and replace it with the following single line of code:

```html
<h1>Hello, Sails!</h1>
```

Next we have to create a new controller, to use the view. We will need to run the "controller" generator and tell it you want a controller called "welcome" with an action called "index", just like this:

	sails generate controller welcome index
		info: Created a new controller ("welcome") at api/controllers/WelcomeController.js!

The controller will look like so:
`api/controllers/WelcomeController.js`:
```javascript
/**
 * WelcomeController
 *
 * @description :: Server-side logic for managing welcomes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  /**
   * `WelcomeController.index()`
   */
  index: function (req, res) {
    return res.json({
      todo: 'index() is not implemented yet!'
    });
  }
};
```

As such it won't do much and simply return JSON with a todo. We want to change that. It should render a view and sendthat back to the client. To do so we will replace the `index` function body with a call to [res.view](http://sailsjs.org/#/documentation/reference/res/res.view.html).

```javascript
return res.view("welcome/index");
```

## Setting the Application Home Page

Now that we have made the controller and view, we need to tell Sails when we want "Hello, Sails!" to show up. In our case, we want it to show up when we navigate to the root URL of our site, http://localhost:1337.

Next, you have to tell Sails where your actual home page is located.

Open the file config/routes.js in your editor.
```javascript
module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  }
  //...
```

This is your application's routing file which holds entries in a javscript object where the key is the URL path and the value is another object.

Replace `'/': { view: 'homepage'}` with `'/': 'WelcomeController.index'`. That tells Sails to map requests to the root of the application to the welcome controller's index action.

Launch the web server again if you stopped it to generate the controller (rails server) and navigate to http://localhost:1337 in your browser. You'll see the "Hello, Sails!" message you put into app/views/welcome/index.ejs, indicating that this new route is indeed going to WelcomeController's index action and is rendering the view correctly.

*We could've also done without a controller and simply used `'/': { view: 'welcome/index' }`. Feel free to do so for testing. We will continue using our controllers in the coming chapters*

*For more information about routing, refer to ![Sails Routing][Sails_Routing]*

# Getting Up and Running

Sails uses ![REST][REST] for structuring its resources. That means we will be using *CRUD* (Create, Read, Update, Delete) methods when dealing with resources.

Luckily Sails uses ![Blueprints][Blueprints] that help us avoid writing a lot of boilerplate code to define CRUD actions on our resources. All we need is a model and controller for our resource.

In this section we will add the ability to create new articles in our application and be able to view them. This is the "C" and the "R" from CRUD: creation and reading.

## Laying down the ground work

Let's create our resource with a generator

	sails generate api Article
		info: Created a new api!

That will generate a controller @ `api/controllers/ArticleController.js` and a model @ `api/model/Article.js`.

Before we continue we will need to configure our application to use a local disk database provided by `sails-disk`. A simple modification of `config/models.js` will do. Uncomment `connection: 'localDiskDb',` and `migrate: 'alter'` to make the file look similar to this:

```javascript
module.exports.models = {

  /***************************************************************************
  *                                                                          *
  * Your app's default connection. i.e. the name of one of your app's        *
  * connections (see `config/connections.js`)                                *
  *                                                                          *
  ***************************************************************************/
  connection: 'localDiskDb',

  /***************************************************************************
  *                                                                          *
  * How and whether Sails will attempt to automatically rebuild the          *
  * tables/collections/etc. in your schema.                                  *
  *                                                                          *
  * See http://sailsjs.org/#/documentation/concepts/ORM/model-settings.html  *
  *                                                                          *
  ***************************************************************************/
  migrate: 'alter'

};
```



[nodejs.org]: http://nodejs.org "Node.js homepage"
[Node.js_guide]: ./WhatIsNodeJs.md "What is Node.js?"
[WhatIsSails]: ./WhatIsSails.md "What is Sails?"
[EloquentJavascript]: http://eloquentjavascript.net/ "Eloquent Javascript"
[MozillaJavascript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript "Mozilla's Javascript page"
[W3C_Javascript]: http://www.w3schools.com/js/default.asp "World Wide Web Consortium's Javascript tutorial"
[SailsJs_Anatomy]: http://sailsjs.org/#/documentation/anatomy/myApp "Anatomy of a SailJs app"
[SailsJs_Generators]: http://sailsjs.org/#/documentation/reference/cli/sailsgenerate.html "SailsJs generators"
[SailsJS_Generator_New]: http://sailsjs.org/#/documentation/reference/cli/sailsnew.html "'sails new' generator"
[EJS]: http://embeddedjs.com "Embedded Javascript"
[Controller_Concept]: http://sailsjs.org/#/documentation/concepts/Controllers/
[View_Concept]: http://sailsjs.org/#/documentation/concepts/Views
[Sails_Routing]: http://sailsjs.org/#/documentation/concepts/Routes
[REST]: https://en.wikipedia.org/wiki/Representational_state_transfer "Representation state transfer"
[Blueprints]: http://sailsjs.org/#/documentation/reference/blueprint-api

<docmeta name="uniqueID" value="GettingStarted99009">
<docmeta name="displayName" value="Getting Started">
