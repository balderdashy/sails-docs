# Blueprints

### Overview

Like any good web framework, Sails aims to reduce both the amount of code you write and the time it takes to get a functional app up and running.  _Blueprints_ are Sails&rsquo; way of quickly generating API [routes](http://sailsjs.org/documentation/concepts/routes) and [actions](http://sailsjs.org/documentation/concepts/controllers#?actions) based on your application design.

Together, [blueprint routes](http://sailsjs.org/documentation/concepts/blueprints/blueprint-routes) and [blueprint actions](http://sailsjs.org/documentation/concepts/blueprints/blueprint-actions) constitute the **blueprint API**, the built-in logic that powers the [RESTful JSON API](http://en.wikipedia.org/wiki/Representational_state_transfer) you get every time you create a model and controller.

For example, if you create a `User.js` model and `UserController.js` controller file in your project, then with blueprints enabled you will be able to immediately visit `/user/create?name=joe` to create a user, and visit `/user` to see an array of your app's users.  All without writing a single line of code!

Blueprints are great for prototyping, but they are also a powerful tool in production due to their ability to be overridden, protected, extended or disabled entirely.

<docmeta name="displayName" value="Blueprints">
