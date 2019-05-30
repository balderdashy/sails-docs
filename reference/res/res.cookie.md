# res.cookie()

Sets a cookie with name (`name`) and value (`value`) to be sent along with the response.


### Usage
```usage
res.cookie(name, value [,options]);
```


### Details

The "path" option defaults to "/".

The "maxAge" option is a convenience option for setting "expires" relative to the current time in milliseconds. The following is equivalent to the previous example.

```javascript
res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
```

An object may be passed which is then serialized as JSON, which is automatically parsed by the bodyParser() middleware.

```javascript
res.cookie('cart', { items: [1,2,3] });
res.cookie('cart', { items: [1,2,3] }, { maxAge: 900000 });
```

Signed cookies are also supported through this method. Simply pass the signed option. When given res.cookie() will use the secret passed to express.cookieParser(secret) to sign the value.

```javascript
res.cookie('name', 'tobi', { signed: true });
```


### Example
```javascript
res.cookie('name', 'tobi', {
  domain: '.example.com',
  path: '/admin',
  secure: true
});

res.cookie('rememberme', '1', {
  expires: new Date(Date.now() + 900000),
  httpOnly: true
});
```





<docmeta name="displayName" value="res.cookie()">
<docmeta name="pageType" value="method">
