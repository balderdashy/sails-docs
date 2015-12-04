# myApp/config/policies.js
### 目的
このファイルにはアプリケーションのデフォルトのポリシーが入っています。

ポリシーはコントローラの前に実行される簡単なExpressミドルウエアファンクションです。コントローラやその中のアクションを保護するために、1つまたは複数のポリシーを適用することができます。全てのポリシー(例:`myApp/api/policies/sessionAuth.js`)は`myApp/api/policies/`フォルダに保管され、ファイル名から拡張子を取ったもの(例:`sessionAuth`)でアクセスできます。


<docmeta name="uniqueID" value="policiesjs831604">
<docmeta name="displayName" value="policies.js">

```
/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/documentation/
 */


module.exports.policies = {

  // Default policy for all controllers and actions
  // (`true` allows public access)
  '*': true,

	// Here's an example of mapping some policies to run before
  // a controller and its actions
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
};

```
