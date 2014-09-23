# 設定（Configuration）

### 概觀

雖然 Sails 盡責的堅守[慣例優於設定](http://en.wikipedia.org/wiki/Convention_over_configuration)的理念，但了解如何自訂這些方便的預設值是很重要的。對於幾乎每個 Sails 的慣例，允許你調整或覆蓋附帶的設定選項，以滿足你的需求。本章節的文件完整包含了 Sails 可用的設定選項。

Sails 應用程式可以透過[程式設定](https://github.com/mikermcneil/sails-generate-new-but-like-express/blob/master/templates/app.js#L15)，透過指定[環境變數](http://en.wikipedia.org/wiki/Environment_variable)或命令列參數，透過改變區域或全域 [`.sailsrc` 檔案](http://beta.sailsjs.org/#/documentation/anatomy/myApp/sailsrc.html)，或（最常見）使用照慣例位於專案內 [`config/`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config) 資料夾的樣版設定檔案。執行時期可透過 `sails` 全域變數的 `sails.config` 在應用程式使用合併後的設定。


### 標準設定檔案 (`config/*`)

在預設情況下，新的 Sails 應用程式包含許多的設定檔案。這些樣版檔案包含了一些行內註解，目的是為了提供一個快速、即時的參考，而不必來回跳轉於文件與文字編輯器之間。

在多數情況下，`sails.config` 物件的頂層鍵值（例如 `sails.config.views`）對應於在應用程式內的特定設定檔案（例如 `config/views.js`）；然而組態設定可以安排在 `config/` 目錄內任何你喜歡的檔案中。重要的部份是設定的名稱（即鍵值），不是它從哪個檔案來。

舉例來說，假設你新增一個新檔案，`config/foo.js`：

```js
// config/foo.js
// 物件會被合併到 `sails.config.blueprints`：
module.exports.blueprints = {
  shortcuts: false
};
```

對於個別設定項目的詳細參考資料，預設存在於該設定檔中，請參考本章節內的參考資料頁面，或查看[Sails 應用程式剖析](./#!documentation/anatomy)的[「`config/`」](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config)取得更多的說明。





### 在你的應用程式存取 `sails.config`

`config` 物件存在於 Sails 應用程式實例（`sails`）。預設情況下，在啟動時會置於[全域範圍](http://beta.sailsjs.org/#/documentation/concepts/Globals)，因此存在於應用程式的任何地方。

##### 範例
```javascript
// 這個範例在檢查當生產模式時 csrf 必需啟動。
// 否則，拋出錯誤並終止應用程式。
if (sails.config.environment === 'production' && !sails.config.csrf) {
  throw new Error('STOP IMMEDIATELY ! CSRF should always be enabled in a production deployment!');
}
```



### 自訂組態設定
Sails 能辨認頂層鍵值下的許多不同設定、名稱空間（如 `sails.config.sockets` 和 `sails.config.blueprints`）。但是，你也可以在你的自訂組態設定使用 `sails.config`（如`sails.config.someProprietaryAPI.secret`）。

##### 範例

```javascript
// config/linkedin.js
module.exports.linkedin = {
  apiKey: '...',
  apiSecret: '...'
};
```

```javascript
// 在你的 controller/service/model/hook/whatever:
// ...
var apiKey = sails.config.linkedin.apiKey;
var apiSecret = sails.config.linkedin.apiSecret;
// ...
```




### 設定 `sails` 命令列介面

當談到組態設定，大部分時間你會專注於管理特定應用程式的執行時期設定：連接埠、資料庫連線，等等。然而，為了簡化你的工作流程，減少重複性任務，執行自訂的自動化建置等，自訂 Sails 命令列介面也是很有用的。值得慶幸的是，Sails v0.10 增加了強大的新工具來做到這一點。

[`.sailsrc` 檔案](http://beta.sailsjs.org/#/documentation/anatomy/myApp/sailsrc.html)與其他在 Sails 中的設定檔不同，它也可以被用於設定 Sails 命令列介面－無論是全系統、目錄群組或僅當你 `cd` 到特定資料夾。這樣做的主要理由是自訂用於執行 `sails generate` 和 `sails new` 的[產生器](http://beta.sailsjs.org/#/documentation/concepts/extending-sails/Generators)，但它在安裝你自己的自訂產生器或套用覆蓋寫死的設定也很有用。

而且，由於 Sails 會尋找距離目前工作目錄的父目錄最近的 `.sailsrc`，你可以放心的使用該檔案來設定無法簽入雲端代碼儲存庫的敏感組態（_如 **資料庫密碼**_。）只要在你的「$HOME」目錄加入 `.sailsrc` 檔案。查看[`.sailsrc` 文件](http://beta.sailsjs.org/#/documentation/anatomy/myApp/sailsrc.html)檔案取得更多資訊。




### 注意事項
> 在 `sails.config` 內的設定的意義是，在某些情況下，只有在 Sails 「啟動」時才會被解析。換句話說，在執行時期改變一些選項並不會生效。舉例來說，要改變應用程式執行所用的連接埠，你不能只改變 `sails.config.port`，你需要改變或覆寫組態檔的設定或命令列的參數等，然後重新啟動伺服器。



<docmeta name="uniqueID" value="Configuration615655">
<docmeta name="displayName" value="Configuration">

