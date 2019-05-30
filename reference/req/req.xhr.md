# req.xhr
A flag indicating whether the current request (`req`) appears to be an AJAX request (i.e. it was issued with its "X-Requested-With" header set to "XMLHttpRequest".)


### Usage
```usage
req.xhr;
```

### Example
```javascript
if (req.xhr) {
  // Yup, it's AJAX alright.
}
```


### Notes
> + Whenever possible, you should prefer the `req.wantsJSON` flag.  Avoid writing custom content-negotiation negotiation logic into your app  - it makes your code more brittle and more verbose.






<docmeta name="displayName" value="req.xhr">
<docmeta name="pageType" value="property">
