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

    sails new --template jade blog

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

At this point, if you visit ([http://localhost:1337](http://localhost:1337)) you will see the default home page.

*To stop the web server, hit Ctrl+C in the terminal window where it's running. To verify the server has stopped you should see your command prompt cursor again. For most UNIX-like systems including Mac OS X this will be a dollar sign $.*

## Say "Hello", Sails

To get Sails saying "Hello", you need to create at minimum a ![controller][Controller_Concept] and a ![view][View_Concept].

A controller's purpose is to receive specific requests for the application. Routing decides which controller receives which requests. Often, there is more than one route to each controller, and different routes can be served by different actions. Each action's purpose is to collect information to provide it to a view.

A view's purpose is to display this information in a human readable format. An important distinction to make is that it is the controller, not the view, where information is collected. The view should just display that information. By default, view templates are written in a templating language called ![Jade][Jade] which is processed by the request cycle in Sails before being sent to the user.

We will have to create a view. This is done manually as a generator for that and a standard folder structure inside of the *views* folders doesn't exist yet. We will be using the Sails way: views/<controller.lowercase>/<action>.<template fileending>

    mkdir views/welcome/
    touch views/welcome/index.jade

Open the `app/views/welcome/index.jade` file in your text editor. Delete all of the existing code in the file, and replace it with the following single line of code:

```jade
h1 Hello, Sails!
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

Launch the web server again if you stopped it to generate the controller and navigate to [http://localhost:1337][http://localhost:1337] in your browser. You'll see the "Hello, Sails!" message you put into app/views/welcome/index.jade, indicating that this new route is indeed going to WelcomeController's index action and is rendering the view correctly.

*We could've also done without a controller and simply used `'/': { view: 'welcome/index' }`. Feel free to do so.*

*For more information about routing, refer to ![Sails Routing][Sails_Routing]*

# Getting Up and Running

Sails uses ![REST][REST] for structuring its resources. That means we will be using *CRUD* (Create, Read, Update, Delete) methods when dealing with resources.

Luckily Sails uses ![Blueprints][Blueprints] that help us avoid writing a lot of boilerplate code to define CRUD actions on our resources. All we would normally need is a model and controller for our resource. For the purpose of this tutorial, we will implement these CRUD actions ourselves.

In this section we will add the ability to create new articles in our application and be able to view them. This is the "C" and the "R" from CRUD: creation and reading.

Before we continue we will need to configure our application will us handle changes to our models (which we haven't created yet). Sails will pester us everytime we lift the application.
A simple modification of `config/models.js` will do. Uncomment `migrate: 'alter'` to make the file look similar to this:

```javascript
module.exports.models = {

  /***************************************************************************
  *                                                                          *
  * Your app's default connection. i.e. the name of one of your app's        *
  * connections (see `config/connections.js`)                                *
  *                                                                          *
  ***************************************************************************/
  // connection: 'localDiskDb',

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

## Laying down the ground work

Firstly, you need a place within the application to create a new article. A great place for that would be at */article/new*. So we need to add a view and route for it.

Where would we put the view? That's right `views/article/new.jade`.

For now it will just contain

```jade
h1 New article
```

It should be accessible too so lets add a custom route to `config/routes.js`

```javascript
'/article/new': {
    view: 'article/new'
}
```

This route will not pass through any controller and just make the view visible at http://localhost:1337/article/new

## Creating articles

Our view isn't too useful at the moment, so let's make it do something - with a form. Replace its contents.

`article/new.jade`:
```jade
form(action="/article", method="POST")

    p
        label(for="text") Title
        br
        input(
            type="text"
            name="title"
            placeholder="Please add a title."
            )

    p
        label(for="text") Text
        br
        textarea(
            name="text"
            placeholder="Please add some text to the article."
            )

    button(type="submit") Submit
```

Try filling the form and seeing what it does. It should return a JSON object. But how is that possible? We didn't add any other routes or actions. Or did we? Actually ![Blueprints][Blueprints] did.

Blueprints automatically adds REST routes and actions (and some more stuff) to our controllers and models. In this case a simple POST request to */article* with any key-value parameters, will create a new Article. This is great, but we will be overriding that later on to understand what happens underthe hood.

For now let's make */article* output the parameters it received.

We need a controller first.

    sails generate controller Article
        info: Created a new controller ("Article") at api/controllers/ArticleController.js!

And a route. A slight problem arises here, since we cannot create a route that targets `ArticleController` without an action. We will have to come up with an action name that let's us create new `Article`s... `create` comes to mind, so let's use that.

`config/routes.js`:
```javascript
// ...
// Custom routes here...
// ...

'POST /article': 'ArticleController.create',

// ...
```

`api/controllers/ArticleController.js`:
```javascript
// ...
module.exports = {

    create: function (req, res) {
        return res.json(req.allParams());
    }
};
```

Try navigating http://localhost:1337/article/new and testing it again to see the output. As expected it should return the POST parameters we passed to it in [`req.allParams()`](http://sailsjs.org/#/documentation/reference/req/req.allParams.html)

## Preparing our database

Remember out modification above to make Sails stop pestering us at every lift by changing the way we migrate models? Well, now that will actually come in handy as we will start using a local-disk database in our development environment.

Sails provides an easy to use file database called `sails-disk` that's pretty useful to get an app up and running first, and testing its models.

We will need to install the file database first:

    npm install --save sails-disk

And then use it. Let's uncomment `connection: 'localDiskDb'` in `config/models.js`. Which will make the application use a pre-configured connection of that name. The file should now look like.

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

## Creating the Article model

![Models][Model_Concept] in Sails use a singular name. Sails provides a generator for creating models, which most Sails developers tend to use when creating new models. To create the new model, run this command in your terminal:

    sails generate model Article title:string text:text
      info: Created a new model ("Article") at api/models/Article.js!

With that command we told Sails that we want a Article model, together with a title attribute of type string, and a text attribute of type text. Those attributes are automatically added to the articles table in the database and mapped to the Article model.

Sails responded by creating `api/models/Article.js`.

We will be able to use our model later on to save the data into the database.

**Blueprints already allow us to do this, but we are learning how it's done*

## Saving data in the controller

Back in `ArticleController`, we need to change the create action to use the new Article model to save the data in the database. Open `api/controllers/ArticleController.js` and change the create action to look like this:

```javascript
/**
 * ArticleController
 *
 * @description :: Server-side logic for managing Articles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    create: function (req, res) {
        Article.create(req.allParams(), function (error,created) {
            if (error) {
                return res.serverError(err.toString())
            }else{
                return res.redirect('/article/' + created.id)
            }
        })
    }
};
```

Now we can lift our application again, go to *http://localhost:1337/article/new* and create a new article. We should be greeted once again with a JSON representation of our created article!

So what's going on here?

Models can be used throughout our application and have their own [built-in methods](http://sailsjs.org/#/documentation/reference/waterline/models) of which [create](http://sailsjs.org/#/documentation/reference/waterline/models/create.html) is one, and the one we need too. It has the following signature

    .create( values, [callback] )

Of course things don't always go right so we have to handle errors. We do so in simply returning a `serverError` with the `error.toString()`

In the case of success however, we would like to be redirected to the page showing our splendid, new article. For now Blueprints takes care of that again, but in JSON format. We want an HTML representation, so let's get on with that, shall we?

## Showing Articles

Since we want to *show* articles, we need a view to do so. Create the view `view/articles/show.jade`:

```jade
extends ../layout

block body
  p
    strong Title:
    = article.title
  p
    strong Text:
    = article.text
```

Lines starting with *=* in Jade mean we want to display a variable at that spot. We will be getting that variable from the controller, which will be rendering the view.

We need a method in `ArticleController` to do so. To stay uniform we will name it `show`.

```javascript
show: function (req, res) {
    id = req.param('id')
    Article.findOne({ "id": id}, function(error, article){
        // Model.find doesn't consider attempting to find a non-existent object
        // a problem and simply returns no error and undefined
        if (error || article == undefined) {
            res.notFound('Article with id: ' + id)
        } else{
            res.view('article/show', {
                "article": article
            })
        }
    })
}
```

As seen above we pass `article`, which corresponds to our *Article* model, to the view.

This is all nice, but how will a user see our work? Blueprints create a route */:modelIdentity/:id* for seeing articles. We will override that for GET requests as we don't mind the Blueprint for POST requests, which will return a JSON representation of the model with the given *id*.

Our `config/routes.js` gets a new key-value pair

    'GET /article/:id': 'ArticleController.show'

We can now checkout http://localhost:1337/article/new and create an article, which will be returned to us in HTML afterwards.

*The `:id` part of the route is a named parameter (a common convention) as described in [Custom Routes](http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html). It is accessible with `req.param("id").*

[nodejs.org]: http://nodejs.org "Node.js homepage"
[Node.js_guide]: ./WhatIsNodeJs.md "What is Node.js?"
[WhatIsSails]: ./WhatIsSails.md "What is Sails?"
[EloquentJavascript]: http://eloquentjavascript.net/ "Eloquent Javascript"
[MozillaJavascript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript "Mozilla's Javascript page"
[W3C_Javascript]: http://www.w3schools.com/js/default.asp "World Wide Web Consortium's Javascript tutorial"
[SailsJs_Anatomy]: http://sailsjs.org/#/documentation/anatomy/myApp "Anatomy of a SailJs app"
[SailsJs_Generators]: http://sailsjs.org/#/documentation/reference/cli/sailsgenerate.html "SailsJs generators"
[SailsJS_Generator_New]: http://sailsjs.org/#/documentation/reference/cli/sailsnew.html "'sails new' generator"
[Jade]: http://jade-lang.com "jade - Node template engine"
[Controller_Concept]: http://sailsjs.org/#/documentation/concepts/Controllers/
[Model_Concept]: http://sailsjs.org/#/documentation/concepts/ORM/Models.html
[View_Concept]: http://sailsjs.org/#/documentation/concepts/Views
[Sails_Routing]: http://sailsjs.org/#/documentation/concepts/Routes
[REST]: https://en.wikipedia.org/wiki/Representational_state_transfer "Representation state transfer"
[Blueprints]: http://sailsjs.org/#/documentation/reference/blueprint-api
[SailsDisk]: https://www.npmjs.org/package/sails-disk "Persistent local-disk adapter for Sails.js / Waterline"

<docmeta name="uniqueID" value="GettingStarted99009">
<docmeta name="displayName" value="Getting Started">
