# req.options.values.where

blueprintの[`find`](http://sailsjs.org/documentation/reference/blueprint-api/Find.html)と[`update`](http://sailsjs.org/documentation/reference/blueprint-api/Update.html) アクションの「where条件の」デフォルト値です。

> 備考:　`req.options.where`を使う前にそれが存在するかを確認し、必要に応じて作成して下さい。

### 例

`userId`がログイン済ユーザのidに一致するもののみ取り出すのをデフォルトにするには:

```javascript
// In config/policies/filterByUser.js
module.exports = function filterByUser (req, res, next) {

  if (req.session.user) {

    // Use existing req.options.where, or initialize it to an empty object
    req.options.where = req.options.where || {};

    // Set the default `userId` for "find" and "update" blueprints
    req.options.where.userId = req.session.user.id;

  }

  return next();

}
```

そして、目的のblueprintアクションに[このポリシーを適用](http://sailsjs.org/documentation/concepts/Policies?q=to-apply-a-policy-to-a-specific-controller-action)して下さい。

<docmeta name="displayName" value="req.options.where">
