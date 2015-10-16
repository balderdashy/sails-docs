# アソシエーション

SailsとWaterineを使えば複数のデータストアの間でモデルをアソシエートさせることが出来ます。つまりこれはユーザのデータが[PostgreSQL](http://www.postgresql.org/)にあってその写真が[MongoDB](http://www.mongodb.com/)にあってもそれらのデータがあたかもひとつのデータベースにあるように扱えるのです。同様に異なるコネクション [connections](http://sailsjs.org/documentation/reference/sails.config/sails.config.connections.html)(すなわちデータストアやデータベース)をまたがるデータも同一のアダプタを使ってアソシエート出来ます。これは例えばあなたのアプリケーションがレガシーなやり方で会社のデータセンタ内の[MySQL](http://www.mysql.com/)データベースに大したアクセス・アップデートする必要があり、他方でクラウド上に設置された全く新しいMySQLデータベースに保存・読出しなければならない時に便利です。

<docmeta name="uniqueID" value="Associations913185">
<docmeta name="displayName" value="Associations">
