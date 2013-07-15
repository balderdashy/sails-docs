## session.js

####Session secret
Session secret is automatically generated when you create a new app. You can replace it in this file.
####Redis
This file also contains lines that can be uncommented in production to set up a shared Redis session store that can be shared across multiple Sails.js servers.
```
// adapter: 'redis',
//
// The following values are optional, if no options are set a redis instance running
// on localhost is expected.
// Read more about options at: https://github.com/visionmedia/connect-redis
//
// host: 'localhost',
// port: 6379,
// ttl: <redis session TTL in seconds>,
// db: 0,
// pass: <redis auth password>
// prefix: 'sess:'
```
####Mongo
You can uncomment lines in this file to use your Mongo adapter as a session store.

```
// adapter: 'mongo',
//
// host: 'localhost',
// port: 27017,
// db: 'sails',
// collection: 'sessions',
//
// Optional Values:
//
// # Note: url will override other connection settings
// url: 'mongodb://user:pass@host:port/database/collection',
//
// username: '',
// password: '',
// auto_reconnect: false,
// ssl: false,
// stringify: true
```
