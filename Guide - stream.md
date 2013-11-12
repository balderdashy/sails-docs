Examples for Models.stream()

.stream() will send records as soon as they are fetched instead of waiting until they have all been fetched and sending them all together.

Not all adapters have a stream method.  Currently only mongo, posgresql, and mysql have support for .stream()

Unless you want the models in a format other than JSON, you dont need to supply the second parameter containing the write and end methods



# Example Using Default Write and End Methods


### Users Controller

```javascript
module.exports = {
    
  testStream: function(req,res){

    if (req.param('startStream') && req.isSocket){

        var getSocket = req.socket;
        
        Users.stream({name:'Walter'}).pipe(getSocket.emit);
        
    } else {

      res.view();
    
    }


  }
}
````


### view for Users.testStream

```javascript
<style>.addButton{display:inline-block;line-height:100px;width:400px;height:100px;border:1px solid black;cursor:pointer;}</style>

<script>
window.onload = function startListening(){
    socket.on('gotUser',function(data){
    	console.log(data.name+' number '+data.id+' has joined the party');
    });
};

</script>
<center>
<div class="addButton" onClick="socket.get('/users/testStream/',{startStream:true})">
Stream all the Users ! </div>

```




# Example with Custom Write Methods

### view for Users.testStream

```javascript
<style>.addButton{display:inline-block;line-height:100px;width:400px;height:100px;border:1px solid black;cursor:pointer;}</style>

<script>
window.onload = function startListening(){
    socket.on('gotUser',function(data){
    	console.log(data.name+' number '+data.id+' has joined the party');
    });
};

</script>
<center>
<div class="addButton" onClick="socket.get('/users/testStream/',{startStream:true})">
Stream all the Users ! </div>

```
### Users Controller

```javascript
module.exports = {
    
  testStream: function(req,res){

    if (req.param('startStream') && req.isSocket){

        var getSocket = req.socket;
        
        var streamMethods = {
        
            write: function(model,index,cb){
             if (!model) { // Do not omit this line.  Not all data events that are emitted are useful.  
               getSocket.emit('gotUser',{id:model.id,name:model.name});
                console.log('Found:'+JSON.stringify(model));
              }
              
              return cb();

            },
            end: function(cb){
                console.log('We should be done streaming.');
                cb();
            }

        }

        var s = Users.stream({name:'Walter'},streamMethods).pipe(getSocket.emit);
    } else {

      res.view();
    
    }


  }
}
````


       >You can also listen for stream events 
```javascript
        var s = Users.stream({name:'Walter'})
        s.on('data',function(a){console.log('event:'+a)});
        s.on('error',function(a){console.log('error:'+a)});
        s.on('end',function(a){console.log('done')});
```

