# 中介軟體（Middleware）

Sails 與 Express/Connect 中介軟體完全相容，事實上，它遍佈各處！你在 Sails 內寫的許多程式碼實際上就是中介軟體；特別是[控制器動作](http://beta.sailsjs.org/#/documentation/concepts/Controllers?q=actions)和[政策](http://beta.sailsjs.org/#/documentation/concepts/Policies)。


### HTTP 中介軟體

Sails 也利用一個附加的[可設定的中介軟體堆疊](http://beta.sailsjs.org/#/documentation/concepts/Middleware?q=adding-or-overriding-http-middleware)來處理 HTTP 請求。每當你的應用程式收到 HTTP 請求時，會依照以設定的 HTTP 中介軟體堆疊依序執行。

> 請注意，這個 HTTP 中介軟體堆疊只能用於「真實的」HTTP 請求，**虛擬的請求**會被忽略（例如，來自 Socket.io 連線的請求。）



#### 慣例預設值

Sails 附帶綁定了一套常見且隨時可用的 HTTP 中介軟體。你當然可以禁用、覆寫、重新排列或附加到它，但對於大多數應用程式來說，預先安裝的堆疊在開發模式或正式環境下是完全可以接受的。下面是 Sails 附帶的標準 HTTP 中介軟體功能，每當伺服器收到傳入的 HTTP 請求時，他們會依序執行：

 HTTP 中介軟體鍵            | 用途
 ------------------------- | ------------
 **startRequestTimer**     | 當請求開始時，在記憶體中分配一個變數儲存時間戳記。可以被應用程式存取，用來提供關於緩慢請求的診斷資訊。
 _cookieParser_ *          | 解析 cookie 標頭到一個乾淨物件，以便在後續的中介軟體和程式碼使用。
 _session_ *               | 使用你的[會話組態設定](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.session.html)來設定一個唯一的會話物件。
 **bodyParser**            | 使用 [Skipper](https://github.com/balderdashy/skipper) 來分析 HTTP 請求的參數和二進位串流上傳（串流檔案上傳）。
 **compress**              | 使用 gzip/deflate 壓縮回應資料。
 **methodOverride**        | 提供人造的 HTTP 方法支援，讓你可以在不支援如 PUT 或 DELETE 的 HTTP 動詞的用戶端使用它（如舊版的 Internet Explorer）。如果請求包含一個設定為 `"PUT"` 的 `_method` 參數，當它是正確的 PUT 請求時，便會被路由轉發。如果有需要的話，請查看 [Connect 的 methodOverride 文件](http://www.senchalabs.org/connect/methodOverride.html)取得更多資訊。
 **poweredBy**             | 在傳出的回應附加一個 `X-Powered-By` 標頭。
 **$custom**               | 提供向下支援 Sails v0.9.x 的組態設定。由於 Sails v0.10 為 HTTP 中介軟體提供了更多的靈活設定，只要你沒有使用 `sails.config.express.customMiddleware`，你可以放心的從清單中刪除此項目。
 _router_ *                | 這裡是大多數應用程式邏輯被套用到任何給定的請求的地方。除了在掛勾（例如，強制 csrf 標記）執行 `"before"` 處理程序和一些內部 Sails 邏輯之外，這個路由請求使用應用程式的顯式路由（在 [`sails.config.routes`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.routes.html)）和／或藍圖路由。
 _www_ *                   | 使用 Connect 的 [靜態中介軟體](http://www.senchalabs.org/connect/static.html)在應用程式的「public」資料夾（設定位於 [`sails.config.paths`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)，依照慣例是 [`.tmp/public/`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)）提供圖片、樣式表、腳本等靜態檔案。
 **favicon**               | 如果有 `/assets/favicon.ico` 的話，為應用程式提供[瀏覽器 favicon](http://en.wikipedia.org/wiki/Favicon)。
 _404_ *                   | 處理不符合任何路由的請求－會觸發 `res.notFound()`  <!-- technically, this emits the `router:request:404` event)  -->
 _500_ *                   | 處理引發內部錯誤的請求（即呼叫 Express 的 `next(err)`）－會觸發 `res.serverError()` <!-- technically, this emits the `router:request:500` event)  -->

###### 圖例：

+ `*`－以上帶有星號（\*）的中介軟體應該_幾乎從來不_需要修改或移除。請只有在了解自己在做什麼的時候才這樣做。



#### 加入或覆寫 HTTP 中介軟體

要自訂一個 HTTP 中介軟體功能，只需定義新的 HTTP 鍵 `sails.config.http.middleware.FOO` 並將它設定到中介軟體組態設定函數中，接著把字串名稱（FOO）加到 `sails.config.http.middleware.order` 陣列內任何想要在中介軟體鏈執行它的地方（在「cookieParser」之前可能是放置它的好地方）：

例如，在`config/http.js`：

```js
  // ...
  middleware: {
    
    // 用 `foobar` 鍵定義一個自訂 HTTP 中介軟體功能：
    foobar: function (req,res,next) { /*...*/ next(); },

    // 用 `passportInit` 和 `passportSession` 鍵定義另一對自訂 HTTP 中介軟體功能
    //（注意，這次我們使用的是來自 npm 現有的中介軟體庫）
    passportInit    : require('passport').initialize(),
    passportSession : require('passport').session(),

    // 覆寫 cookie 解析器：
    cookieParser: function (req, res, next) { /*...*/ next(); },


    // 現在，設定我們的 HTTP 中介軟體順序
    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'passportInit',            // <==== passport HTTP 中介軟體應該在「session」之後執行
      'passportSession',         // <====（請查看 https://github.com/jaredhanson/passport#middleware 得更多資訊。）
      'bodyParser',
      'compress',
      'foobar',                  // <==== 我們可以把這些東西放在任何想放的地方
      'methodOverride',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ]
  },
  
  customMiddleware: function(app){
     //適用於不遵循 'app.use(middleware)' 慣例的其它中介軟體
     require('other-middleware').initialize(app);
  }
  // ...
```


### Sails 的 Express 中介軟體

其中一個關於 Sails 應用程式非常好的事是，他們可以利用已存在的 Express/Connect 中介軟體取得優勢。但是，人們真正在嘗試時最常出現的問題是：

> _「我要在哪邊 `app.use()` 這個東西？」_.

在大多數情況下，答案是將 Express 中介軟體作為自訂 HTTP 中介軟體安裝在 [`sails.config.http.middleware`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html)。它會被所有發送到應用程式的 HTTP 請求觸發，且允許你設定相應於其它 HTTP 中介軟體的執行順序。

### Sails 的 Express 路由中介軟體

你也可以將 Express 中介軟體作為政策載入，只需將它設定在  [`config/policies.js`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html)。你也可以載入和設定中介軟體在一個實際的封裝政策（通常是個好主意）或直接在 policies.js 檔案載入它。下面的範例使用了一種簡潔的方法：

```js
{
  '*': true,
  
  ProductController: {
  
    // 避免消費者在預留給管理者的產品做 CRUD 操作
    //（使用基本 HTTP 驗證）
    '*': require('http-auth')({
      realm: 'admin area'
    }, function customAuthMethod (username, password, onwards) {
      return onwards(username === "Tina" && password === "Bullock");
    }),
    
    // 任何人都可以瀏覽產品頁面
    show: true
  }
}
```



<!--

  TODO:

### Advanced Express Middleware In Sails

You can actually do this in a few different ways, depending on your needs.



Generally, the following best-practices apply:

If you want a middleware function 
 
+ If you want a piece of middleware to run only when your app's explicit or blueprint routes are matched, you should include it as a policy.
+ this will run passport for all incoming http requests, including images, css, etc.

If you want a middleware function to run for all you should include it at the top of your `config/routes.js` as a wildcard route.  for your controller (both HTTP and virtual) requests
-->





<docmeta name="uniqueID" value="middleware198259">
<docmeta name="displayName" value="Middleware">
