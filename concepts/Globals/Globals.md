# 全域變數（Globals）
### 概觀

為了方便起見，Sails 公開了一些全域變數。預設情況下，應用程式的[模型](http://beta.sailsjs.org/#/documentation/reference/Models)、[服務](http://beta.sailsjs.org/#/documentation/reference/Services)，和全域 `sails` 物件都存在於全域範圍；這代表你可以在後端程式碼的任何地方透過名稱參考使用它們（只要 Sails [已經載入](https://github.com/balderdashy/sails/tree/master/lib/app)）。

在 Sails 核心沒有什麼東西是依賴於這些全域變數，每個公開的全域變數也可以在 `sails.config.globals` 內禁用（通常設定在 `config/globals.js`）。


### 應用程式物件（`sails`）
在大多數情況下，你會想保留 `sails` 物件的全域存取，它使你的程式碼更加乾淨。但是，如果你_確實_需要禁用_所有_全域變數，包含 `sails`，你可以從請求物件（`req`）存取 `sails`。

### 模型和服務
應用程式的[模型](http://beta.sailsjs.org/#/documentation/reference/Models)和[服務](http://beta.sailsjs.org/#/documentation/reference/Services)被透過它們的 `globalId` 公開為全域變數。例如，定義在 `api/models/Foo.js` 檔案的模型可以透過 `Foo` 在全域存取，而定義在 `api/services/Baz.js` 的服務則可透過 `Baz` 存取。

### Async（`async`）和 Lodash（`_`）
Sails 也公開 `_` 為 [lodash](http://lodash.com) 的實例，以及 `async` 為 [async](https://github.com/caolan/async) 的實例。預設已提供這些常用的套件，這樣你就不必在每個新專案 `npm install` 它們。如同 sails 的其他全域變數，它們可以被禁用。

### 禁用全域變數

Sails 透過檢查 [`sails.config.globals`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.globals.html) 來決定要公開哪個全域變數，通常設定在 [`config/globals.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/globals.js.html)。

要禁用所有全域變數，只需將組態設定為 `false`：

```js
// config/globals.js
module.exports.globals = false;
```

要禁用_一些_全域變數，指定一個物件來代替，例如：

```js
// config/globals.js
module.exports.globals = {
  _: false,
  async: false,
  models: false,
  services: false
};
```

### 注意事項

> + 請記住，在 sails 被載_入前_，沒有一個全域變數，包含 `sails`，可以被存取。換句話說，你不能使用 `sails.models.user` 或 `User` 功能（因為 `sails` 還沒載入完成。）

<!-- not true anymore:
Most of this section of the docs focuses on the methods and properties of `sails`, the singleton object representing your app.  
-->

<docmeta name="uniqueID" value="Globals668238">
<docmeta name="displayName" value="Globals">

