# sails debug

Attach the node debugger and lift the sails app; similar to running `node --debug app.js`.  Takes the same options as `sails lift`.  You can then use [node-inspector](https://github.com/node-inspector/node-inspector) to debug your app as it runs.


### Example

```sh
$ sails debug

info: Running node-inspector on this app...
info: If you don't know what to do next, type `help`
info: Or check out the docs:
info: http://nodejs.org/api/debugger.html

info: ( to exit, type <CTRL>+<C> )

debugger listening on port 5858
```




> To use the standard (command-line) node debugger with sails, you can always just run `node debug app.js`.

<docmeta name="uniqueID" value="sailsdebug521538">
<docmeta name="displayName" value="sails debug">

