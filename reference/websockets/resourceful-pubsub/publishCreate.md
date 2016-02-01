# .publishCreate( `data`,[`request`] )
### 目的
PublishCreate自体は実際には何も作成しません。これはただ単にモデルインスタンスが生成されたことをWebsocket経由で通知するだけです。PublishCreateは[blueprint `create` アクション](https://github.com/balderdashy/sails-docs/blob/0.10/reference/Blueprints.md#create-a-record)によって自動的に呼びだされます

|   |     説明     | 受け入れ可能なデータ型 | 必須か |
|---|---------------------|---------------------|------------|
| 1 | 送信するデータ        |   `object`              |   はい       |
| 2 | リクエスト      |   `Request object` |   いいえ       |

publishCreateのデフォルトの実装は `watch`メソッドを使ってサブスクライブしているソケットfirehoseにメッセージを発行するだけです。同様に、該当するモデルに対する新規インスタンスの作成をウォッチしているソケットもサブスクライブしています。サブスクライバへのメッセージは以下の内容を含みます。:

+ **id** - 新しいモデルインスタンスの`id`属性
+ **verb**  - `"created"` (文字列)
+ **data** - 新規モデルインスタンスの属性と値からなるオブジェクト

#### `data`
新規モデルインスタンスの属性と値からなるオブジェクト

#### `request`
この引数が含まれていればそのリクエストに結びついているソケットは通知を*受け取りません*。

### 使用例
UsersController.js
```javascript
module.exports = {
    
  testSocket: function(req,res){

        var nameSent = req.param('name');
    
        if (nameSent && req.isSocket){
    
          User.create({name:nameSent}).exec(function created(err,newGuy){
            User.publishCreate({id:newGuy.id,name:newGuy.name});
            console.log('A new user called '+newGuy.name+' has been created');
          });
    
        } else if (req.isSocket){
    
          User.watch(req);
          console.log('User with socket id '+sails.sockets.id(req)+' is now subscribed to the model class \'users\'.');
        
        } else {
    
          res.view();
        
        }
    }
}

    // Don't forget to handle your errors
 
```

views/users/testSocket.ejs
```html

<script type="text/javascript">
window.onload = function subscribeAndListen(){
    // When the document loads, send a request to users.testSocket
    // The controller code will subscribe you to the model 'users'
    socket.get('/users/testSocket/');

    // Listen for the event called 'user' emited by the publishCreate() method.
    socket.on('user',function(obj){
      if (obj.verb == 'created') {
         var data = obj.data;
         console.log('User '+data.name+' has been created.');
      }
    });
};

function makeNew(){

    // Send the new users name to the 'testSocket' action on the 'users' controller

    socket.get('/users/testSocket/',{name:'Walter'});
}

</script>
<div class="addButton" onClick="makeNew()">Click Me to add a new 'Walter' ! </div>
```



<docmeta name="uniqueID" value="publishCreate671839">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".publishCreate()">

