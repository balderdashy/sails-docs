# socket.put( `url`, [`params`], [`callback`] )
### Purpose
Update a record from in database using the REST Blueprints via Socket.IO

### Overview

#### Parameters
|   |          Description        | Accepted Data Types | Required ? |
|---|-----------------------------|---------------------|------------|
| 1 | /path/to/controller/action/ |      `string`       | Yes        |
| 2 |           Parameters        | `object`            | No         |
| 3 |            Callback         | `function`          | No         |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Attributes Changed |   `[{}]`            |


### Example Usage
```javascript
<script>

window.onload=function loading(){
    var paramObj = {
      "name": "Dinky Guy",
      "hobby": "snowBROing",
      "pet": {
        "name": "Gummy",
        "species": "crocodile"
      }
    };

    socket.put('/users/8',paramObj,function serverSays(err,users){
        if (err)
            console.log(err)

        console.log(JSON.stringify(users));
    });
}

// logs: Object {name: "Dinky Guy", hobby: "snowBROing", pet: Object, createdAt: "2013-12-12T19:43:49.284Z", updatedAt: "2013-12-12T21:59:58.735Z"…}

</script>
HTML BODY


```

### Notes
> This example assumes you have rest blueprints enabled in `config/controllers.js`


<docmeta name="uniqueID" value="socketput168503">
<docmeta name="displayName" value="socket.put( `url`, [`params`], [`callback`] )">

