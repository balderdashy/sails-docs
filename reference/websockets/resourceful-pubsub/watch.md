# .watch(`request`)

### Purpose
This subscribes a client to publishCreate events for the model.  Any connections that are "watching" the model class will be automatically subscribed to new model instances that are created using the blueprint `create` method.

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | Request   | `request object`  | Yes        |

*Note*: `watch` will only work when the request is made over a socket connection (e.g. using `socket.get`), *not* over an http connection (e.g. using `jquery.get`).

### Blueprints and .watch()
> By default, the blueprint `find` and `findOne` actions will call `.watch()` on the model class.  This behavior can be changed for all models by setting the `sails.config.blueprints.autoWatch` to `false`, or for a specific model by setting `autoWatch` to `false` in the model's class file.


<docmeta name="uniqueID" value="watch67265">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".watch()">

