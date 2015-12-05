# レコードを作成する

データベースに新しいモデルを作成し、その値を返します。

```
POST /:model
```

属性はフォームエンコードされたHTTPボディまたはJSONで送ることが出来ます。

新規作成されたインスタンスを含むJSONオブジェクトともにレスポンスされます。バリデーションエラーが起きた場合は不正な属性が含まれたJSONとともに`400`ステータスを返します。

加えて、全てのソケットに対して`create`イベントが発行されます。(詳しくは[.watch()](https://github.com/balderdashy/sails-docs/blob/master/reference/websockets/resourceful-pubsub/watch.md)のドキュメントを御覧ください。)

アクションがソケットのリクエストとしてトリガーされた場合、リクエストを送ったソケットは同様に新規作成されたモデルインスタンスを受け取ります。レコードが付加的に編集、削除された場合その旨を伝えるメッセージがソケットのクライアントに送られます。詳しくは.subscribe()のドキュメントを御覧ください。

## パラメータ

 パラメータ       | 型                                                        | 詳細
 -------------- | --------------------------------------------------------- |:---------------------------------
 *              | ((string))<br/>((number))<br/>((object))<br/>((array))    | `POST` (RESTful)リクエストに対しては新規作成されるレコードのそれぞれの値を定義するためには、ボディパラメータの中でモデルで定義されたものと同じ名前の属性を定義します。`GET` (shortcut)リクエストに関してはパラメータはクエリストリングに追加されます。<br/> <br/> パラメータとして渡された入れ子のオブジェクトや配列はモデルの<a>.create()</a>メソッドに渡された時と同じように動作します。
 callback       | ((string))                                                | 指定されていればJSONPレスポンスが（JSONの代わりに）送信されます。この名前のJavascript関数を、結果を一つ目の（そして唯一の）引数として実行します。<br/> <br/> 例:`?callback=myJSONPHandlerFn`

## 例

### レコードを作成 (REST)

"pickin"の趣味を持った"AppleJack"という名前のポニーを作成。

#### ルート
`POST /pony`



#### JSONリクエストボディ
```json
{
  "name": "AppleJack",
  "hobby": "pickin"
}
```

#### レスポンスの例
```json
{
  "name": "AppleJack",
  "hobby": "pickin",
  "id": 47,
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```

### レコードを作成(ショートカット)

#### ルート
`GET /pony/create?name=Fluttershy&best_pony=yep`

#### 期待されるレスポンス

```javascript
{
 "name": "Fluttershy",
 "best_pony": "yep",
 "createdAt": "2014-02-24T21:02:16.068Z",
 "updatedAt": "2014-02-24T21:02:16.068Z",
 "id": 5
}

```


## 一方のアソシエーションを含む例

モデル化のアソシエーションの作成は2つの方法で行えます。すでの存在するレコードへのアソシエーションを作ることが出来るほか、それぞれを同時に作ることができます。どのようにするのかは例をご覧ください。

これらの例では`Pet`と`Pony`APIが手動または[Sails CLI Tool](http://sailsjs.org/documentation/reference/CommandLine/CommandLine.html)で作られていると仮定します。`Pony` モデルには`Pet`モデルを指す`pet`属性が設定されている必要があります。これをどうするのかに関しての詳しい話は[Model Association Docs](./ModelAssociations.md)をご覧ください。

### 既存のレコードと関連付けられたレコードを作成する(REST)

既存の"Gummy"と名付けられた`id`10のペットと関連付けられた、"Pinkie Pie"という名前のポニーを追加する。

#### ルート
`POST /pony`

#### JSONリクエストボディ
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pet": 10
}
```

#### Responseの例
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pet": {
    "name": "Gummy",
    "species": "crocodile",
    "id": 10
  },
  "id": 4,
  "createdAt": "2013-10-18T01:22:56.000Z",
  "updatedAt": "2013-11-26T22:54:19.951Z"
}
```


### 新規レコードと関連付けられた新規レコードを作成する。

新しい"Gummy"と名付けられた`ペットと関連付けられた、"Pinkie Pie"という名前と"ice skating"の趣味を持つポニーを追加する。

#### ルート
`POST /pony`


#### JSONリクエストボティ
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pet": {
    "name": "Gummy",
    "species": "crocodile"
  }
}
```

#### 期待されるレスポンス
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pet": {
    "name": "Gummy",
    "species": "crocodile",
    "id": 10
  },
  "id": 4,
  "createdAt": "2013-10-18T01:22:56.000Z",
  "updatedAt": "2013-11-26T22:54:19.951Z"
}
```

<docmeta name="uniqueID" value="CreateARecord744986">
<docmeta name="displayName" value="create">
