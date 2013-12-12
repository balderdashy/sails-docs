# Socket Client
### Overview
Not only does Sails have Socket.IO built right into the framework, it also adds a few extra methods that makes using Socket.io with Sails very powerful.  The file '/assets/js/sails.io.js' is where those methods can be found.

They basically allow you to emit custom socket.io messages that when interpreted by Sails, mimic Express HTTP request. This means you can use `socket.post('/user/')` in your client side javascript to effectively create an HTTP Post Request.  Check out the methods and their examples below.


# socket.post( `url`, [`params`], [`callback`] )
### Purpose
Create a new record using the REST Blueprints via Socket.IO

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
| 2 |  Records Created    | `[{}]`        |

### Example Usage
```javascript

<script>

window.onload=function loading(){
    var paramObj = {
      "name": "Pinkie Pie",
      "hobby": "snowboarding",
      "pet": {
        "name": "Gummy",
        "species": "crocodile"
      }
    };
    socket.post('/users/',paramObj,function serverSays(err,users){
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


# socket.delete( `url`, [`params`], [`callback`] )
### Purpose
Delete a record from the database using the REST Blueprints via Socket.IO

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
| 2 |  Records Deleted    | `{}`, `[{}]`        |

### Example Usage
```javascript

<script>

window.onload=function deleteUser(){

    socket.delete('/users/8',function serverSays(err,users){
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



# socket.request( `url`, [`params`], [`callback'], [`method`] )
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


# App.js
### Purpose
Client side javascript file generated with every new project.  It serves as an example demonstrating the interoperability between Sails and Socket.IO

### Overview
If you've ever had the browser console open when a view is rendered for your Sails project, you might have noticed that a Socket.IO connection is made to the server.  This happens because of the code in 'assets/js/App.js'.  

In addition to this, it begins listening for subscription messages that might be emitted by the server if any pubSub class methods were used in the controller code. 


### Example Usage
```javascript

```

### Notes
> Do not get this file, '/assets/js/App.js' confused with 'App.js' in your projects root directory.  Yeah, I know.  We need to rename a file.  





