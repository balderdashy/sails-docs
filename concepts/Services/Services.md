# Services

**Services** are stateless libraries of functions (called **helpers**) that you can use from anywhere in your Sails app.  For example, you might have an `EmailService` which tidily wraps up one or more helper functions so you can use them in more than one place within your application.

The main benefit of using services in Sails is that they are *globalized*--you don't have to use `require()` to access them (although you can if you prefer.)   You can access a service and call its helpers (e.g. `EmailService.sendHtmlEmail()` or `EmailService.sendPasswordRecoveryEmail()`) from anywhere: within controller actions, from inside other services, in custom model methods, or even from command-line scripts.


### Building a service

Services are simple to work with, and you can do almost anything with them.  To help keep code maintainable, Sails apps use a set of strong conventions.  To learn more about service and helpers, **[start here](http://sailsjs.org/documentation/concepts/services/creating-a-service)**.



### Notes

> For additional reference, also check out <a href="https://blog.sergiocruz.me/sailsjs-services-how-to-use-them-in-your-controllers/">this blog post</a>.



<docmeta name="displayName" value="Services">
