
# Some of the Sails.js Feature Roadmap

## ASAP
+ Examples / articles with more front-end frameworks
+ CLI test coverage (e.g. create a new project and verify all the files are there and correct, and that it lifts)
+ Router test coverage (e.g. create an http request and verify that it does what it's supposed to)
+ More detailed documentation, especially around configuration and deep-level configuration (e.g. how to set which global variables are exposed and the paths)

## ~May 2013  (0.9.0)
+ Model validations, db constraints, and keys
+ Built-in TemplateController (views and templates will still be separate concepts, but if you choose to use `<% %>` underscore/ejs-style templates, you can load your views asynchronously from the client.  This supports the use case of serving a single page application while still maintaining SEO/accessibility requirements.)
+ New projects come optionally with boilerplate authentication code baked in

## ~July 2013 (1.0.0)
+ Associations (cross-model, cross-adapter)
+ Finish the refactoring of the core to support the use case of each module being independent, and being able to use tools like `yo` to manage assets
