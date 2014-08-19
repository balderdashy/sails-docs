# 커스텀 응답

### 개요

Sails v.10 allows for customizable server responses.  Sails comes with a handful of the most common response types by default.  They can be found in the `/api/responses` directory of your project.  To customize these, simply edit the appropriate .js file. 
Sails v.10은 서버의 응답을 커스터마이징 할 수 있다. 세일즈는 기본적으로 가장 일반적인 응답 타입이 내장되어있다. 그것들은 `/api/responses`디렉토리에 위치 해있다. 이것을 커스터마이징 하기 위해서는, 간단하게 알맞은 .js파일을 수정하면된다.

간단한 예제로, 아래의 컨트롤러 액션을 살펴보자:

```
foo: function(req, res) {
   if (!req.param('id')) {
     res.status(400);
     res.view('400', {message: 'Sorry, you need to tell us the ID of the FOO you want!'});
   }
   ...
}
```

이 코드는 400 에러 상태와 함께 간단하게 문제에 대한 내용을 표시해줌으로써 잘못된 요청을 다룬다. 그러나, 이 코드는 심각한 문제가 있으며, 그러한 문제는 주로:

*  *정규화*되지 않았다; 이 코드는 이 인스턴스에 국한되어 있고, 우리는 이러한 포멧을 모든곳에 유지해야만 한다.
*  *추상화*되지 않았다; 다른곳에서 이와 같이 접근을 원한다면, 이것을 복사 및 붙여넣기를 해야한다.
*  *content-협상*이 이루어지지 않았다; 클라이언트가 JOSN 응답을 기대하였을때, 이 코드는 쓸모가 없다.

이제, 이러한 요구사항을 만족시켜보자:

```
foo: function(req, res) {
   if (!req.param('id')) {
     res.badRequest('Sorry, you need to tell us the ID of the FOO you want!');
   }
   ...
}
```


이러한 접근 방법은 많은 장점이 있다:

 - 오류 페이로드가 정규화 되었다.
 - 배포 및 개발 로깅이 고려되었다.
 - 오류 코드가 일관성이 있다.
 - Content-협상 (JSON, HTML)이 반영되었다.
 - 일반적인 응답 파일에 하나의 수정으로 API 개조를 간편하게 할 수 있다.
 
### 응답 메서드와 파일

컨트롤러에서 `/api/responses` 폴더에 모든 `.js`파일을 `res.[responseName]`을 호출해서 실행 시킬 수 있다. 예를들면, `/api/responses/serverError.js`는 `res.serverError(error)`를 호출해서 실행 시킬수 있다. 이러한 요청 응답 객체는 응답 스크립트 안의 `this.req`와 `this.res` 에서 사용 할 수 있다; 이것은 실제 응답 함수가 어떠한 파라메터 (`serverError`의 `errors` 파라메터와 같은)를 취할 수 있다.

### 기본 응답

아래의 응답들은 모든 새 Sails 어플리케이션에서 `/api/responses`폴더 안에 존재한다. 각각의 응답파일들은 클라이언트가 JSON응답을 요청 했을때, `status`키와 함께 HTTP 상태 코드를 포함하는 정규화된 JSON 객체를 보낸다. 그리고 추가적인 키와 함께 에러와 관련된 정보역시 포함한다. 

#### res.serverError(errors)

이 응답은 읽을수 있는 형태의 `Error` 객체로 {errors}의 에러를 적절한 배열로 정규화한다. `errors`는 하나 혹은 이상의 문자열 또는 `Error` 객체가 될 수 있다. 그리고 모든 에러들을 Sails 로거(주로 콘솔)로 보내고, 만약 클라이언트가 HTML응답을 요구하면, `views/500.*` 뷰파일을 내보낸다. 만약 클라이언트가 JSON응답을 요구하면 JSON 객체를 내보낸다. 개발 모드에서는, 응답안에 에러들의 리스트가 포함되어 있으며, 배포 모드에서는, 실제 에러들이 간결하게 줄여져 있다.

#### res.badRequest(validationErrors, redirectTo)

요청자가 JSON을 요구할때, 이 응답은 400 상태 코드와 관련된 정보가 `vaildationErros`로 보내진다. 

전통적인 (비AJAX) 웹 폼을 위해서, 유저가 유효하지 않은 폼데이터를 전송했을때 미들웨어는 아래의 모범사례를 따른다.

 - 먼저, 일회성 플래시 변수를 생성한다. 아마도 문자열 메시지나 의미적 유효성 에러 객체의 배열이 될것이다.
 - 그리고는 사용자는 `redirectTo`로 보내질것이다. 예를들면, 잘못된 요청이 생성된 곳으로 되돌린다.
 - 거기에서, 컨트롤러 또는 뷰는 유효하지 않았던 HTML 폼필드를 강조하거나 메시지를 보내 줄 수기 위해 생성했던 `errors`라는 일회성 플레시 변수를 사용 할 수 있다.

#### res.notFound()

만약 요청자가 JSON을 기대하고 있다면, 이 응답은 단순히 404 상태 코드와 `{status: 404}` 객체를 보낸다.

아니면 `myApp/view/404.*`에 위치한 뷰가 전송 된다. 만약 뷰를 찾을 수 없다면, 클라이언트는 JSON으로 된 응답을 받게 된다.

#### res.forbidden(message)

만약 요청자가 JSON을 기대하고 있다면, 이 응답은 403 상태 코드를 `message`의 내용과 함께 보낸다.

아니면 `myApp/views/403.*`에 위치한 뷰가 전송 된다. 만약 뷰를 찾을 수 없다면, 클라이언트는 JOSN으로 된 응답을 받게 된다.

### 커스텀 응답

자신만의 커스텀 응답 메서드를 추가하고 싶다면, `/api/responses` 폴더에 만들고 싶은 메서드와 똑같은 이름의 파일을 추가하면 된다. 이 파일은 함수를 내보내야하고, 그 함수는 어떠한 파라메터도 받을 수 있게 된다.

```
/** 
 * api/responses/myResponse.js
 *
 * This will be available in controllers as res.myResponse('foo');
 */

module.exports = function(message) {
   
  var req = this.req;
  var res = this.res;
   
  var viewFilePath = 'mySpecialView';
  var statusCode = 200;

  var result = {
    status: statusCode
  };

  // Optional message
  if (message) {
    result.message = message;
  }

  // If the user-agent wants a JSON response, send json
  if (req.wantsJSON) {
    return res.json(result, result.status);
  }

  // Set status code and view locals
  res.status(result.status);
  for (var key in result) {
    res.locals[key] = result[key];
  }
  // And render view
  res.render(viewFilePath, result, function(err) {
    // If the view doesn't exist, or an error occured, send json
    if (err) {
      return res.json(result, result.status);
    }

    // Otherwise, serve the `views/mySpecialView.*` page
    res.render(viewFilePath);
  });   
```


<docmeta name="uniqueID" value="CustomResponses867259">
<docmeta name="displayName" value="Custom Responses">

