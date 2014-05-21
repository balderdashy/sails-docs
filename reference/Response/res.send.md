# res.send()

Send a simple response.  `statusCode` defaults to 200 ("OK").

This method is used in the underlying implementation of most of the other terminal response methods.

### Usage
```javascript
return res.send([statusCode,] body);
```


### Details
This method performs a myriad of useful tasks for simple non-streaming responses such as automatically assigning the Content-Length unless previously defined and providing automatic HEAD and HTTP cache freshness support.

When a Buffer is given the Content-Type is set to "application/octet-stream" unless previously defined as shown below:

```javascript
res.set('Content-Type', 'text/html');
res.send(new Buffer('some html'));
```
When a String is given the Content-Type is set defaulted to "text/html":

```javascript
res.send('some html');
```
When an Array or Object is given Express will respond with the JSON representation:

```javascript
res.send({ user: 'tobi' })
res.send([1,2,3])
```
Finally when a Number is given without any of the previously mentioned bodies, then a response body string is assigned for you. For example 200 will respond will the text "OK", and 404 "Not Found" and so on.

```javascript
res.send(200)
res.send(404)
res.send(500)
```


### Example
```javascript
res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('some html');
res.send(404, 'Sorry, we cannot find that!');
res.send(500, { error: 'something blew up' });
res.send(200);
```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).



<docmeta name="uniqueID" value="ressend588955">
<docmeta name="displayName" value="res.send()">

