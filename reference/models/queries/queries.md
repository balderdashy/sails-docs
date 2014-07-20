# Queries

```js
var query = Stuff.find();
```

Query instances are probably the most common type of object you'll interact with when writing code for Sails/Waterline, since they are returned by Waterline model methods like `.find()`.  Their primary purpose is to provide a convenient, chainable syntax for refining database queries, exposing methods like `.populate()`, `.where()`, `.sort()`, and more.  They also enable a chainable syntax for **executing** (i.e. _actually sending_) queries through the relevant Waterline adapter(s) and down to the native database driver(s).


### Promises

In addition to the `.exec()` method, Waterline queries implement a partial integration with the [q]() promise library, exposing the `.then()` and `.catch()` promise methods.

```js
Stuff.find()
.then(function (allTheStuff) {...})
.catch(function (err) {...});
```


If you are a fan of promises, and have a reasonable amount of experience with them, you should have no problem working with this interface.  However if you are not very familiar with promises, or don't care one way or another, you will probably have an easier time working with `.exec()`, which uses standard Node.js callback conventions.

```js
Stuff.find()
.exec(function (err, allTheStuff) {...})
```


### Notes

> + Waterline model methods will **NOT** return a query instance if the optional callback argument is provided.  Instead, that callback will be triggered when the query is complete.


<docmeta name="uniqueID" value="queries820682">
<docmeta name="displayName" value="Queries">

