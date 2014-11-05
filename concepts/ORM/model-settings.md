# 模型設定（Model Settings）

以下的屬性可以指定在你的模型定義的上層，來覆寫該模型的預設值。修改 [`config/models.js`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) 來覆寫所有模型共享的預設設定。






### `migrate`

```javascript
migrate: 'safe'
```

總之，此設定控制了 Sails 是否／如何嘗試在你的結構自動重建 tables/collections/sets 等。

在正式環境中（NODE_ENV === "production"）Sails 總是使用 `migrate:"safe"` 來保護意外刪除你的資料。然而在開發過程中，你有其他幾個方便的選項：

 1. safe  - 永遠不要自動遷移我的資料庫。我會自己去做（手動）
 2. alter - 自動遷移，但嘗試保留現有資料（實驗性）
 3. drop  - 每次啟動 Sails 時清除／刪除所有資料並重建模型

當你啟動 sails 應用程式時，waterline 會驗證你的資料庫的所有資料。這個標記告訴 waterline 資料毀損時該如何處理資料。你可以設定這個標記為 `safe`，將忽略毀損的資料並繼續啟動。你還可以將其設定為


| 自動遷移策略  | 說明 |
|-------------|----------------------------------------------|
|`safe`       | 永遠不要自動遷移我的資料庫。我會自己手動去做
|`alter`      | 自動遷移，但嘗試保留現有資料（實驗性）
|`drop`       | 每次啟動 Sails 時清除／刪除所有資料並重建模型


> 請注意，使用 `drop` 或 `alter` 可能失去你的資料。當心，永遠不要在正式環境使用 `drop` 或 `alter`。



### `schema`

```javascript
schema: true
```

在支援無結構（Schemaless）資料結構資料庫切換無結構（Schemaless）或結構（Schema）模式的標記。如果關閉，將允許你儲存任意資料的記錄。如果開啟，只有定義在模型的 `attributes` 屬性物件會被儲存。

對於不需要結構的橋接器，如 Mongo 或 Redis，預設設定是 `schema:false`。



### `connection`

```javascript
connection: 'my-local-postgresql'
```

此模型將從已設定的資料庫[連線](http://sailsjs.org/#/documentation/reference/sails.config/sails.config.connections.html)取得和儲存資料。預設為 `localDiskDb`，預設的連線使用 `sails-disk` 橋接器。


### `identity`

```javascript
identity: 'purchase'
```

此模型的小寫唯一鍵（Unique key），例如 `user`。預設情況下，會自動從它的檔案名稱自動推測模型的 `identity`。你永遠不應該在模型改變這個屬性。

### `globalId`

```javascript
globalId: 'Purchase'
```

這個標記變更了你可以存取模型的全域名稱（如果啟用了模型的全域化）。你永遠不應該在模型改變這個屬性。要停用全域，請參考 [`sails.config.globals`](http://sailsjs.org/#/documentation/concepts/Globals?q=disabling-globals)。



### `autoPK`

```javascript
autoPK: true
```

切換模型中自動定義主鍵的標記。此預設 PK 的細節依橋接器而有所不同（例如 MySQL 使用一個自動遞增的整數主鍵，而 MongoDB 使用亂數字串 UUID）。在任何情況下，由 autoPK 產生的主鍵是唯一的。如果關閉，預設將不會建立主鍵，你將需要手動定義一個，例如：

```js
attributes: {
  sku: {
    type: 'string',
    primaryKey: true,
    unique: true
  }
}
```

### `autoCreatedAt`

```javascript
autoCreatedAt: true
```

切換模型中自動定義 `createdAt` 屬性的標記。預設情況下，當記錄建立時 `createdAt` 屬性會自動設定為目前時間戳記，例如：

```js
attributes: {
  createdAt: {
    type: 'datetime',
    defaultsTo: function (){ return new Date(); }
  }
}
```

### `autoUpdatedAt`

```javascript
autoUpdatedAt: true
```
切換模型中自動定義 `updatedAt` 屬性的標記。預設情況下，當記錄被更新時 `updatedAt` 屬性會自動設定為目前時間戳記，例如：

```js
attributes: {
  updatedAt: {
    type: 'datetime',
    defaultsTo: function (){ return new Date(); }
  }
}
```


### `tableName`

```javascript
tableName: 'some_preexisting_table'
```

你可以透過增加一個 `tableName` 屬性在橋接器對實體集合定義一個自訂名稱。__這不僅是對資料表__。在 MySQL、PostrgreSQL、Oracle 等資料庫，這個設定是指資料表名稱，但在 MongoDB 或 Redis，它指的是集合等等。如果沒有指定 tableName，Waterline 將使用模型的 `identity` 作為 `tableName`。

這對於工作於現有／老舊的資料庫特別有用。

<!-- in WL2, this is `cid` (but is backwards-compatible) -->



### `attributes`

```js
attributes: {
  name: { type: 'string' },
  email: { type: 'email' },
  age: { type: 'integer' }
}
```

請參考 [屬性](http://sailsjs.org/#/documentation/concepts/ORM/Attributes.html)。



<docmeta name="uniqueID" value="Modelconfiguration960213">
<docmeta name="displayName" value="Model Settings">

