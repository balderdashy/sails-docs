# 禁用 Grunt（Disabling Grunt）

要禁用整合在 Sails 的 Grunt，只需刪除 Gruntfile（和/或 [`tasks/`](/#/documentation/anatomy/myApp/tasks) 資料夾）。你還可以禁用 Grunt hook。只要像這樣在 `.sailsrc` hooks 設定 `grunt` 屬性為 `false`：

```json
{
    "hooks": {
        "grunt": false
    }
}
```

### 我可以為 SASS、Angular、客戶端 Jade 樣版等等客製化嗎？

是的！只需取代 `tasks/` 目錄中相應的 grunt 任務，或新增一個。如同 [SASS](https://github.com/sails101/using-sass) 範例。

如果你仍然想使用 Grunt 做其他用途，但不想要任何預設的網頁前端工作，只要刪除專案的資源資料夾並從 `grunt/register/` 和 `grunt/config/` 資料夾移除前端相關任務。你還可以在往後的專案執行 `sails new myCoolApi --no-frontend` 來省略資源資料夾和前端相關 Grunt 任務。你也可以用社群的產生器或[建立自己的](https://github.com/balderdashy/sails-generate-generator)產生器來取代 `sails-generate-frontend` 模組。這讓 `sails new` 可以建立原生 iOS 應用程式、Android 應用程式、Cordova 應用程式、SteroidsJS 應用程式等等的樣版。


<docmeta name="uniqueID" value="DisablingGrunt970874">
<docmeta name="displayName" value="Disabling Grunt">

