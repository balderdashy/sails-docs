# What is Sails?
Sails makes it easy to build custom, enterprise-grade Node.js apps. It is designed to resemble the MVC architecture from frameworks like Ruby on Rails, but with support for the more modern, data-oriented style of web app development.  It's especially good for building APIs, single page apps/sites, and realtime features like chat.

# The MVC Architecture
Sails is a Model, View, Controller architecture for Node.js, usually just called MVC. You can <a href="http://guides.rubyonrails.org/getting_started.html#the-mvc-architecture">learn more about MVC here</a>, but basically it's the really awesome, industry-standard way of doing things for modern web apps.

Sails does a few things other MVC frameworks like Rails and Grails can't do:

  + Automatically generated JSON API for manipulating models means you don't have to write any backend code to build simple database apps
  + Built-in authentication, role-based access control, and customizable policies assignable at the controller/action level
  + Transport agnostic routing: Sails controllers also handle Socket.io / WebSocket messages!  This makes it much easier to send the server-originated or 'comet' notifications you need for features like chat, realtime analytics, and multiplayer games.
  + Automatic asset minification with Rigging: Your UI code is automatically included in development mode, and minified into a simple, gzipped file in production.
  + Support for:
    + CoffeeScript
    + LESS

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8acf2fc2ca0aca8a3018e355ad776ed7 "githalytics.com")](http://githalytics.com/balderdashy/sails)