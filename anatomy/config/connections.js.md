# config/connections.js
### Purpose
This file contains the settings for all of your adapters.

In Sails, adapters act as the intermediary between the app and the database.  To put it another way, they act as plugins for [Waterline](https://github.com/balderdashy/waterline), the  [ORM](http://en.wikipedia.org/wiki/Object-relational_mapping) that Sails uses to talk to databases.

This file lets you create different global "saved settings" that you can mix and match in your models. The [`sails.models.connection`](http://sailsjs.org/documentation/anatomy/myApp/config/models.js.html) option indicates which connection should be used if a model doesn't have one [explicitly specified](http://sailsjs.org/documentation/concepts/ORM/model-settings.html?q=connection).


<docmeta name="displayName" value="connections.js">
