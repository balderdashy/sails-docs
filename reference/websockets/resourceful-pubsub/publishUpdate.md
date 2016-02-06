# .publishUpdate( `{id}`,[`changes`],[`request`],[`options`] )
### 目的
PublishCreate自体は実際には何も更新しません。これはただ単にモデルインスタンスが更新されたことをWebsocket経由で通知するだけです。

|   |     説明     | 受け入れ可能なデータ型 | 必須か |
|---|---------------------|---------------------|------------|
| 1 | 更新されたレコードのID|   `int`, `string`    |   はい      |
| 2 | 更新された値       |    `{}`               |   いいえ      |
| 3 | リクエスト      |   `request object` |   いいえ       |
| 4 | 追加のオプション |   `object` | いいえ |

`publishUpdate()`はモデル識別子をイベント名として利用し、ソケットメッセージを送信します。メッセージは`.subscribe`モデルメソッドにを経由してサブスクライブをした全てのソケットに送信されます。

ソケットメッセージは以下のプロパティを含むオブジェクトです。:

+ **id** - モデルインスタンスの`id`属性
+ **verb**  - `"updated"` (文字列)
+ **data** - 更新された属性のオブジェクト
+ **previous** - オブジェクト。もし存在すれば更新された属性の、前の値

#### `changes`
変更された属性とその新しい値を含むオブジェクトです。

#### `request`
この引数が含まれていればそのリクエストに結びついているソケットは通知を*受け取りません*。

#### `options.previous`
`options`オブジェクトに`previous`プロパティが含まれていた場合、それは変更する*前の*モデルインスタンスを表します。これは追加のメッセージを発行するかどうかを判断するのに使うことができます。(詳しくは以下の`options.noReverse`フラグに関してをご覧下さい。)

#### `options.noReverse`

`publishUpdate`のデフォルト実装は、もし`options.previous`が存在すれば関連付けられたレコードがその更新により影響を受けるかを確認し、追加の通知を発行することがあります。例えば、`Pet`モデルが`User`モデルに関連付けられた`owner`属性を持っており、ユーザが特定のペットを所有することが出来る場合で、`publishUpdate`がコールされて送信されたデータがぺっとの`owner`変更を示していた場合、追加の`publishAdd`あるいは`publishRemove`コールがなされます。これらの通知を抑制するには`options.noReverse`フラグを`true`に設定します。一般的にモデルに対して独自の`publishUpdate`実装を行っていないかぎりはこの引数をっかうべきではありません。


### 使用例

UsersController.js
```javascript
module.exports = {
    
  testSocket: function(req,res){

        var nameSent = req.param('name');
    
        if (nameSent && req.isSocket){
    
          User.update({name:nameSent},{name:'Heisenberg'}).exec(function update(err,updated){
            User.publishUpdate(updated[0].id,{ name:updated[0].name });
          });
    
        } else if (req.isSocket){
    
        User.find({}).exec(function(e,listOfUsers){
          User.subscribe(req.socket,listOfUsers);
        console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'users\'.');
        });
        
        } else {
    
          res.view();
        
        }
    }
}

    // エラーハンドリングを忘れずに
```

views/users/testSocket.ejs
```html
<script type="text/javascript">
window.onload = function subscribeAndListen(){
    // When the document loads, send a request to users.testSocket
    // The controller code will subscribe you to all of the 'users' model instances (records)
    socket.get('/users/testSocket/');

    // Listen for the event called 'user'
    socket.on('user',function(obj){
      if (obj.verb == 'updated') {
        var previous = obj.previous;
        var data = obj.data;
        console.log('User '+previous.name+' has been updated to '+data.name);
      }
    });
};

function doEdit(){

    //  'Users'コントローラでのnameをtestSocketアクションに送る

    socket.get('/users/testSocket/',{name:'Walter'});
}

</script>
<div class="addButton" onClick="doEdit()">ユーザの新規作成はここをクリック！</div>

```

<docmeta name="uniqueID" value="publishUpdate712330">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".publishUpdate()">

