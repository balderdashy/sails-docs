# Sails.js Documentation (v0.9.x)

Guide and reference documentation for the 0.9.x release of Sails.  Content for the documentation on the Sails website (sailsjs.org) is deployed from here.

##### Contributing to the docs
> We welcome your help!  Please send a pull request to this branch with corrections/additions and they'll be double-checked and merged as soon as possible.

##### How often are docs updated?
> When a patch release is released to npm, these docs will be redeployed to http://sailsjs.com/#!documentation


## Table of Contents

I. Guides

  1. What is Sails?
    a. Sails.js make it easy to build custom, enterprise-grade Node.js apps. It is designed to mimic the MVC pattern of frameworks like Ruby on Rails, but with support for the requirements of modern apps: data-driven APIs with scalable, service-oriented architecture. It's especially good for building chat, realtime dashboards, or multiplayer games.
  2. Generating a RESTful JSON API (https://www.youtube.com/watch?v=GK-tFvpIR7c)
    a. sails new foo, generate model+controller
    b. Test it out w/ Postman
      i. Filter by param
        - query modifiers, etc.
      ii.  Paginate (limit + skip)
      iii. Sort
      iv. Creating a thing
        - nested stuff works
      v. Updating a thing
        - nested stuff works
      vi. Deleting a thing
    c. Test it out w/ sockets from the home page
      i. Built-in subscribe and publish
  3. Customizing your API
    a. Routes
    b. Policies
    c. Using Sockets (socket.io)
    d. Models
    e. Controllers
  4. Building HTML Views
  5. Assets (js/css/etc)
  6. Writing Custom Adapters
  7. Deploying Your App


II. Reference
  1. Building HTML Views
  2. Configuration


III. Supported Databases


IV. Version Notes
  1. 0.8.x
    a. 0.8 -> 0.9 Migration Guide
    b. Changelog


V. Roadmap




## TODO

Below is a list of guides, docs, and sections we could use some help with.

##### Guides
+ Generating a RESTful JSON API (blueprints)
+ Customizing Your API
  + Customizing blueprints
    + Customizing built-in CRUD methods (e.g. `GET /yourmodelname`)
    + 404
      + Customizing your 404 page
      + Using `res.notFound()`
    + 500
    + 400
    + 403
  + Custom controllers
  + Customizing routes
  + Policies
    + Configuring policy mappings
    + Included policies
    + Custom policies



##### API Reference
+ Model class methods (e.g. `User.findOne()` )
+ Model instance methods (e.g. `user.save()` )
+ Request (`req`)
  + Intersection of the things from Express and what we support in the socket.io interpreter
  + Plus the new methods we add in Sails (`req.params.all()`)
+ Response (`res`)
  + Intersection of the things from Express and what we support in the socket.io interpreter
  + Plus the new methods we add in Sails (`req.params.all()`)
+ Global sails object (`sails`)
  + `sails.config`


##### Community Resources
A list of all the great tutorials and stuff from the Sails community.
