# sails.sockets.subscribeToFirehose(socket)
### Purpose
Subscribe to the "firehose", which (while running in the development environment) broadcasts messages about *all* model events.

### Overview
#### Parameters
|   |          Description        | Accepted Data Types | Required ? |
|---|-----------------------------|---------------------|------------|
| 1 |           Socket        | `object` | Yes         |

The firehose publish messages using the "firehose" event. By default, messages will be published when a model instance is created, destroyed, or updated, or when an associated collection is added to or removed from.  The message content is similar to that for the [PubSub methods](#!documentation/reference/ModelMethods/ModelMethods.html) like `publishUpdate`, `publishCreate`, etc.

> Note that you can also subscribe to the firehose from the client side by making a socket GET request to `/firehose`.


<docmeta name="uniqueID" value="sailssocketssubscribeToFirehose954078">
<docmeta name="displayName" value="sails.sockets.subscribeToFirehose(socket)">

