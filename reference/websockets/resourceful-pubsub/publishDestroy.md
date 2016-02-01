# .publishDestroy( `{id}`, [`request`], [`options`] )
### 目的
モデルの削除を通知します。

|   |     説明     | 受け入れ可能なデータ型 | 必須か |
|---|---------------------|---------------------|------------|
| 1 | 削除されたレコードのID |`int`, `string`  |   はい  |
| 2 | リクエスト      |   `request object` |   いいえ       |
| 3 | 追加のオプション | `object` | いいえ |

`publishDestroy()`はモデルの識別子をイベント名として利用します。このメッセージは`.subscribe`モデルメソッドを通じてモデルインスタンスをサブスクライブした全てのソケットに送信されます。

ソケットメッセージは以下の属性を含んだオブジェクトです:

+ **id** - モデルインスタンスの`id`属性
+ **verb**  - `"destroyed"` (文字列)
+ **previous** - オブジェクト。もし存在したら削除されたオブジェクトの属性と値を持っています。

#### `request`
この引数が含まれていればそのリクエストに結びついているソケットは通知を*受け取りません*。

#### `options.previous` 
もしセットされていれば削除前の、モデルを表しています。これは関連付けられているレコードに関して追加の通知を送るのに使えます。

### 使用例

UsersController.js
```javascript
module.exports = {
    
  testSocket: function(req,res){

        var nameSent = req.param('name');
    
        if (nameSent && req.isSocket){
    
          User.findOne({name:nameSent}).exec(function findIt(err,foundHim){
            User.destroy({id:foundHim.id}).exec(function destroy(err){
              User.publishDestroy(foundHim.id);
            });
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

    // エラーのハンドリングを忘れずに
 
```

views/users/testSocket.ejs
```html

<script type="text/javascript">
window.onload = function subscribeAndListen(){
    // When the document loads, send a request to users.testSocket
    // The controller code will subscribe you to all of the 'users' model instances (records)
    socket.get('/users/testSocket/');

    // Listen for the event called 'message' emited by the publishDestroy() method.
    socket.on('message',function(obj){
      if (obj.verb == 'destroyed') {
        console.log('User '+obj.previous.name+' has been destroyed .');
      }
    });
};

function destroy(){

    // Send the name to the testSocket action on the 'Users' contoller
    socket.get('/users/testSocket/',{name:'Walter'});
}

</script>
<div class="addButton" onClick="destroy()">Click Me to destroy user 'Walter' ! </div>


```

### 備考
> 渡される全ての母子列はレコードのIDでなければいけません。

<docmeta name="uniqueID" value="publishDestroy732227">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".publishDestroy()">

