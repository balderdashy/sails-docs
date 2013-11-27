# Socket Client
### Overview
Not only does Sails have Socket.IO built right into the framework, it also adds a few extra methods that makes using SocketIO with Sails very powerful.  The file '/assets/js/sails.io.js' is where those methods live.  

They basically allow you to emit custom socketIO messages that when interpreted by Sails, mimic Express HTTP request. This means you can use `socket.post('/user/')` in your client side javascript to effectively create an HTTP Post Request.  Check out the methods and their examples below.

# socket.get()
### Purpose

### Overview

#### Parameters
|   |          Description        | Accepted Data Types | Required ? |
|---|-----------------------------|---------------------|------------|
| 1 |  Path to Controller Action  |      `string`       | Yes	       |
| 2 |            Callback         | `function`          | No         |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage
```javascript

```

### Notes
> 

# socket.post()
### Purpose

### Overview

#### Parameters
|   |          Description        | Accepted Data Types | Required ? |
|---|-----------------------------|---------------------|------------|
| 1 |  Path to Controller Action  |      `string`       | Yes	       |
| 2 |            Callback         | `function`          | No         |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage
```javascript

```

### Notes
> 

# socket.delete()
### Purpose

### Overview

#### Parameters
|   |          Description        | Accepted Data Types | Required ? |
|---|-----------------------------|---------------------|------------|
| 1 |  Path to Controller Action  |      `string`       | Yes	       |
| 2 |            Callback         | `function`          | No         |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage
```javascript

```

### Notes
> 

# socket.put()
### Purpose

### Overview

#### Parameters
|   |          Description        | Accepted Data Types | Required ? |
|---|-----------------------------|---------------------|------------|
| 1 |  Path to Controller Action  |      `string`       | Yes	       |
| 2 |            Callback         | `function`          | No         |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage
```javascript

```

### Notes
> 

# socket.request()
### Purpose

### Overview

#### Parameters
|   |          Description        | Accepted Data Types | Required ? |
|---|-----------------------------|---------------------|------------|
| 1 |  Path to Controller Action  |      `string`       | Yes	       |
| 2 |            Callback         | `function`          | No         |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage
```javascript

```

### Notes
> 

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





