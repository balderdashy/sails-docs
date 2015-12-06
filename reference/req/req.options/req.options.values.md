# req.options.values

blueprintの[`create`](http://sailsjs.org/documentation/reference/blueprint-api/Create.html)と[`update`](http://sailsjs.org/documentation/reference/blueprint-api/Update.html) アクションのデフォルト値です。

> 備考: `req.options.value`を使う前にそれが存在するかを確認し、必要に応じて作成して下さい。

### 例

新しいレコードを作る際にログインしているユーザの名前を使うことをデフォルトにするには:

```javascript
// In config/policies/createWithUserName.js
module.exports = function createWithUserName (req, res, next) {

  if (req.session.user) {

    // Use existing req.options.values, or initialize it to an empty object
    req.options.values = req.options.values || {};

    // Set the default `name` for "create" and "updates" blueprints
    req.options.values.name = req.session.user.name;

  }

  return next();

}
```

そして、目的のblueprintアクションに[このポリシーを適用](http://sailsjs.org/documentation/concepts/Policies?q=to-apply-a-policy-to-a-specific-controller-action)して下さい。

<docmeta name="displayName" value="req.options.values">
