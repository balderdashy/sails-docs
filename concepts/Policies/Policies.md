# Policies
### 개요

Sails에서 정책은 권한과 접근 제한을 위한 다양한 도구를 의미한다-- 그것들은 적합한 단위 레벨에 맞게 컨트롤러 접근을 허가하거나 거부한다. 예를들어, 드롭박스를 만든다고 가정하면, 사용자가 폴더에 업로드를 하기전에, `isAuthenticated`인지 확인한다음, `canWrite` 권한 (폴더에 쓰기 권한이 있는지)을 확인 해야한다. 마지막으로 사용자의 폴더에 `hasEnoughSpace`를 확인해야 한다.

정책은 어떤것이든 될 수 있다: HTTP BasicAuth, 3rd party single-sign-on, OAuth 2.0, 혹은 자신만의 커스텀 권리/권한 스키마 

> 주의 : 정책은 **오직** 컨트롤러의 액션에만 적용되며, 뷰에는 적용되지 않는다. 만약 [routes.js 설정 파일](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.routes.html)에 뷰를 바로 가리키는 라우트를 정의 하였다면, 어떠한 정책도 그것에 적용되지 않을것이다. 정책이 적용되었는지 확인하기 위해서는, 뷰를 보이게하는 액션을 정의 하는 대신, 그 액션을 라우트에 지정해야 한다.

### 처음 정책 작성하기

정책은 Sails 어플리케이션 안의 `api/policies` 폴더 안에 정의된 파일이다. 각각의 정책 파일 하나의 함수를 포함하고 있어야한다.

정책이 실행될 차례가 되면, 정책들은 단지 컨트롤러 **전에** 수행되는 Connect/Express 미들웨어 함수에 불과하다. 단지 원하는 만큼 그것들을 연결 할 수 있다-- 사실 그것들은 그런 방식으로 사용되게 디자인 되어있다. 이상적으로, 각각의 미들웨어 함수는 반드시 *하나*만 확인 할 수 있다.

For example, the `canWrite` policy mentioned above might look something like this:
예를들면, 위에서 언급된 `canWrite` 정책은 아래와 같이 쓸 수 있다.

```javascript
// policies/canWrite.js
module.exports = function canWrite (req, res, next) {
  var targetFolderId = req.param('id');
  var userId = req.session.user.id;
  
  Permission
  .findOneByFolderId( targetFolderId )
  .exec( function foundPermission (err, permission) {

    // Unexpected error occurred-- skip to the app's default error (500) handler
    if (err) return next(err);

    // No permission exists linking this user to this folder.  Maybe they got removed from it?  Maybe they never had permission in the first place?  Who cares?
    if ( ! permission ) return res.redirect('/notAllowed');
    
    // OK, so a permission was found.  Let's be sure it's a "write".
    if ( permission.type !== 'write' ) return res.redirect('/notAllowed');

    // If we made it all the way down here, looks like everything's ok, so we'll let the user through
    next();
  });
};
```


### 정책으로 컨트롤러 보호하기

Sails는 `config/policies.js`에 위치한 내장 ACL (access control list)이 존재한다. 이 파일은 정책과 컨트롤러를 연결시키는데 사용된다.

이 파일은 *선언적*이며, 어플리케이션의 *어떤* 권한이 동작하는지를 의미하는것이지, *어떻게* 작동하는지를 의미하지는 않는다. 이것은 새로운 개발자들이 이해하기 더 쉬울 뿐만아니라, 어플리케이션이 피할수없는 변화에 탄력적으로 대응 할 수 있게한다.

`config/policies.js` 파일은 자바스크립트 객체로 되어있어야 하며, 키는 컨트롤러 이름을 의미한다 (또는 `'*'`은 전역 정책을 의미한다.), 그리고 그것들의 값은 하나나 둘 이상의 액션 이름과, 그것에 맞는 정책으로 되어있다. 아래는 좀더 자세한 예제이다.


##### 특정한 컨트롤러 액션에 정책 할당

```js
{
  ProfileController: {
      // Apply the 'isLoggedIn' policy to the 'edit' action of 'ProfileController'
      edit: 'isLoggedIn'
      // Apply the 'isAdmin' AND 'isLoggedIn' policies, in that order, to the 'create' action
      create: ['isAdmin', 'isLoggedIn']
  }
}
```

##### 컨트롤러 전체 액션에 정책 할당

```js
{
  ProfileController: {
    // Apply 'isLogged' in by default to all actions that are NOT specified below
    '*': 'isLoggedIn',
    // If an action is explicitly listed, its policy list will override the default list.
    // So, we have to list 'isLoggedIn' again for the 'edit' action if we want it to be applied.
    edit: ['isAdmin', 'isLoggedIn']
  }
}
```

> **주의:** 기본 정책은 자동으로 매핑되지 않으므로, 컨트롤러의 액션에 이미 기술된 매핑은 기본 매핑을 재정의 된다.

##### 명시적으로 맵되지 않는 전체 액션에 정책 적용

```js
{
  // Apply 'isLoggedIn' to all actions by default
  '*': 'isLoggedIn',
  ProfileController: {
      // Apply 'isAdmin' to the 'foo' action.  'isLoggedIn' will NOT be applied!
      'foo': 'isAdmin'
  }
}
```

> 다시한번 상기시키지만, 기본 정책은 어떠한 명시적으로 매핑된 컨트롤러 / 액션에 적용되지 않는다.


### 내장 정책

Sails는 기본적으로 전체적으로 혹은 특정 컨트롤러나 액션에 적용 될 수 있는 두가지 내장 정책을 제공한다.
  + `true`: 공개 접근가능 (컨트롤러/액션에 매핑되면 누구든 접근 가능하다.)
  +  `false`: **NO** access (allows **no-one** to access the mapped controller/action)
  + `false` : 접근**불가** (컨트롤러/액션에 매핑되면 **누구도** 접근 불가능하다. )

 `'*': true`는 모든 컨트롤러와 액션에 적용되는 기본 정책이다. 제품에선, 이것을 `false`로 변경하는것은 잘못 노출되는 로직 접근을 차단하기 위한 좋은 습관이다.

##### 컨트롤러에 정책 추가하기

```javascript
  // in config/policies.js
  
  // ...
  RabbitController: {

    // Apply the `false` policy as the default for all of RabbitController's actions
    // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
    '*': false,
  
    // For the action `nurture`, apply the 'isRabbitMother' policy 
    // (this overrides `false` above)
    nurture : 'isRabbitMother',
  
    // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
    // before letting any users feed our rabbits
    feed : ['isNiceToAnimals', 'hasRabbitFood']
  }
  // ...
```

여기에 `isNiceToAnimals`라는 위에서 언급된 정책이다. (이 파일은 `policies/isNiceToAnimals.js`에 존재한다.):

```javascript
module.exports = function isNiceToAnimals (req, res, next) {
  
  // `req.session` contains a set of data specific to the user making this request.
  // It's kind of like our app's "memory" of the current user.
  
  // If our user has a history of animal cruelty, not only will we 
  // prevent her from going even one step further (`return`), 
  // we'll go ahead and redirect her to PETA (`res.redirect`).
  if ( req.session.user.hasHistoryOfAnimalCruelty ) {
    return res.redirect('http://PETA.org');
  }

  // If the user has been seen frowning at puppies, we have to assume that
  // they might end up being mean to them, so we'll 
  if ( req.session.user.frownsAtPuppies ) {
    return res.redirect('http://www.dailypuppy.com/');
  }

  // Finally, if the user has a clean record, we'll call the `next()` function
  // to let them through to the next policy or our controller
  next();
};
```

뿐만아니라 토끼를 보호(의심할 여지 없이 순수한 이유로)하기 위해, 여기 다른 몇몇의 정책들이 있다.:
+ 쿠키 기반 허가
+ 룰 기반 접근 제어
+ MB 쿼터에 따른 파일 업로드 제한
+ 당신이 상상할수 있는 어떤 종료의 권한 스키마


### 나는 Passport를 사용하고 있는데--어떻하나?

Passport 역시 Salis에서 멋지게 동작한다! 일반적으로, Sails는 Connect/Express를 코어에서 사용하기 때문에, Connect/Express에 맞는 어떠한것도 제대로 동작한다. 사실 Sails는 대부분의 socket.io.를 통해 Express 미들웨어를 해석하는데 문제가 없다.

여기에 [Using Passport.JS with Sails.JS](http://jethrokuan.github.io/2013/12/19/Using-Passport-With-Sails-JS.html)와 같은 몇몇 떠돌아 다니는 몇몇 좋은 예제가 있다.



<docmeta name="uniqueID" value="Policies766425">
<docmeta name="displayName" value="Policies">

