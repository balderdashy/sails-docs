# .stream( `criteria` )
### 目的
このメソッドは<a href="http://nodejs.org/api/stream.html">node write stream</a>を使って、最初に全ての結果をメモリにバッファすることなくデータを取得できるようにモデルデータをパイプします。

### 概要
#### パラメータ

| # | 説明          | 受け入れられるデータ型           | 必須か |
|---|---------------------|---------------------|------------|
| 1 |    検索条件   | `{}`,`[{}]`, `string`, `int`| はい |
| 2 |     カスタムのWrite/Endメソッド        | ``{}`          | いいえ        |

#### コールバックパラメータ

| # | 説明              | 想定されるデータ型 |
|---|---------------------|---------------------|
| 1 |  エラー              | `Error`             |
| 2 |  レコードのストリーム    | `stream`          |

### 使用例

UsersController.js
```javascript
module.exports = {

  testStream: function(req, res){

    if (req.param('startStream') && req.isSocket){

        var getSocket = req.socket;

        // Start the stream.  Pipe it to sockets.
        User.stream({name:'Walter'}).pipe(getSocket.emit);

    } else {

      res.view();

    }


  }
}
````

views/users/testSocket.ejs
```javascript
<script type="text/javascript">
window.onload = function startListening(){
    socket.on('gotUser',function(data){
      console.log(data.name + ' number ' + data.id + ' has joined the party');
    });
};

</script>
<div class="addButton" onClick="socket.get('/users/testStream/', {startStream:true})">Stream all the Users!</div>

```

### 備考
> このメソッドはとても大きなモデルからデータをそのままレスポンスにパイプするときに便利です。　また、別の場所にパイプすることも出来ます。詳しくはnode streamのドキュメントをお読み下さい。
> mongo、mysql、posgresqlのアダプタのみがサポートされます。これはdiskアダプタだは動作しません。
> 全ての文字列引数はレコードのIDである必要があります。

<docmeta name="uniqueID" value="stream427721">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".stream()">

