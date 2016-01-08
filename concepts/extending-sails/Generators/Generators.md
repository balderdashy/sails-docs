# Generators

## Status

##### Stability: [2](http://nodejs.org/api/documentation.html#documentation_stability_index) - Unstable


### Purpose

Generators are designed to make it easier to customize the `sails new` and `sails generate` command-line tools, and provide better support for different Gruntfiles, configuration options, view engines, coffeescript, etc.


#### Structure

A generator has:

(1) a dictionary of build directives called `targets`

(2) a `templatesDirectory`, which is an absolute path to the folder of templates to use in `targets`

(3) optionally a `before` function and an `after` function (async logic which is run before and after respectively).


<docmeta name="displayName" value="Generators">
<docmeta name="stabilityIndex" value="2">
