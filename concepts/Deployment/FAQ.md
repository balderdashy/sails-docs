# 常見問題（FAQ）


##### 我可以使用環境變數嗎？

你可以在 Sails 使用環境變數設定 `port` 和 `environment`。
`NODE_ENV=production sails lift`
`PORT=443 sails lift`

##### 在哪邊放置我的正式環境資料庫憑證（credentials）或其它設定？

對於其它部署／特定機器的設定，也就是任何形式的憑證，你應該使用 `config/local.js`。
它預設包含在 `.gitignore` 檔案，這樣你就不會無意中提交憑證到程式碼儲存庫。

**config/local.js**
```javascript
// Local configuration
// 
// Included in the .gitignore by default,
// this is where you include configuration overrides for your local system
// or for a production deployment.
//
// For example, to use port 80 on the local machine, override the `port` config
module.exports = {
    port: 80,
    environment: 'production',
    adapters: {
        mysql: {
            user: 'root',
            password: '12345'
        }
    }
}
```

##### 如何讓應用程式運作在伺服器上？
你的 Node.js 實例已正常運作嗎？在第一次的時候，當你有一個 IP 位址，便可以 ssh 連線到它，執行 `sudo npm install -g forever` 來安裝 Sails 和 forever。

然後，`git clone` 你的專案（或 `scp` 到伺服器，如果它不在 git 儲存庫中）到伺服器並 `cd` 進入，接著 `forever start app.js`。


### 效能基準

Sails 的效能可與你所期望的標準 Node.js/Express 應用程式相比。換句話說，就是「快」！我們在 Sails 和 Waterline 做了一些優化，但本質上，我們的重點是不要把已經非常快的東西搞糟了。最重要的，我們要感謝 @ry、@visionmedia、@isaacs、#v8、@joyent 和在 Node.js 核心團隊的其他成員。

+ http://serdardogruyol.com/?p=111


<docmeta name="uniqueID" value="FAQ475097">
<docmeta name="displayName" value="FAQ">

