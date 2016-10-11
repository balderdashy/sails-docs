# tasks/config/sails-linker.js

### Purpose

This file configures a Grunt task called "sails-linker".

Automatically inject `<script>` tags and `<link>` tags into the specified
specified HTML and/or EJS files.  The specified delimiters (`startTag`
and `endTag`) determine the insertion points.

#### Development (default)

By default, tags will be injected for your app's client-side JavaScript files,
CSS stylesheets, and precompiled client-side HTML templates in the `templates/`
directory (see the `jst` task for more info on that).  In addition, if a LESS
stylesheet exists at `assets/styles/importer.less`, it will be compiled to CSS
and a `<link>` tag will be inserted for it.  Similarly, if any Coffeescript
files exists in `assets/js/`, they will be compiled into JavaScript and injected
as well.

#### Production (`NODE_ENV=production`)

In production, all stylesheets are minified into a single `.css` file (see
`tasks/config/cssmin.js` task) and all client-side scripts are minified into
a single `.js` file (see `tasks/config/uglify.js` task).  Any client-side HTML
templates, CoffeeScript, or LESS files are bundled into these same two minified
files as well.

### Usage

For additional usage documentation, see [`grunt-sails-linker`](https://www.npmjs.com/package/grunt-sails-linker).

<docmeta name="displayName" value="sails-linker.js">

