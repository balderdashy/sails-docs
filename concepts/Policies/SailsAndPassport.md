# Authentication and Permissioning with Sails + Passport

Passport works with Sails just like it does with Express.  Since Sails uses Connect/Express at its core, all of the Connect/Express-oriented things work pretty well.  In addition, Sails has no problem interpreting most Express middleware to work with socket.io.

In most cases, Passport is overkill for Sails apps, since it is straightforward to implement a simple authentication system.  For example:

+ [Sails.js in Action](http://sailsjs.com/book)
+ [Chp 15 Repo](https://github.com/sailsinaction/brushfire-ch15-end)
+ [Sails 101: Basic Login](https://github.com/sails101/basic-login)

Passport is, however, quite useful if you plan on integrating with many different social login providers (~4 or more).  For example:

+ [Sails 101: Sails with Passport.js](https://github.com/sails101/using-passport)



<docmeta name="displayName" value="Sails + Passport">
