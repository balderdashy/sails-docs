# req.allParams()

Returns the value of _all_ parameters sent in the request, merged together into a single object. Includes parameters parsed from the url path, the query string, and the request body. See [`req.param()`](./#!documentation/reference/req.param) for details.

### Usage

```js
req.allParams();
```


### Example

Update the product with the specified `sku`, setting new values using the parameters which were passed in:

```javascript
var values = req.allParams();

// Don't allow `price` or `isAvailable` to be edited.
delete values.price;
delete values.isAvailable;

// At this point, `values` might look something like this:
// values ==> { displayName: 'Bubble Trouble Bubble Bath' }

Product.update({sku: sku})
.set(values)
.then(function (newProduct) {
  // ...
});
```

### Notes

>+ This method can also be called as `req.params.all()` - they are synonyms.















<docmeta name="uniqueID" value="reqallParams817828">
<docmeta name="displayName" value="req.allParams()">

