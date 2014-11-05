# 關聯（Associations）

使用 Sails 和 Waterline，你可以跨多個資料儲存區來關聯模型。這代表，即使你的使用者儲存在 [PostgreSQL](http://www.postgresql.org/)，而他們的相片儲存在 [MongoDB](http://www.mongodb.com/)，你可以與資料進行互動，就好像他們儲存在相同的資料庫中。你也可以使用相同橋接器跨越不同[連線](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.connections.html)（即資料儲存區／資料庫）的關聯。舉個能派上用場的例子，你的應用程式需要從公司的資料中心的 [MySQL](http://www.mysql.com/) 資料庫存取／更新舊的食譜資料，但也要從雲端的全新 MySQL 資料庫存取材料資料。

<docmeta name="uniqueID" value="Associations913185">
<docmeta name="displayName" value="Associations">

