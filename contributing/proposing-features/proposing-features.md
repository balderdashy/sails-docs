# Proposing features and enhancements

We at Sails welcome feedback about what would make Sails a more friendly tool for our users. However, before you submit a proposal to amend Sails core, recall that there is a myriad of less invasive ways to customize Sails to your use case. Please consider the following:

Today, many individuals and companies are happily using Sails in production projects with the currently-released feature set.  The primary reason for this is that Sails was built while the core team was running a development shop, where Sails was used to take many different kinds of applications from concept to production, then served as the backend for those applications as they were maintained over the next few years.

This means that Sails&mdash;much like Ruby on Rails&mdash;was designed from the beginning to be both developer-friendly and enterprise-friendly, using a convention-over-configuration methodology.  **Conventions** facilitate building new Sails apps and switching between existing Sails apps, while **configurability** allows Sails developers to be flexible enough to customize those apps as they mature using the full power of the underlying tool chain (configuration, plugins/overrides, Express, Socket.io, Node.js, and JavaScript).

Over the first year of Sails' life, the **configurability** requirement became even more important.  As its user base grew, Sails was used on all sorts of different projects, and by developers with all sorts of different preferences. As a result, the number of feature requests skyrocketed.  Sails addressed this in 2013 by rewriting its core to be innately interoperable:

+ Since Sails apps are just Node apps, you can take advantage of any of the [millions](bit.ly/npm-numbers) of NPM packages on http://npmjs.org.  (More recently, you can also take advantage of any of the hundreds of automatically-documented machine functions curated from NPM at http://node-machine.org.)
+ Since Sails uses the same req/res/next pattern as Express and Connect, you can take advantage of any middleware written for those middleware frameworks in your app, such as Lusca (security middleware from Paypal) or morgan (HTTP logging util).
+ Since Sails uses [Consolidate](https://github.com/tj/consolidate.js/), you can use any of the view engines compatible with Express, such as Jade, Dust, or Handlebars.
+ Since Sails uses a familiar MVC project structure, you and/or other developers on your team can quickly get up to speed with how the app works, the database schema, and even have a general notion of where common configuration options live.
+ Since Sails uses Grunt, you can install and use any of the thousands of available Grunt plugins on http://gruntjs.com/plugins in your app.
+ Sails' hook system allows you to disable, replace, or customize large swaths of functionality in your app, including pieces of Sails core, such as replacing Grunt with Gulp.
+ Waterline's adapter interface allows you to plug your models into any database such as Oracle, MSSQL, or Orient DB.
+ Skipper's adapter interface allows you to plug your incoming streaming file uploads into any blob storage container such as S3, GridFS, or Azure.
+ Sails' generator system allow you to completely control all files and folders that the Sails command-line tool generates when you run `sails new` or `sails generate *`.

Today, most (but certainly not all) new features in Sails can be implemented using one or more existing plugin interfaces, rather than by making a change to core. If you have a new feature in mind but aren't sure if it's possible using an existing plugin interface, don't hesitate to ask! There's a knowledgeable community of Sails users and contributers at [our Gitter](https://gitter.im/balderdashy/sails) who would be happy to point you in the right direction. If you've looked into it and you're reasonably certain that the feature you'd like added will require changes to core, then check out the [process for submitting a proposal](https://sailsjs.com/documentation/contributing/proposing-features-enhancements/submitting-a-proposal). Understand that perhaps the most important part of your proposal will be a clear explanation of why what you're suggesting is not possible today.

The core maintainers of Sails review all feature proposals, and we do our best to participate in the discussion in these PRs.  However, many of these proposals will generate back and forth discussion that could necessitate their being open for months at a time.  It is important to understand from the outset that if you are proposing a feature, the onus is on you to fully specify how that feature will work. This should include details about the proposed feature's use, configuration, and especially its implementation&mdash;that is, which modules would need to be changed to accomodate it, how it would be tested, whether it would be a major- or minor-version breaking change, and the amendments that would be necessary to the official Sails documentation.

Last, but certainly not least, please **do _not_ propose changes to the established conventions or default settings of Sails**. These types of discussions tend to start "religious wars" about topics like EJS vs. Jade, Grunt vs. Gulp, Express vs. Hapi, etc. Managing those arguments creates rifts and consumes an inordinate amount of contributors' time.  Instead, if you have concerns about the opinions, conventions, or default configuration in Sails, please [contact the core maintainers directly](mailto:inquiries@sailsjs.com).



<docmeta name="displayName" value="Proposing features/enhancements">
