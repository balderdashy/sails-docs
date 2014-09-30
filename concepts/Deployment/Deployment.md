# 部署（Deployment）

### 概觀

#### 在部署之前

在你啟動任何網頁應用程式前，你應該問自己幾個問題：

+ 你預期的流量為何？
+ 你的合約是否要求滿足任何正常執行時間保證，如服務層級協議（SLA）？
+ 哪種前端應用程式會觸及你的網頁應用程式？
  + Android 應用程式
  + iOS 應用程式
  + 桌面版網頁瀏覽器
  + 行動版網頁瀏覽器（平板電腦、電話、iPad mini？）
  + 電視、手錶、烤麵包機…？
+ 以及它們會要求什麼東西？
  + JSON？
  + HTML？
  + XML？
+ 你會利用 Socket.io 的即時發布訂閱功能？
  + 例如聊天、即時分析、應用程式內通知／訊息
+ 你是如何追蹤崩潰與錯誤？
  + 看看 Sails 的日誌設定



#### 部署在單一伺服器

Node.js 非常快速。對於許多應用程式，在一開始一台伺服器就足夠處理預期的流量。

##### 設定

+ 所有正式環境設定都儲存在 `config/env/production.js`
+ 設定應用程式執行於連接埠 80（如果不是在如 nginx 之類的代理之後）。如果你使用的是 nginx，一定要對其設定中繼 WebSocket 到應用程式。你可以在 nginx 文件 [WebSocket proxying](http://nginx.org/en/docs/http/websocket.html) 找到指南。
+ 設定「正式」環境，讓所有的 css/js 被打包，且內部伺服器被切換到適當的環境（需要[連接器](https://github.com/balderdashy/sails-wiki/blob/0.9/assets.md)）。
+ 務必確認資料庫已設定在正式伺服器。更重要的一點是，如果你使用的是關聯式資料庫如 MySQL，當執行於正式環境時， Sails 會設定所有的模型為 `migrate:safe`，這代表啟動應用程式時不會進行自動移轉。你可以用以下方法設定資料庫：
  + 在伺服器上建立資料庫，使用正式伺服器作為資料庫，然後在本地使用 `migrate:alter` 設定執行 Sails 應用程式。這樣就自動設定好了。
  +  如果你無法遠端連線伺服器，你可以倒出在本地端的結構，並將其匯入到資料庫伺服器。
+ 啟用 CSRF 來保護 POST、PUT 及 DELETE 請求
+ 啟用 SSL
+ 如果你使用 SOCKETS：
  + 設定 `config/sockets.js` 並使用 socket.io 的[正式環境建議設定](https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO#recommended-production-settings)
    + 例如啟用 `flashsocket` 傳輸

##### 部署

在正式環境中，你會想要使用 forever 或 PM2 來取代 `sails lift`，以確保即使應用程式崩潰了也會繼續運作。

+ 安裝 forever：`sudo npm install -g forever`
  + 更多關於 forever 的資訊：https://github.com/nodejitsu/forever
+ 或安裝 PM2：`sudo npm install pm2 -g --unsafe-perm`
  + 更多關於 PM2 的資訊：https://github.com/Unitech/pm2 
+ 從你的應用程式目錄，使用 `forever start app.js --prod` 或 `pm2 start app.js -x -- --prod` 啟動伺服器
  + 這和 `sails lift --prod` 所做的事相同，但是當伺服器崩潰時，它會自動重新啟動。
 


<docmeta name="uniqueID" value="Deployment402941">
<docmeta name="displayName" value="Deployment">

