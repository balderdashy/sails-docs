# .publishDestroy()

Broadcast a conventional message indicating that the record with the specified `id` has been destroyed.


```js
Something.publishDestroy( id )
```


_Or:_
- `Something.publishDestroy(id, req);`
- `Something.publishDestroy(id, req, options);`



### Usage

|   |     Argument        | Type                | Details    |
|---|:--------------------|---------------------|:-----------|
| 1 | `id`                |  ((string)),((number))         | The `id` of the record whose subscribers will receive this broadcast (e.g. `4`).
| 2 | _`req`_             |  ((req?))           | If provided, then the requesting socket _will be excluded_ from the broadcast.
| 3 | _`options`_         |  ((dictionary?))    | A dictionary of additional options.  See below.

##### Additional Options

If the `options` dictionary is provided, and it contains a `previous` property, then that property is expected to be a representation of choice values in the record from *before* it was destroyed.  This may be used to determine whether or not to broadcast additional messages.  See, by default if `options.previous` is provided, `publishDestroy()` will check whether any associated records were affected by the destruction, and possibly send out additional notifications (if a reflexive association was changed).

For example, let's say a `Pet` model has an `owner` association (a _singular_, or "model" association) which connects each Pet record with up to one distinct User record.  Conversely, this means any User record could own several pets (or none).  So if `Pet.publishDestroy(8)` was called, and that pet (`8`) has an `owner: 11`, then an additional `publishRemove()` call would be made to inform client sockets subscribed to the associated user (`11`) that one of its pets has been lost.

|          Option             | Type                       | Details                                           |
|:--------------------------- | -------------------------- |:--------------------------------------------------|
|        `previous`           | ((dictionary))             | If provided, this dictionary will be understood as the values of relevant attributes from the deleted record, and it may be used to determine whether or not to broadcast additional messages as described above.  It will also be included in the message broadcasted to subscribed client sockets.

##### Behavior

`publishDestroy()` broadcasts to all sockets subscribed to the record (e.g. via [`.subscribe()`](http://next.sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/subscribe)) and uses the model's [identity](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings#?identity) as the event name.  The broadcasted event data received by the subscribed sockets will be a dictionary with the following properties:

+ **verb**  - a ((string)) constant: `'destroyed'`
+ **id** - the record's `id` which is a ((string)) or ((number))
+ **previous** - if present, this ((dictionary)) contains the values provided as `previous` when `publishDestroy()` was called from your Sails back-end.



### Example

In a controller+action...  Destroy a pet and broadcast a message to all of its subscribers:

```js
// Destroy Hermione the cat.
Pet.destroy({id: 78}).exec(function(err, hermiones){
  if (err) return res.serverError(err);
  if (hermiones.length < 1) return res.notFound();

  // Broadcast a message telling anyone subscribed to Hermione the cat that, sadly, she has been destroyed.
  // (note that she _did_ live a long, full life, and also that _we DO NOT exclude_ the requesting socket
  //  from the broadcast because we pass in `undefined`.  Also note that we do include a few relevant properties
  //  from Hermione's remains via the `previous` option; e.g. for use in updating our client-side code.)
  Pet.publishDestroy(hermiones[0].id, undefined, {
    previous: {
      name: hermiones[0].name,
      age: hermiones[0].age,
      coatColor: hermiones[0].coatColor,
      species: hermiones[0].species,
    }
  });

  return res.ok();
});
```

The endpoint will respond with a simple 200 (because of `res.ok()`), but all subscribed client sockets will receive a `pet` event:

```js
// e.g. in the browser...
io.socket.on('pet', function (event){
  switch (event.verb) {
    'destroyed':
      console.log(event);
      // => see below
      break;
    default:
      console.warn('Unrecognized socket event (`%s`) from server:',event.verb, event);
  }
});
```

In this case, the logged message would look something like this:

```js
{
  verb: 'destroyed',
  id: 78,
  previous: {
    name: 'Hermione',
    age: 24,
    coatColor: 'pink',
    species: 'Felis catus',
  }
}
```



### Notes

> + This method works much in the same way as [`.message()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/message)-- it just represents a more specific use case and has a few special features as described above.  For more conceptual background, see the overview on [resourceful pubsub](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub).
> + It is important to understand that this method **does not actually do anything to your database**-- it is purely a conventional way of _announcing_ that changes have occurred.  Underneath the covers, the resourceful pubsub methods are just using combinations of `sails.sockets` methods.




<docmeta name="displayName" value=".publishDestroy()">
<docmeta name="pageType" value="method">

