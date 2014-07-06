# socket.get( `url`, [`params`], [`callback`] )
### Purpose
Get a record from the database using the REST Blueprints via Socket.IO

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
| 2 |  Records Returned   |   `[{}]`            |

### Example Usage

View code

```javascript
<script>
window.onload=function loading(){
    socket.get('/users/9',function serverSays(err,users){
        if (err)
            console.log(err)

        console.log(JSON.stringify(users));
    });
}

// logs: Object {name: "Pinkie Pie", hobby: "snowboarding", pet: Object, createdAt: "2013-12-12T21:54:13.390Z", updatedAt: "2013-12-12T21:54:13.390Z"…}


</script>

HTML BODY


```

### Notes
> This example assumes you have rest blueprints enabled in `config/controllers.js`



<docmeta name="uniqueID" value="socketget480208">
<docmeta name="displayName" value="io.socket.get()">

