# URL Slugs
A common use case for explicit routes is the design of slugs or [vanity URLs](http://en.wikipedia.org/wiki/Clean_URL#Slug).  For example, consider the URL of a repository on Github, [`http://www.github.com/balderdashy/sailsjs`](http://www.github.com/balderdashy/sailsjs).  In Sails, we might define this route at the **bottom of our `config/routes.js` file** like so:

```javascript
  'get /:account/:repo': {
    controller: 'RepoController',
    action: 'show',
    skipAssets: true
  }
```

In your `RepoController`'s `show` action, we'd use `req.param('account')` and `req.param('repo')` to look up the data for the appropriate repository, then pass it in to the appropriate [view](http://beta.sailsjs.org/#/documentation/concepts/Views) as [locals](http://beta.sailsjs.org/#/documentation/concepts/Views/Locals.html).  The [`skipAssets` option](http://beta.sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html?q=route-target-options) ensures that the vanity route doesn't accidentally match any of our [assets](http://beta.sailsjs.org/#/documentation/concepts/Assets) (e.g. `/images/logo.png`), so they are still accessible.



<docmeta name="uniqueID" value="URLSlugs805236">
<docmeta name="displayName" value="URL Slugs">

