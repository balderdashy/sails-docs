# sails.getBaseUrl()

> ### _**This method is deprecated and will be removed in Sails v1.0**_
> There is no reliable, cross-platform way to automatically detect the external URL of a running Sails app (or any other Node app). In mission-critical situations, you are advised to pre-determine the URL and save it in a custom [environment-dependent configuration value](http://sailsjs.org/documentation/concepts/configuration#?environmentspecific-files-config-env) (e.g. `sails.config.appUrl`) that you can reference elsewhere in the app.

Return a best guess of the base URL for this app, based on a combination of user-supplied and default configuration values.

`getBaseUrl()` constructs a URL string by inspecting various configuration values and defaults.  For example, if `sails.config.ssl.key` and `sails.config.ssl.cert` both have values, the URL will start with `https://` instead of `http://`.  If `sails.config.explicitHost` is not undefined, its value will be used as the domain name; otherwise it will be `localhost`.  If `sails.config.port` is not 80 or 443, its value will be appended to the URL as well.



```javascript
sails.getBaseUrl();
```


### Usage

_This function does not accept any arguments._


#### Returns

**Type:** ((string))

```javascript
http://localhost:1337
```



### Example

In an email template...
```html
For more information, visit <a href="<%=sails.getBaseUrl()%>">our web site</a>.
```

<docmeta name="displayName" value="sails.getBaseUrl()">
