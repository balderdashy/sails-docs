# 主導權（Dominance）
## 範例


```javascript
// User.js
module.exports = {
  connection: 'ourMySQL',
  attributes: {
    email: 'string',
    wishlist: {
      collection: 'product',
      via: 'wishlistedBy'
    }
  }
};
```


```javascript
// Product.js
module.exports = {
  connection: 'ourRedis',
  attributes: {
    name: 'string',
    wishlistedBy: {
      collection: 'user',
      via: 'wishlist'
    }
  }
};
```

### 問題

可以很容易的看到在這個交叉關聯發生了什麼事。有一個多對多（`N->...`）關聯在 users 和 products 之間。事實上，你可以想像可能存在一些其它的關聯（如 purchases），但由於那些使用中介模型可能更好表示，所以我在這邊舉的例子很簡單。

不管怎樣，這一切都太棒了…但是關聯資料儲存在哪裡呢？「ProductUser」，請原諒我用 SQL 導向的術語。我們知道它會在其中一邊結束，但如果我們想控制一下它在哪個資料庫結束呢？

> **重要注意事項**
>
> 這是因為關聯的兩邊都有指定 `via` 修飾詞的問題！！
> 在缺少 `via` 時，集合屬性的行為就像是 `dominant: true`。
> 請查看下方的常見問題取得更多資訊。


## 解決方案

最終，它甚至是能夠指定一個第三方連線／橋接器用來連接（join）資料表。現在，我們將重點放在選擇其中一邊。


我們透過「主導權」概念解決這個問題。在任何交叉關聯的模型，假設其中一邊具有主導權。這可能有助於思考，比方說，一個孩子有不同國籍的父母，他必需選擇成為其中一個國家的[公民](http://en.wikipedia.org/wiki/Japanese_nationality_law)。


這有另一個範例，但是這一次，我們標示 MySQL 資料庫具有「主導權」。這代表「ProductUser」的關聯「資料表」會儲存為一個 MySQL 資料表。


```javascript
// User.js
module.exports = {
  connection: 'ourMySQL',
  attributes: {
    email: 'string',
    wishlist: {
      collection: 'product',
      via: 'wishlistedBy',
      dominant: true
    }
  }
};
```


```javascript
// Product.js
module.exports = {
  connection: 'ourRedis',
  attributes: {
    name: 'string',
    wishlistedBy: {
      collection: 'user',
      via: 'wishlist'
    }
  }
};
```


## 選擇「主導權」

有幾個因素可能會影響你的決定：

+ 如果一邊是 SQL 資料庫，由於關聯資料表可以在與另一邊溝通前被連接，將關聯資料表放在這一邊可以讓你的查詢更有效率。這讓總查詢次數從 3 次減少到 2 次。
+ 如果一個連線速度比其他快很多，而其他條件相同的情況下，將連線放在這邊是合乎邏輯的。
+ 如果你知道其中一個連線比較容易遷移，你可能會選擇設定它為 `dominant`。同樣的，規章及制度問題也可能會影響你的決定。如果關聯包含敏感的患者資料（例如，關聯 `Patient` 和 `Medicine`），你會想確保所有相關的資料被儲存在一個特定的資料庫（在這個情況下，`Patient` 很可能是 `dominant`）
+ 按照相同的思路，如果你的其中一個連線是唯讀的（或許前一個範例 `Medicine` 是連線到一個唯讀的供應商資料庫），你無法對它寫入，所以你要確保關聯資料可以安全的被儲存在另一邊。


## 常見問題


##### 如果其中一個集合沒有 `via`？

> 如果一個 `collection` 關聯沒有 `via` 屬性，它會自動設定 `dominant: true`。


##### 如果兩個集合都沒有 `via`？

> 如果兩個 `collections` 都沒有 `via`，那麼它們是沒有關聯的。兩個都是 `dominant`，因為它們是獨立的關聯資料表！！

##### 那關聯 `model` 呢？

> `dominant` 屬性在所有其他類型的關聯中是被禁止的。只有在關聯兩個擁有如 `{ via: '...', collection: '...' }` 屬性的模型時，才需設定一邊為 `dominant`。


##### 可以在屬性設定模型具有主導權嗎？
> 請記住，模型只有在特定的關係中有「主導權」。當沒有同時被其他關聯（屬性）主導時，模型可以在一個或多個關聯（屬性）擁有主導權。
> 例如，如果 `User` 有一個名為玩具的集合 `favoriteToys` 透過 `favoriteToyOf` 關聯到 `Toy` 模型，且在 `User` 的 `favoriteToys` 設定為 `dominant: true`，`Toy` 在其他方面仍然可以擁有主導權。所以 `Toy` 也可能透過設定其屬性 `designedBy` 為 `dominant: true` 關聯到 `User`。


##### 兩個模型都可以有主導權嗎？

> 不行。如果兩個模型是跨橋接器／跨連線、多對多關聯設定 `dominant: true`，在應用程式啟動前會拋出錯誤。


##### 兩個模型都可以沒有主導權嗎？

> 可以這麼說…如果兩個模型都不是跨橋接器／跨連線、多對多關聯設定 `dominant: true`，應用程式啟動前會顯示警告，且會自動根據關聯的特性猜測關係。就目前而言，這代表會基於字母來決定順序：）

##### 那非跨橋接器關聯呢？

> `dominant` 屬性在非跨橋接器／非跨連線關聯被自動忽略。我們假設你最後可能會打算跨越多個連線分解資料表結構，而且也沒有理由阻止你。此外，這保留了未來對「dominant」選項的附加功能。


<docmeta name="uniqueID" value="Dominance904539">
<docmeta name="displayName" value="Dominance">

