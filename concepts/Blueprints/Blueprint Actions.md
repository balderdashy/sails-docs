# Blueprint actions

Blueprint actions (not to be confused with implicit [blueprint "action" _routes_](TODO)) are generic actions designed to work with your models.  Think of them as the default behavior for your application.  For instance, if you have a `User.js` model then `find`, `create`, `update`, `destroy`, `populate`, `add` and `remove` actions exist implicitly, without you having to write them.

By default, the blueprint RESTful routes and shortcut routes are bound to their corresponding blueprint actions.  However, any blueprint action can be overridden for a particular controller by creating a custom action in that controller file (e.g. `ParrotController.find`).

The current version of Sails ships with the following blueprint actions:

+ [find](http://sailsjs.com/documentation/reference/blueprint-api/find)
+ [findOne](http://sailsjs.com/documentation/reference/blueprint-api/findOne)
+ [create](http://sailsjs.com/documentation/reference/blueprint-api/create)
+ [update](http://sailsjs.com/documentation/reference/blueprint-api/update)
+ [destroy](http://sailsjs.com/documentation/reference/blueprint-api/destroy)
+ [populate](http://sailsjs.com/documentation/reference/blueprint-api/populate)
+ [add](http://sailsjs.com/documentation/reference/blueprint-api/add)
+ [remove](http://sailsjs.com/documentation/reference/blueprint-api/remove)
+ [replace](http://sailsjs.com/documentation/reference/blueprint-api/replace)

### Socket notifications

Most blueprint actions have realtime features that take effect if your app has WebSockets enabled.

For example, if the **find** blueprint action receives a request from a socket client, it will [subscribe](TODO) that socket to future notifications.  Then, any time records are changed using blueprint actions like **update**, Sails will [publish](TODO) certain notifications.

The best way to understand the behavior of a particular blueprint action is to read its reference page (see the list above).

But if you're looking for more of a birds-eye view of how realtime features work in Sails's blueprint API, see [**Concepts > Realtime**](http://sailsjs.com/documentation/concepts/realtime).  (If you're OK with some details being out of date, you might even want to check out the [original "Intro to Sails.js" video from 2013](https://www.youtube.com/watch?v=GK-tFvpIR7c).)

> For a more advanced breakdown of all notifications published by blueprint actions in Sails, see:
> + [Chart A (scenarios vs. notification types)](https://docs.google.com/spreadsheets/d/10FV9plyHR4gE9xIomIZlF-YS1S54oHEdvH8ZmTC1Fnc/edit#gid=0)
> + [Chart B (actions vs. recipients)](https://docs.google.com/spreadsheets/d/1B6i8aOoLNLtxJ4aeiA8GQ2lUQSvLOrP89RSLr7IAImw/edit#gid=0)

### Overriding blueprint actions

You may also override any of the blueprint actions for a controller by defining a [custom action](TODO) with the same name:

```javascript
module.exports = {
  findOne: function (req, res) {
    return res.json(403, 'Single model lookup is denied.');
  }
}

```

For more information about blueprints, including how to disable and override them, see the [Blueprint API reference](http://sailsjs.com/documentation/reference/blueprint-api)

<docmeta name="displayName" value="Blueprint actions">
