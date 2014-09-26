# 控制器（Controllers）

### 概觀

控制器（**MVC** 中的 **C**）是 Sails 應用程式負責回應來自瀏覽器、行動應用程式或能夠與伺服器通訊的任何其他系統*請求*的主要物件。它們經常擔任[模型](http://beta.sailsjs.org/#/documentation/concepts/ORM/Models.html)和[檢視](/#/documentation/concepts/Views)間的橋樑。對於許多應用程式來說，控制器會包含大量[商業邏輯](http://en.wikipedia.org/wiki/Business_logic)。

### 動作（Actions）
控制器是由稱為*動作*的方法集合所組成。可以在應用程式將動作綁定到[路由](/#/documentation/concepts/Routes)，這樣當用戶端請求路由時，綁定的動作便會執行一些商業邏輯且（在多數情況下）產生一個回應。例如，應用程式中的 `GET /hello` 路由可以被綁定到像這樣的方法：

```javascript
function (req, res) {
  return res.send("Hi there!");
}
```

因此，在任何時候訪問應用程式伺服器的 `/hello` 網址，頁面會顯示 「Hi there」訊息。

### 在哪裡定義控制器？
控制器定義在 `api/controllers/` 資料夾。你可以放置任何喜歡的檔案在該資料夾，但為了讓它們被 Sails 當做控制器被載入，檔案名稱的*結尾*必須是 `Controller.js`。按照慣例，Sails 控制器通常是用 [*Pascal 命名法*](http://c2.com/cgi/wiki?PascalCase)， 所以檔案名稱的任何單字（包括第一個單字）首字大寫：舉例來說，`UserController.js`、`MyController.js` 和 `SomeGreatBigController.js` 都是有效的 Pascal 命名。

你可以透過將控制器儲存到 `api/controllers` 的子資料夾來編組，但是請注意，用於路由（更多資訊在下方「路由」章節中）的時候，子資料夾的名稱*會成為控制器的標記的一部分*。

### 控制器檔案看起來是什麼樣子？
一個控制器檔案定義了一個 Javascript 物件，它的鍵是動作名稱，而值則是對應的動作方法。下面是一個完整的控制器檔案的簡單範例：

```javascript
module.exports = {
  hi: function (req, res) {
    return res.send("Hi there!");
  },
  bye: function (req, res) {
    return res.redirect("http://www.sayonara.com");
  }
};
```

這個控制器定義了兩個動作：「hi」回應了一個字串，而「bye」則重新導向到其他網站。對於用過 [Express.js](https://github.com/expressjs) 撰寫網頁應用程式的人會很熟悉 `req` 和 `res` 物件。這是設計使然，因為 Sails 實際上是採用 Express 來處理路由。要特別注意，動作缺少了 `next` 參數。不同於 Express  中介軟體的方法，Sails 控制器動作應始終在請求鏈中的最後一站，也就是說，它們應該產生回應或錯誤。雖然可以在動作中使用 `next`，在可能的情況下，強烈建議你改為使用[政策](/#/documentation/concepts/Policies)。

### 路由（Routing）

預設情況下，Sails 會幫控制器的每個動作建立[動作藍圖路由](/#/documentation/reference/blueprint-api)，以致於發送 `GET` 請求到 `/:controllerIdentity/:nameOfAction` 會觸發動作。如果上一節的控制器範例被儲存為 `api/controllers/SayController.js`，那麼每當應用程式啟動時，會預設提供 `/say/hi` 和 `/say/bye` 路由。如果控制器是儲存在 `/we` 子資料夾中，那麼路由將是 `/we/say/hi` 和 `/we/say/bye`。請查看[藍圖文件](http://beta.sailsjs.org/#/documentation/reference/blueprint-api)取得更多關於 Sails 的自動路由綁定的資訊。

除了預設的路由，Sails 可讓你透過 [`config/routes.js`](/#/documentation/concepts/Routes) 檔案手動綁定路由到控制器動作。以下是你可能需要使用顯式路由的一些範例：

+ 當你想基於 [HTTP 方法](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)（又稱「動詞」）使用不同的動作來處理相同的路由。上述的**動作藍圖**路由綁定了*所有*請求方法到給定的動作，包括 `GET`、`POST`、`PUT`、`DELETE` 等。
+ 當你想提供一個自訂網址給動作（例如 `PUT /login`、`POST /signup`，或個人化網址如 `GET /:username`）
+ 當你想為路由設定額外處理方式（例如特殊的 CORS 設定）

要在 `config/routes.js` 檔案手動綁定路由到控制器動作，你可以使用 HTTP 動詞和路徑（即**路由地址**）為鍵，以及控制器名稱加上 `.` 再加上動作名稱為值（即**路由目標**）。

舉例來說，當應用程式在收到 POST `/make/a/sandwich` 請求時，下面的路由會觸發在 `api/controllers/SandwichController.js` 內的 `makeIt()` 動作：

```js
  'POST /make/a/sandwich': 'SandwichController.makeIt'
```


> **注意事項：**
>
> 對於儲存在子資料夾的控制器檔案來說，子資料夾是控制器的標記的一部分：
>
> ```js
>   '/do/homework': 'stuff/things/HomeworkController.do'
> ```
>
> 當 `/do/homework` 被請求時，會觸發 `api/controllers/stuff/things/HomeworkController.js` 內的 `do()` 動作。

充分討論自訂路由已超出本文件的範圍，請查看[路由文件](/#/documentation/concepts/Routes)取得可用選項的完整介紹。



### 「精簡」控制器（「Thin」 Controllers）

大多數 MVC 框架建議編寫「精簡」控制器，而 Sails 也不例外（維持你的 Sails 控制器盡可能簡單是個好主意），還有助於了解「為什麼？」

控制器程式碼本質上是仰賴於某種觸發或事件。在如 Sails 的後端框架，這個事件幾乎總是傳入的請求。因此，常會看到在仰賴於「請求上下文」（`req` 和 `res` 物件）的控制器動作內寫了一堆程式碼。當你想要在一個只有些許異動的動作或命令列用那些程式碼前，那樣是沒有問題的。

「精簡控制器」理念的目標是，鼓勵從任何範圍去除重複使用的程式碼。在 Sails，你可以用多種方式實現這一點，但最常見從控制器分離程式碼的方法是：

+ 撰寫一個自訂模型方法來封裝一些程式碼，用來執行與特定模型相關的特定任務
+ 撰寫一個服務函數來封裝一些程式碼，用來執行應用程式的特定任務
+ 如果你發現一些程式碼在多個不同的應用程式都很實用，若有時間的話，你應該將它提取為一個 node 模組。然後你可以在組織內共享它，將它使用在未來的專案。或者更好的是，基於開放原始碼授權許可[發佈到 npm]()，讓其他開發者可以使用並協助維護。


### 產生控制器（Generating controllers）

你可以使用 [Sails 命令列工具](/#/documentation/reference/cli)來快速產生控制器，透過輸入：

```sh
$ sails generate controller <控制器名稱> [用空格分隔的動作名稱]
```

舉例來說，如果你執行以下指令：

```sh
$ sails generate controller comment create destroy tag like
info: Generated a new controller `comment` at api/controllers/CommentController.js!
```

Sails 會產生 `api/controllers/CommentController.js`：

```javascript
/**
 * CommentController.js
 *
 * @description :: Server-side logic for managing comments.
 */

module.exports = {

  /**
   * CommentController.create()
   */
  create: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  },

  /**
   * CommentController.destroy()
   */
  destroy: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  },

  /**
   * CommentController.tag()
   */
  tag: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  },

  /**
   * CommentController.like()
   */
  like: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  }
};
```


<docmeta name="uniqueID" value="Controllers464694">
<docmeta name="displayName" value="Controllers">

