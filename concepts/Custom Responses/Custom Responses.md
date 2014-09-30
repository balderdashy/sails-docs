# 自訂回應（Custom Responses）

### 概觀

Sails v.10 允許自訂伺服器回應。Sails 預設附帶一些常見的回應類型。可以在專案的 `/api/responses` 目錄找到它們。只需編輯對應的 .js 檔案，就可以自訂。

作為一個簡單的範例，思考以下的控制器動作：

```
foo: function(req, res) {
   if (!req.param('id')) {
     res.status(400);
     res.view('400', {message: 'Sorry, you need to tell us the ID of the FOO you want!'});
   }
   ...
}
```

這個程式碼透過發送一個 400 錯誤狀態及簡短問題描述來處理錯誤請求。然而，這個程式碼有幾個缺點，主要是：

* 它不是*正規化*的：該代碼是特定於此情況，我們必須在任何地方努力保持相同的格式
* 它不是*被分離*的：當我們想要在其他地方使用類似的方法，就需要複製／貼上程式碼
* 它不是*內容協商*的：如果用戶端期待一個 JSON 回應，那別指望了

現在，思考一下這個修改：

```
foo: function(req, res) {
   if (!req.param('id')) {
     res.badRequest('Sorry, you need to tell us the ID of the FOO you want!');
   }
   ...
}
```


這種方法具有許多優點：

 - 錯誤被正規化
 - 有考慮到正式環境與開發環境的日誌記錄
 - 錯誤代碼是一致的
 - 有考慮到內容協商（JSON 與 HTML）
 - 可在適當的共用回應檔案快速的調整 API

### 回應方法和檔案（Responses methods and files）

任何儲存在 `/api/responses` 資料夾的 `.js` 腳本可透過在控制器內呼叫 `res.[responseName]` 來執行。例如，可以透過呼叫 `res.serverError(errors)` 來執行 `/api/responses/serverError.js`。在回應腳本內可以透過 `this.req` 和 `this.res` 取得請求及回應物件；這讓實際的回應方法可以取得任意參數。（如 `serverError` 的 `errors` 參數）。

### 預設回應

以下的回應已綁定在所有新的 Sails 應用程式的 `/api/responses` 資料夾內。當用戶端期望收到 JSON，會回應一個包含了 HTTP 狀態代碼的 `status` 鍵及任何錯誤相關資訊的正規化 JSON 物件。

#### res.serverError(errors)

這個回應會將錯誤正規化為適當、可讀取的 `Error` 物件。 `errors` 可以是一個或多個字串或 `Error` 物件。它會記錄所有錯誤到 Sails 記錄器（通常是終端機），並當用戶端期望收到 HTML 時回應 `views/500.*` 檢視檔案，或當用戶端期望收到 JSON 時回應一個 JSON 物件。在開發模式下，錯誤清單會包含在回應中。在正式環境下，實際的錯誤會受到抑制。

#### res.badRequest(validationErrors, redirectTo)

對於期望收到 JSON 的請求者，這個回應包含了 400 狀態碼及被作為 `validationErrors` 所傳送的任何相關資料。

對於傳統的（非 AJAX）網頁表單，當使用者提交無效的表單資料，這個中介軟體遵循了最佳做法：

 - 首先，一個暫存變數可能被填入了一個字串或語義驗證錯誤物件。
 - 然後，將使用者重新導向回 `redirectTo`，即發出錯誤請求的來源 URL。
 - 還有，控制器和／或檢視可能使用暫存變數 `errors` 來顯示訊息或突顯無效的 HTML 表單欄位。


#### res.notFound()

當請求者期望收到 JSON，這個回應會發送 404 狀態碼及一個 `{status: 404}` 物件。

否則，將發送位於 `myApp/views/404.*` 內的檢視。若找不到檢視，那麼便發送 JSON 回應。

#### res.forbidden(message)

當請求者期望收到 JSON，這個回應會發送 403 狀態碼及 `message` 的內容。

否則，將發送位於 `myApp/views/403.*` 內的檢視。若找不到檢視，那麼便發送 JSON 回應。

### 自訂回應

要加入你自己的自訂回應方法，只需新增與方法名稱相同的檔案到 `/api/responses`。該檔案應該導出函數，可以附帶任何你喜歡的參數。

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

