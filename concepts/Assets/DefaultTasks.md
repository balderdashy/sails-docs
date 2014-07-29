# Default Tasks

### Overview

The asset pipeline bundled in Sails is a set of Grunt tasks configured with conventional defaults designed to make your project more consistent and productive. The entire frontend asset workflow is completely customizable, while it provides some default tasks out of the box. Sails makes it easy to [configure new tasks](/#/documentation/concepts/Assets/TaskAutomation.html?q=task-configuration) to fit your needs.

Here are a few things that the default Grunt configuration in Sails does to help you out:  
- Automatic LESS compilation
- Automatic JST compilation
- Automatic Coffescript compilation
- Optional automatic asset injection, minification, and concatenation
- Creation of a web ready public directory
- File watching and syncing
- Optimization of assets in production

### Default Grunt Task Behavior.

Below are the Grunt tasks that are included in your Sails project as well as a small description of exactly what each does in your project. Also included are a link to the usage docs for each task.

##### clean

> This grunt task is configured to clean out the contents in the `.tmp/public/` of your sails project.

> [usage docs](https://github.com/gruntjs/grunt-contrib-clean)

##### coffee

> Compiles coffeeScript files from `assest/js/` into Javascript and places them into `.tmp/public/js/` directory.

> [usage docs](https://github.com/gruntjs/grunt-contrib-coffee)

##### concat

> Concatenates javascript and css files, and saves concatenated files in `.tmp/public/concat/` directory.

> [usage docs](https://github.com/gruntjs/grunt-contrib-concat)

##### copy

> **dev task config**
> Copies all directories and files, exept coffescript and less files, from the sails assets folder into the `.tmp/public/` directory.

> **build task config**
> Copies all directories and files from the .tmp/public directory into a www directory.

> [usage docs](https://github.com/gruntjs/grunt-contrib-copy)

##### cssmin

> Minifies css files and places them into `.tmp/public/min/` directory.

> [usage docs](https://github.com/gruntjs/grunt-contrib-cssmin)

##### jst

> Precompiles Underscore templates to a `.jst` file. (i.e. it takes HTML template files and turns them into tiny javascript functions). This can speed up template rendering on the client, and reduce bandwidth usage.

> [usage docs](https://github.com/gruntjs/grunt-contrib-jst)

##### less

> Compiles LESS files into CSS. Only the `assets/styles/importer.less` is compiled. This allows you to control the ordering yourself, i.e. import your dependencies, mixins, variables, resets, etc. before other stylesheets.

> [usage docs](https://github.com/gruntjs/grunt-contrib-less)

##### sails-linker

> Automatically inject `<script>` tags for javascript files and `<link>` tags for css files.  Also automatically links an output file containing precompiled templates using a `<script>` tag. A much more detailed description of this task can be found [here](https://github.com/balderdashy/sails-generate-frontend/blob/master/docs/overview.md#a-litte-bit-more-about-sails-linking), but the big takeaway is that script and stylesheet injection is *only* done in files containing `<!--SCRIPTS--><!--SCRIPTS END-->` and/or `<!--STYLES--><!--STYLES END-->` tags.  These are included in the default **views/layout.ejs** file in a new Sails project.  If you don't want to use the linker for your project, you can simply remove those tags.

> [usage docs](https://github.com/Zolmeister/grunt-sails-linker)

##### sync

> A grunt task to keep directories in sync. It is very similar to grunt-contrib-copy but tries to copy only those files that have actually changed. It specifically synchronizes files from the `assets/` folder to `.tmp/public/`, overwriting anything that's already there.

> [usage docs](https://github.com/tomusdrw/grunt-sync)

##### uglify

> Minifies client-side javascript assets.

> [usage docs](https://github.com/gruntjs/grunt-contrib-uglify)

##### watch

> Runs predefined tasks whenever watched file patterns are added, changed or deleted. Watches for changes on files in the `assets/` folder, and re-runs the appropriate tasks (e.g. less and jst compilation).  This allows you to see changes to your assets reflected in your app without having to restart the Sails server.

> [usage docs](https://github.com/gruntjs/grunt-contrib-watch)

<docmeta name="uniqueID" value="DefaultTasks764297">
<docmeta name="displayName" value="Default Tasks">

