# 擴充（Scaling）

如果你預料到會有大流量到應用程式（或者更好的是，你已經擁有大流量！），你要建立一個可擴充的架構，讓應用程式可以隨著越來越多人使用而進行擴充。

### 效能基準（Benchmarks）

在大多數情況下，Sails 效能與任何 Connect、Express 或 Socket.io 應用程式相同。這已在幾個不同的場合下被證實，最近一次是在[這裡](http://serdardogruyol.com/?p=111)。如果你有自己的效能基準想和大家分享，請在 Github 發送 pull request 到本頁面。


### 範例架構

```
　　　　　          Sails.js 伺服器
　　　　　                ....                 
　　　　　       /  Sails.js 伺服器  \      /  資料庫（如 Mongo、Postgres 等）
負載平衡器  <-->    Sails.js 伺服器    <-->    Socket 儲存區（Redis）
　　　　　       \  Sails.js 伺服器  /      \  會話（Session）儲存區（Redis）
　　　　　                ....                 
　　　　　          Sails.js 伺服器
```


### 設定應用程式的叢集部署

+ 確保模型所使用的資料庫（如 MySQL、Postgres、Mongo）具有可擴充性（如分片叢集）
+ 設定應用程式使用共享的會話（Session）儲存區
  + 內建支援 redis（查看 `config/session.js` 內的 `adapter` 選項）
+ 如果你使用 SOCKETS：
  + 設定應用程式使用共享的 socket 儲存區
  + 內建支援 redis（查看 `config/sockets.js` 內的 `adapter` 選項）
  + 注意：如果你不想設定 socket 儲存區，這種狀況下可行的解決方案是在負載平衡器使用黏性會話（sticky sessions）。
+ 確保應用程式可能會使用的其他相依功能沒有依賴於共享記憶體。

### 部署 Sails 叢集到多台伺服器

+ 在負載平衡器之後部署多個實例（又稱伺服器執行應用程式的副本）
  + 在每個實例使用 `forever` 啟動 Sails
  + 更多關於負載平衡器的資訊：http://en.wikipedia.org/wiki/Load_balancing_(computing)
+ 設定負載平衡器終止 SSL 請求
  + 因為傳輸已經被解密，你不需要在 Sails 使用 SSL 設定


<docmeta name="uniqueID" value="Scaling291270">
<docmeta name="displayName" value="Scaling">

