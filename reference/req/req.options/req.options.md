# req.options
`req.options`は下のオブジェクトを変更することなくリクエストパラメータを変更（あるいはデフォルトを設定）することが出来ます。

[カスタムのルート設定](http://sailsjs.org/documentation/concepts/Routes/RouteTargetSyntax.html)て提供された全てのプロパティは`req.options`で利用可能です。例えば[`config/routes.js`](http://sailsjs.org/documentation/reference/sails.config/sails.config.routes.html)での以下の例で:

```js
"GET /foo": {controller: 'user', action: 'myAction', owl: 'hoot'}
```

`req.options.controller`、`req.options.action`と`req.options.owl` は利用可能です。

加えて、幾つかの特別な`req.options`オブジェクトは[blueprints](http://sailsjs.org/documentation/reference/blueprint-api)でblueprintがデータストアにアクセスする際に使う条件式や値をプログラム的に変更するために使うことが出来ます。これらは[policies](http://sailsjs.org/documentation/concepts/Policies)の中で、ログインユーザーに応じてリクエストされたレコードをフィルターするのにとてもよく利用できます。

### 例

`config/policies/filterByUser.js` ポリシーの中で:

```javascript
module.exports = function filterByUser (req, res, next) {

  if (req.session.user) {

    req.options.where = req.options.where || {};
    req.options.where.userId = req.session.user.id;

  }

  return next();

}
```

<docmeta name="displayName" value="req.options">
