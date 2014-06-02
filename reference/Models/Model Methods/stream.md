# .stream( `criteria` )
### Purpose
This method uses a <a href="http://nodejs.org/api/stream.html">node write stream</a> to pipe model data as it is retrieved without first having to buffer all of the results to memory.  

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criteria    | `{}`,`[{}]`, `string`, `int` | Yes |
| 2 | Custom Write/End Methods | `{}`          | No        |

#### Returned

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Stream of Records  | `stream`  |

### Example Usage

UsersController.js
```javascript
module.exports = {
    
  testStream: function(req,res){

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
      console.log(data.name+' number '+data.id+' has joined the party');
    });
};

</script>
<div class="addButton" onClick="socket.get('/users/testStream/',{startStream:true})">Stream all the Users !</div>

```

### Notes
> This method is useful for piping data from VERY large models straight to res.  You can also pipe it other places.  See the node stream docs for more info.
> Only the mongo, mysql, and posgresql adapters support this method.  This won't work with the disk adapter.
> Any string arguments passed must be the ID of the record.

<docmeta name="uniqueID" value="stream427721">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".stream()">

