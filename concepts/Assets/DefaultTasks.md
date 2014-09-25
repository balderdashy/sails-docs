# 預設任務（Default Tasks）

### 概觀

Sails 內的 asset pipeline 是一組能增加專案一致性和效率的 Grunt 任務設定。整個前端資源工作流程可完全自訂，它提供了一些可立即使用的預設任務。Sails 可以很容易的[設定新任務](/#/documentation/concepts/Assets/TaskAutomation.html?q=task-configuration)，以滿足你的需求。

這些 Sails 預設的 Grunt 組態設定可協助你：
- 自動編譯 LESS
- 自動編譯 JST
- 自動編譯 Coffeescript
- 自訂的資源自動注入、壓縮及合併
- 建立網站公用目錄
- 監視和同步檔案
- 優化生產環境的資源

### 預設 Grunt 任務行為

以下是包含在 Sails 專案的 Grunt 任務及每個任務的簡短說明。此外，還包含了每個任務的使用說明連結。

##### clean

> 這個 grunt 任務是用來清理 sails 專案裡 `.tmp/public/` 的內容。

> [使用說明](https://github.com/gruntjs/grunt-contrib-clean)

##### coffee

> 從 `assest/js/` 將 coffeeScript 檔案編譯成 Javascript 並放到 `.tmp/public/js/` 目錄。

> [使用說明](https://github.com/gruntjs/grunt-contrib-coffee)

##### concat

> 合併 javascript 和 css 並將合併後的檔案放到 `.tmp/public/concat/` 目錄。

> [使用說明](https://github.com/gruntjs/grunt-contrib-concat)

##### copy

> **dev 任務設定**
> 從 sails 資源資料夾複製 coffeescript 和 less 以外的所有目錄與檔案到 `.tmp/public/` 目錄。

> **build 任務設定**
> 從 `.tmp/public/` 目錄複製所有目錄及檔案到 www 目錄。

> [使用說明](https://github.com/gruntjs/grunt-contrib-copy)

##### cssmin

> 壓縮 css 檔案並放到 `.tmp/public/min/` 目錄。

> [使用說明](https://github.com/gruntjs/grunt-contrib-cssmin)

##### jst

> 預先將 Underscore 樣版編譯成 `.jst` 檔案。（也就是說，它需要樣版檔案並將其轉換成微小的 javascript 函數）。這可以加速在用戶端的樣版呈現，及減少頻寬的消耗。

> [使用說明](https://github.com/gruntjs/grunt-contrib-jst)

##### less

> 將 LESS 檔案編譯成 CSS。只有 `assets/styles/importer.less` 會被編譯。這讓你可以自行控制順序，即在其他樣式之前匯入你的相依（Dependencies）、混入（Mixins）、變數（Variables）、重置（Resets）等等。

> [使用說明](https://github.com/gruntjs/grunt-contrib-less)

##### sails-linker

> 自動為 javascript 檔案注入 `<script>` 標籤以及為 css 檔案注入 `<link>` 標籤。還可以自動連接輸出檔案到使用 `<script>` 標籤的預先編譯樣版。這個任務的詳細說明可以在[這裡](https://github.com/balderdashy/sails-generate-frontend/blob/master/docs/overview.md#a-litte-bit-more-about-sails-linking)找到，但最大的改變是*只有*當檔案包含 `<!--SCRIPTS--><!--SCRIPTS END-->` 和/或 `<!--STYLES--><!--STYLES END-->` 才會做 script 和 stylesheet 注入。這些都包含在新 Sails 專案預設的 **views/layout.ejs** 檔案。如果不想在專案使用連接器，只需刪除這些標籤。

> [使用說明](https://github.com/Zolmeister/grunt-sails-linker)

##### sync

> 保持目錄同步的 grunt 任務。它與 grunt-contrib-copy 非常類似，但僅會嘗試複製那些真正有改變的檔案。它明確的從 `assets/` 資料夾同步檔案到 `.tmp/public/`，並覆蓋任何已存在的檔案。

> [使用說明](https://github.com/tomusdrw/grunt-sync)

##### uglify

> 壓縮用戶端 javascript 資源。

> [使用說明](https://github.com/gruntjs/grunt-contrib-uglify)

##### watch

> 當被監視的檔案類型被新增、修改或刪除，執行預先定義的任務。監視 `assets/` 資料夾的檔案異動，並重新執行對應的任務（例如編譯 less 和 jst）。這讓你可以看到應用程式的資源變更，而無需重新啟動 Sails 伺服器。

> [使用說明](https://github.com/gruntjs/grunt-contrib-watch)

<docmeta name="uniqueID" value="DefaultTasks764297">
<docmeta name="displayName" value="Default Tasks">

