# URL slugs
A common use case for explicit routes is the design of slugs or [vanity URLs](http://en.wikipedia.org/wiki/Clean_URL#Slug).  For example, consider the URL of a repository on Github, [`http://www.github.com/balderdashy/sails`](http://www.github.com/balderdashy/sails).  In Sails, we might define this route at the **bottom of our `config/routes.js` file** like so:

```javascript
'get /:account/:repo': {
  controller: 'RepoController',
  action: 'show',
  skipAssets: true
}
```

In your `RepoController`'s `show` action, we'd use `req.param('account')` and `req.param('repo')` to look up the data for the appropriate repository, then pass it in to the appropriate [view](https://sailsjs.com/documentation/concepts/Views) as [locals](https://sailsjs.com/documentation/concepts/views/locals).  The [`skipAssets` option](https://sailsjs.com/documentation/concepts/routes/custom-routes#?route-target-options) ensures that the vanity route doesn't accidentally match any of our [assets](https://sailsjs.com/documentation/concepts/assets) (e.g. `/images/logo.png`), so they are still accessible.




<docmeta name="displayName" value="URL slugs">
