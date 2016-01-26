# Generators

Sails' generators allow you to completely customize what happens when you run `sails new` and `sails generate` from the command-line.  Custom generators make it possible to standardize the way your team or organization creates new Sails apps, as well as new modules within existing apps.  Custom generators can be used to do all sorts of cool things:
- to standardize conventions and boilerplate logic for all new apps across your organization
- to override the default Gruntfile with a set of custom tasks
- to completely replace Grunt with [Gulp](http://gulpjs.com/) or [webpack](https://webpack.github.io/)
- to use another view engine like Jade, Dust or Nunjucks by default (instead of EJS)
- to automate custom deployments (e.g. white label apps with one server per-customer)
- to generate files as Coffeescript or Typescript
- to include ASCII pictures of cats at the top of every code file (or license headers, whatever)
- to start off with all documentation and comments in a language other than English


> If you are interested in making custom generators, the best place to start is by checking out the [introduction to custom generators](http://sailsjs.org/documentation/concepts/extending-sails/generators/custom-generators).  You also might check out [open-source generators from the community](https://sailsjs-website.herokuapp.com/documentation/concepts/extending-sails/generators/available-generators), in case something already out there will save you some time.


<docmeta name="displayName" value="Generators">
<docmeta name="stabilityIndex" value="2">
