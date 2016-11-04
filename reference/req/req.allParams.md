# req.allParams()

Returns the value of _all_ parameters sent in the request, merged together into a single dictionary (plain JavaScript object). Includes parameters parsed from the url path, the query string, and the request body. See [`req.param()`](http://sailsjs.org/documentation/reference/request-req/req-param) for details.

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
.exec(function (err, newProduct) {
  // ...
});
```

### Notes

>+ In past versions of Sails, this method was known as `req.params.all()`.  But this was confusing-- what if you had a route path parameter named "all"?  So in apps built on Sails v1 and above, you should always use `req.allParams()` instead.



<docmeta name="displayName" value="req.allParams()">
<docmeta name="pageType" value="method">

