# レコードを編集する

既存のレコードを編集します。
変更すべき属性はフォームエンコードされたHTTPボディまたはJSONで送ることが出来ます。

```
PUT /:model/:record
```

**id**パラメータに一致するモデルインスタンスを更新します。新たに更新されたインスタンスをJSONオブジェクトとして返します。バリデーションエラーが起こった場合、不正な属性のJSONレスポンスとともに`400`ステータスコードを返します。**id**パラメータに一致するモデルインスタンスがない場合は`404`が返されます。

### 属性

 属性                                | 型                                                      | 詳細
 ---------------------------------- | ------------------------------------------------------- |:---------------------------------
 id<br/>*(required)*                | ((number))<br/>*-or-*<br/>((string))                    | 編集したいレコードの主キー値<br/><br/>例: `PUT /product/5`
 *                                  | ((string))<br/>((number))<br/>((object))<br/>((array))  | `POST` (RESTful)リクエストに対しては編集したいレコードにセットしたい値をボディパラメータの中でモデルで定義されたものと同じ名前の属性で定義します。`GET` (shortcut)リクエストに関してはパラメータはクエリストリングに追加されます。
 callback                           | ((string))                                              | 指定されていればJSONPレスポンスが（JSONの代わりに）送信されます。この名前のJavascript関数を、結果を一つ目の（そして唯一の）引数として実行します。<br/> <br/> 例:`?callback=myJSONPHandlerFn`

### 例

#### レコードを編集する (REST)

AppleJackの趣味を"kickin"に変える。

##### ルート
`PUT /pony/47`

##### JSONリクエストボディ
```json
{
  "hobby": "kickin"
}
```

##### 期待されるレスポンス
```json
{
  "name": "AppleJack",
  "hobby": "kickin",
  "id": 47,
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```

#### レコードを編集する (Shortcuts)

`GET /pony/update/47?hobby=kickin`

##### 期待されるレスポンス

同上。

#### 既存の2つのレコード間のアソシエーションを加える。 (REST)

Pinkie Pieに既存の"Bubbles"でIDが15のペットを与える。

##### ルート
`POST /pony/4/pets`

##### JSONリクエストボディ
```json
{
  "id": 15
}
```

##### 期待されるレスポンス
```json
{
  "name": "Pinkie Pie",
  "hobby": "kickin",
  "id": 4,
  "pets": [{
      "name": "Gummy",
      "species": "crocodile",
      "id": 10,
      "createdAt": "2014-02-13T00:06:50.603Z",
      "updatedAt": "2014-02-13T00:06:50.603Z"
    },{
      "name": "Bubbles",
      "species": "manticore",
      "id": 15,
      "createdAt": "2014-02-13T00:06:50.603Z",
      "updatedAt": "2014-02-13T00:06:50.603Z"
    }],
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```

#### 既存の2つのレコード間のアソシエーションを加える。 (Shortcuts)
`GET /pony/4/pets/add/15`

#### アソシエーションを削除する (多対多) (REST)

Pinkie Pieのペット"Gummy" (ID 12)を削除する。

##### ルート
`DELETE /pony/4/pets`

##### JSONリクエストボディ
```json
{
  "id": 12
}
```

##### 期待されるレスポンス
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pets": [{
      "name": "Bubbles",
      "species": "manticore",
      "id": 15,
      "createdAt": "2014-02-13T00:06:50.603Z",
      "updatedAt": "2014-02-13T00:06:50.603Z"
    }],
  "id": 4,
  "createdAt": "2013-10-18T01:22:56.000Z",
  "updatedAt": "2013-11-26T22:54:19.951Z"
}
```

#### アソシエーションを削除する (多対多) (Shortcuts)

##### ルート

`GET /pony/4/pets/remove/12`

##### 期待されるレスポンス

同上。

<docmeta name="uniqueID" value="UpdateARecord421031">
<docmeta name="displayName" value="update">
