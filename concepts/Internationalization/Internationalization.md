# 國際化（Internationalization）

### 概觀

如果你的應用程式會觸及從世界各地而來的人或系統，國際化（i18n）和本地化（l10n）會是你國際化策略重要的一部分。Sails 提供內建支援，用於偵測用戶語言偏好設定和翻譯靜態單字／句子，這要歸功於 [i18n-node](https://github.com/mashpie/i18n-node)（[npm](https://www.npmjs.org/package/i18n)）。



<!--
  Potentially cover this:
  *(but it might be obvious and not useful/necessary to include, not sure- could also be more confusing than helpful)*
Note that this built-in support is for **dynamically-rendered** (but otherwise **static**) content.  You can only use it in responses which are pre-processed on the server.  In other words, you can use these translations in your views, controller actions, and policies, but stuff in your assets folder.)

we do not recommend translating strings in the front-end of your application (e.g. the browser or an iOS app) for a variety of reasons, the most obvious being SEO, but also fragmentation. You can of course still do so- just don't use this built-in support from the i18n hook.
-->


### 用法


在檢視內：
```ejs
<h1> <%= __('Hello') %> </h1>
<h1> <%= __('Hello %s, how are you today?', 'Mike') %> </h1>
<p> <%= i18n('That\'s right-- you can use either i18n() or __()') %> </p>
```


在控制器或政策內：
```javascript
req.__('Hello'); // => Hola
req.__('Hello %s', 'Marcus'); // => Hola Marcus
req.__('Hello {{name}}', { name: 'Marcus' }); // => Hola Marcus
```


或者，你已經知道語系 ID，你可以在應用程式內的任何地方使用 `sails.__` 翻譯：

```javascript
sails.__({
  phrase: 'Hello',
  locale: 'es'
});
// => 'Hola!'
```



### 語系
i18n 掛勾（hook）會從專案的「locales」目錄（預設是 `config/locales`）讀取 JSON 格式翻譯檔案。每個檔案對應一個 Sails 後端所支援的[語系](http://en.wikipedia.org/wiki/Locale)（通常是語言）。

這些檔案包含特定的語系字串（為 JSON 鍵值對），你可以使用在檢視、控制器等地方。

這裡有一個語系範例檔案（`config/locales/es.json`）：
```json
{
    "Hello!": "Hola!",
    "Hello %s, how are you today?": "¿Hola %s, como estas?",
}
```

請注意，語系檔內的鍵（例如 "Hello %s, how are you today?"）有**區分大小寫**且需要精準匹配。這裡有幾個不同思想流派的最佳翻譯，要選擇哪個翻譯取決於未來最常會由誰編輯語系檔與 HTML。特別是如果你會手動編輯，將鍵的名稱全部小寫會最提供最佳的可維護性。

例如，這裡有另一個翻譯在 `config/locales/es.json`：

```json
{
    "hello": "Hola!",
    "hello-how-are-you-today": "Hola %s, ¿cómo estás?",
}
```

以及這裡 `config/locales/en.json`：

```json
{
    "hello": "Hello!",
    "hello-how-are-you-today": "Hello, how are you today?",
}
```


### 偵測和／或覆寫請求的所需語系

使用新的語系代碼呼叫 [`req.setLocale()`](https://github.com/mashpie/i18n-node#setlocale) 來覆寫請求的自動偵測語言／本地化偏好設定：

```js
// 強制讓請求使用德文：
req.setLocale('de');
//（這會使用在 `config/locales/de.json` 的字串來翻譯）
```

預設情況下，node-i18n 會透過檢查請求的 Language 標頭來偵測所需的語言。Language 標頭是設定在用戶的瀏覽器，且它們大多是正確的，你可能需要靈活覆寫所偵測到的語系並提供翻譯。

例如，如果你的應用程式允許使用者選擇偏好語言，你可能會建立一個[政策](http://beta.sailsjs.org/#/documentation/concepts/Policies)用來檢查使用者會話（Session）內的自訂語言，如果存在的話，設定相應語系以便在後續的政策、控制器動作和檢視使用：

```js
// api/policies/localize.js
module.exports = function(req, res, next) {
  req.setLocale(req.session.languagePreference);
  next();
};
```


<!--

  Alternatively, here's another extended example:
  (todo: at the very least pull this into a separate guide)

```js
// config/routes.js
module.export.routes = {
  '/:lang/': 'MyController.index',
  '/:lang/help': 'MyController.help',
  '/:lang/contact': 'MyController.contact',
  // ...etc...
}

// config/policies.js
module.exports.policies = {
  '*' : 'localize'
}

// api/policies/localize.js
module.exports = function(req, res, next) {
   req.setLocale(req.param('lang'));
   next();
};
```
-->



### 翻譯動態內容

如果你的後端儲存語際資料（如透過 CMS 輸入的多國語言產品資料），你不應該依賴於簡單的 JSON 語系檔案，除非你打算以某種方式動態編輯翻譯。一種選擇是透過程式編輯翻譯，自訂實作或透過翻譯服務。Sails/node-i18n JSON 檔案與 [webtranslateit.com](https://webtranslateit.com/en) 使用格式相容。

另一方面，你可能會選擇儲存這些類型的動態翻譯字串到資料庫。如果是這樣，只要確定並建立相應的資料模型，便可以透過語系 ID（如「en」、「es」、「de」等）儲存和取得相應的動態資料。這樣，你可以使用 [`req.getLocale()`](https://github.com/mashpie/i18n-node#getlocale) 方法來協助你決定要在回應中使用哪種翻譯內容，並保持應用程式在其他地方使用一致的慣例。



### 附加選項

可以在 [`sails.config.i18n`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.i18n.html) 設定本地化／國際化。最常見需要修改設定的原因是編輯「應用程式支援的語系清單」和／或「翻譯檔案的位置」：

```javascript
// 支援哪些語系？
locales: ['en', 'es'],

// 語系翻譯檔放在何處？
localesDirectory: '/config/locales'
```




### 禁用或自訂 Sails 預設的國際化支援

你當然可以隨時在專案的任何地方 `require()` 任何你喜歡的 Node 模組，並使用任何你想要的國際化策略。

但值得注意的是，由於 Sails 在 [i18n 掛勾（hook）](http://beta.sailsjs.org/#/documentation/concepts/Internationalization)整合了 [node-i18n](https://github.com/mashpie/i18n-node)，你可以完全禁用或使用 [`loadHooks`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) 和／或 [`hooks`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) 組態設定來覆寫它。


### 怎樣在用戶端 i18n？

以上的技術順利的運作在伺服器端的檢視。但對於從 CDN 或靜態主機提供給客戶端應用程式的靜態 HTML 樣板呢？（如注重效能的 SPAs 或 PhoneGap 應用程式／Chrome 擴充功能）

實際上，你可以重新使用 Sails 的 i18n 支援來協助你取得已翻譯的樣板到瀏覽器。如果你想使用 Sails 來國際化你的_用戶端樣板_，放置你的前端樣板到應用程式 `/views` 資料夾的子目錄。
+ 在開發模式，使用預設已安裝於 Sails 專案的 grunt-contrib-watch 監視相應語系或樣板，當有異動時重新翻譯並編譯。
+ 在正式環境，你要在 lift() 時翻譯並編譯所有樣板。在載入時，關鍵的情況下（如行動版網頁應用程式），你甚至可以上傳已翻譯、編譯、最小化的樣板到如 Cloudfront 的 CDN，進一步的讓效能提昇。



<docmeta name="uniqueID" value="internationalization245343">
<docmeta name="displayName" value="Internationalization">

