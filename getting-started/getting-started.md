# Getting Started


This guide covers getting up and running with [Sails](./WhatIsSails.md "What is Sails?").

After reading this guide, you will know:

* How to install Sails, create a new Sails application, and connect your application to a database.
* The general layout of a Sails application.
* The basic principles of MVC (Model, View, Controller) and RESTful design.
* How to quickly generate the starting pieces of a Sails application.


# Guide Assumptions

This guide is designed for beginners who want to get started with a Sails application from scratch. It does not assume that you have any prior experience with Sails. However, to get the most out of it, you need to have some prerequisites installed:

* [Node.js](http://nodejs.org "Node.js homepage") - you can follow our [guide](./WhatIsNodeJs.md "What is Node.js?") on what it is and how to install it

Sails is a web application framework running on the Javascript scripting language. If you have no prior experience with Javascript, you will find a very steep learning curve diving straight into Sails. There are a few places where you can learn Javascript:

* [Eloquent Javascript](http://eloquentjavascript.net/ "Eloquent Javascript")
* [Mozilla's Javascript page](https://developer.mozilla.org/en-US/docs/Web/JavaScript "Mozilla's Javascript page")
* [W3C's Javascript tutorial](http://www.w3schools.com/js/default.asp "World Wide Web Consortium's Javascript tutorial")

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

Sails comes with a number of scripts called [generators](http://sailsjs.org/#/documentation/reference/cli/sailsgenerate.html "SailsJs generators") that are designed to make your development life easier by creating everything that's necessary to start working on a particular task. One of these is the [`new`](http://sailsjs.org/#/documentation/reference/cli/sailsnew.html "'sails new' generator") application generator, which will provide you with the foundation of a fresh Sails application so that you don't have to write it yourself.

To use this generator, open a terminal, navigate to a directory where you have rights to create files, and type:

    sails new --template jade blog

This will create a Sails application called Blog in a blog directory and install the npm dependencies that are already mentioned in `package.json` using `npm install`.

You can see all of the command line options that the Sails application builder accepts by running `sails new -h`.

After you create the blog application, switch to its folder:

    cd blog

The `blog` directory has a number of auto-generated files and folders that make up the structure of a Sails application. The anatomy thereof is described [here](http://sailsjs.org/#/documentation/anatomy/myApp "Anatomy of a SailJs app").

# Hello, Sails!

To begin with, let's get some text up on screen quickly. To do this, you need to get your Sails application server running.

## Starting up the Web Server

You actually have a functional Sails application already. To see it, you need to start a web server on your development machine. You can do this by running the following in the blog directory:

    sails lift

At this point, if you visit ([http://localhost:1337](http://localhost:1337)) you will see the default home page.

*To stop the web server, hit Ctrl+C in the terminal window where it's running. To verify the server has stopped you should see your command prompt cursor again. For most UNIX-like systems including Mac OS X this will be a dollar sign $.*

## Say "Hello", Sails

To get Sails saying "Hello", you need to create at minimum a [controller](http://sailsjs.org/#/documentation/concepts/Controllers/) and a [view](http://sailsjs.org/#/documentation/concepts/Views).

A controller's purpose is to receive specific requests for the application. Routing decides which controller receives which requests. Often, there is more than one route to each controller, and different routes can be served by different actions. Each action's purpose is to collect information to provide it to a view.

A view's purpose is to display this information in a human readable format. An important distinction to make is that it is the controller, not the view, where information is collected. The view should just display that information. By default, view templates are written in a templating language called [Jade](http://jade-lang.com "jade - Node template engine") which is processed by the request cycle in Sails before being sent to the user.

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

*For more information about routing, refer to [Sails Routing](http://sailsjs.org/#/documentation/concepts/Routes)*

# Getting Up and Running

Sails uses [REST](https://en.wikipedia.org/wiki/Representational_state_transfer "Representation state transfer") for structuring its resources. That means we will be using *CRUD* (Create, Read, Update, Delete) methods when dealing with resources.

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
extends ../layout

block body

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

Sails provides an easy to use file database called [`sails-disk`](https://www.npmjs.org/package/sails-disk "Persistent local-disk adapter for Sails.js / Waterline") that's pretty useful to get an app up and running first, and testing its models.

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

[Models](http://sailsjs.org/#/documentation/concepts/ORM/Models.html) in Sails use a singular name. Sails provides a generator for creating models, which most Sails developers tend to use when creating new models. To create the new model, run this command in your terminal:

    sails generate model Article title:string text:text
      info: Created a new model ("Article") at api/models/Article.js!

With that command we told Sails that we want a Article model, together with a title attribute of type string, and a text attribute of type text. Those attributes are automatically added to the articles table in the database and mapped to the Article model.

Sails responded by creating `api/models/Article.js`.

We will be able to use our model later on to save the data into the database.

**![Blueprints][Blueprints] already allow us to do this, but we are learning how it's done*

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

## Listing all articles

We still need a way to *index* all our articles, so let's do that.

We'll start with the view again, that should contain a table of articles.

`views/article/index.jada`:
```jade
extends ../layout

block body
  table
    tr
      th Title
      th Text

    each article in articles
      tr
        td= article.title
        td= article.text
```

Next comes the action *index* in the controller again that should pass an array of articles to the view.

Add the function to `api/controllers/ArticleController.js`
```javascript
index: function (req, res) {
    Article.find({}, function (error, articles) {
        if (error) {
            res.serverError(error.toString())
            return
        }
        res.view( 'article/index', {
            'articles': articles
        })
    })
}
```

Without any criteria [<Mode>.find](http://sailsjs.org/#/documentation/reference/waterline/models/find.html) finds all articles and returns them in an array.

And then finally we add the route to `config/routes.js`

    'GET /articles': 'ArticleController.index',

Now we can take a look at the result by simply visiting http://localhost:1337/articles

*This last step is not exactly necessary if we have Blueprints activated and configured to generate [action routes(actions property in configuration)](http://sailsjs.org/#/documentation/reference/sails.config/sails.config.blueprints.html). http://localhost:1337/article will be automatically bound to `ArticleController.index`*

## Adding links

You can now create, show, and list articles. Now let's add some links to navigate through pages. You may go freestyle on this one. All we're going to do is add links to navigate the site.

`views/welcome/index.jade`:
```jade
extends ../layout

block body
    h1 Hello, Sails!

    a(href="/articles") My Blog
```

`views/article/index.jade`:
```jade
extends ../layout

block body

    a(href="/article/new") New article

    table
        tr
            th Title
            th Text

        each article in articles
            tr
                td= article.title
                td= article.text

```

`views/article/new.jade`:
```jade
extends ../layout

block body

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

    a(href="/articles") Back
```

`views/article/show.jade`:
```jade
extends ../layout

block body
    p
        strong Title:
        = article.title
    p
        strong Text:
        = article.text

    a(href="/articles") Back
```

Yay, you'll be able to navigate a little now, without typing directly in the address bar.

## Adding some validation

So far we can index and create articles. It doesn't look great, but functionality counts right now. Talking about that... we have non-validated input for our articles! Any schmuck can create articles that don't have a title, text or both!

The horror. We have to teach 'em some rules. Luckily that won't be too hard as the possibility to validate input on the server is just a matter of modifying our model - [validation rules](http://sailsjs.org/#/documentation/concepts/ORM/Validations.html).

Let's start with the article's title. Obviously that's `required`. We want them to have a minimal length (`minLength`) as well, can't let people just have empty or 1 character titles. But we don't want title-gore either, so a maximum length would be nice - oh look, `maxLength`.

We could be more lenient with our article's text. Hey, if they want to write about nothing... so be it.

This is how our model @ `api/models/Article.js` would look like with all that applied.

```javascript
module.exports = {

  attributes: {

    title : {
        type: 'string',
        required: true,
        minLength: 5,
        maxLength: 100
    },

    text : { type: 'text' }
  }
}
```

Now when we enter rubbish (or simply nothing at all) into the form http://localhost:1337/article/new  the server will return an error. That ain't nice for the user. To make it more friendly, let's tell them what exactly they did to anger us.

Once the `Article` creation returns an error to our callback, we should pass that on to the view and allow the user to try and appease us.

Our `ArticleController.create` function should look as follows in `api/controllers/ArticleController.js`

```javascript
create: function (req, res) {
    Article.create(req.allParams(), function (error,created) {
        // Error object doc: https://github.com/balderdashy/waterline/blob/master/lib/waterline/error/WLError.js
        if (error) {
            res.view( 'article/new', {
                'error': error
            })
        }else{
            res.redirect('/article/' + created.id)
        }
    })
},
```

Our 'article/new' view doesn't display errors yet. All we need to add is this conditional in the body block in `view/article/new.jade`:

```jade
- if( typeof error !== 'undefined' )
  pre= error.reason + '\n' + error.details
```

## Updating Articles

We've covered the "CR" part of CRUD. Now let's focus on the "U" part, updating articles.

We'll stick to our routine of writing views, controllers and then routes. We should however define what exactly we expect to do. We want to update an article. In order to do so, we'll need an HTML view to make our modifications. Let's call this *edit*, because we'll be editing the article. Once our modifications look alright to us, we want to send it to the server and attempt to *update* the article.

Ok, the view is basically a copy of `views/article/new.jade` which is prefilled with a given article and will send updates to *'article/update/:id'*. So copy it and make the modifications.

*Copying the file seems redundant and another solution may be preferred, but we're learning right now and will be using **partials** later on. Do not fret.*

`views/article/edit.jade`:
```jade
extends ../layout

block body

    h1 Editing article

    - if( typeof error !== 'undefined' )
        pre= error.reason + '\n' + error.details

    form(action="/article/update/" + article.id, method="POST")

        p
            label(for="text") Title
            br
            input(
                type="text"
                name="title"
                placeholder="Please add a title."
                value=article.title
                )

        p
            label(for="text") Text
            br
            textarea(
                name="text"
                placeholder="Please add some text to the article."
                value=article.text
                )

        button(type="submit") Submit

    a(href="/articles") Back
```

Up next the controller with the *edit* and *update* actions.

*edit* will do a lot of stuff that *show* does. For now we can simply copy *show*, change the name to *edit* and update the view it shows when the article is found in the database.


```javascript
edit: function (req, res) {
    id = req.param('id')
    Article.findOne({ "id": id}, function(error, article){
        // Model.find doesn't consider attempting to find a non-existent object
        // a problem and simply returns no error and undefined
        if (error || article == undefined) {
            res.notFound('Article with id: ' + id)
        } else{
            res.view('article/edit', {
                "article": article
            })
        }
    })
}
```

The *update* action will resemble *create*. If an update fails, the user has to see which errors they made on the edit page.

```javascript
update: function (req, res) {
    id = req.param('id')
    params = req.allParams()
    Article.update(
        id, // Article to update
        params , // Update attributes
        function (error,articles) {
            // Error object doc: https://github.com/balderdashy/waterline/blob/master/lib/waterline/error/WLError.js
            if (error) {
                res.view( 'article/edit/', {
                    'error': error,
                    'article': params
                })
            }else{
                article = articles[0]
                res.redirect('/article/' + article.id)
            }
        }
    )
}
```

*We can't redirect in case of errors, so the URL might look weird, but at least the user will be able to see what they did wrong.*

Finally, we want to show a link to the edit action in the list of all the articles, so let's add that now to `views/article/index.jade` to make it appear next to a "Show" link

```jade
extends ../layout

block body

    a(href="/article/new") New article

    table
        tr
            th Title
            th Text
            th(colspan="2")

        each article in articles
            tr
                td= article.title
                td= article.text
                td
                    a(href="/article/"+article.id) Show
                td
                    a(href="/article/edit/"+article.id) Edit

```

And we'll also add one to the `views/article/show.jade` template as well, so that there's also an "Edit" link on an article's page. Add this at the bottom of the template in the body block:

```jade
a(href="/articles") Back |

a(href="/article/edit/"+article.id)  Edit
```

## Using mixins to clean up duplication in views

Our edit page looks very similar to the new page; in fact, they both share the same code for displaying the form. Let's remove this duplication by using a [Jade mixin](http://jade-lang.com/reference/mixins/).

Create a new file `views/article/mixins/articleForm.jade`:

```jade
mixin articleForm(article, actionUrl, error)

    form(action=actionUrl, method="POST")
        - if( typeof error !== 'undefined' )
            pre= error.reason + '\n' + error.details

        p
            label(for="text") Title
            br
            input(
                type="text"
                name="title"
                placeholder="Please add a title."
                value=article.title
                )

        p
            label(for="text") Text
            br
            textarea(
                name="text"
                placeholder="Please add some text to the article."
                value=article.text
                )

        button(type="submit") Submit

```

We just moved the form from `views/article/new.jade` and `views/article/edit.jade` into the mixin file. Using it is a simple as including the file in the view we want and using it like a tag by prefixing it with a `+`.

The views will now look like so:

`views/article/new.jade`:
```jade
extends ../layout
include mixins/articleForm.jade

block body

    +articleForm(
        {},
        "/article",
        error)

    a(href="/articles") Back

```

We pass it an empty article for new, because ... well, the article doesn't exist yet.

`views/article/edit.jade`:
```jade
extends ../layout
include mixins/articleForm.jade

block body

    h1 Editing article.title

    +articleForm(
        article,
        "/article/update/" + article.id,
        error)

    a(href="/articles") Back
```

Much simpler.

## Destroying articles
We're now ready to cover the "D" part of CRUD, destroying articles from the database.

Since we are limitted to using links and no client-side javascript in this tutorial (sticking to the basics and no magic custom code), we will use the route:

`config/routes.js`:
```javascript
'/article/destroy/:id': 'ArticleController.destroy'
```

It isn't the most secure way to delete things as people can craft malicious URLs like

```html
<a href='http://example.com/article/1/destroy'>6 reasons clickbait articles produce revenue - reason 4 will disgust you!</a>
```

But we can change that that in more advanced tutorials.

Now that we have a route we can use it in our views. Right our article index view will do just fine. All we need to do is add a column with the destroy URL:

`views/article/index.jade`:
```jade
extends ../layout

block body

  a(href="/article/new") New article

  table
    tr
      th Title
      th Text
      th(colspan="3")

    each article in articles
      tr
        td= article.title
        td= article.text
        td
          a(href="/article/"+article.id) Show
        td
          a(href="/article/edit/"+article.id) Edit
        td
          a(href="/article/destroy/"+article.id) Destroy

```

The controller action `ArticleController.destroy` is very similar to what we implemented in the other actions. We just need the *id* of the article we want to delete and then the model will delete the article with that id.

Once that is done we can look at our destruction by viewing the index of all articles and noticing the missing article.

`api/controllers/ArticleController.js`:
```javascript
destroy: function (req, res) {
    id = req.param('id')
    params = req.allParams()
    Article.destroy(
        id, // Article to destroy
        function (error,articles) {
            res.redirect('/articles/')
        }
    )
}
```

You may now go forth and destroy!


# Adding a second model

It's time to add a second model to the application. The second model will handle comments on articles.

## Generating an associated model

The association between articles and comments will have a [one-to-many relationship](http://sailsjs.org/#/documentation/concepts/ORM/Associations/OnetoMany.html) - as in "One article has many comments" and "Many comments belong to one article".

We're going to see the same generator that we used before when creating the Article model. This time we'll create a Comment model to hold reference of article comments.
Run this command in your terminal:

    >sails generate model Comment commenter:string body:text
        info: Created a new model ("Comment") at api/models/Comment.js!

The file generated has to be edited however as the generator doesn't handle associations yet. This is how it looks like after being generated.

```javascript
/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    commenter : { type: 'string' },

    body : { type: 'text' }

  }
};
```

To represent a one-to-many relationship we will need to make the comment model aware of that by adding

```javascript
commentedArticle : { model: 'article' }
```
to `api/models/Comment.js`. *commentedArticle* is the name of the attribute to reference the *article*.

Next we will have to make an `Article` aware that it will have a collection of comments by adding

```javascript
comments: {
        collection: 'comment',
        via: 'commentedArticle'
    }
```
to `api/models/Article.js`. *comment* is the name of the model in the collection and *commentedArticle* is the attribute that model uses to reference this one (`Article`).

## Controllers for comments

We want to give the server the ability to create and view comments. To do so we will first need a new controller.

    sails generate controller Comment create
      info: Created a new controller ("Comment") at api/controllers/CommentController.js!

Not much differs from the way articles are created. The single difference is that once we are done, we go to the article's page, since it has a collection of comments we want to view.

Here's how `api/controllers/CommentController.js` looks like:
```javascript
/**
 * CommentController
 *
 * @description :: Server-side logic for managing Comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function (req, res) {
    inputComment = req.allParams()
    Comment.create(inputComment, function (error, created) {
        res.redirect('/article/' + inputComment.commentedArticle)
    })
  }
};
```

*You can play around creating comments in `sails console` as described in the sails documentation for [one-to-many associations](http://sailsjs.org/#/documentation/concepts/ORM/Associations/OnetoMany.html)*

If you played around a little, you will notice that collections of associations have to be populated, if they are to be used. Therefore this minor change will have to be applied to `api/controllers/ArticleController.js`:

```diff
     show: function (req, res) {
         id = req.param('id')
-        Article.findOne({ "id": id}, function(error, article){
+        Article.findOne({ "id": id}).populateAll().exec(function(error, article){
```

Now the associated records will be retrieved.

## A view for comments

Comments will only be visible when we show articles, so there will a single file to edit `views/article/show.jade`.

A good start would be to simply display comments. That's pretty straight forward in jade:

```jade
h2 Comments

each comment in article.comments
  p
    strong Commenter:
    = comment.commenter
  p
    strong Comment:
    = comment.body
```

If you have played around with associated models in `sails console`, now you should be able to see them for the associated articles. Otherwise, let's gath input data from a user. This is just like with an article - we use a form:
```jade
h2 Add a comment:

form(action="/comment", method="POST")
  input(
    type="hidden"
    name="commentedArticle"
    value=article.id
    )
  p
    label(for="commenter") Commenter
    br
    input(
      type="text"
      name="commenter"
      placeholder="What is your name?"
      )
  p
    label(for="body") Body
    br
    textarea(
      name="body"
      placeholder="Enter a comment on this article"
      )
  p
    button(type="submit") Submit
```

Notice the hidden input field. We need that for the comment to know which article it belongs to once it is sent to the server.

The action URL will need a route to allow creation of comments. It is as straight-forward as with articles:

```javascript
'POST /comment': 'CommentController.create',
```

# Refactoring

Now that we have articles and comments working, take a look at the `views/articles/show.jade` template. It is getting long and awkward. We can use mixins to clean it up.

There isn't awfully much to do. Move the markup for displaying a collection of comments to `views/article/mixins/commentCollection.jade`

```jade
mixin commentCollection(comments)

  each comment in comments
    p
      strong Commenter:
      = comment.commenter
    p
      strong Comment:
      = comment.body
```
and use it in `views/article/show.jade`

```diff
 extends ../layout
+include mixins/commentCollection.jade

 block body
        p
```
```diff
        h2 Comments
-
-       each comment in article.comments
-               p
-                       strong Commenter:
-                       = comment.commenter
-               p
-                       strong Comment:
-                       = comment.body
-
+       +commentCollection(article.comments)
```

same goes for the comment form `views/article/mixins/commentForm.jade`

```jade
mixin commentForm(article, actionUrl)

  form(action=actionUrl, method="POST")
    input(
      type="hidden"
      name="commentedArticle"
      value=article.id
      )
    p
      label(for="commenter") Commenter
      br
      input(
        type="text"
        name="commenter"
        placeholder="What is your name?"
        )
    p
      label(for="body") Body
      br
      textarea(
        name="body"
        placeholder="Enter a comment on this article"
        )
    p
      button(type="submit") Submit
```
which also changes `views/article/show.jade`
```diff
 extends ../layout
+include mixins/commentForm.jade
 include mixins/commentCollection.jade

 block body
```
```diff
        +commentCollection(article.comments)

        h2 Add a comment:
-
-       form(action="/comment", method="POST")
-               input(
-                       type="hidden"
-                       name="commentedArticle"
-                       value=article.id
-                       )
-               p
-                       label(for="commenter") Commenter
-                       br
-                       input(
-                               type="text"
-                               name="commenter"
-                               placeholder="What is your name?"
-                               )
-               p
-                       label(for="body") Body
-                       br
-                       textarea(
-                               name="body"
-                               placeholder="Enter a comment on this article"
-                               )
-               p
-                       button(type="submit") Submit
+       +commentForm(article,"/comment")
```

And thus our refactoring is done!

# Destroying comments

Of course not all comments are worth keeping. In fact some are downright worthy of destruction. Let's get down to it.

# Direct comment destruction

This is just like when destroying articles. We add a route to destruction in `config/routes.js`

    '/comment/destroy/:id': 'CommentController.destroy',

Then comes the link for each comment in the mixin `views/article/mixins/commentCollection.jade`

```jade
p
  a(href="/comment/destroy/"+comment.id) Delete comment
```

And finally the controller. Basically a copied, refactored ArticleController.destroy that redirects to the commented article.

```javascript
destroy: function (req, res) {
  id = req.param('id')
  params = req.allParams()
  Comment.destroy(
    id, // Article to destroy
    function (error,comments) {
      if (comments.length > 0) {
        articleId = comments[0].commentedArticle
        res.redirect('/article/'+articleId)
      }
    }
  )
}
```

The destruction of specific comments is possible.

## Indirect,cascaded comment destruction

But what will happen when articles are destroyed? Well at the moment the comments stay untouched and fill up our database. Of course that's undesirable and we have to commence a cascade of destruction.

There isn't an option to do so directly in Waterline (yet). We have to do so ourselves and one simple way to do this is hook into the *afterDestroy* event of a model ^[stackoverflow](https://stackoverflow.com/a/23486612) - in this case our Article model.

```javascript
afterDestroy: function (destroyedArticles, callback) {
  ids = destroyedArticles.map(function (article) {
    return article.id
  })
  Comment.destroy({ commentedArticle: ids}, function (error, destroyedComments) {
    console.log(error,destroyedComments)
    callback()
  })
}
```
The log line is simply for having a trace of the destroyed comments, since we can't see them on the client side.

[Blueprints]: http://sailsjs.org/#/documentation/reference/blueprint-api

<docmeta name="uniqueID" value="GettingStarted99009">
<docmeta name="displayName" value="Getting Started">
