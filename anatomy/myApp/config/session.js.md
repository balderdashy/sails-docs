# myApp/config/session.js
### 目的
このファイルではSailsがどこにセッションを保存するのかを決めています。 

Sailsのセッション実装はExpressがすでにやっている偉業に大きく学んでいますが、Connectのセッションストアを使ってsocket.ioを統合しています。ここではConnectのセッションパーサを使ってExpressとsocket.ioの設定の違いを吸収しているほか、Socket.ioでもExpressと同じ方法でアクセスし、`req.session`への自動保存が出来るようにSailsのミドルウエアインタープリタにフックしています。

RedisやMongoなどといった別のセッションストアを利用したい場合はここで設定します。このファイルではどのようにそれをすればいいかに関してコメントされた例が示されています。

このファイルにはアプリケーションを作成するときにSailsによって生成された'Session Secret'が保管されています。何をしているのかを本当にわかりながらやる時を除き、この設定を変更したり削除しないでください。

<docmeta name="uniqueID" value="sessionjs736525">
<docmeta name="displayName" value="session.js">

```
/**
 * Session Configuration
 * (sails.config.session)
 *
 * Sails session integration leans heavily on the great work already done by
 * Express, but also unifies Socket.io with the Connect session store. It uses
 * Connect's cookie parser to normalize configuration differences between Express
 * and Socket.io and hooks into Sails' middleware interpreter to allow you to access
 * and auto-save to `req.session` with Socket.io the same way you would with Express.
 *
 * For more information on configuring the session, check out:
 * http://links.sailsjs.org/docs/config/session
 */

module.exports.session = {

  // Session secret is automatically generated when your new app is created
  // Replace at your own risk in production-- you will invalidate the cookies of your users,
  // forcing them to log in again.
  secret: 'cdf93c72c05f104f6183613e2f8262c2',


  // Set the session cookie expire time
  // The maxAge is set by milliseconds, the example below is for 24 hours
  //
  // cookie: {
  //   maxAge: 24 * 60 * 60 * 1000
  // }


  // In production, uncomment the following lines to set up a shared redis session store
  // that can be shared across multiple Sails.js servers
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


  // Uncomment the following lines to use your Mongo adapter as a session store
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

};

```
