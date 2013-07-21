# Migration Guide

> _Note: You are viewing the Sails.js v0.9.0 documentation.  If you're looking for information on v0.8.x, please visit [here](http://08x.sailsjs.org)._

Sail 0.9.x is a major upgrade from 0.8.x and you will need to make some changes in order for your application
to be compatible with the new version. This guide will walk you through what has changed and what you
will need to update in your current codebase.

## What Has Changed

In 0.9.x we have made some major updates. This is just a quick runthrough of some of the larger changes
that will probably affect an application that is currently running on 0.8.x. For a complete list of
changes you can view the [Changelog](/balderdashy/sails-wiki/changelog).

### Express 3.x Support

In 0.9.x we have finally moved to [Express 3](http://expressjs.com/) behind the scenes, which is
welcome news to many. This has some minor effect on applications that may have been using Express 2.x
functionality but for most applications you will not need to change your code in order to be compatible
with the newer version. If you have custom middleware you may want to run through the
[Express 2.x to 3.x Migration Guide](https://github.com/visionmedia/express/wiki/Migrating-from-2.x-to-3.x)
to be sure it will continue to work.

The one feature that has been removed from 3.x is support for layouts and view partials.
Sails 0.9 has been extended to support layouts and partials if you are using `ejs` or `jade` views but for
other template languages you will need to stick to the Express 3.x conventions.

### Assets

We are no longer using [asset-rack](https://github.com/techpines/asset-rack) for compiling assets and
instead have moved all asset handling to [Grunt](http://gruntjs.com/). This gives you complete control
over how you handle assets in both development and production modes.

You are now able to take full advantage of the entire [grunt-plugin](http://gruntjs.com/plugins)
ecosystem. You can decide which template engine to use and which css preprocessor you prefer without
having to worry about support from Sails core. It also allows you to configure the loading order of
your assets however you choose without having to seperate your files into multiple folders to control
ordering or alphabetically naming your files.

We have provided a default **Gruntfile** which will be automatically added to new projects with some basic
defaults to get you started. For current projects which need a **Gruntfile** we will walk you through
creating one below.

For more information on [Grunt](http://gruntjs.com/) visit their website or read the official
[Getting Started Guide](http://gruntjs.com/getting-started).

### Waterline ORM

Waterline has been completely rewritten and split out into its own project again. In the new version
there are some exiciting features that have been added to help you build data-driven applications.

[Validations](https://github.com/balderdashy/waterline#validations) are now fully supported for model attributes. You can see a full list of available validations on the [Models Page](https://github.com/balderdashy/sails/wiki/models).

We also added support for Rails-like [Lifecycle Callbacks](https://github.com/balderdashy/waterline#lifecycle-callbacks). This gives you hooks into various stages of the data process to run functions. It's super useful for stuff like
encrypting passwords in a `beforeCreate` method.

One of the major changes that will effect your codebase are the changes away from `findAll`. We
have adopted a MongoDB-like syntax starting in 0.9 and have replaced the methods with `findOne` and
`find`.

`find` will now return an array of values where before it would only return a single object and
`findOne` will now return a single object.

You will need to update these values throughout your codebase in order to get the expected results
in your custom controllers. If you are using the blueprints for serving your data then you will not
need to make any changes on those controllers.

For more information on the Waterline and Model interfaces you can read the updated
[Models Page](https://github.com/balderdashy/sails/wiki/models).

Information on [Waterline](https://github.com/balderdashy/waterline) is available in the project's
Readme file.

## Migrating Your Application

The first step to migrating an application to 0.9.x will be handling your assets. This is the largest
part of the transition as so much has changed.

### Step 1: Creating a Gruntfile

The first thing we will need to do is create a `Gruntfile.js` file in the top level of your application.
Sails 0.9.x has one included with some basic defaults we can use to get started. This will give you
backwards support for LESS css preprocessing and the ability to optionally add automatic asset injection
into your layout.

  - Copy the [Default Gruntfile](https://github.com/balderdashy/sails/blob/development/bin/boilerplates/Gruntfile.js) into your application's top-level directory and make sure the filename is `Gruntfile.js`.

### Step 2: Update Package.json

You will need to update your `package.json` file to include the new 0.9 version of Sails along with
adding the Grunt dependency.

  - Add the following options to your `package.json` file:

    - `"sails": "0.9.0"`
    - `"grunt": "0.4.1"`

  - run `npm install` to install the new dependencies.

## Step 3: Update Adapters Config

In Sails 0.8.x the default development adapter was `sails-dirty` which is an in-memory adapter that
syncs to disk. In Sails 0.9.x we have moved to our own development adapters named `sails-disk` and
`sails-memory`. You will need to update your `config/adapters.js` file to reflect this.

Your adapters config should have the following set for the disk and memory adapters.

```javascript
module.exports.adapters = {

  // If you leave the adapter config unspecified
  // in a model definition, 'default' will be used.
  'default': 'disk',

  // In-memory adapter for DEVELOPMENT ONLY
  memory: {
    module: 'sails-memory'
  },

  // Persistent adapter for DEVELOPMENT ONLY
  // (data IS preserved when the server shuts down)
  disk: {
    module: 'sails-disk'
  }
}
```

### Step 3: Update Application Config Files

Sails 0.9.x exposes many more configuration options. It's a good idea to setup all these new configuration
files to make working with your app easier. The new configuration options give you the ability to
override many of the settings that were previously unavailable as well as some new options such as
remote session and socket storage.

  - Delete `config/assets.js` as it's no longer needed.  Asset handling is performed by the new `Gruntfile.js`.
  - Copy over the new [application.js](https://raw.github.com/balderdashy/sails/development/bin/boilerplates/config/application.js) file into `config/applications.js`
  - Copy over the new [controllers.js](https://raw.github.com/balderdashy/sails/development/bin/boilerplates/config/controllers.js) file into `config/controllers.js`
  - Copy over the new [io.js](https://raw.github.com/balderdashy/sails/development/bin/boilerplates/config/io.js) file into `config/io.js`
  - Copy over the new [log.js](https://raw.github.com/balderdashy/sails/development/bin/boilerplates/config/log.js) file into `config/log.js`
  - Copy over the new [routes.js](https://raw.github.com/balderdashy/sails/development/bin/boilerplates/config/routes.js) into `config/routes.js` and be sure to add in your old application's routes. This exposes the new **404** and **500** handlers.
  - Copy over the new [session.js](https://raw.github.com/balderdashy/sails/development/bin/boilerplates/config/session.js) file into `config/session.js`
  - Copy over the new [views.js](https://raw.github.com/balderdashy/sails/development/bin/boilerplates/config/views.js) file into `config/views.js`

### Step 4: Handle Assets in the Deprecated Public Folder

In Sails 0.9.x the public folder is no longer supported. All assets are moved to the `assets` folder.
This will be handled by Grunt and copied into a `.tmp/public` folder which is served as static assets.

This folder will contain all of your compiled and minified assets as well as any images or other assets
you have in you `assets` folder. It is designed in a way that it can be pushed to a CDN or served from
somewhere else if you would like.

When you are ready to deploy you can run: `sails build` or alternatively `grunt build` to create a
`www` folder in your top level directory that you can deploy to S3 or Cloudfront.

  - Copy any assets you currently have in `public` over to the `assets` directory.
  - Delete the `public` folder.

### Step 5: Remove Asset-Rack Partials from Layout

In your `views/layout.ejs` file you will need to remove the asset partials used by Asset-Rack. You now
have the option to choose how you want to include your assets. If you would like to point directly to
your assets they will available from the `.tmp/public` folder and can be included like:

```html
<link href="/styles/main.css" rel="stylesheet" type="text/css">
<script src="/js/main.js" type="text/javascript">
```

If your application uses the realtime functionality of Sails through socket.io you will need to add
the library manually to your `layout.ejs` file.

```html
<script type="text/javascript" src="/js/sails.io.js"></script>
```

We also have a Grunt plugin for linking your scripts automatically so you can continue working as you
did in 0.8.x.

To use the script linker you will need to replace your asset-rack partials with a syntax defined
in the `Gruntfile`

  - For stylesheets you can replace `<%- assets.css() %>` with the following:
    `<!--STYLES-->`
    `<!--STYLES END-->`

  - For javascript you can replace `<%- assets.js() %>` with the following:
    `<!--SCRIPTS-->`
    `<!--SCRIPTS END-->`

  - For templates you can replace `<%- assets.templateLibrary() %>` with the following:
    `<!--TEMPLATES-->`
    `<!--TEMPLATES END-->`

To get your assets automatically linked you will need to place any assets you want injected into the
layout into `assets/linker`. This will make your assets file structure look like:

```
assets/
  images/
  linker/
    js/
    styles/
    templates/
```

### Update Global Sails

The last step is to update your global version of Sails to the new 0.9.x branch. This is the easiest
part! Simply run the following command.

```bash
$ npm update sails -g
```

Depending on how you installed NPM you may need to have sudo access to complete this. In that case you
can run:

```bash
$ sudo npm update sails -g
```

To test that the global version of Sails has been updated run:

```base
$ sails -v
```

You should see: `info: v0.9.0` to ensure it was updated correctly.

####Note:
>Make sure that if your app uses an earlier version of sails, you remove the local dependency with `rm -rf node_modules/sails`.

## You&rsquo;re Done

You should now be able to call `sails lift` and start your application on the new
version of Sails.

The next step is to read through the docs and see all the new features you can take advantage of.
Sails is now more powerful than ever and 0.9.x is a huge step on the way to a 1.0 release.

We are excited to get it into developers&rsquo; hands and see all the awesome new applications they build
on top of it. We have many more new features planned for the 0.9.x branch and will continue pushing
out features that make Sails the best framework for building Node.js apps on.

A final shoutout and thanks to all of the contributors that have helped shape 0.9.
