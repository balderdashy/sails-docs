# URL Slugs
A common use case for explicit routes is the design of slugs or [vanity URLs](http://en.wikipedia.org/wiki/Clean_URL#Slug).  For example, consider the URL of a repository on Github, [`http://www.github.com/balderdashy/sailsjs`](http://www.github.com/balderdashy/sailsjs).  In Sails, we might define this route at the **bottom of our `config/routes.js` file** like so:

```javascript
  'get /:account/:repo': {
    controller: 'RepoController',
    action: 'show',
    skipAssets: true
  }
```

In your `RepoController`'s `show` action, we'd use `req.param('account')` and `req.param('repo')` to look up the data for the appropriate repository, then pass it in to the appropriate [view]() as [locals]().  The [`skipAssets` option]() ensures that the vanity route doesn't accidentally match any of our [assets]() (e.g. `/images/logo.png`), so they are still accessible.



<docmeta name="uniqueID" value="URLSlugs805236">
<docmeta name="displayName" value="URL Slugs">

