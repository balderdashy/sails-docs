# URLスラグ
明示的なルートを設定する際の一般的な利用方法としてはスラグや[vanity URLs](http://en.wikipedia.org/wiki/Clean_URL#Slug)があります。例えばGithubにある[`http://www.github.com/balderdashy/sailsjs`](http://www.github.com/balderdashy/sailsjs)レポジトリを考えてみましょう。Sailsではこのルートを **`config/routes.js`ファイルの最後で**以下のように定義することで実現できます。:

```javascript
  'get /:account/:repo': {
    controller: 'RepoController',
    action: 'show',
    skipAssets: true
  }
```

`RepoController`の`show`アクションで`req.param('account')`や`req.param('repo')`の形で適切なレポジトリを選択するためのデータを取得でき、それを[ビュー](http://beta.sailsjs.org/#/documentation/concepts/Views) as [locals](http://beta.sailsjs.org/#/documentation/concepts/Views/Locals.html)に渡すことが出来ます。[`skipAssets`オプション](http://beta.sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html?q=route-target-options) オプションを使うことで予期せず[アセット](http://beta.sailsjs.org/#/documentation/concepts/Assets) (例えば `/images/logo.png`)にルーティングされることを防げますのでその場合にもアクセスが可能です。



<docmeta name="uniqueID" value="URLSlugs805236">
<docmeta name="displayName" value="URL Slugs">

