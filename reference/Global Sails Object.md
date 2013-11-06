The Sails Object
================
The global sails object is blah blah ablh

### sails.io

- sails.io - the raw reference to socket.io.

- io.sockets.in('roomname').emit('msg')

- io.sockets.emit('roomname')

- io.sockets.clients('roomname')


### Setup

### Usage



Logs

default log level is info

sails.log() = sails.log.debug
.log.verbose
.log.info
.log.warn
.log.error


(takes i



If you disable globals, use sails.model.user for User[model]
(lowercases the model name)



sails.config - has all live configuration
    allows you to perform different actions based on config like production mode 
sails.io. - socket













ClassMethods - Pubsub
  publishCreate
  publishUpdate
  publishDestroy
  subscribe(req)
  subscribe(req,id)
