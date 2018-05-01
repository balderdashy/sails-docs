# res.send()

This method us used to send a string as a response.

It is used in the underlying implementation of most of the other terminal response methods.

### Usage
```usage
return res.send([string]);
```

### Details

This method can be used to send a string or XML.

When a string is given the Content-Type is set to "text/html".

If no argument is provided, a status code is returned.

### Example
```javascript
res.send('some string');

res.send(`<some> XML </some>`);
```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs)
> + If you want to send a dictionary or JSON, use [res.json()](https://sailsjs.com/documentation/reference/response-res/res-json)
> + If you want to send a stream, use [actions](https://sailsjs.com/documentation/concepts/actions-and-controllers)
> + If you want to send a custom status code, use [req.status()](https://sailsjs.com/documentation/reference/response-res/res-status)



<docmeta name="displayName" value="res.send()">

<docmeta name="pageType" value="method">

