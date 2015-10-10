# 対応済みアダプタのリスト
このファイルはSailsで利用可能なアダプタに関する最新の包括的なリストとなることを意図しています。もし忘れているものがあったりアダプタを書いた時にはリストに追加したうえでPullリクエストを送ってください。

### 公式サポートしているアダプタ

##### sails-disk

https://github.com/balderdashy/sails-disk/

コンピュータのハードディスクまたはマウントされたネットワークドライブに書き込みます。スケール化したデプロイ環境には適しませんがデータベースが常に準備されているとは限らない環境や小さなプロジェクトではとても役立ちます。このアダプタはSailsにバンドルされており、設定なしで簡単に使うことが出来ます。

###### 実装済インタフェース:
+ Semantic
+ Queryable
+ Streaming


##### sails-memory

https://github.com/balderdashy/sails-memory/

ディスクととても似ていますが実際にディスクに書き込まれません、つまり保存されません。スケール化したデプロイ環境には適しませんがディスクが存在しなかったり容量が少ない環境のシステムを開発するには役立ちます。

###### 実装済インタフェース:
+ Semantic
+ Queryable
+ Streaming


##### sails-mysql

https://github.com/balderdashy/sails-mysql/

MySQLは世界中で最もポピュラーなリレーショナル・データベースです。
http://en.wikipedia.org/wiki/MySQL

###### 実装済インタフェース:
+ Semantic
+ Queryable
+ Streaming
+ Migratable


##### sails-postgres

https://github.com/balderdashy/sails-postgresql/

[PostgreSQL](http://en.wikipedia.org/wiki/PostgreSQL)はもう一つのポピュラーなリレーショナル・データベースです。

###### 実装済インタフェース:
+ Semantic
+ Queryable
+ Streaming
+ Migratable


##### sails-mongo

https://github.com/balderdashy/sails-mongo/


[MongoDB](http://en.wikipedia.org/wiki/MongoDB) は代表的なNoSQLデータベースです。
  
###### 実装済インタフェース:
+ Semantic
+ Queryable
+ Streaming

##### sails-redis

https://github.com/balderdashy/sails-redis/

[Redis](http://redis.io/) はBSDライセンスのオープンソースで提供される先進的キーバリュー型ストアです。

###### 実装済インタフェース:
+ Semantic
+ Queryable


### コミュニティーレベルでサポートされているアダプタ

##### sails-orientdb

https://github.com/appscot/sails-orientdb

[OrientDB](http://en.wikipedia.org/wiki/OrientDB) はドキュメントとグラフの両方のDBMS機能を持ったオープンソースのNoSQLなDBMSです。

###### 実装済インタフェース:
+ Semantic
+ Queryable
+ Associations
+ Migratable

##### sails-filemaker

https://github.com/geistinteractive/sails-filemaker

[FileMaker](https://en.wikipedia.org/wiki/FileMaker) はクロスプラットフォームのでリレーショナルデータベースと開発プラットフォームです。1988年からアップルによって所有、公開されています。

###### Interfaces implemented:
+ Semantic

アダプタを書きましたか？ここに書き込んでPRしてください！

<docmeta name="uniqueID" value="adapterList22829">
<docmeta name="displayName" value="Available Adapters">
