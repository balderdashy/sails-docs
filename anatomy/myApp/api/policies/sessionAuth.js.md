# myApp/api/policies/sessionAuth.js
### 目的
これはアプリケーションの全ての部分に関して、全てのルートがアクセスされる前に確認されるようなポリシーファイルの例です。デフォルトでは誰もが全てのルートにアクセス出来るようになっていますが、プロダクションモードに変更する前に来れを変更することが出来ます（おそらく変更すべきです）。

Sailsではポリシーは単純にExpressのmiddlewareであり、アプリケーションの一部分にユーザがアクセスする前に認可のために何かをするものです。ポリシーの作成に関する詳細は、該当するガイドを参照する必要があるかと思われます。

<docmeta name="uniqueID" value="sessionAuthjs444151">
<docmeta name="displayName" value="sessionAuth.js">

```
/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.authenticated) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};

```
