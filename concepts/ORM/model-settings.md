# モデルの設定

特定のモデルでのデフォルトをオーバーライドするために以下のプロパティをアプリケーションのモデル定義のトップレベルにおいてステイすることが出来ます。あなたのアプリケーションで使われすすべてのモデルで使われるデフォルト設定をオーバーライドするためには[`config/models.js`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)を編集してください。






### `migrate`

```javascript
migrate: 'safe'
```

単純に言うとこの設定はSailsがあなたのスキーマのテーブルやコレクション、セットなどをどのようにして自動リビルドするかを定義するものです。

本番環境(NODE_ENV==="production"の状態の時)にはSailsはデータを不用意に削除してしまうのを防ぐため、つねに`migrate:"safe"`を利用します。
しかし開発環境では簡便のために他の方法を使うことが出来ます。

 1. safe  - データベースを自動マイグレーションしません。開発者が手動でやります。
 2. alter - データを保持したまま自動マイグレーションします。（実験的運用）
 3. drop  - Sailsを起動するときにすべてのデータを消してデータベースを再構築します。

Sailsを起動するときにWaterlineはデータベースの中にあるすべてのデータをバリデーションします。このフラグはデーが破壊された時にどのように振る舞うかを伝えるものです。起動時に破損したデータを無視したいのであれば`safe`にセットすることが出来ます。


|  自動マイグレーションストラテジー  | 定義 |
|-------------|----------------------------------------------|
|`safe`       | データベースを自動マイグレーションしません。開発者が手動でやります。
|`alter`      | データを保持したまま自動マイグレーションします。（実験的運用）
|`drop`       | Sailsを起動するときにすべてのデータを消してデータベースを再構築します。


> 備考　`drop`を行うことではもちろん、`alter`でもデータ消失のリスクが有ります。ご注意ください。本番環境でのデータセットでは決して`drop`や`alter`を使わないでください。更に、大規模なデータベースでは`alter`を選択すると起動に時間がかかることがあります。これにより`sails console`のようなコマンドがハングアップしているように見えることがあります。



### `schema`

```javascript
schema: true
```

データベースがスキーマレスなデータ構造に対応している場合、このフラグでスキーマレスとスキーマモードの変更ができます。オフの時にはレコード内に任意のデータを保存できるようになります。オンの時にはモデルのアトリビュートで定義された`attribute`オブジェクトのみが保存できます。

スキーマがなくてもいいアダプタ（MongoやRedisなど）では`schema:false`がデフォルトの設定になります。



### `connection`

```javascript
connection: 'my-local-postgresql'
```

設定済みのデータベース[接続設定](http://sailsjs.org/documentation/reference/sails.config/sails.config.connections.html)のうち、このモデルがデータを取得したるデータを書き込むものです。デフォルトは`sails-disk`をつかったSailsのデフォルトのデータベースである`localDiskDb`が選択されます。`


### `identity`

```javascript
identity: 'purchase'
```

`user`のような、小文字で書かれたこのモデルのユニークキーです。デフォルトではモデルの`identity`はファイル名を小文字化したもので自道的に推測されますモデル内でこのフラグを変更してはいけません。

### `globalId`

```javascript
globalId: 'Purchase'
```

このフラッグはモデルに（モデルのグローバルアクセスが許可されている場合に限り）グローバルでアクセス可能な際の名前を決定します。models-においてモデルのグローバルを無効化するためにこのフラグを使ってはいけません。[sails.config.globals](http://sailsjs.org/documentation/concepts/Globals?q=disabling-globals)を御覧ください。



### autoPK

```javascript
autoPK: true
```

自動で主キーアトリビュートを定義するかどうかを定義するフラグです。デフォルトのPKはアダプタによって異なります。（例えば、MySQLはオートインクリメントの整数を使いますし、Mongo DBはランダムなUUIDを使います。）いずれのケースにおいてもautoPKで作成された主キーはユニークです。もしこの機能をOffにしたら自動で主キーは作成されなくなりますので手動設定する必要があります.例：

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

自動で`createdAt`アトリビュートをモデルに追加するかどうかを定義するフラグです。デフォルトでは`createdAt`にはレコードが作成された時に自動で現在時刻のタイムスタンプが記録されます。例：

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
自動で`updatedAt`アトリビュートをモデルに追加するかどうかを定義するフラグです。デフォルトでは`updatedAt`には毎回更新が行われうごとに自動で現在時刻のタイムスタンプが記録されます。例: 

```js
attributes: {
  updatedAt: {
    type: 'datetime',
    defaultsTo: function (){ return new Date(); }
  }
}
```


### tableName

```javascript
tableName: 'some_preexisting_table'
```

`tableName`を加える事にアダプタの実際のコレクションの中におけるコレクション名を指定することが出来ます。これは _テーブル名には限りませ_ ん。MySQLやPostgreSQL、Oracleなどではこれはテープル名を意味しますが、Mongo DBやRedisではコレクション名を意味するなどのことが行われます。`tableName`が定義されていなければWaterlineはモデルの`identity`を`tableName`として利用します。

これはすでに存在するレガシーのデータベースと一緒に利用する際に便利です。

<!-- in WL2, this is `cid` (but is backwards-compatible) -->



### `attributes`

```js
attributes: {
  name: { type: 'string' },
  email: { type: 'email' },
  age: { type: 'integer' }
}
```

[アトリビュート](http://sailsjs.org/documentation/concepts/ORM/Attributes.html)の項目をご覧ください。



<docmeta name="uniqueID" value="Modelconfiguration960213">
<docmeta name="displayName" value="Model Settings">
