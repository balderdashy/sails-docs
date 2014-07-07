# Sails.js Documentation > API Reference


### Table of Contents

1. **Blueprint API**
  1. Create a Record
  2. Destroy a Record
  3. Find Records
  4. Find One Record
  5. Update a Record
2. **Plugins**
  1. Adapters
    1. Available Adapters
    2. Custom Adapters
  2. Generators
    1. Custom Genarators
    2. Available Generators
  3. Hooks
    1. Custom Hooks
    2. Available Hooks
3. **Command Line Interface**
  1. sails console
  2. sails debug
  3. sails generate
  4. sails lift
  5. sails new
  6. sails version
4. **Request** (`req`)
  1. req.is()
  2. req.accepted()
  3. req.acceptedLanguages()
  4. req.accepts()
  5. req.acceptsCharset()
  6. req.acceptsLanguage()
  7. req.allParams()
  8. req.body
  9. req.cookies
  10. req.file()
  11. req.fresh
  12. req.get()
  13. req.host()
  14. req.ip
  15. req.ips
  16. req.acceptedCharsets
  17. req.isSocket
  18. req.method
  19. req.param()
  20. req.params
  21. req.path
  22. req.protocol
  23. req.query
  24. req.secure
  25. req.signedCookies
  26. req.socket
  27. req.subdomains
  28. req.url
  29. req.wantsJSON
  30. req.xhr
5. **Response** (`res`)
  1. res.negotiate()
  2. res.attachment()
  3. res.clearCookie()
  4. res.cookie()
  5. res.forbidden()
  6. res.get()
  7. res.json()
  8. res.jsonp()
  9. res.location()
  10. res.badRequest()
  11. res.notFound()
  12. res.ok()
  13. res.redirect()
  14. res.send()
  15. res.serverError()
  16. res.set()
  17. res.status()
  18. res.type()
  19. res.view()
6. **Configuration**
  1. sails.config.i18n
  2. sails.config.blueprints
  3. sails.config.connections
  4. sails.config.cors
  5. sails.config.csrf
  6. sails.config.globals
  7. sails.config.http
  8. sails.config.bootstrap
  9. sails.config.local
  10. sails.config.log
  11. sails.config.policies
  12. sails.config.routes
  13. sails.config.session
  14. sails.config.sockets
  15. sails.config.views
7. **Socket Client**
  1. io.socket.on()
  2. io.socket.delete()
  3. io.socket.get()
  4. io.socket.post()
  5. io.socket.put()
  6. io.socket.request()
8. **sails.sockets**
  1. sails.sockets.leave()
  2. sails.sockets.blast()
  3. sails.sockets.emit()
  4. sails.sockets.id()
  5. sails.sockets.join()
  6. sails.sockets.broadcast()
  7. sails.sockets.rooms()
  8. sails.sockets.socketRooms()
  9. sails.sockets.subscribeToFirehose()
  10. sails.sockets.subscribers()
  11. sails.sockets.unsubscribeFromFirehose()

<docmeta name="uniqueID" value="home198259">
<docmeta name="displayName" value="--">


<docmeta name="uniqueID" value="home198238">
<docmeta name="displayName" value="--">
