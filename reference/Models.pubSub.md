Pub-Sub Methods
================



# .publishCreate()
### Purpose
PublishCreate doesn't actually create anything.  It simply publishes information about the creation of a model instance via websockets.
### Example Usage
Controller Code for 'users'
```javascript

```
Controller Code for 'users'
```javascript

```

### Notes


# .publishUpdate()
### Purpose
Publish an update on a particular model
### Example Usage
```javascript

```

### Notes

# .publishDestroy()
### Purpose
Publish the destruction of a model
### Example Usage
```javascript

```

### Notes


# .subscribe(req)
### Purpose
Subscribe a socket to a handful of models in this collection
### Example Usage
```javascript

```

### Notes


# .subscribe(req,id)

### Purpose
Subscribe a socket to a handful of models in this collection
### Example Usage
```javascript

```

### Notes
This method will be deprecated in an upcoming release. Subscriptions should be called from the request object or socket themselves, not from the model.

# .unsubscribe(req)
### Purpose
Subscribe a socket to a handful of models in this collection
### Example Usage
```javascript

```

### Notes


