# 日誌（Logging）

### 概觀
Sails 內建一個名為 [`captains-log`](https://github.com/balderdashy/captains-log) 的簡單日誌記錄器。它的用法與 Node 的 [`console.log`](http://nodejs.org/api/stdio.html) 非常類似，但有一些額外的功能；即支援在終端機輸出多種含前綴字和顏色的日誌等級。

### 組態設定
Sails 日誌記錄器的設定在 [`sails.config.log`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.log.html)，照慣例預設對應 Sails 專案的設定檔（[`config/log.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/log.js.html)）。

當設定了一個日誌輸出等級，Sails 會在相同或高於目前設定等級時輸出日誌訊息。這個日誌等級已標準化，且適用於從 socket.io、Waterline 及其它相依功能產生輸出。日誌等級和相應的優先權分級結構總結為以下圖表：

| 優先權 | 等級      | 可見的日誌          |
|-------|-----------|-------------------|
| 0     | silent    | 無 |
| 1     | error     | `.error()` |
| 2     | warn      | `.warn()`, `.error()` |
| 3     | debug     | `.debug()`, `.warn()`, `.error()` |
| 4     | info      | `.info()`, `.debug()`, `.warn()`, `.error()` |
| 5     | verbose   | `.verbose()`, `.info()`, `.debug()`, `.warn()`, `.error()` |
| 6     | silly     | `.silly()`, `.verbose()`, `.info()`, `.debug()`, `.warn()`, `.error()` |


#### 注意事項
+ 預設的日誌等級是「info」。當你設定應用程式的日誌等級為「info」，Sails 會記錄關於伺服器／應用程式狀態的有限資訊。
+ 當日誌等級設定為「silly」，Sails 會記錄已被綁定的路由、其它詳細的框架生命週期資訊、診斷和實作細節等內部資訊。
+ 當日誌等級設定為「verbose」，Sails 會記錄 Grunt 的輸出，以及更詳細的路由、模型、掛勾（hook）等被載入的資訊。


<docmeta name="uniqueID" value="Logging277763">
<docmeta name="displayName" value="Logging">

