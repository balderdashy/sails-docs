# socket.request( `url`, [`params`], [`callback`], [`method`] )
### Purpose
Simulate an HTTP request to a Sails App over Socket.IO.  

### Overview

#### Parameters
|   |          Description        | Accepted Data Types | Required ? |
|---|-----------------------------|---------------------|------------|
| 1 | /path/to/controller/action/ |      `string`       | Yes        |
| 2 |           Parameters        | `object`            | No         |
| 3 |            Callback         | `function`          | No         |
| 4 |         HTTP Method         | `string`            | No         |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error OR DATA      |   `Error`, `[{}]`   |

### Example Usage
```javascript
<script>

window.onload=function sendRequest(){

    var callback = function callback(errorORdata){
            console.log('Here is either an error OR the data:'+JSON.stringify(errorORdata));
        };

    var myParams = { param1:'lol',
                     param2:'bbl'
                    };

    socket.request('/users/',myParams,callback,'post');
}

// logs Here is either an error OR the data:Object {param1: "lol", param2: "bbl", createdAt: "2013-12-12T22:15:07.089Z", updatedAt: "2013-12-12T22:15:07.089Z", id: 10} 

</script>
HTML BODY

```

### Notes
> This is a low level private method that is only being exposed for compatability with older versions of Sails.

> Unlike the other custom Socket.IO methods supplied by Sails, socket.request DOES NOT always return 2 parameters in the callback.  You will get EITHER the data or an error object.








<docmeta name="uniqueID" value="socketrequest682488">
<docmeta name="displayName" value="socket.request( `url`, [`params`], [`callback`], [`method`] )">

