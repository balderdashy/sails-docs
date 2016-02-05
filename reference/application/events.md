# Sails application events

### Overview

Sails instances inherit Node's [`EventEmitter` interface](https://nodejs.org/api/events.html#events_class_eventemitter), meaning that they can both emit and listen for custom events.  While it is not recommended that you utilize Sails events directly in app code (since your apps should strive to be as stateless as possible), events can be very useful when extending Sails (via [hooks](http://sailsjs.org/documentation/concepts/extending-sails/hooks) or [adapters](http://sailsjs.org/documentation/concepts/extending-sails/adapters)) and in a testing environment.

### Should I use events?

You _should not use events_ in your Sails app unless you are building a custom hook.

### Events emitted by Sails

The following are common events emitted by Sails instances.  You can listen for these events with:

```javascript
sails.on(eventName, eventHandlerFn);
```

None of the events are emitted with extra information, so your `eventHandlerFn` should not have any arguments.

| Event name | Emitted when... |
|------------| ----------------|
| `ready`    | The app has been loaded and the bootstrap has run, but it is not yet listening for requests |
| `lifted`   | The app has been lifted and is listening for requests. |
| `lowered`  | The app has been lowered and is no longer listening for requests. |
| `hook:<hook identity>:loaded` | The hook with the specified identity loaded and ran its `initialize()` method successfully.  |

<!--
### Using `sails.emit` for virtual requests

You may occasionally wish to simulate requests to a Sails app without starting an actual http server--this is often useful in testing environments.  You can do this by loading the app with [`sails.load()`](http://sailsjs.org/documentation/reference/application/sails-load) rather than [`sails.lift()`](http://sailsjs.org/documentation/reference/application/sails-lift) and then sending a `router:request` event to the app:

```javascript
sails.emit('router:request', requestObj, responseObj)
```

When using this method to make requests, you are responsible for supplying appropriate values for the [request object]() (such as the URL, method and body) and the [response object]() (such as implementations for the `send` method).

##### Example

Send a virtual request to the `POST /user` route and log the response

```javascript
sails.emit('router:request', {
  url: '/user',
  method: 'post',
  body: {
     name: 'joe',
     age: 25
  }
}, {
  send: function(data) {
     console.log("Server responded with: ", data);
  }
});
```
-->
<docmeta name="displayName" value="Events">
