# sails.config.session

### What is this?
Sails session integration leans heavily on the great work already done by Express, but also unifies Socket.io with the Connect session store.

### Description


Sails session integration leans heavily on the great work already done by Express, but also unifies 
Socket.io with the Connect session store. It uses Connect&rsquo;s cookie parser to normalize configuration
differences between Express and Socket.io and hooks into Sails&rsquo; middleware interpreter to allow you
to access and auto-save to `req.session` with Socket.io the same way you would with Express.

#### `secret`
Session secret is automatically generated when your new app is created.
Replace at your own risk in production-- you will invalidate the cookies of your users, forcing them to log in again. 

#### Shared Redis session store
In production, uncomment the following line to set up a shared redis session store
that can be shared across multiple Sails.js servers.
```javascript
adapter: 'redis',
```

The following values are optional, if no options are set a redis instance running
on localhost is expected.
Read more about options at: https://github.com/visionmedia/connect-redis
```javascript
        host: 'localhost',
        port: 6379,
        ttl: <redis session TTL in seconds>,
        db: 0,
        pass: <redis auth password>
        prefix: 'sess:'
```

Uncomment the following lines to use your Mongo adapter as a session store
```javascript
        adapter: 'mongo',

        host: 'localhost',
        port: 27017,
        db: 'sails',
        collection: 'sessions',
```
Optional Values:
```javascript
        // Note: url will override other connection settings
        // url: 'mongodb://user:pass@host:port/database/collection',

        username: '',
        password: '',
        auto_reconnect: false,
        ssl: false,
        stringify: true

```




<docmeta name="uniqueID" value="sailsconfigsession786744">
<docmeta name="displayName" value="sails.config.session">

