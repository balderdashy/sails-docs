# 資源（Assets）

### 概觀

資源指的是在你的伺服器上想讓外界存取的[靜態檔案](http://en.wikipedia.org/wiki/Static_web_page)（js、css、圖檔等等）。在 Sails，這些檔案都放在 [`assets/`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/assets) 目錄，當你啟動應用程式，他們會被處理並同步到一個隱藏的暫存目錄(`.tmp/public/`)。這個 `.tmp/public` 資料夾就是 Sails 實際提供的內容，大致等同於 [express](https://github.com/expressjs) 的「public」資料夾，或是其他你或許熟悉的網站伺服器如 Apache 的「www」資料夾。這中間的過程允許 Sails 準備或預先編譯在用戶端上使用的資源，像是 LESS、CoffeeScript、SASS、spritesheets、Jade 樣版等等。

### 靜態中介軟體（Static middleware）

在幕後，Sails 使用 Express 的[靜態中介軟體](http://www.senchalabs.org/connect/static.html)來提供你的資源。你可以在 [`/config/http.js`](/#/documentation/reference/sails.config/sails.config.http.html) 設定這個中介軟體（例如 cache 設定）。

##### `index.html`
如同大多數網頁伺服器，Sails 實踐了 `index.html` 慣例。舉例來說，如果你在新的 Sails 專案建立 `assets/foo.html`，便可透過 `http://localhost:1337/foo.html` 存取。但是，如果你建立 `assets/foo/index.html`，則可透過 `http://localhost:1337/foo/index.html` 及 `http://localhost:1337/foo` 存取。

##### 優先權
重要的是需注意靜態[中介軟體](http://stephensugden.com/middleware_guide/)是安裝在 Sails 路由**之後**。所以，如果你定義了一個[自訂路由](/#/documentation/concepts/Routes?q=custom-routes)，但在你的資源目錄也有檔案與該路徑衝突，自訂路由會在到達靜態中介軟體前攔截請求。舉例來說，如果你建立 `assets/index.html` 且沒有定義路由在 [`config/routes.js`](/#/documentation/reference/sails.config/sails.config.routes.html) 檔案，它會被當成你的首頁。但是如果你定義一個自訂路由 `'/': 'FooController.bar'`，將優先採用此路由。


<docmeta name="uniqueID" value="Assets220313">
<docmeta name="displayName" value="Assets">

