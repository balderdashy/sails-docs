# sails.getBaseUrl()

Return the base URL for this app



```javascript
sails.getBaseUrl();
```

#### Returns

**Type:** ((string))

```javascript
http://localhost:1337
```



### Example

In a view template...
```html
<a href="<%=sails.getBaseUrl()%>">Return to home page</a>
```

### Notes
> - This method constructs a URL solely from configuration options such as [`sails.config.port`]() and [`sails.config.explicitHost`]() (defaulting to `localhost`).  It does _not_ do any server introspection.

<docmeta name="displayName" value="sails.getBaseUrl()">
